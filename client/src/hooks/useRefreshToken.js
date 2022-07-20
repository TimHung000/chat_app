import { useContext } from "react";
import { AuthContext } from "../context/authContext/Auth";
import axios from "../api/axios";

const useRefreshToken = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get('auth/refreshToken', {
            withCredentials: true
        })

        const accessToken = response?.data?.accessToken;
        setAuth(prev => {
            // console.log(`prev auth : ${JSON.stringify(prev)}`)
            // console.log(response.data.accessToken)
            return {
                ...prev,
                accessToken: response.data.accessToken
            }
        });

        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;