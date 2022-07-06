import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";
import korisnikService from "../services/korisnik.service";
import { useParams } from "react-router-dom";

const ProfilKorisnika = () => {

    const trenutniKorisnik = authService.getCurrentUser();
    let { korisnikId } = useParams();
    korisnikId = JSON.stringify(trenutniKorisnik.korisnikId);

    const[korisnickoIme, setKorisnickoIme] = useState('');
    const[lozinka, setLozinka] = useState('');
    const[email, setEmail] = useState('');
    const[jmbg, setJmbg] = useState('');
    const[ime, setIme] = useState('');
    const[prezime, setPrezime] = useState('');
    const[telefon, setTelefon] = useState('');
    const[ulogaKorisnika, setUloga] = useState('');

    const saveUpdates = (e) => {
        e.preventDefault();

        const korisnik = {korisnikId, korisnickoIme, lozinka, ime, prezime, email, telefon, jmbg, ulogaKorisnika};

        korisnikService.update(korisnik)
            .then(response => {
                console.log('Korisnik data updated successfully', response.data);
            })
            .catch(error => {
                console.log('Something went wrong with update', error);
            })  
    }

    useEffect(() => {
        if (korisnikId) {
            korisnikService.get(korisnikId)
                .then(korisnik => {
                    setIme(korisnik.data.ime);
                    setPrezime(korisnik.data.prezime);
                    setEmail(korisnik.data.email);
                    setJmbg(korisnik.data.jmbg);
                    setKorisnickoIme(korisnik.data.korisnickoIme);
                    setLozinka(korisnik.data.lozinka);
                    setTelefon(korisnik.data.telefon);
                    setUloga(korisnik.data.ulogaKorisnika);
                })
                .catch(error => {
                    console.log('Something went wrong with get by id', error);
                })
        }
    }, [])

    return (
        <div className="container">
            <br/>
            <br/>
            <br/>

            <h3>{"Profil"}</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="ime"
                        value={ime}
                        onChange={(e) => setIme(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="prezime"
                        placeholder="Prezime"
                        value={prezime}
                        onChange={(e) => setPrezime(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="korisnickoIme"
                        placeholder="Korisnicko ime"
                        value={korisnickoIme}
                        onChange={(e) => setKorisnickoIme(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="lozinka"
                        placeholder="Telefon"
                        value={telefon}
                        onChange={(e) => setTelefon(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="lozinka"
                        placeholder="JMBG"
                        value={jmbg}
                        onChange={(e) => setJmbg(e.target.value)}
                    />
                </div>
                <div >
                    <button onClick={(e) => saveUpdates(e)} className="btn btn-primary">Save changes</button>
                </div>
            </form>
            <hr/>
        </div>
    );
}

export default ProfilKorisnika;