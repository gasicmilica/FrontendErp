/*import React, { useState } from "react";
import gotovProizvodService from "../services/gotovProizvod.service";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import kategorijaService from "../services/kategorija.service";

const ProizvodAdmin = () => {

    let proizvod = JSON.parse(localStorage.getItem("proizvodZaIzmenu"));
    let proizvodId = useParams('');

    if (proizvod != null) {
        proizvodId = proizvod.proizvodId;
        //kategorija = proizvod.kategorijaId.nazivKategorije;
    }
    const [cena, setCena] = useState('');
    const [naziv, setNaziv] = useState('');
    const [opis, setOpis] = useState('');
    const [naStanju, setNaStanju] = useState('');
    const [slika, setSlika] = useState('');
    const [kategorija, setKategorija] = useState('');
    const [kategorijaId, setKategorijad] = useState();

    const [opcije, setOpcije] = useState([]);

    const getKategorije = () => {
        console.log("getKaterogije")
        kategorijaService.getAll()
        .then(response => {
            setOpcije(response.data);
            console.log('Get successfully', response.data);
        })
        .catch(error => { console.log(proizvod);
            console.log('Something went wrong with update', error);
        }) 
    }

    const getIzabranaKategorija = () => {
        console.log("sacuvaaaaaaj")
        opcije.map((kategorijaUListi) => {
            if(kategorijaUListi == kategorija) {
                setKategorijad(kategorijaUListi);
                setKategorija(kategorijaUListi.nazivKategorije);
            }
        })
        console.log(kategorijaId);
        console.log(kategorija);
    }
    const sacuvajProizvod = () => {
        //e.preventDefault();
        const proizvod = {cena, naziv, opis, naStanju, proizvodId, kategorijaId};
        console.log(kategorija);

        opcije.map((kategorijaUListi) => {
            if(kategorija == kategorijaUListi) {
                console.log("Helo")
                proizvod.kategorijaId=kategorijaUListi
                setKategorijad(kategorijaUListi);
                setKategorija(kategorijaUListi.nazivKategorije);
            }
        })
        console.log(kategorijaId);
        console.log(kategorija);

        console.log(proizvod);
        if (proizvodId) {
            gotovProizvodService.update(proizvod)
                .then(response => {
                    console.log('Updated successfully', response.data);
                })
                .catch(error => {
                    console.log('Something went wrong with update', error);
                }) 
        } else {
            gotovProizvodService.create(proizvod)
            .then(response => {
                console.log("Address added successfully", response.data);
            })
            .catch(error => {
                console.log('Something went wrong with post method', error);
            })
        }
    }

    useEffect(() => {
        getKategorije();
        //sacuvaj();

        if (proizvodId != null) {
            gotovProizvodService.get(proizvodId)
                .then(proizvod => {
                    setCena(proizvod.data.cena);
                    setNaziv(proizvod.data.naziv);
                    setNaStanju(proizvod.data.naStanju);
                    setOpis(proizvod.data.opis);
                    setSlika(proizvod.data.slika);
                    setKategorija(proizvod.data.kategorijaId.nazivKategorije);
                    setKategorijad(proizvod.data.kategorijaId);

                    console.log(proizvod);
                })
                .catch(error => {
                    console.log('Something went wrong with get by id', error);
                })
        }
    }, [])

    return (
        <div className="container">
                <h5>{"Podaci o proizvodu: "}</h5> 
                <form>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control col-4"
                            id="naziv"
                            value={naziv}
                            onChange={(e) => setNaziv(e.target.value)}
                            placeholder="Naziv proizvoda"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control col-4"
                            id="kategorija"
                            value={kategorija}
                            onChange={(e) => setKategorija(e.target.value)}
                            placeholder="Kategorija proizvoda"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control col-4"
                            id="opis"
                            value={opis}
                            onChange={(e) => setOpis(e.target.value)}
                            placeholder="Opis proizvoda"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control col-4"
                            id="naStanju"
                            value={naStanju}
                            onChange={(e) => setNaStanju(e.target.value)}
                            placeholder="Stanje proizvoda"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control col-4"
                            id="cena"
                            value={cena}
                            onChange={(e) => setCena(e.target.value)}
                            placeholder="Cena"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control col-4"
                            id="slika"
                            value={slika}
                            onChange={(e) => setSlika(e.target.value)}
                            placeholder="Slika"
                        />
                    </div>
                    <div>
                     <button className="btn" type="submit" onClick={sacuvajProizvod()}>Izmena</button>            
                    </div>
                </form>
            </div>
    )
}

export default ProizvodAdmin;*/