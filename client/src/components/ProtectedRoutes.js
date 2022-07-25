import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { AuthContext } from "../context/authContext/Auth";

const ProtectedRoutes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useContext(AuthContext);
    const refreshToken = useRefreshToken();
    const location = useLocation();

    // go to login if refreshToken is expired or null
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refreshToken();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        }

        if (!auth?.accessToken) {
            verifyRefreshToken();

        } else {
            setIsLoading(false);
        }

    },[auth, refreshToken])

    return (
        <>
            {
                isLoading
                    ? <p>Loading</p>
                    : auth?.accessToken
                        ? <Outlet />
                        : <Navigate to="/login" replace={true} state={{from: location}} />
            }
        </>
    )

}

export default ProtectedRoutes;