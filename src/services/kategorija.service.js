import axios from "axios";
import httpClient from "../http-common";
import authHeader from "./auth.header";

const base_url = "http://localhost:8080/";

const getAll = () => {
    return axios.get(base_url + "kategorija", {headers: authHeader() });
}

const create = data => {
    return httpClient.post("/kategorija", data);
}

const get = id => {
    return httpClient.get(`/kategorija/${id}`);
}

const update = data => {
    return httpClient.put('/kategorija', data);
}

export default { getAll, create, get, update };