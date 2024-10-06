import React from "react";
import "./styles.css";
function InputBox({label,state,setState,placeholder}) {
  return (
    <div class="input-box">
      <p>{label}</p>
      <input value={state} placeholder={placeholder}
      onChange={(e)=>setState(e.target.value)} required/>
    </div>
  );
}

export default InputBox;
