import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/user";
import useUser from "../../Hooks/useUser";
import { isUserFollowingProfile, toggleFollow } from "../../Services/firebase";
import { DEFAULT_IMAGE_PATH } from '../../Constants/paths';
import * as ROUTES from "../../Constants/routes";

const Header = ({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    username: profileUsername,
    fullName,
    followers = [],
    following = [],
  },
}) => {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user?.username && user?.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };

    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);

  return (
    <section className="profile-wrapper">
      <div className="profile-icon-container">
        {profileUsername && (
          <img
            src={`${ROUTES.RELATIVE_PATH}/images/avatars/${profileUsername}.jpg`}
            onError={(event) => {event.target.src = `${ROUTES.RELATIVE_PATH}${DEFAULT_IMAGE_PATH}`;}}
            alt={fullName}
            className="profile-icon"
          />
        )}
      </div>
      <div className="bio-section-container">
        <div className="bio-username-container">
          <h5>{profileUsername}</h5>
          {activeBtnFollow && (
            <button type="button" onClick={handleToggleFollow} >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="activity-container">
          <h5>{photosCount} Posts</h5>
          <h5>
            {followerCount} {followerCount === 1 ? `Follower` : `Followers`}
          </h5>
          <h5>{following.length} Following</h5>
        </div>
        <div className="bio-container">
          <h5>{fullName}</h5>
        </div>
      </div>
    </section>
  );
};

export default Header;

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
  }).isRequired,
};
