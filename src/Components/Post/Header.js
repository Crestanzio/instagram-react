import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as ROUTES from "../../Constants/routes";
import * as SVG from "../../Assets/Images/PostSvg";

const Header = ({ username }) => {
  return (
    <div className="top-post-menu">
      <div className="user-container">
        <Link to={`${ROUTES.DASHBOARD}${username}`}>
          <img
            src={`${ROUTES.RELATIVE_PATH}/images/avatars/${username}.jpg`}
            alt={`${username}`}
            className="post-user-icon"
          />
        </Link>
        <h5>{username}</h5>
      </div>
      <SVG.Options />
    </div>
  );
};

export default Header;

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
