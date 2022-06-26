import { useContext } from "react";
import LoggedInUserContext from "../Context/logged-in-user";
import Post from "./Post/Post";
import usePhotos from "../Hooks/usePhotos";

const Timeline = () => {
  const { user } = useContext(LoggedInUserContext);
  // const { user: { following } = {} } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  return (
    <div className="post-wrapper">
      { photos ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : null}
    </div>
  );
};

export default Timeline;
