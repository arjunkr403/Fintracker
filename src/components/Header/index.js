import React, { useEffect } from "react";
import "./styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/loader";
import { toast } from "react-toastify";
import userImg from '../../assets/user.svg';
const Header = () => {
  const nav = useNavigate();
  const [user,loading] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      nav("/dashboard");
    }
    else{
      nav("/");
    }
  }, [user, nav]);
  const logoutfnc = () => {
      auth.signOut();
      toast.success("Logged out successfully");
      nav("/");
  };

  return (
    <>
      {loading && <Loader />}
      <header className="nav">
        <p className="title">FinTraker.</p>
        {user ? (
        <p className="navbar-link" onClick={logoutfnc}>
          <span style={{ marginRight: "1rem" }}>
            <img
              src={user.photoURL ? user.photoURL : userImg}
              width={"32"}
              style={{ borderRadius: "50%" }}
            />
          </span>
          Logout
        </p>
      ) : (
        <></>
      )}
      </header>
    </>
  );
};
export default Header;
