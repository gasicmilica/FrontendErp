import httpClient from "../http-common";

const signup = data => {
    return httpClient.post("/signup", data);
}

const signin = data => {
    return httpClient.post("/signin", data).then(response => {
        if(response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
    })
}

const get = id => {
    return httpClient.get(`/korisnik/${id}`);
}

export default { signup, signin, get };