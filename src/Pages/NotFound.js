import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import '../Assets/Style/Not-found.css'

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found!";
  }, []);

  return (
    <>
      <Navbar />
      <div className="not-found">
        <p>Page not found!</p>
      </div>
    </>
  );
};

export default NotFound;
