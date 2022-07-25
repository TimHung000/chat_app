import "./register.css";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";


const USER_REGEX = /^[a-zA-Z][\w]{3,23}/;
const PWD_REGEX = /^[a-zA-Z][\w]{3,23}/;
const MAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGiSTER_URL = 'auth/register';

export default function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [mail, setMail] = useState('');
  const [validMail, setValidMail] = useState('');
  const [mailFocus, setMailFocus] = useState('');

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = matchPwd ? pwd === matchPwd : false;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = MAIL_REGEX.test(mail);
    console.log(result);
    console.log(mail);
    setValidMail(result);
  }, [mail]);


  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd, mail])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCheck = USER_REGEX.test(user);
    const pwdCheck = PWD_REGEX.test(pwd);
    const mailCheck = MAIL_REGEX.test(mail);
    if (!userCheck || !pwdCheck || !mailCheck) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGiSTER_URL,
        JSON.stringify({ username: user, email: mail, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredential: true
        }
      )
      console.log(response?.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);

      setUser('');
      setMail('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username/E-mail Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }

  };


  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Lamasocial</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="registerRight">
          {success ? (
            <div className="registerBox">
                <h1 className="registerBoxName">Success</h1>
                <p>
                  <Link to="/login">Login</Link>
                </p>
            </div>
          ) : (
            <div className="registerBox">

              <h1 className="registerBoxName">Register</h1>

              <p ref={errRef} className={errMsg ? "registerErrorMsg" : "hide"}>{errMsg}</p>

              <form className="registerForm" onSubmit={handleSubmit}>

                <label htmlFor="username" className="registerLabel">
                  <span className="registerLabelName">Username:</span>
                </label>
                <div className="registerInputBox">
                  <input
                    type="text"
                    id="username"
                    className="registerInput"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                  <span className={`registerInputIcon ${!validName ? 'hide' : ''}`}>
                    <CheckIcon color="success" />
                  </span>
                  <span className={`registerInputIcon ${validName || !user ? 'hide' : ''}`}>
                    <ClearIcon color="error" />
                  </span>
                </div>
                <p className={`errorMsg ${!userFocus || !user || validName ? 'hide' : ''}`}>
                  4 to 24 characters.<br />
                  Must begin with a letter.<br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="mail" className="registerLabel">
                  <span className="registerLabelName">E-mail:</span>
                </label>
                <div className="registerInputBox">
                  <input
                    type="email"
                    id="mail"
                    className="registerInput"
                    autoComplete="off"
                    onChange={(e) => setMail(e.target.value)}
                    value={mail}
                    required
                    onFocus={() => setMailFocus(true)}
                    onBlur={() => setMailFocus(false)}
                  />
                  <span className={`registerInputIcon ${!validMail ? 'hide' : ''}`}>
                    <CheckIcon color="success" />
                  </span>
                  <span className={`registerInputIcon ${validMail || !mail ? 'hide' : ''}`}>
                    <ClearIcon color="error" />
                  </span>
                </div>
                <p className={`errorMsg ${!mailFocus || !mail || validMail ? 'hide' : ''}`}>
                  format : email@domain.com
                </p>


                <label htmlFor="password" className="registerLabel">
                  <span className="registerLabelName">Password:</span>
                </label>
                <div className="registerInputBox">
                  <input
                    type="password"
                    id="password"
                    className="registerInput"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <span className={`registerInputIcon ${!validPwd ? 'hide' : ''}`}>
                    <CheckIcon color="success" />
                  </span>
                  <span className={`registerInputIcon ${validPwd || !pwd ? 'hide' : ''}`}>
                    <ClearIcon color="error" />
                  </span>
                </div>
                <p className={`errorMsg ${!pwdFocus || !pwd || validPwd ? 'hide' : ''}`}>
                  4 to 24 characters.<br />
                  Must begin with a letter.<br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>


                <label htmlFor="confirmPwd" className="registerLabel">
                  <span className="registerLabelName">Confirm Password:</span>
                </label>
                <div className="registerInputBox">
                  <input
                    type="password"
                    id="confirmPwd"
                    className="registerInput"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <span className={`registerInputIcon ${!validMatch ? 'hide' : ''}`}>
                    <CheckIcon color="success" />
                  </span>
                  <span className={`registerInputIcon ${validMatch || !matchPwd ? 'hide' : ''}`}>
                    <ClearIcon color="error" />
                  </span>
                </div>
                <p className={`errorMsg ${!matchFocus || !matchPwd || validMatch ? 'hide' : ''}`}>
                  Must match the first password input field.
                </p>

                <button className="registerButton"
                  type="submit" disabled={!validName || !validMail
                    || !validPwd || !validMatch
                    ? true : false}>
                  Sign Up
                </button>
              </form>
              <p className="registerBoxBottom">
                Already registered?<br />
                <span className="Line">
                  <Link to="/login">Sign In</Link>
                </span>
              </p>
            </div>
          )}
        </div>
        <div className="registerFooter">
          <div className="footerLanguageChoice">
            <ul className="footerUl">
              <li>English(Us)</li>
              <li>中文(台灣)</li>
            </ul>
          </div>
          <hr className="footerHr" />
          <div className="footerOthers">
            <ul className="footerUl">
              <li>Terms</li>
            </ul>
          </div>
          <hr className="footerHr" />
          <div className="footerCompany">
            <p>Tim 2022</p>
          </div>
        </div>
      </div >
    </div >
  );
}
