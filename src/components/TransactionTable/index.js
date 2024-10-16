import React, { useState } from "react";
import "./styles.css";
import searchIm from "../../assets/search.svg";
import { Radio, Select, Table } from "antd";
import Button from "../Button";
import { parse, unparse } from "papaparse";
import Loader from "../Loader/loader";
import { toast } from "react-toastify";
function TransactionTable({ transactions,addTransaction, fetchTransaction }) {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [sortFilter, setsortFilter] = useState("");
  const [loading,setLoading]=useState(false);
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
      item.name?.toLowerCase().includes(search.toLowerCase()) &&
      item.type?.includes(type)
  );
  //function to sort the transactions using sort function where "a" is previous and "b" is next
  //JS uses insert sort by default
  const sortTransactions = [...filterSearch].sort((a, b) => {
    if (sortFilter === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortFilter === "amount") {
      return a.amount - b.amount;
    } else return 0;
  });
  //creating function to export data after parsing from array of objects to CSV using unparse from papaparse
  const exportCSV = () => {
    const csv = unparse({
      fields: ["name", "type", "date", "amount", "tag"], //columns
      data: transactions, //rows
    });
    //Blob(Binary large Objects) is used to handle file-like objects in web apps
    //take 2 arguments-> 1.array containing csv string  2. type of data ensure file is interpreted as CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    //creates a temp URL that refer blob object, this url allow browser to access CSV data
    const csvURL = URL.createObjectURL(blob);
    //creating "a" tag to trigger file download
    const link = document.createElement("a");
    link.href = csvURL; //using ``link.setAttribute("href",csvURL);``
    link.download = "transaction.csv"; //using ``link.setAttribute("downlaod","transaction.csv");``
    document.body.appendChild(link); //append the "a" tag to download the file
    link.click(); //event will happen
    document.body.removeChild(link); //remove the download feature, to avoid clutter,memory leaks
  };

  const importCSV =(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      parse(e.target.files[0],{
        header:true,
        skipEmptyLines:true,
        complete: async function(results){
          for(const transaction of results.data){
            console.log("Transactions",transaction);
            //adding the new transaction to the transactions state using ...transactions which implies keeping the previous records as it is and adding new by passing as argument in setTransaction
            const newTransaction ={
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction,true);
          }
        }
      });
      toast.success("Transactions imported successfully!!!");
      fetchTransaction();
      e.target.files=null;
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
    {loading && <Loader/>}
      <div style={{ padding: " 0 2rem", marginBottom: "1rem" }}>
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
          <h2 style={{ fontWeight: 500 }}>My Transactions</h2>
          <Radio.Group
            className="radio-input"
            defaultValue="No Sort"
            onChange={(e) => setsortFilter(e.target.value)}
            value={sortFilter}
          >
            <Radio.Button
              value=""
              style={{ fontFamily: "Montserrat, sans-serif", borderRadius: 0 }}
            >
              No Sort
            </Radio.Button>
            <Radio.Button
              style={{ fontFamily: "Montserrat, sans-serif" }}
              value="date"
            >
              Sort by Date
            </Radio.Button>
            <Radio.Button
              style={{ fontFamily: "Montserrat, sans-serif", borderRadius: 0 }}
              value="amount"
            >
              Sort by Amount
            </Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <Button text="Export in CSV" onClick={exportCSV} />
            <label htmlFor="import-CSV" style={{cursor:"pointer",width:"100%",marginRight:"1rem"}}>
              <Button blue={true} text="Import from CSV" />
              </label>
            <input id="import-CSV" type="file" accept=".csv" required style={{display:"none"}}
            onChange={importCSV}/>
          </div>
        </div>
        <Table
          style={{ fontFamily: "Montserrat, sans-serif" }}
          dataSource={sortTransactions}
          columns={columns}
        />
      </div>
    </div>
    </>
  );
}

export default TransactionTable;
