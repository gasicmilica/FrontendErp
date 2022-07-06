import { useLocation, Navigate, Outlet } from "react-router-dom";
import authService from "../services/auth.service";
import React from "react";

const RequireAuth = ({ uloge }) => {
    const location = useLocation();
    const korisnik = authService.getCurrentUser();
    let uloga;
    console.log(korisnik);
    if (korisnik != null) {
         uloga = korisnik.ulogaKorisnika.nazivUloge;
    } else {
        uloga = null;
    }
    console.log(uloge);
    console.log(uloge.some(item => uloga === item));
    /*korisnik
            ? <Outlet />
            : <Navigate to="/prijava" state={{ from: location }} replace/>*/

    return (
        uloge.some(item => uloga === item)
            ? <Outlet />
            : korisnik
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/prijava" state={{ from: location }} replace/>
    );
}

export default RequireAuth;