import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";


// custom Hook che redirige su Login
export const useLogout = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Esegui il logout
        localStorage.removeItem('current_token');
        // Redirigi alla pagina di login
        navigate('/');
    };

    return handleLogout;

}