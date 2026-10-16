import { useState } from "react";

function Budget() {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) || 0
  );

  const [newBudget, setNewBudget] = useState("");

  const expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const remaining = Math.max(budget - totalExpenses, 0);

  const percentage =
    budget > 0
      ? Math.min((totalExpenses / budget) * 100, 100)
      : 0;

  const saveBudget = (e) => {
    e.preventDefault();

    if (!newBudget || Number(newBudget) <= 0) {
      alert("Enter a valid budget.");
      return;
    }

    const value = Number(newBudget);

    setBudget(value);
    localStorage.setItem("budget", value);

    setNewBudget("");

    alert("Budget updated successfully.");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Budget</h1>
        <p>Manage your monthly spending limit</p>
      </div>

      <div className="budget-layout">
        <div className="card">
          <h2>Set Monthly Budget</h2>

          <form onSubmit={saveBudget}>
            <div className="form-group">
              <label>Monthly Budget (₹)</label>

              <input
                type="number"
                placeholder="Example: 10000"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
              />
            </div>

            <button className="primary-btn" type="submit">
              Save Budget
            </button>
          </form>
        </div>

        <div className="card budget-card">
          <p>Monthly Budget</p>
          <h1>₹{budget}</h1>

          <div className="budget-progress">
            <div
              className="budget-progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="budget-details">
            <div>
              <span>Spent</span>
              <strong>₹{totalExpenses}</strong>
            </div>

            <div>
              <span>Remaining</span>
              <strong>₹{remaining}</strong>
            </div>
          </div>

          <p className="percentage-text">
            {percentage.toFixed(1)}% of your budget used
          </p>
        </div>
      </div>
    </div>
  );
}

export default Budget;