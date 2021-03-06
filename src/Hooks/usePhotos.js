import { useEffect, useState } from "react";
import { getPhotos } from "../Services/firebase";

const usePhotos = (user) => {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      if (user?.following?.length > 0) {
          const followedUserPhotos = await getPhotos(user.userId, user.following);
            followedUserPhotos.sort((a,b) => b.dateCreated - a.dateCreated)
        setPhotos(followedUserPhotos);
        }
    }
    getTimelinePhotos();

  }, [user?.userId, user?.following]);

  return { photos };
};

export default usePhotos;
