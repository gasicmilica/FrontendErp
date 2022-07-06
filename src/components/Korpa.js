import { useEffect, useState } from 'react';
import porudzbinaService from '../services/porudzbina.service';
import './GotovProizvod.css';
import React from 'react';
import stavkaPorudzbineService from '../services/stavkaPorudzbine.service';
import authService from '../services/auth.service';
import adresaService from '../services/adresa.service';
import Alert from 'react-bootstrap/Alert';
import Stripe from "react-stripe-checkout";
import placanjeService from '../services/placanje.service';

const Korpa = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [showButton, setShowButton] = useState(false);
  const [korpa, setKorpa] = useState(false);

  const [proizvodi, setProizvodi] = useState([]);
  const [porudzbinaId, setPorudzbinaId] = useState('');

  const korisnikId = authService.getCurrentUser();

  const [ukupnaCena, setUkupnaCena] = useState('');
  const [statusPorudzbine, setStatus] = useState('');
  const [otkazana, setOtkazana] = useState('');
  const [datumKreiranja, setDatumKreiranja] = useState('');
 
  //adresa
  const [adresaId, setAdresaId] = useState('');
  const[grad, setGrad] = useState('');
  const[ulica, setUlica] = useState('');
  const[broj, setBroj] = useState('');
  const[postanskiBroj, setPostanskiBroj] = useState('');

  const adresa = {grad, ulica, broj, postanskiBroj, adresaId};
  const porudzbina = { porudzbinaId, ukupnaCena, statusPorudzbine, otkazana, datumKreiranja, adresa, korisnikId };

  const izbrisiIzKorpe = (stavka) => {
    stavkaPorudzbineService.deleteById(stavka.stavkaId)
    .then(stavkaZaBrisanje => {
      console.log('Obrisana je stavka', stavkaZaBrisanje.data);
      setSuccessMessage('Proizvod je uspešno obrisan iz Vaše korpe!');

      stavkaPorudzbineService.getByPorudzbina(porudzbina.porudzbinaId)
      .then(response => {
        console.log('Stavke', response.data);
        if (response.data.length == 0)
        {
          setKorpa(false);
        }
      })
      .catch(error => {
        console.log('Something went wrong', error);
        setErrorMessage("Došlo je do greške.")
      }) 
    })
    .catch(error => {
      console.log('Something went wrong', error);
      setErrorMessage("Došlo je do greške prilikom brisanja proizvoda iz korpe, molimo pokušajte kasnije.")
    }) 
  }

  const poruci = () => {
    let cenaPorudzbine = 0;

    if (adresaId == false) {
      setErrorMessage("Morate dodati adresu dostave kako biste porucili!");
      return;
    }

    stavkaPorudzbineService.getByPorudzbina(porudzbina.porudzbinaId)
    .then(stavke => {
      console.log('Stavke porudzbine', stavke.data);
     
      //ukupna cena
      setProizvodi(stavke.data);
      console.log(proizvodi)
      proizvodi.map((stavka) => 
        cenaPorudzbine = cenaPorudzbine + stavka.cenaStavke
      )
      porudzbina.ukupnaCena = cenaPorudzbine;
      setUkupnaCena(cenaPorudzbine);

      //datum kreiranja
      porudzbina.datumKreiranja = new Date();
      setDatumKreiranja(new Date());

      porudzbinaService.update(porudzbina)
      .then(response => {
        console.log('Izmenjena porudzbina', response.data);
        setShowButton(true);
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
    })
    .catch(error => {
      console.log('Something went wrong', error);
    })
  }

  const sacuvajAdresu = (e) => {
    e.preventDefault();

    if (adresaId) {
        adresaService.update(adresa)
            .then(response => {
                console.log('Address data updated successfully', response.data);
            })
            .catch(error => {
                console.log('Something went wrong with update', error);
            }) 
    } else {
        adresaService.create(adresa)
        .then(response => {
          console.log(response.data);
            setAdresaId(response.data.adresaId);
            porudzbina.adresa = response.data;
            porudzbinaService.update(porudzbina)
            .then(response => {
              console.log('Dodata je adresa dostave za porudzbinu.', response.data);
            })
            .catch(error => {
              console.log('Something went wrong', error);
            })

            console.log("Address added successfully", response.data);
        })
        .catch(error => {
            console.log('Something went wrong with post method', error);
        })
    }
  }

  const isprazniKorpu = () => {
    porudzbina.statusPorudzbine = 2;
    setStatus(2);

    porudzbinaService.update(porudzbina)
    .then(response => {
     // console.log(localStorage.getItem("porudzbina"));
      //localStorage.removeItem("porudzbina");
      //console.log(localStorage.getItem("porudzbina"));
      setKorpa(false);
      console.log('Izmenjena status porudzbine', response.data);
    })
    .catch(error => {
      console.log('Something went wrong', error);
    })
  }
  
  const handleToken = (token) => {
    placanjeService.post(ukupnaCena, token)
    .then(() => {
      alert("Uspesno obavljeno placanje!");
      setShowButton(false);
      isprazniKorpu();
    })
    .catch((error) => {
      alert(error);
    });    
  }

  useEffect(() => {
    porudzbinaService.getByUserAndStatus(korisnikId.korisnikId, 1)
      .then(porudzbina => {
          setPorudzbinaId(porudzbina.data.porudzbinaId);
          setDatumKreiranja(porudzbina.data.datumKreiranja);
          setOtkazana(porudzbina.data.otkazana);
          setStatus(porudzbina.data.statusPorudzbine);
          setUkupnaCena(porudzbina.data.ukupnaCena);
        console.log('Ispisuju se podaci za ovu porudzbinu', porudzbina.data);
        if(porudzbina.data.porudzbinaId != null) {
          //setKorpa(true);
        stavkaPorudzbineService.getByPorudzbina(porudzbina.data.porudzbinaId)
        .then(stavke => {
          if(stavke.data.length != 0) {
            setKorpa(true);
          }
          console.log('Ispisuju se proizvodi za ovu porudzbinu', stavke.data);
          setProizvodi(stavke.data);
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })  

        adresaService.get(porudzbina.data.adresa.adresaId)
        .then(address => {
          setAdresaId(address.data.adresaId);
          setGrad(address.data.grad);
          setUlica(address.data.ulica);
          setBroj(address.data.broj);
          setPostanskiBroj(address.data.postanskiBroj);
         
          console.log(address.data);
        })
        .catch(error => {
            console.log('Something went wrong with get by id', error);
        })
        }
      })
      .catch(error => {
        console.log('Something went wrong with get by status and user', error);
      })      
  }, []);

  return ( 
    <div>
      <div>
        {errorMessage != "" ? <div>
          <Alert variant='warning'>{errorMessage && <div className="error"> {errorMessage} </div>}</Alert>
        </div> : ("")}
      </div>
      <div>
        {successMessage != "" ? <div>
          <Alert variant='success'>{successMessage && <div> {successMessage} </div>}</Alert>
        </div> : ("")}
      </div>

      <h1>Moja korpa</h1>
      <hr/>

      <div> {korpa == true ? 
        <div>
          
          <div className='centeredDiv'>
            <button className="btn" onClick={() => poruci()}>Poruci</button>
          </div>
          <br/>
          <div className='centeredDiv'>
            <div>
              {showButton == true ? <div>
                  <h5>Ukupna cena porudzbine je: {porudzbina.ukupnaCena}</h5>
                  <div className='centeredDiv'>
                    <Stripe
                      stripeKey="pk_test_51LHpsdBPGFjVXvRYWCEPqfDzoU2uSCz6IIlUe4UF5UHKLSQHpsKIqACUB1Wrj9pGRD1tsZkBEZp728luc67CYPQW0005ngF7KA"
                      token={handleToken}
                      email={korisnikId.email}
                    />
                  </div>
                </div> : ("")}
            </div>
          </div>
          
          <hr/>

          <div className="container">
            <h5>{"Adresa dostave cveca: "}</h5> 
            <form>
              <div className="form-group">
                <input
                  type="text" 
                  className="form-control col-4"
                  id="grad"
                  value={grad}
                  onChange={(e) => setGrad(e.target.value)}
                  placeholder="Unesite grad"
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control col-4"
                  id="ulica"
                  value={ulica}
                  onChange={(e) => setUlica(e.target.value)}
                  placeholder="Unesite ulicu"
                />

              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control col-4"
                  id="broj"
                  value={broj}
                  onChange={(e) => setBroj(e.target.value)}
                  placeholder="Unesite broj"
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control col-4"
                  id="postanskiBroj"
                  value={postanskiBroj}
                  onChange={(e) => setPostanskiBroj(e.target.value)}
                  placeholder="Unesite postanski broj"
                />
              </div>    
              <div>
                <button onClick={(e) => sacuvajAdresu(e)} className="btn btn-primary">Sacuvaj adresu</button>
              </div>
            </form>
          </div>                                   
          <hr/>
          <div className='item-container'>
            {proizvodi
            .map((stavka) => (
              <div className='card'>
                <div>
                  {stavka.buket != null ? <div>
                    Korinsikov buket
                  </div> : ("")}
                </div>

                <div>
                  {stavka.gotovProizvod != null ? <div>
                    <img src={stavka.gotovProizvod.slika} alt='drive image' width="250" height="250"/>
                    <h3>{stavka.gotovProizvod.naziv}</h3>
                    <p>{stavka.gotovProizvod.naziv}</p>
                    <p style={{color:'gray'}}>{stavka.gotovProizvod.naStanju ? 'Dostupno' : 'Nema na stanju'}</p>
                  </div> : ("")}
                </div>
            
                <p>{"Cena: " + stavka.cenaStavke + " din"}</p>
                <p>{"Kolicina: " + stavka.kolicinaProizvoda}</p>
            
                <button className="btn" type="submit" onClick={() => izbrisiIzKorpe(stavka)}>Izbrisi iz korpe</button>
              </div>
            ))}
          </div>
        </div> : ("Vasa korpa je prazna!")}         
      </div>
      <br/>
      <br/>
    </div>
  );
}

export default Korpa;