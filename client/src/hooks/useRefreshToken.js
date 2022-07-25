import { useContext } from "react";
import { AuthContext } from "../context/authContext/Auth";
import axios from "../api/axios";

const useRefreshToken = () => {
    const { setAuth } = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get('auth/refreshToken', {
            withCredentials: true
        })

        const accessToken = response?.data?.accessToken;
        setAuth(prev => {
            return {
                ...prev,
                accessToken: accessToken
            }
        });

        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;