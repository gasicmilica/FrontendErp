import axios from "axios";

const base_url = "http://localhost:8080/";
const korisnikovToken = JSON.parse(sessionStorage.getItem('token'));

const post = (cena, token) => {
    console.log(cena);
    console.log(token.id);
    return axios.post(base_url + "payment/charge", "", { headers: 
        {
            token: token.id,
            amount: cena,
            Authorization: `Bearer ${korisnikovToken}`
        },
    });
}

export default { post };