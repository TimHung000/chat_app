import { useContext } from "react";
import { AuthContext } from "../context/authContext/Auth";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
const useLogout = () => {
    const { setAuth } = useContext(AuthContext);
    const nav = useNavigate();
    
    const logout = async () => {
        setAuth();
        try {
            axios('auth/logout', {
                withCredentials: true
            });
            nav("/login")
        } catch (err) {
            console.error(err);
        }
    }
    return logout;
}

export default useLogout;