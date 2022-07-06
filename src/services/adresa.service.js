import httpClient from "../http-common";
import axios from "axios";
import authHeader from "./auth.header";

const base_url = "http://localhost:8080/";

const getAll = () => {
    return axios.get(base_url + "adrese", {headers: authHeader() });
}

const create = data => {
    return axios.post(base_url + "adrese", data, {headers: authHeader() });
}

const get = id => {
    return axios.get(base_url + `adresa/${id}`, {headers: authHeader() });
}

const update = data => {
    return axios.put(base_url + "adrese", data, {headers: authHeader() });
}

export default { getAll, create, get, update };