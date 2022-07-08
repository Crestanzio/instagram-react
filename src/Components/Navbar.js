import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from '../Constants/routes';
import FirebaseContext from "../Context/firebase";
import UserContext from "../Context/user";
import useUser from "../Hooks/useUser";
import { DEFAULT_IMAGE_PATH } from '../Constants/paths';
import * as SVG from "../Assets/Images/NavbarSvg";
import "../Assets/Style/Navbar.css";

const Navbar = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user: loggedInUser } = useContext(UserContext);
  const { user } =useUser(loggedInUser?.uid)

  const navigate = useNavigate();

  const handleSignOut = () => {
    firebase.auth().signOut();
    navigate(ROUTES.LOGIN);
  }

  return (
    <header>
      <nav>
        <div id="logo-wrapper">
          <img src={require("../Assets/Images/logo.png")} alt="instagram" id="nav-logo" onClick={() => navigate(ROUTES.DASHBOARD)} />
          </div>
          {loggedInUser ? ( 
          <>
            <div className="input-wrapper">
              <input type="text" name="search" id="search" placeholder="Search" autoComplete="off" required />
              <SVG.Search className="search-icon" />
            </div>
            <div className="icon-wrapper">
              <SVG.Home />
              <SVG.DirectMessage />
              <SVG.AddPost />
              <SVG.Exploration />
              <SVG.Flow />
              {user.username && (
                <Link to={`${ROUTES.DASHBOARD}${user.username}`}>
                <img src={`${ROUTES.RELATIVE_PATH}/images/avatars/${user.username}.jpg`}
                     alt={`${user.username} profile`} 
                     onError={(event) => {event.target.src = `${ROUTES.RELATIVE_PATH}${DEFAULT_IMAGE_PATH}`;}}
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
              <SVG.Search className="search-icon" />
            </div>
            <div className="button-wrapper">
            <Link to={ROUTES.LOGIN}><button className="btn-login">Login</button></Link>
            <Link to={ROUTES.SIGN_UP}><button className="btn-signup">SignUp</button></Link>
            </div>
          </>
          )}
      </nav>
    </header>
  );
};
export default Navbar;
