import React, { useState } from "react";
import "./styles.css";
import InputBox from "../Input";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
  const signupWithEmail = () => {
    setLoading(true);
    if (name !== "" && email !== "" && password !== "" && confirmP !== "") {
      if (password === confirmP) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            toast.success("Sign up successful!!!");
            createDoc(user);
            //after successful login clear the information displaying in form
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmP("");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorCode, errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Passwords do not match!!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  };

  //handle submit for signin using email and password
  const loginWithEmail = () => {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setEmail("");
          setPassword("");
          nav("/dashboard");
          toast.success("User logged in successfully!!!");
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorCode, errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  };

  async function createDoc(user) {
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if(!userData.exists()){
      try {
        await setDoc(doc(db, "users", user.uid),{
          name:user.displayname? user.displayname : name,
          email:user.email,
          photoURL: user.PhotoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc Created!!!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
    else{
      toast.error("User already exists!");
      setLoading(false);
    }
  }

  return (
    <>
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
              text={loading ? "Loading..." : "Login using Email and Password"}
              onClick={loginWithEmail}
            />
            <p style={{ textAlign: "center", margin: "-0.2rem" }}>or</p>
            <Button
              text={loading ? "Loading..." : "Login using Google"}
              blue={true}
              disabled={loading}
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
              text={loading ? "Loading..." : "Sign Up using Email and Password"}
              onClick={signupWithEmail}
            />
            <p style={{ textAlign: "center", margin: "-0.2rem" }}>or</p>
            <Button
              text={loading ? "Loading..." : "Sign Up using Google"}
              blue={true}
              disabled={loading}
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
