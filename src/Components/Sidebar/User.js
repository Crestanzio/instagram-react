import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { DEFAULT_IMAGE_PATH } from '../../Constants/paths'

const User = ({ username, fullName }) => {
  return !username || !fullName ? (
    <></>
  ) : (
    <>
      <div className="user-suggestion-wrapper">
        <div className="user-suggestion-container">
          <Link to={`/${username}`}>
            <img
              src={`/images/avatars/${username}.jpg`}
              className="suggestions-main-user-icon"
              alt={username}
              onError={(event) => {event.target.src = DEFAULT_IMAGE_PATH;}}
            />
          </Link>
          <div className="username-container">
            <h5>{username}</h5>
            <h5>{fullName}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(User);

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
