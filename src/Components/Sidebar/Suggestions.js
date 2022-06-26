import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getSuggestedProfiles } from "../../Services/firebase";
import SuggestedProfile from "./suggested-profile";

const Suggestions = ({ userId, following, loggenInUserDocId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    };
    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);

  return !profiles ? (
    <></>
  ) : profiles.length > 0 ? (
    <>
      {profiles.map((profile) => (
        <SuggestedProfile
          key={profile.docId}
          profileDocId={profile.docId}
          username={profile.username}
          profileId={profile.userId}
          userId={userId}
          loggenInUserDocId={loggenInUserDocId}
           />
      ))}
    </>
  ) : null;
};

export default Suggestions;

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggenInUserDocId: PropTypes.string
};
