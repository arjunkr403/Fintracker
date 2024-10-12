import React, { useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import AddIncomeModal from '../components/Modals/addIncome';
import AddExpenseModal from '../components/Modals/addExpense';

const Dashboard = () => {
  const [expenseVisible,setExpenseVisible]=useState(false);
  const [incomeVisible,setIncomeVisible]=useState(false);

  // below two functions will make the state value true therefore modal will be visible
  const showExpenses=()=>{
    setExpenseVisible(true);
  };
  const showIncome=()=>{
    setIncomeVisible(true);
  };

  // below two functions will make the state value false therefore modal will be invisible
  const handleExpenseCancel=()=>{
    setExpenseVisible(false);
  };
  const handleIncomeCancel=()=>{
    setIncomeVisible(false);
  };

  const onFinish =(values, type)=>{

  }


  return (
    <div>
      <Header/>
      <Cards 
        showExpenses={showExpenses} showIncome={showIncome}/>
        {/* Modal is a popUp window used here to handle task such as addding income ,expenses 
        it has ``visible`` attr that shows that modal is visible or not 
        other attr are
      ``OnCancel`` is a callback function that is called when we cancel the modal 
      and ``footer`` which specifies the button area in modal if it is null then no buttons*/}
      <AddIncomeModal incomeVisible={incomeVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish}/>
      <AddExpenseModal expenseVisible={expenseVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish}/>
    </div>
  )
}

export default Dashboard