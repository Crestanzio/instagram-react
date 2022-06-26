import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import AddComment from "./add-comment";

const Comments = ({ docId, comments: allComments, posted, commentInput }) => {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(3);

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };
  return (
    <>
      <div className="post-comments">
        {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.comment}-${item.displayName}`}>
            <Link to={`/${item.displayName}`}>
              <span className="post-comments-user">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        {comments.length >= 3 && commentsSlice < comments.length && (
          <p className="comments-view-more" onClick={showNextComments}>
            View more comments
          </p>
        )}
        <p>{formatDistance(posted, new Date())} ago</p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
};

export default Comments;

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
