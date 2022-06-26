import "../Assets/Style/Profile.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserByUserName } from "../Services/firebase";
import * as ROUTES from '../Constants/routes';
import Navbar from "../Components/Navbar";
import UserProfile from '../Components/Profile/UserProfile';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserExists = async () => {
      const [user] = await getUserByUserName(username);
      if (user?.userId) {
        setUser(user);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, navigate])

  return user?.username ? (
    <>
      <Navbar />
      <UserProfile user={user} />
    </>
  ) : null;
};

export default Profile;
