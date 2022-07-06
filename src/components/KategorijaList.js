import { useEffect, useState } from 'react';
import kategorijaService from '../services/kategorija.service';
import { Link } from "react-router-dom";
import React from 'react';

const KategorijaList = () => {
    
  const [kategorije, setKategorije]= useState([]);

  useEffect(() => {
    kategorijaService.getAll()
      .then(response => {
        console.log('Printing kategorija data', response.data);
        setKategorije(response.data);
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })    
  }, []);

  return ( 
    <div className='container'>
    <h3>Lista svih kategorija</h3>
    <hr/>
    <div>
      <table className="table table-bordered table-striped">
      <thead className="thead-dark">
        <tr>
          <th>Naziv</th>
        </tr>
      </thead>
      <tbody>
        {
          kategorije.map(kategorija => (
            <tr key={kategorija.kategorijaId}>
              <td>{kategorija.nazivKategorije}</td>
            </tr>
          ))
        }
      </tbody>
      </table>
    </div>
  </div>
  );
}

export default KategorijaList;