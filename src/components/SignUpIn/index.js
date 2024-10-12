import React, { useState } from "react";
import "./styles.css";
import InputBox from "../Input";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loader from "../Loader/loader";

const SignUpIn = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmP, setConfirmP] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

  //hide unhide password
  const toggleVisible = () => {
    setShowPass(!showPass);
  };
  const toggleConfirmVisible = () => {
    setShowConfirmPass(!showConfirmPass);
  };
  const toggleLogin = () => {
    setLoginForm(!loginForm);
  };
  //handle submit for signUp using email and password
  const signupWithEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (name !== "" && email !== "" && password !== "" && confirmP !== "") {
        if (password === confirmP) {
          const result =await createUserWithEmailAndPassword(auth, email, password);
          const user = result.user;
          await createDoc(user);
          setLoading(false);
          toast.success("Sign up successful!!!");
          nav("/dashboard");
          
        } else {
          toast.error("Passwords do not match!!");
          setLoading(false);
        }
      } else {
        toast.error("All fields are mandatory!");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error signing up with email and password: ", error.message);
      setLoading(false);
    }
  };

  //handle submit for signin using email and password
  const loginWithEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (email !== "" && password !== "") {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        setLoading(false);
        toast.success("User logged in successfully!!!");
        nav("/dashboard");
      } else {
        toast.error("All fields are mandatory!");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error signing in with email and password: ", error.message);
      setLoading(false);
    }
  };

  //login using google

  const loginWithGmail = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createDoc(user);
      setLoading(false);
      toast.success("User Authenticated Successfully!");
      nav("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
  };

  async function createDoc(user) {
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      // Create a new document in the "users" collection
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL
            ? user.photoURL
            : "/default.png",
          createdAt: new Date(),
        });
        setLoading(false);
        // toast.success("Doc Created!!!");
        nav("/dashboard");
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      // toast.error("User already exists!");
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loader />}
      {/*showing loaderwhen loading is true*/}
      {loginForm ? (
        <div className="logbox">
          <h2 className="title">
            Log In on{" "}
            <span style={{ color: "var(--theme)", fontWeight: 700 }}>
              FinTracker.
            </span>
          </h2>
          <form>
            <InputBox
              label={"Email"}
              type="email"
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"}
            />
            <div className="pass">
              <InputBox
                label={"Password"}
                state={password}
                setState={setPassword}
                type={showPass ? "text" : "password"}
                placeholder={"example@123"}
              />
              <span type="button" onClick={toggleVisible}>
                {showPass ? "Hide" : "Show"}
              </span>
            </div>
            <Button
              disabled={loading}
              text={"Login using Email and Password"}
              onClick={loginWithEmail}
            />
            <p style={{ textAlign: "center", margin: "-0.2rem" }}>or</p>
            <Button
              text={"Login using Google"}
              blue={true}
              disabled={loading}
              onClick={loginWithGmail}
            />
          </form>
          <p className="log">
            Haven't made an account yet?{" "}
            <span onClick={toggleLogin}>Click here</span>
          </p>
        </div>
      ) : (
        <div className="signbox">
          <h2 className="title">
            Sign up on{" "}
            <span style={{ color: "var(--theme)", fontWeight: 700 }}>
              FinTracker.
            </span>
          </h2>
          <form>
            <InputBox
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <InputBox
              label={"Email"}
              type="email"
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"}
            />
            <div className="pass">
              <InputBox
                label={"Password"}
                state={password}
                setState={setPassword}
                type={showPass ? "text" : "password"}
                placeholder={"example@123"}
              />
              <span type="button" onClick={toggleVisible}>
                {showPass ? "Hide" : "Show"}
              </span>
            </div>
            <div className="pass">
              <InputBox
                label={"Confirm Password"}
                state={confirmP}
                setState={setConfirmP}
                type={showConfirmPass ? "text" : "password"}
                placeholder={"example@123"}
              />
              <span type="button" onClick={toggleConfirmVisible}>
                {showConfirmPass ? "Hide" : "Show"}
              </span>
            </div>

            <Button
              disabled={loading}
              text={"Sign Up using Email and Password"}
              onClick={signupWithEmail}
            />
            <p style={{ textAlign: "center", margin: "-0.2rem" }}>or</p>
            <Button
              text={"Sign Up using Google"}
              blue={true}
              disabled={loading}
              onClick={loginWithGmail}
            />
          </form>
          <p className="log">
            Or have an account already?{" "}
            <span onClick={toggleLogin}>Click here</span>
          </p>
        </div>
      )}
    </>
  );
};

export default SignUpIn;
