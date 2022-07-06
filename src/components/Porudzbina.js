import React from "react";
import porudzbinaService from "../services/porudzbina.service";
import { useEffect, useState } from 'react';
import stavkaPorudzbineService from "../services/stavkaPorudzbine.service";
import authService from "../services/auth.service";
import Alert from 'react-bootstrap/Alert';


const Porudzbina = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [porudzbine, setPorudzbine] = useState([]);
    const [selektovanaPorudzbina, setPorudzbinaId] = useState();
    const [stavkePorudzbine, setStavke] = useState([]);
    const korisnik = authService.getCurrentUser();
    const ulogaKorisnika = korisnik.ulogaKorisnika.nazivUloge;

    console.log(ulogaKorisnika);

    const getStavkePorudzbine = (id) => {
        
        stavkaPorudzbineService.getByPorudzbina(id)
        .then(stavke => {
            console.log(stavke.data);
            setPorudzbinaId(id);
            setStavke(stavke.data);
        })
        .catch(error => {
            console.log('Something went wrong', error);
        }) 
    }

    const izmeniStatus = (porudzbina) => {
        porudzbina.statusPorudzbine = 3;
        porudzbinaService.update(porudzbina)
        .then(response => {
            console.log('Porudzbina', response.data);
            setSuccessMessage("Uspesno je izmenjen status porudzbine");
        })
        .catch(error => {
            console.log('Something went wrong', error);
            setErrorMessage("Doslo je do greske, molimo pokusajte kasnije.");
        }) 
    }
    
   
    useEffect(() => {
        porudzbinaService.getAll()
        .then(response => {
            console.log('Porudzbine', response.data);
            setPorudzbine(response.data);                   
        })
        .catch(error => {
            console.log('Something went wrong', error);
        })    
    }, []);

    return(
        <div className='container'>
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
            <h3>Lista svih porudzbina</h3>
            <hr/>
            <div>    
            <table className="table table-bordered table-striped">
            <thead className="thead-dark">
                <tr className="red">
                <th>Id</th>
                <th>Status</th>
                <th>Ukupna cena</th>
                <th>Datum kreiranja</th>
                <th>Korisnik</th>
                <th>Stavke porudzbine</th>
                {ulogaKorisnika == "ROLE_ZAPOSLENI" ? 
                    <th>Izmena statusa</th>
                    : ""}
                </tr>
            </thead>
            <tbody>
                {
                porudzbine.map(porudzbina => (
                    <tr key={porudzbina.porudzbinaId}>
                    <td>{porudzbina.porudzbinaId}</td>
                    <td>{porudzbina.statusPorudzbine}</td>
                    <td>{porudzbina.ukupnaCena}</td>
                    <td>{porudzbina.datumKreiranja}</td>
                    <td>{porudzbina.korisnikId.korisnickoIme}</td>
                    <td>
                        <button className="btn" onClick={() => getStavkePorudzbine(porudzbina.porudzbinaId)}>Prikazi stavke</button>
                        <div>
                            {porudzbina.porudzbinaId == selektovanaPorudzbina ? <div>
                                {stavkePorudzbine.map(stavka => (
                                    <p>{"- Naziv: " + (stavka.gotovProizvod!=null ? stavka.gotovProizvod.naziv : "korisnikov buket") + 
                                        ", kolicina: " + stavka.kolicinaProizvoda + ", cena stavke: " + stavka.cenaStavke}</p>
                                    )
                                    )}
                            </div> : ("")}
                        </div>
                    </td>
                        <td>
                            {(ulogaKorisnika == "ROLE_ZAPOSLENI" && porudzbina.statusPorudzbine==2) ?
                            <button className="btn" onClick={() => izmeniStatus(porudzbina)}>Izmeni status na kreirano</button>
                            : ""}
                        </td>
                    </tr>
                ))
                }
            </tbody>
            </table>
            </div>
     </div>
    )

}

export default Porudzbina;