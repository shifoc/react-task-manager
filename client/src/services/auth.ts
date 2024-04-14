export function isAuthenticated() {
    const isLogged = localStorage.getItem('user');

    if (isLogged) return true;

    return false;
}