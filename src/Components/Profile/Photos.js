import PropTypes from "prop-types";
import * as ROUTES from "../../Constants/routes";
import * as SVG from "../../Assets/Images/PostSvg";


const Photos = ({ photos }) => {

  return (
    <section className="profile-posts-container">
      <div className="profile-posts">
        {!photos ? (
          <></>
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.docId} className="post-image-container">
              <img src={`${ROUTES.RELATIVE_PATH}${photo.imageSrc}`} alt={photo.caption} id="posts" />
              <div className="post-info-container">
              <div className="post-info">
                <p>
                  <SVG.LikeLength />
                  {photo.likes.length}
                </p>
                <p>
                  <SVG.CommentLength />
                  {photo.comments.length}
              </p>
              </div>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </section>
  );
};

export default Photos;

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};
