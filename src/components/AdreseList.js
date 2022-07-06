import { useEffect, useState } from 'react';
import adresaService from '../services/adresa.service';
import { Link } from "react-router-dom";
import React from 'react';

const AdreseList = () => {
    
  const [adrese, setAdrese] = useState([]);

  useEffect(() => {
    adresaService.getAll()
      .then(response => {
        console.log('Printing adrese data', response.data);
        setAdrese(response.data);
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })    
  }, []);

  return ( 
    <div className='container'>
    <h3>Lista svih adresa</h3>
    <hr/>
    <div>    
      <Link to="/add" className="btn btn-primary mb-2">Dodaj adresu</Link> 
      <table className="table table-bordered table-striped">
      <thead className="thead-dark">
        <tr>
          <th>Grad</th>
          <th>Ulica</th>
          <th>Broj</th>
          <th>Postanski broj</th>
        </tr>
      </thead>
      <tbody>
        {
          adrese.map(adresa => (
            <tr key={adresa.adresa_id}>
              <td>{adresa.grad}</td>
              <td>{adresa.ulica}</td>
              <td>{adresa.broj}</td>
              <td>{adresa.postanskiBroj}</td>
              <td>
                  <Link className="btn btn-info" to={`/adresa/edit/${adresa.adresaId}`}>Update</Link>
              </td>
            </tr>
          ))
        }
      </tbody>
      </table>
    </div>
  </div>
  );
}

export default AdreseList;