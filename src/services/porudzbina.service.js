import httpClient from "../http-common";
import authHeader from "./auth.header";
import axios from "axios";

const base_url = "http://localhost:8080/"

const getAll = () => {
    return axios.get(base_url + "porudzbina", {headers: authHeader() });
}

const create = data => {
    return axios.post(base_url + "porudzbina", data, {headers: authHeader() });
}

const get = id => {
    return axios.get(base_url + `porudzbina/${id}`, {headers:  authHeader() });
}

const getByStatus = status => {
    return axios.get(base_url + `porudzbinaByStatus/${status}`, {headers:  authHeader() });
}

const getByUserAndStatus = (korisnikId, status) => {
    return axios.get(base_url + `porudzbinaByStatusIKorisnik/${korisnikId}/${status}`, {headers:  authHeader() });
}

const update = data => {
    return axios.put(base_url + "porudzbina", data, {headers: authHeader() });
}

export default { getAll, create, get, update, getByUserAndStatus, getByStatus };