import "./login.css"
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/Auth";
import axios from "../../api/axios";


const Login = () => {

  const email = useRef();
  const password = useRef();
  const errRef = useRef();

  // after login save the accessToken in memeory
  const { auth, setAuth } = useContext(AuthContext);

  // login fail message
  const [errMsg, setErrMsg] = useState('');

  // go back to the prev page after login
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.accessToken) {
      navigate("/");
    }
  }, [auth, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "auth/login",
        JSON.stringify({ "email": email.current.value, "password": password.current.value }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      )

      const accessToken = response?.data?.accessToken;

      if (accessToken) {
        setAuth((prev) => ({
          ...prev,
          accessToken: accessToken
        }));
      }

    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response")
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password")
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="login">
      <div className="loginMain">
        <div className="loginMainContainer">
          <div className="loginWrapper">
            <h1 className="loginTitle">CHATAPP</h1>
            <form className="loginForm" onSubmit={handleSubmit}>
              <input
                placeholder="Email addresss"
                type="email"
                required
                ref={email}
              />
              <input
                placeholder="Password"
                type="password"
                required
                ref={password}
              />
              <p ref={errRef} className={errMsg ? "loginErrorMsg" : "hide"}>{errMsg}</p>

              <button type="submit">
                Login
              </button>
            </form>
            {/* <div className="wordBetweenHorizontalLine">
              <span>or try another login method</span>

            </div>

            <button>still developing</button> */}
            <Link to="/register" className="link-style">
              register
            </Link>
            <Link to="/forgotAuth" className="link-style">
              Forgot your email or password?
            </Link>
          </div>

        </div>
      </div>
      <div className="loginFooter">
        <div className="loginFooterContainer">
          <div className="license">CHATAPP Corporation</div>
          <div className="term">
            <Link to="" className="link-style">Privacy Policy</Link>
            <Link to="" className="link-style">Terms and Conditions of Use</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;