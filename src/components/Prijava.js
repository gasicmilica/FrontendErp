import React,  {useCallback} from 'react';
import { useState } from "react";
import authService from '../services/auth.service';
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from "react-router-dom";


const Prijava = () => {
    const[successMessage, setSuccesssMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const[korisnickoIme, setKorisnickoIme] = useState('');
    const[lozinka, setLozinka] = useState('');

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/gotov/1', {replace: true}), [navigate]);

    const login = (e) => {
        e.preventDefault();
        
        const prijava = {korisnickoIme, lozinka};

        authService.signin(prijava)
        .then(response => {
            localStorage.setItem('korisnik', JSON.stringify(response.data.korisnik));
            sessionStorage.setItem('token', JSON.stringify(response.data.jwtToken));
            console.log("Successfully", response.data);      
            setSuccesssMessage('Uspešno ste se prijavili!');
            handleOnClick();
        })
        .catch(error => {
            console.log('Something went wrong with post method', error);
            setErrorMessage("Korisnicko ime ili lozinka nisu validni!")
        })   
    }

    return (
        <div className="container">
            <br/>
            <br/>
            <br/>
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
            <h3>Prijava</h3>
            <hr/>
            <form>
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
                    <button onClick={(e) => login(e)} className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
        </div>
    );
}
 
export default Prijava;