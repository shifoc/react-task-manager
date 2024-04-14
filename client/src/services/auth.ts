export function isAuthenticated() {
    const isLogged = localStorage.getItem('user');
    return isLogged;
}
