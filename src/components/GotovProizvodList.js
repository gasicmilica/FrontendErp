import { Component, useEffect, useState } from 'react';
import gotovProizvodService from '../services/gotovProizvod.service';
import './GotovProizvod.css';
import React, {useCallback} from 'react';
import { useParams } from "react-router-dom";
import stavkaPorudzbineService from '../services/stavkaPorudzbine.service';
import porudzbinaService from '../services/porudzbina.service';
import authService from '../services/auth.service';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const GotovProizvodList = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [proizvodi, setProizvodi] = useState([]);

  const [sortType, setSorted] = useState('ASC');
  const onSort = () => {
    const sortOrder = sortType === 'ASC' ? 'DESC' : 'ASC';
    setSorted(sortOrder);
console.log(sortOrder);
    gotovProizvodService.getByKategorijaPaging(kategorijaId, currentPage, sortOrder)
    .then(response => {
      console.log('Ispisuju se sviiiii gotovi proizvodi', response.data);
      setProizvodi(response.data.proizvodi);
      setPageCount(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    })
    .catch(error => {
      console.log('Something went wrong', error);
    }) 
  }

  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState();

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
    console.log(selected);
    gotovProizvodService.getByKategorijaPaging(kategorijaId, selected, sortType)
    .then(response => {
      console.log('Ispisuju se sviiiii gotovi proizvodi', response.data);
      setProizvodi(response.data.proizvodi);
      setPageCount(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    })
    .catch(error => {
      console.log('Something went wrong', error);
    }) 

  };

  let korisnik = authService.getCurrentUser();
  let ulogaKorisnika = null;
  if (korisnik != null) {
    ulogaKorisnika = korisnik.ulogaKorisnika.nazivUloge;
  }
  
  const {kategorijaId} = useParams();

  const [stavkaId, setStavkaId] = useState('');

  let kolicinaProizvoda = useState('');
  let cenaStavke = useState('');

  let ukupnaCena = useState('');
  let statusPorudzbine = useState('');

  const [q, setQ] = useState("");
  const [searchParam] = useState(["naziv", "opis"]);

  const dodajStavku = (proizvod, porudzbinaId) => {

    const gotovProizvod = proizvod;
    kolicinaProizvoda = 1;
    cenaStavke = proizvod.cena;

    const stavka = {stavkaId, gotovProizvod, kolicinaProizvoda, cenaStavke, porudzbinaId};

    stavkaPorudzbineService.create(stavka)
    .then(response => {
      console.log("Stavka added successfully", response.data);
      setSuccessMessage('Proizvod je uspešno dodat u vašu korpu!');
    })
    .catch(error => {
      console.log('Something went wrong with post method', error);
      setErrorMessage("Došlo je do greške prilikom ubacivanja proizvoda u korpu, molimo pokupajte ponovo kasnije.");
    })
  }

  const proveraKolicineProizvoda = (porudzbina, proizvod) => {
    //get stavke po id-ju porudzbine i id-ju proizvoda

    stavkaPorudzbineService.getByPorudzbinaAndProizvod(porudzbina.porudzbinaId, proizvod.proizvodId)
    .then(response => {
      const stavka = response.data;

      console.log(response.data);
      
      if(stavka.stavkaId != null) {
        stavka.kolicinaProizvoda = response.data.kolicinaProizvoda + 1;
        stavka.cenaStavke = response.data.cenaStavke + proizvod.cena;
        console.log(stavka);
        console.log(stavka.kolicinaProizvoda);

        stavkaPorudzbineService.update(stavka)
        .then(update => {
          console.log("Stavka updated successfully", update.data);
          setSuccessMessage('Proizvod je uspešno dodat u vašu korpu!');
        })
        .catch(error => {
          console.log('Something went wrong with put method', error);
          setErrorMessage("Došlo je do greške prilikom ubacivanja proizvoda u korpu, molimo pokupajte ponovo kasnije.");
        })
      } else {
        console.log('Else, nema ovog proizvoda u porudzbini');
        dodajStavku(proizvod, porudzbina);
      }   
    })
    .catch(error => {
        console.log('Something went wrong with post method', error);
    })
  }

  const dodajUKorpu = (proizvod) => {

    if (proizvod.naStanju==false) {
      setErrorMessage("Proizvod trenutno nije dostupan!");
      return;
    }

    //korisnik
    const korisnikId = authService.getCurrentUser();
    if (korisnikId != null)
    {
      //inicijalna porudzbina
      ukupnaCena = proizvod.cena;
      statusPorudzbine = 1;   
      let inicijalnaPorudzbina = { statusPorudzbine, ukupnaCena, korisnikId };
      
      porudzbinaService.getByUserAndStatus(korisnikId.korisnikId, 1)
      .then(response => {
        console.log("Porudzbina sa statusom 1 i prosledjenim id-jem korisnika", response.data);
        console.log(response.data.porudzbinaId == null);

        if (response.data.porudzbinaId == null) {
          console.log("if");
          porudzbinaService.create(inicijalnaPorudzbina)
          .then(novaPorudzbina => {
            console.log("Porudzbina added successfully", novaPorudzbina.data);
            dodajStavku(proizvod, novaPorudzbina.data);
          })
          .catch(error => {
            console.log('Something went wrong with post method', error);
            setErrorMessage("Došlo je do neočekivane greške, molimo pokušajte kasnije.");
          })
    
        } else {
          console.log("else");
          proveraKolicineProizvoda(response.data, proizvod);
        }
        console.log(localStorage.getItem("cenaPorudzbine"));
      })
      .catch(error => {
        console.log('Something went wrong with getByStatusAndUser method', error);
        setErrorMessage("Došlo je do neočekivane greške, molimo pokušajte kasnije.");
      }) 
    } else {
      setErrorMessage('Potrebno je da se prijavite kako biste nastavili dalje!');
      console.log(errorMessage);
    }
  }

  const navigate = useNavigate();
  const onClickNavigate = useCallback(() => navigate('/izmenaProizvoda', {replace: true}), [navigate]);

  const izmenaProizvoda = (proizvod) => {
    localStorage.setItem("proizvodZaIzmenu", JSON.stringify(proizvod));
    onClickNavigate();
  }

  const dodajProizvod = () => {
    localStorage.removeItem("proizvodZaIzmenu");
    onClickNavigate();
  }

  const izbrisiProizvod = (proizvod) => {
    gotovProizvodService.delete(proizvod)
    .then(response => {
      console.log('Proizvod je obrisan', response.data);
    })
    .catch(error => {
      console.log('Something went wrong', error);
    })  
  }

  const filter = () => {
    proizvodi.filter((proizvod) => {
      return searchParam.some((newItem) => {
        return (
          proizvod[newItem]
          .toString()
          .toLowerCase()
          .indexOf(q.toLowerCase()) > -1
        )
      })
    })
  }

  useEffect(() => {
    /*gotovProizvodService.getAll()
    .then(response => {
      console.log('Ispisuju se sviiiii gotovi proizvodi', response.data);
      setProizvodi(response.data.proizvodi);
      setPageCount(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    })
    .catch(error => {
      console.log('Something went wrong', error);
    }) */

    gotovProizvodService.getByKategorijaPaging(kategorijaId, currentPage, sortType)
      .then(response => {
        console.log(sortType);
        console.log('Ispisuju se gotovi proizvodi', response.data);
        setProizvodi(response.data.proizvodi);
        setPageCount(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      })
      .catch(error => {
        console.log('Something went wrong', error);
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

      <hr/>
      <h1>Proizvodi cvećare</h1>
      <hr/>
        {ulogaKorisnika == "ROLE_ADMIN" ? <div>
          <button className="btn" type="submit"  onClick={() => dodajProizvod()}>Dodaj novi proizvod</button>
          <hr/>
        </div> : ("") }

        <div  className="centeredDiv">
          <input
            className="search"
            placeholder="Pretrazi..."
            onChange={(e) => setQ(e.target.value.toLowerCase())}
          />
        </div>
        <hr/>
        <div className='centeredDiv'>
          <button className='btn' placeholder='Ordenar' onClick={() => onSort()}>
            Sortiraj po ceni {sortType == "ASC" ? "opadajuće" : "rastuće"}</button>
        </div>
        <br/>
        <br/>
      <div className='item-container'>
        {proizvodi.filter((p) =>
          p.naziv.toLowerCase().includes(q)
        )        
        .map((proizvod) => (
          <div className='card'>
            <img src={proizvod.slika} alt='drive image' width="250" height="250"/>
            <h3>{proizvod.naziv}</h3>
            <p>{proizvod.opis}</p>
            <p>{"Cena: " + proizvod.cena}</p>
            <p style={{color:'gray'}}>{proizvod.naStanju ? 'Dostupno' : 'Nema na stanju'}</p>
            <p>
              {(ulogaKorisnika == "ROLE_KUPAC" || ulogaKorisnika == null) ? <div>
                <button className="btn" type="submit"  onClick={() => {(dodajUKorpu(proizvod))}}>Dodaj u korpu</button>
              </div> : ("") }
              {ulogaKorisnika == "ROLE_ADMIN" ? <div>
                <button className="btn" type="submit"  onClick={() => {(izmenaProizvoda(proizvod))}}>Izmena</button>
                <button className="btn" type="submit"  onClick={() => {(izbrisiProizvod(proizvod))}}>Brisanje</button>
              </div> : ("") }
            </p>
          </div>
        ))}
      </div>
      <br/>
      <br/>

      <div className='centeredDiv'>
        <ReactPaginate
          previousLabel={"Nazad"}
          nextLabel={"Dalje"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />    
      </div>
      <br/>
    </div>
  );
}

export default  GotovProizvodList;