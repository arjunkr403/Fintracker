import React, { useState } from 'react'
import './styles.css';
import InputBox from '../Input';
const SignUpIn = () => {
  const [name,setName]=useState("");
  return (
    <div className="signbox">
      <h2 className='title'>Sign up on <span style={{color:'var(--theme)'}}>FinTracker.</span></h2>
      <form>
        <InputBox label={"Full Name"} state={name} setState={setName} placeholder={"Your Name"} />
      </form>
    </div>
  )
}

export default SignUpIn
