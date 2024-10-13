import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddIncomeModal from "../components/Modals/addIncome";
import AddExpenseModal from "../components/Modals/addExpense";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import moment from "moment";
import { toast } from "react-toastify";
import Loader from "../components/Loader/loader";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [loading,setLoading]=useState(false);
  const [expenseVisible, setExpenseVisible] = useState(false);
  const [incomeVisible, setIncomeVisible] = useState(false);
  const [transaction, setTransaction] = useState([]);

  //Calculate the initial balance ,income , and expenses when the component loads on the web page
  // useEffect(()=>{
  //   // calBalance();
  // },[transaction]);

  // below two functions will make the state value true therefore modal will be visible

  const showExpenses = () => {
    setExpenseVisible(true);
  };
  const showIncome = () => {
    setIncomeVisible(true);
  };

  // below two functions will make the state value false therefore modal will be invisible
  const handleExpenseCancel = () => {
    setExpenseVisible(false);
  };
  const handleIncomeCancel = () => {
    setIncomeVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };
  //to add the transaction collection to corresponding user

  const addTransaction = async (transaction) => {
    setLoading(true);
    try {
      //adding the transaction doc to the specified parent collection and store its reference in docRef
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Doc written with Id:", docRef.id);
      setLoading(false);
      toast.success("Transaction added successfully!!!");
    } catch (e) {
      console.error("Error adding document: ", e);
      setLoading(false);
      toast.error("Could not add transaction");
    }
  };

  //Get all transactions when Dashboard gets rendered using useEffect
  useEffect(()=>{
    fetchTransaction();
  },[]);
  const fetchTransaction = async () => {
    setLoading(true);
    if(user){
    try {
        //creating a query to fetch total transaction by particular user using getDocs and storing them into transactionArray using forEach with '.data()' that will store the transaction in object type
        const q=query(collection(db,`users/${user.uid}/transactions`));
        const querySnapShot= await getDocs(q);
        let transactionArray= [];
        querySnapShot.forEach((doc)=>{
          transactionArray.push(doc.data());
        });
        setTransaction(transactionArray);
        console.log(transactionArray);
        setLoading(false);
        toast.success("Transactions fetched!!!");
      } catch (e) {
        console.error("Error fetching document: ", e);
        setLoading(false);
        toast.error("Could not fetch transaction");
      }
    }else{
      setLoading(false);
    }
  };


  return (
    <>
    {loading && <Loader/>}
    <div>
      <Header />
      <Cards showExpenses={showExpenses} showIncome={showIncome} />
      {/* Modal is a popUp window used here to handle task such as addding income ,expenses 
        it has ``visible`` attr that shows that modal is visible or not 
        other attr are
      ``OnCancel`` is a callback function that is called when we cancel the modal 
      and ``footer`` which specifies the button area in modal if it is null then no buttons*/}
      <AddIncomeModal
        incomeVisible={incomeVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
      <AddExpenseModal
        expenseVisible={expenseVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
    </div>
    </>
  );
};

export default Dashboard;
