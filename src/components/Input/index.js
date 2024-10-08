import React from "react";
import "./styles.css";
function InputBox({label,state,setState,placeholder,type="text"}) {
  return (
    <div class="input-box">
      <p className="label">{label}</p>
      <input className="custom" value={state} placeholder={placeholder}
      onChange={(e)=>setState(e.target.value)} type={type} required/>
    </div>
  );
}

export default InputBox;
