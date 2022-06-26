import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from '../Constants/routes';
import FirebaseContext from "../Context/firebase";
import "../Assets/Style/Forms/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = emailAddress === "" || password === "";

  const handleEmailAndress = (event) => {
    setEmailAddress(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login • Instagram";
  }, []);

  return (
    <div className="login-wrapper">
      <div className="login-main-container">
        <div className="main-image-background"></div>
        <div className="holder-image-container">
          <div className="image-container"></div>
        </div>
        <div className="form-container">
          <form onSubmit={handleLogin} method="POST" className="login-form">
            <img
              src={require("../Assets/Images/logo.png")}
              alt="instagram"
              id="login-logo"
            />
            <div className="input-container">
              <input
                type="text"
                name="username"
                value={emailAddress}
                onChange={handleEmailAndress}
                required
              />
              <label htmlFor="username">Email</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                required
              />
              <label htmlFor="password">Password</label>
                <button disabled={isInvalid} type="submit">
                  Login
                </button>
              {error && <p className="error-message">{error}</p>}
            </div>
            <div className="line-container">
              <hr />
              <h6>OR</h6>
              <hr />
            </div>
            {/* <h5>
              <Link to={ROUTES.NEW_PASSWORD}>Forgot your password?</Link>
            </h5> */}
          </form>
          <div className="sign-up">
            <h5>
              you dont have account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
