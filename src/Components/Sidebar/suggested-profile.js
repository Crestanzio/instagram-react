import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../Services/firebase';
import { DEFAULT_IMAGE_PATH } from '../../Constants/paths';
import * as ROUTES from "../../Constants/routes";

const SuggestedProfile = ({profileDocId, username, profileId, userId, loggenInUserDocId}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggenInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
  }

  return ! followed ? (
    <div className="user-suggestion-wrapper">
      <div className="user-suggestion-container">
      <Link to={`${ROUTES.DASHBOARD}${username}`}>
        <img
          src={`${ROUTES.RELATIVE_PATH}/images/avatars/${username}.jpg`}
          className="suggestions-icon"
          alt={username}
          onError={(event) => {event.target.src = `${ROUTES.RELATIVE_PATH}${DEFAULT_IMAGE_PATH}`;}}
        />
        </Link>
        <div className="username-container">
          <h5>{username}</h5>
        </div>
      </div>
      <div className="user-suggestion-button">
        <button type="button" id="follow-button" onClick={handleFollowUser}>
          Follow
        </button>
      </div>
    </div>
  ) : null;
};

export default SuggestedProfile;

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggenInUserDocId: PropTypes.string.isRequired,

}