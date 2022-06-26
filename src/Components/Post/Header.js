import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ username }) => {
  return (
    <div className="top-post-menu">
      <div className="user-container">
        <Link to={`/${username}`}>
          <img
            src={`/images/avatars/${username}.jpg`}
            alt={`${username}`}
            className="post-user-icon"
          />
        </Link>
        <h5>{username}</h5>
      </div>
      <img
        src={require("../../Assets/Images/Svg/Posts/more-options.svg").default}
        alt=""
      />
    </div>
  );
};

export default Header;

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
