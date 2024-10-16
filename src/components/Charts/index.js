import { Line, Pie } from "@ant-design/charts";
import React from "react";

const Charts = ({ sortedTransactions }) => {
  const data =
    sortedTransactions?.map((item) => {
      return { date: item.date, amount: item.amount };
    }) || [];
  const config = {
    data: data,
    width: 800,
    autoFit: false,
    xField: "date",
    yField: "amount",
    style: {
      lineWidth: 2.5,
      stroke: "#0036A3",
    },
  };
  const spendingData = sortedTransactions
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => {
      return { tag: transaction.tag, amount: transaction.amount };
    });
  let newSpending = [{ tag: "food", amount: 0 },
  { tag: "education", amount: 0 },
  { tag: "office", amount: 0 },
  { tag: "others", amount: 0 }
  ];
  spendingData.forEach((item) => {
    if (item.tag === "food") {
      newSpending[0].amount += item.amount;
    }
    else if (item.tag==="education"){
      newSpending[1].amount += item.amount;
    }
    else if (item.tag==="office"){
      newSpending[2].amount += item.amount;
    }
    else {
      newSpending[3].amount += item.amount;
    }
  });
  const filteredSpending = newSpending.filter((item) => item.amount > 0);

  const spendingConfig = {
    data: filteredSpending,
    width: 800,
    autoFit:false,
    angleField: "amount",
    colorField: "tag",
  };
  let chart;
  let pieChart;
  return (
    <div className="chartbox">
      <div className="line-chart">
        <h1>Your Analytics</h1>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div className="pie-chart">
        <h1>Your Spendings</h1>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
      </div>
    </div>
  );
};

export default Charts;
