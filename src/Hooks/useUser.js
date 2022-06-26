import { useEffect, useState } from "react";
import { getUserByUserId } from "../Services/firebase";

const useUser = (userId) => {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    const getUserObjByUserId = async (userId) => {
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
      // console.log(user)
    };

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);
  return { user: activeUser, setActiveUser };
};

export default useUser;