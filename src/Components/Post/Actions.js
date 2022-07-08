import PropTypes from "prop-types";
import { useContext, useState } from "react";
import FirebaseContext from "../../Context/firebase";
import UserContext from "../../Context/user";
import * as SVG from "../../Assets/Images/PostSvg";

const Actions = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className="bottom-post-icons">
        <div className="bottom-icons-container">
          {!toggleLiked ? (
            <SVG.LikeInactive cursor="pointer" onClick={handleToggleLiked} />
          ) : (
            <SVG.LikeActive cursor="pointer" onClick={handleToggleLiked} />
          )}
          <SVG.Comment cursor="pointer" onClick={handleFocus} />
          <SVG.Share />
        </div>
        <SVG.Save />
      </div>
      <div className="likes-session">
        <h5>{likes === 1 ? `${likes} like` : `${likes} likes`}</h5>
      </div>
    </>
  );
};

export default Actions;

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
};
