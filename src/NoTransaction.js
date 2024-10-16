import React from 'react'
import transactions from "../src/assets/transactions.svg";
function NoTransaction() {
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      flexDirection:"column",
      marginBottom:"2rem",
    }}
    >
    <img src={transactions} style={{width:"400px",margin:"4rem"}}/>
    <p style={{fontSize:"1.2rem",fontWeight:"500",textAlign:"center"}}>You Have No Transactions Currently!!!</p>
    </div>
  )
}

export default NoTransaction