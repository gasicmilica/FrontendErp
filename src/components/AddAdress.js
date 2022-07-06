import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import adresaService from "../services/adresa.service";
import { useEffect } from "react";
import React from 'react';

const AddAdress = () => {
    const[grad, setGrad] = useState('');
    const[ulica, setUlica] = useState('');
    const[broj, setBroj] = useState('');
    const[postanskiBroj, setPostanskiBroj] = useState('');
    let {adresaId} = useParams();
    let adresa = localStorage.getItem("adresa");
    console.log(adresa);
    if(adresa != null) {
        adresa = JSON.parse(adresa);
        adresaId = adresa.adresaId;
    }

    const saveAddress = (e) => {
        e.preventDefault();
        
        const address = {grad, ulica, broj, postanskiBroj, adresaId};
        if (adresaId) {
            adresaService.update(address)
                .then(response => {
                    localStorage.setItem("adresa", JSON.stringify(response.data));
                    console.log("localstorage" + JSON.parse(localStorage.getItem("adresa")));
                    console.log('Address data updated successfully', response.data);
                })
                .catch(error => {
                    console.log('Something went wrong with update', error);
                }) 
        } else {
            adresaService.create(address)
            .then(response => {
                localStorage.setItem("adresa", JSON.stringify(response.data));
                console.log("localstorage" + localStorage.getItem("adresa"));
                console.log("Address added successfully", response.data);
            })
            .catch(error => {
                console.log('Something went wrong with post method', error);
            })
        }
    }
    useEffect(() => {
        console.log(adresaId);
        if (adresaId) {
            console.log('Use effect if');
            adresaService.get(adresaId)
                .then(address => {
                    setGrad(address.data.grad);
                    setUlica(address.data.ulica);
                    setBroj(address.data.broj);
                    setPostanskiBroj(address.data.postanskiBroj);
                    console.log(address);
                })
                .catch(error => {
                    console.log('Something went wrong with get by id', error);
                })
        }
    }, [])
    return(
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
                    <button onClick={(e) => saveAddress(e)} className="btn btn-primary">Sacuvaj</button>
                </div>
            </form>
        </div>
    )
}

export default AddAdress;