import axios from "axios";
import httpClient from "../http-common";
import authHeader from "./auth.header";

const getAll = () => {
    return httpClient.get('/kategorija');
}

const create = data => {
    return httpClient.post("/kategorija", data);
}

const get = id => {
    return axios.get(`http://localhost:8080/korisnik/${id}`, {headers:  authHeader() });
}

const update = data => {
    return axios.put('http://localhost:8080/korisnik', data , {headers:  authHeader() });
}

export default { getAll, create, get, update };