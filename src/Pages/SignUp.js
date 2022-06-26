import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../Constants/routes";
import FirebaseContext from "../Context/firebase";
import "../Assets/Style/Forms/SignUp.css";
import { doesUsernameExist } from "../Services/firebase";

const SignUp = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid =
    username === "" ||
    fullName === "" ||
    emailAddress === "" ||
    password === "";

  const handleUserName = (event) => {
    setUsername(event.target.value);
  };
  const handleFullName = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailAndress = (event) => {
    setEmailAddress(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        await createdUserResult.user.updateProfile({
          displayName: username,
        });
        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName: fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });
        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        setUsername("");
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUsername("");
      setError('That username is already exist! please try again');
    }
  };

  useEffect(() => {
    document.title = "Signup • Instagram";
  }, []);

  return (
    <div className="signup-wrapper">
      <div className="signup-main-container">
        <div className="form-container">
          <form onSubmit={handleSignUp} method="POST">
            <img
              src={require("../Assets/Images/logo.png")}
              alt="instagram"
              id="signup-logo"
            />
            <div className="input-container">
              <input
                type="text"
                name="username"
                placeholder="Username"
                // autoComplete="off"
                value={username}
                onChange={handleUserName}
                required
              />
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={fullName}
                onChange={handleFullName}
                required
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={emailAddress}
                onChange={handleEmailAndress}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                required
              />
              <button disabled={isInvalid} type="submit">
                Sign Up
              </button>
              {error && <p className="error-message">{error}</p>}
            </div>
          </form>
          <div className="redirect-login-box">
            <h5>Have an account? <Link to={ROUTES.LOGIN}>Login</Link></h5>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
