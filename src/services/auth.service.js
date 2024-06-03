export const logout = () => {
    localStorage.removeItem('current_token');
}