import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";

function Expenses() {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });

  const addExpense = (expense) => {
    const updatedExpenses = [expense, ...expenses];

    setExpenses(updatedExpenses);

    localStorage.setItem(
      "expenses",
      JSON.stringify(updatedExpenses)
    );
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== id
    );

    setExpenses(updatedExpenses);

    localStorage.setItem(
      "expenses",
      JSON.stringify(updatedExpenses)
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Expenses</h1>
          <p>Track your daily spending</p>
        </div>
      </div>

      <div className="two-column">
        <ExpenseForm onAddExpense={addExpense} />

        <div className="card">
          <h2>Expense History</h2>

          {expenses.length === 0 ? (
            <div className="empty-state">
              <span>📭</span>
              <p>No expenses added yet.</p>
            </div>
          ) : (
            <div className="expense-list">
              {expenses.map((expense) => (
                <div className="expense-item" key={expense.id}>
                  <div>
                    <h3>{expense.title}</h3>

                    <p>
                      {expense.category} • {expense.date}
                    </p>

                    {expense.description && (
                      <small>{expense.description}</small>
                    )}
                  </div>

                  <div className="expense-right">
                    <strong>₹{expense.amount}</strong>

                    <button
                      className="delete-btn"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Expenses;