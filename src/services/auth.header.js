export default function authHeader() {
    const token = JSON.parse(sessionStorage.getItem('token'));
    const korisnik = localStorage.getItem('korisnik');

    if ( korisnik != null && token != null) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}