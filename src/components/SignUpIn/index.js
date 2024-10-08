import React, { useState } from "react";
import "./styles.css";
import InputBox from "../Input";
import Button from "../Button";
const SignUpIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmP, setConfirmP] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const toggleVisible = () => {
    setShowPass(!showPass);
  };
  const toggleConfirmVisible = () => {
    setShowConfirmPass(!showConfirmPass);
  };
  return (
    <div className="signbox">
      <h2 className="title">
        Sign up on <span style={{ color: "var(--theme)" }}>FinTracker.</span>
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

        <Button text={'Sign Up using Email and Password'}/>
        <p style={{textAlign:"center"}}>or</p>
        <Button  text={'Sign Up using Google'} blue={true}/>
      </form>
    </div>
  );
};

export default SignUpIn;
