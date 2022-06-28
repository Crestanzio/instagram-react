import User from "./User";
import Suggestions from "./Suggestions";
import "../../Assets/Style/Dashboard/Sidebar.css";
import { useContext } from "react";
import LoggedInUserContext from "../../Context/logged-in-user";

const Sidebar = () => {
  const { user: { docId = '', fullName, username, userId, following } = {} } = useContext(LoggedInUserContext);

  return (
      <section className="suggestions-container">
        <User username={username} fullName={fullName} />
        <Suggestions userId={userId} following={following} loggenInUserDocId={docId} />
      </section>
  );
};

export default Sidebar;