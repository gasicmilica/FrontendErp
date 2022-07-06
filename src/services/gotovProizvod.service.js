import axios from "axios";
import authHeader from "./auth.header";

const base_url = "http://localhost:8080/";

const getAll = (pageNumber) => {
    console.log(pageNumber);
    return axios.get(base_url + `gotovproizvodpaging`, { headers: 
        {
            page: pageNumber
        },
    });
}

const get = id => {
    return axios.get(base_url + `gotovproizvod/${id}`);
}

const getByKategorijaPaging = (id, pageNumber, sortType) => {
    console.log(pageNumber);
    console.log(sortType);

    if(pageNumber== null){
        pageNumber = 0;
    }
    return axios.get(base_url + `gotovproizvodByKategorija/paging/${id}`, { headers: 
        {
            page: pageNumber,
            sort: sortType
        },
    });
}

const getByKategorija = kategorijaId => {
    return axios.get(base_url + `gotovproizvodByKategorija/${kategorijaId}`);
}

const deleteById = id => {
    return axios.delete(base_url + `gotovproizvod/${id}`, {headers:  authHeader() });
}

export default { getAll, getByKategorija, deleteById, get, getByKategorijaPaging };