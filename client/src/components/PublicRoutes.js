import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from "../context/authContext/Auth";
import useRefreshToken from '../hooks/useRefreshToken';


const  PublicRoutes=(props) =>{
  const { auth } = useContext(AuthContext);
  const refreshToken = useRefreshToken();

  // go to home page if already login
  const verifyRefreshToken = async () => {
      try {
          refreshToken();
      }
      catch (err) {
          console.error(err);
      }
  }
  
  if (!auth?.accessToken) {
      verifyRefreshToken();
  }

  return (
      <>
          {
              auth?.accessToken
                  ? <Outlet />
                  : <Navigate to="/login" />
          }
      </>
  )
}

export default PublicRoutes;