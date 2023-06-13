import { useContext, useState } from "react";
import { UserContext } from "../utils/UserContext";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import PlacesPage from "./PlacesPage";

function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subPage } = useParams();
  if (subPage === undefined) {
    subPage = "profile";
  }
  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  
  return (
    <div>
      <AccountNav />
      {subPage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subPage === "places" && <PlacesPage />}
    </div>
  );
}

export default ProfilePage;
