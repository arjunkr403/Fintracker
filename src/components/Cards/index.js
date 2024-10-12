import React from "react";
import "./styles.css";
import {Card, Row } from "antd";
import Button from "../Button";
function Cards({showIncome, showExpenses}) {
  return (
    <div>
      <Row className="card-row ">
        <Card title="Current Balance" className="cardbox"
        // onClick={reset}
        >
          {/* <p>₹ {currentBalance}</p> */}
          <Button className="btn"
              text={"Reset Balance"}
              blue={true}
            />
        </Card>
        <Card title="Total Income" className="cardbox"
        onClick={showIncome}
        >
          {/* <p>₹ {income}</p> */}
          <Button className="btn"
              text={"Add Income"}
              blue={true}
            />
        </Card>
        <Card title="Total Expenses" className="cardbox"
        onClick={showExpenses}
        >
          {/* <p>₹{expenses}</p> */}
          <Button 
              text={"Add Expenses"}
              blue={true}
            />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
