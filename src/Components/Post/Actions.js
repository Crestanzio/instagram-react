import PropTypes from "prop-types";
import { useContext, useState } from "react";
import FirebaseContext from "../../Context/firebase";
import UserContext from "../../Context/user";

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
            <img src={require("../../Assets/Images/Svg/Posts/like-inactive.svg").default}
              onClick={handleToggleLiked} alt="" id="actions-btn"
            />
          ) : (
            <img src={require("../../Assets/Images/Svg/Posts/like-active.svg").default}
              onClick={handleToggleLiked} alt="" id="actions-btn"
            />
          )}
          <img src={require("../../Assets/Images/Svg/Posts/comment.svg").default}
            onClick={handleFocus} alt="" id="actions-btn"
          />
          <img src={require("../../Assets/Images/Svg/Posts/share.svg").default}
            alt=""
          />
        </div>
        <img src={require("../../Assets/Images/Svg/Posts/save.svg").default}
          alt=""
        />
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
