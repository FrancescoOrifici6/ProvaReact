import { setLoggedUser } from "../store/slices/userSlice";

export const logout = () => {
    localStorage.removeItem('current_token');
}