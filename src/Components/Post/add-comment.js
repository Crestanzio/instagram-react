import { useContext, useState } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../Context/firebase";
import UserContext from "../../Context/user";
import * as SVG from "../../Assets/Images/PostSvg";

const AddComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([...comments, { displayName, comment }]);
    setComment("");

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <form
      className="post-add-comment"
      method="POST"
      onSubmit={(event) =>
        comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault
      }
    >
      <SVG.Emoji />
      <input
        type="text"
        name="add-comment"
        placeholder="Add a comment..."
        autoComplete="off"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        ref={commentInput}
      />
      <button
        type="button"
        disabled={comment.length < 1}
        onClick={handleSubmitComment}
      >
        Post
      </button>
    </form>
  );
};

export default AddComment;

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};
