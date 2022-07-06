import axios from "axios";
import httpClient from "../http-common";

const signup = data => {
    return httpClient.post("/signup", data);
}

const signin = data => {
    return axios.post("http://localhost:8080/signin", data);
}

const logout = () => {
    console.log(localStorage.getItem('korisnik'));
    localStorage.removeItem('korisnik');
    sessionStorage.removeItem('token');
    localStorage.removeItem("porudzbina");
    console.log(localStorage.getItem('korisnik'));
    console.log(localStorage.getItem('porudzbina'));
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('korisnik'));;
}

export default { signup, signin, logout, getCurrentUser };