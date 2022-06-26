import { useEffect } from "react";
import PropTypes from "prop-types";
import Navbar from "../Components/Navbar";
import Timeline from "../Components/Timeline";
import Sidebar from "../Components/Sidebar/Sidebar";
import useUser from "../Hooks/useUser";
import LoggedInUserContext from "../Context/logged-in-user";
import "../Assets/Style/Dashboard/Post.css";

const Dashboard = ({ user: loggedInUser }) => {
  const { user, setActiveUser } = useUser(loggedInUser.uid);

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <>
       <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
        <Navbar />
        <div className="dashboard-wrapper">
          <Timeline />
          <Sidebar />
        </div>
      </LoggedInUserContext.Provider>
      </>
  );
};
export default Dashboard;

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};


// email: k.xrhstos_test@gmail.com
// FullName: Chris
// username: xristos_karagiorgos