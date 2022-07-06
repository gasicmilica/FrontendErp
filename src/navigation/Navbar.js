import React, { useState, useCallback } from 'react';
import './Navbar.css';
import { FaShoppingBasket } from 'react-icons/fa';
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

    const korisnik = authService.getCurrentUser();

    let ulogaKorisnika = null;
    if (korisnik != null) {
        ulogaKorisnika = korisnik.ulogaKorisnika.nazivUloge;
    }

    const getKorisnik = () => {
        console.log(korisnik);
        if (authService.getCurrentUser() != null) {
            return true;
        }else {
            return false;
        }
    }

    const navigate = useNavigate();
    const onLogout = useCallback(() => navigate('/gotov/1', {replace: true}), [navigate]);

    const logout = () => {
        authService.logout();
        onLogout();
    }

    return (
    <nav className="navbar navbar-expand-md" id="navbar-css">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="/gotov/1">Pocetna strana<span class="sr-only">(current)</span></a>
                </li>
                
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                Proizvodi
                </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="/gotov/1" id="buket">Buketi</a>
                    <a class="dropdown-item" href="/gotov/2">Korpe sa cvecem</a>
                    <a class="dropdown-item" href="/gotov/3">Bidermajeri</a>
                    </div>
                </li>
                <li className="nav-item">
                    <a class="nav-link" href="/gotov">Kreiraj svoj buket</a>
                </li> 
                {(ulogaKorisnika == "ROLE_ADMIN" || ulogaKorisnika == "ROLE_ZAPOSLENI") ? <div>
                    <li className="nav-item">
                        <a class="nav-link" href="/porudzbina">Spisak porudzbina</a>
                    </li> 
                </div> : ""}
            </ul>
        </div>

        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li className='nav-item' >
                <a className='nav-link' href="/korpa">
                    <FaShoppingBasket size={30}/>
                </a>
            </li>
            <li className="nav-item">
                <a class="nav-link" href="/profil">Profil</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href="/prijava">{getKorisnik()==false ? 'Prijava' : null}</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href="/registracija">{getKorisnik()==false ? 'Registracija' : null}</a>
            </li>
            {(getKorisnik() == true) ? 
                <li className="nav-item" >
                    <button className="btn" onClick={()=>logout()}>Izloguj se</button>
                </li> 
            : null}
        </ul>
    </div>
    </nav>
    );
}

export default Navbar;