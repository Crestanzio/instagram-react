import PropTypes from "prop-types";

const Photos = ({ photos }) => {

  return (
    <section className="profile-posts-container">
      <div className="profile-posts">
        {!photos ? (
          <></>
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.docId} className="post-image-container">
              <img src={photo.imageSrc} alt={photo.caption} id="posts" />
              <div className="post-info-container">
              <div className="post-info">
                <p>
                  <img src={require("../../Assets/Images/Svg/Posts/likes-length.svg").default} alt=""/>
                  {photo.likes.length}
                </p>
                <p>
                  <img src={require("../../Assets/Images/Svg/Posts/comment-length.svg").default} alt=""/>
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
