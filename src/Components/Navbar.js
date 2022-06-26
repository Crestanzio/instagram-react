import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from '../Constants/routes';
import FirebaseContext from "../Context/firebase";
import UserContext from "../Context/user";
import useUser from "../Hooks/useUser";
import { DEFAULT_IMAGE_PATH } from '../Constants/paths';
import "../Assets/Style/Navbar.css";

const Navbar = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user: loggedInUser } = useContext(UserContext);
  const { user } =useUser(loggedInUser?.uid)

  const navigate = useNavigate();
  // console.log(user)

  const handleSignOut = () => {
    firebase.auth().signOut();
    navigate(ROUTES.LOGIN);
  }

  return (
    <header>
      <nav>
        <Link to={ROUTES.DASHBOARD}>
          <img src={require("../Assets/Images/logo.png")} alt="instagram" id="nav-logo" />
        </Link>
        <div className="items-wrapper">
          {loggedInUser ? ( 
          <>
            <div className="input-wrapper">
              <input type="text" name="search" id="search" placeholder="Search" autoComplete="off" required />
              <img src={require("../Assets/Images/Svg/Navbar/search.svg").default} className="search-icon" alt=""/>
            </div>
            <div className="icon-wrapper">
              <img src={require("../Assets/Images/Svg/Navbar/home-inactive.svg").default} alt="" />
              <img src={require("../Assets/Images/Svg/Navbar/direct-message-inactive.svg").default} alt="" />
              <img src={require("../Assets/Images/Svg/Navbar/add-post-inactive.svg").default} alt="" />
              <img src={require("../Assets/Images/Svg/Navbar/exploration-inactive.svg").default} alt="" />
              <img src={require("../Assets/Images/Svg/Navbar/activity-flow-inactive.svg").default} alt="" />
              {user.username && (
                <Link to={`/${user.username}`}>
                <img src={`/images/avatars/${user.username}.jpg`}
                     alt={`${user.username} profile`} 
                     onError={(event) => {event.target.src = DEFAULT_IMAGE_PATH;}}
                     className="icon-profile"
                     />
              </Link>
              )}
              <button type="button" onClick={handleSignOut}>Logout</button>
            </div>
          </>
          ) : (
          <>
            <div className="input-wrapper">
              <input type="text" name="search" id="search" placeholder="Search" autoComplete="off" required />
              <img src={require("../Assets/Images/Svg/Navbar/search.svg").default} className="search-icon" alt=""/>
            </div>
            <div className="button-wrapper">
            <Link to={ROUTES.LOGIN}><button className="btn-login">Login</button></Link>
            <Link to={ROUTES.SIGN_UP}><button className="btn-signup">SignUp</button></Link>
            </div>
          </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
