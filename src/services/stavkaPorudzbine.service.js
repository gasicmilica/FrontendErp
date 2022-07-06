import httpClient from "../http-common";
import authHeader from "./auth.header";
import axios from "axios";

const base_url = "http://localhost:8080/"

const getAll = () => {
    return axios.get(base_url + "stavka", {headers: authHeader() });
}

const create = data => {
    return axios.post(base_url + "stavka", data, {headers: authHeader() });
}

const get = id => {
    return axios.get(base_url + `stavka/${id}`, {headers:  authHeader() });
}

const getByPorudzbina = porudzbinaId => {
    return axios.get(base_url + `stavkeUPorudbzini/${porudzbinaId}`, {headers:  authHeader() });
}

const getByPorudzbinaAndProizvod = (porudzbinaId, proizvodId) => {
    return axios.get(base_url + `stavkaByPorudzbinaIProizvod/${porudzbinaId}/${proizvodId}`, {headers:  authHeader() });
}

const update = data => {
    return axios.put(base_url + "stavka", data, {headers:  authHeader() });
}

const deleteById = id => {
    return axios.delete(base_url + `stavka/${id}`, {headers:  authHeader() });
}

export default { getAll, create, get, update, getByPorudzbina, getByPorudzbinaAndProizvod, deleteById };