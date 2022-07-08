import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import { getUserPhotosByUsername, } from "../../Services/firebase";
import Header from "./Header";
import Photos from "./Photos";


const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    };
    getProfileInfoAndPhotos();
  }, [user]);

  return (
    <>
      <Header user={user}
              photosCount={photosCollection ? photosCollection.length : 0}
              profile={profile}
              followerCount={followerCount}
              setFollowerCount={dispatch} />
              
      <Photos photos={photosCollection} />
    </>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired
};
