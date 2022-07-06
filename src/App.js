import './App.css';
import NotFound from './components/NotFound';
import AdreseList from './components/AdreseList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddAdress from './components/AddAdress';
import Navbar from './navigation/Navbar'
import GotovProizvodList from './components/GotovProizvodList';
import KategorijaList from './components/KategorijaList';
import "@popperjs/core";
import "bootstrap";
import React from 'react';
import Registracija from './components/Registracija';
import Prijava from './components/Prijava';
import ProfilKorisnika from './components/ProfilKorisnika';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import Korpa from './components/Korpa';
import Porudzbina from './components/Porudzbina';
import ProizvodAdmin from './components/ProizvodAdmin';

const App = () => {

  return (
    <Router>
        <Routes>
          <Route element={<RequireAuth uloge={["ROLE_KUPAC", "ROLE_ADMIN", "ROLE_ZAPOSLENI"]} />}>
            <Route exact path="/profil" element={[<Navbar/>,<ProfilKorisnika/>]} />
          </Route>

          <Route element={<RequireAuth uloge={["ROLE_KUPAC"]} />}>
            <Route exact path="/korpa" element={[<Navbar/>,<Korpa/>]} />
          </Route>

          <Route element={<RequireAuth uloge={["ROLE_ADMIN", "ROLE_ZAPOSLENI"]} />}>
            <Route exact path="/porudzbina" element={[<Navbar/>, <Porudzbina/>]} />
          </Route>

          <Route element={<RequireAuth uloge={["ROLE_ADMIN"]} />}>
            <Route exact path="/izmenaProizvoda" element={[<Navbar/>, <ProizvodAdmin/>]} />
          </Route>

          <Route exact path="/gotov/:kategorijaId" element={[<Navbar/>,<GotovProizvodList/>]} />

          <Route exact path="/unauthorized" element={[<Navbar/>, <Unauthorized/>]} />
          <Route exact path="/registracija" element={[<Navbar/>, <Registracija/>]}/>
          <Route path="/prijava" element={[<Navbar/>,<Prijava/>]}/>
          <Route path="*" element={[<Navbar/>,<NotFound/>]}/>

          <Route exact path="/" element={[<Navbar/>,<AdreseList/>]} />
          <Route path="/adresa/edit/:adresaId" element={<AddAdress/>} />
          <Route exact path="/kategorija" element={<KategorijaList/>} />  
         
        </Routes>
    </Router>
  );
}

export default App;
