import { jwtDecode, JwtPayload } from 'jwt-decode';

export function isAuthenticated() {
    // Retrieve the 'user' object from local storage.
    const user = localStorage.getItem('user');
    if (!user) return false;

    // Retrieve the 'token' from the 'user' object.
    const { token } = JSON.parse(user);
    if (!token) return false;

    // Decode the token and check if it has expired.
    const decodedToken = jwtDecode<JwtPayload>(token);
    let currentDate = new Date();

    if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
        return false;
    } else {
        return true;
    }
}
