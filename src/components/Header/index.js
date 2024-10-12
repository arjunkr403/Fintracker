import React, { useEffect } from "react";
import "./styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/loader";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
const Header = () => {
  const nav = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      nav("/dashboard");
    }
  }, [user, loading]);
  const logoutfnc = async() => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      nav("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <header className="nav">
        <p className="title">FinTraker.</p>
        <div className="logo">
          {user && <img className="avatar" src={user.photoURL} alt="yo" />}
          {user && (
            <p className="logoLink" onClick={logoutfnc}>
              Log Out
            </p>
          )}
        </div>
      </header>
    </>
  );
};
export default Header;
