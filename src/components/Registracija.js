import React , {useCallback} from 'react';
import registracijaService from "../services/registracija.service";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const Registracija = () => {

    const[ime, setIme] = useState('');
    const[prezime, setPrezime] = useState('');
    const[email, setEmail] = useState('');
    const[korisnickoIme, setKorisnickoIme] = useState('');
    const[jmbg, setJmbg] = useState('');
    const[lozinka, setLozinka] = useState('');

    const {korisnikId} = useParams();
    const navigate = useNavigate();

    const handleOnClick = useCallback(() => navigate('/prijava', {replace: true}), [navigate]);

    const saveUser = (e) => {
        e.preventDefault();
        
        const registracija = {korisnikId, ime, prezime, email, korisnickoIme, jmbg, lozinka};
        if (korisnikId) {
            console.log('Vec postoji');
        } else {
            registracijaService.signup(registracija)
            .then(response => {
                console.log("User added successfully", response.data);
                handleOnClick();
            })
            .catch(error => {
                console.log('Something went wrong with post method', error);
            })
        }
    }

    return (
        <div className="container">
            <br/>
            <br/>
            <br/>

            <h3>Registracija</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="ime"
                        placeholder="Ime"
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
                        placeholder="Lozinka"
                        value={lozinka}
                        onChange={(e) => setLozinka(e.target.value)}
                    />
                </div>
                <div >
                    <button onClick={(e) => saveUser(e)} className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
        </div>
    );
}
 
export default Registracija;