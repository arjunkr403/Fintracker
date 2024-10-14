import React, { useState } from "react";
import "./styles.css";
import searchIm from "../../assets/search.svg";
import {Radio, Select, Table } from "antd";
import Button from "../Button";
function TransactionTable({ transactions }) {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [sortFilter, setsortFilter] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];
  //function to filter the transactions by name and their type
  const filterSearch = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(type)
  );
  //function to sort the transactions using sort function where "a" is previous and "b" is next
  //JS uses insert sort by default
  const sortTransactions = filterSearch.sort((a, b) => {
    if (sortFilter === "date") {
      return new Date(a.date) - Date(b.date);
    } else if (sortFilter === "amount") {
      return a.amount - b.amount;
    } else return 0;
  });

  return (
    <div style={{ padding: " 0 2rem", marginBottom: "1rem"}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={searchIm} width={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name"
          />
        </div>
        <Select
          className="select-input"
          value={type}
          onChange={(value) => setType(value)}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expenses</Option>
        </Select>
      </div>
      <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          <h2 style={{fontWeight:500}}>My Transactions</h2>
          <Radio.Group
            className="radio-input"
            defaultValue="No Sort"
            onChange={(e) => setsortFilter(e.target.value)}
            value={sortFilter}
          >
            <Radio.Button value="" style={{ fontFamily: 'Montserrat, sans-serif', borderRadius:0 }}>No Sort</Radio.Button>
            <Radio.Button style={{ fontFamily: 'Montserrat, sans-serif' }} value="date">Sort by Date</Radio.Button>
            <Radio.Button style={{ fontFamily: 'Montserrat, sans-serif', borderRadius:0}} value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div style={{ display: "flex",
            justifyItems:"center",
            gap:"1rem",
            width: "400px"
           }}>
            <Button text="Export in CSV"/>
            <Button blue={true} text="Import from CSV"/>
          </div>
        </div>
        <Table  style={{ fontFamily: 'Montserrat, sans-serif' }} dataSource={sortTransactions} columns={columns} />
      </div>
    </div>
  );
}

export default TransactionTable;
