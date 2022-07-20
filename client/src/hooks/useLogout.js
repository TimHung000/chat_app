import { useContext } from "react";
import { AuthContext } from "../context/authContext/Auth";
import axios from "../api/axios";
const useLogout = () => {
    const { setAuth } = useContext(AuthContext);
    
    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('auth/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;