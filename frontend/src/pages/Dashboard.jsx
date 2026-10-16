import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [goals, setGoals] = useState([]);

  const userName = localStorage.getItem("currentUser") || "Student";

  useEffect(() => {
    const storedExpenses =
      JSON.parse(localStorage.getItem("expenses")) || [];

    const storedBudget =
      Number(localStorage.getItem("budget")) || 0;

    const storedGoals =
      JSON.parse(localStorage.getItem("goals")) || [];

    setExpenses(storedExpenses);
    setBudget(storedBudget);
    setGoals(storedGoals);
  }, []);

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0
  );

  const remaining = Math.max(budget - totalExpenses, 0);

  const budgetUsed =
    budget > 0
      ? Math.min((totalExpenses / budget) * 100, 100)
      : 0;

  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const mainGoal = goals.length > 0 ? goals[0] : null;

  const goalProgress = mainGoal
    ? Math.min(
        (Number(mainGoal.saved) / Number(mainGoal.target)) * 100,
        100
      )
    : 0;

  return (
    <div className="dashboard-page">

      {/* HERO */}

      <section className="dashboard-hero">
        <div>
          <p className="dashboard-welcome">
            Welcome back 👋
          </p>

          <h1>
            Hello, {userName}
          </h1>

          <p className="dashboard-subtitle">
            Keep track of your money and reach your financial goals.
          </p>
        </div>

        <Link to="/expenses" className="dashboard-add-btn">
          + Add Expense
        </Link>
      </section>


      {/* STAT CARDS */}

      <section className="dashboard-stats">

        <div className="dashboard-stat budget-stat">
          <div className="stat-top">
            <span className="dashboard-stat-icon">💰</span>
            <span className="stat-label">Monthly Budget</span>
          </div>

          <h2>₹{budget.toLocaleString()}</h2>

          <p>
            Your spending limit
          </p>
        </div>


        <div className="dashboard-stat expense-stat">
          <div className="stat-top">
            <span className="dashboard-stat-icon">💸</span>
            <span className="stat-label">Total Expenses</span>
          </div>

          <h2>₹{totalExpenses.toLocaleString()}</h2>

          <p>
            {expenses.length} transactions
          </p>
        </div>


        <div className="dashboard-stat remaining-stat">
          <div className="stat-top">
            <span className="dashboard-stat-icon">💵</span>
            <span className="stat-label">Remaining</span>
          </div>

          <h2>₹{remaining.toLocaleString()}</h2>

          <p>
            Available this month
          </p>
        </div>


        <div className="dashboard-stat goal-stat">
          <div className="stat-top">
            <span className="dashboard-stat-icon">🎯</span>
            <span className="stat-label">Active Goals</span>
          </div>

          <h2>{goals.length}</h2>

          <p>
            Product purchase goals
          </p>
        </div>

      </section>


      {/* MAIN CONTENT */}

      <section className="dashboard-main-grid">

        {/* RECENT EXPENSES */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">
            <div>
              <h2>Recent Expenses</h2>
              <p>Your latest spending activity</p>
            </div>

            <Link to="/expenses">
              View All →
            </Link>
          </div>


          {recentExpenses.length === 0 ? (

            <div className="dashboard-empty">
              <div>💸</div>

              <h3>No expenses yet</h3>

              <p>
                Start adding your expenses to see them here.
              </p>

              <Link to="/expenses">
                Add Your First Expense
              </Link>
            </div>

          ) : (

            <div className="recent-expenses-list">

              {recentExpenses.map((expense) => (

                <div
                  className="dashboard-expense"
                  key={expense.id}
                >

                  <div className="expense-left">

                    <div className="expense-category-icon">
                      {getCategoryIcon(expense.category)}
                    </div>

                    <div>
                      <h3>{expense.title}</h3>

                      <p>
                        {expense.category} • {expense.date}
                      </p>
                    </div>

                  </div>

                  <strong>
                    - ₹{Number(expense.amount).toLocaleString()}
                  </strong>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* RIGHT SIDE */}

        <div className="dashboard-side">


          {/* BUDGET */}

          <div className="dashboard-panel budget-overview">

            <div className="dashboard-panel-header">
              <div>
                <h2>Budget Overview</h2>
                <p>This month's spending</p>
              </div>

              <Link to="/budget">
                Manage
              </Link>
            </div>

            <div className="budget-circle-area">

              <div
                className="budget-circle"
                style={{
                  "--progress": `${budgetUsed}%`,
                }}
              >
                <div>
                  <strong>
                    {Math.round(budgetUsed)}%
                  </strong>

                  <span>used</span>
                </div>
              </div>

              <div className="budget-overview-text">

                <div>
                  <span>Spent</span>
                  <strong>
                    ₹{totalExpenses.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Remaining</span>
                  <strong>
                    ₹{remaining.toLocaleString()}
                  </strong>
                </div>

              </div>

            </div>

          </div>


          {/* GOAL */}

          <div className="dashboard-panel goal-overview">

            <div className="dashboard-panel-header">

              <div>
                <h2>Purchase Goal</h2>
                <p>Your saving progress</p>
              </div>

              <Link to="/goals">
                View
              </Link>

            </div>


            {mainGoal ? (

              <div>

                <div className="goal-dashboard-title">
                  <span>🎯</span>

                  <div>
                    <h3>{mainGoal.product}</h3>

                    <p>
                      ₹{Number(mainGoal.saved).toLocaleString()}
                      {" "}of{" "}
                      ₹{Number(mainGoal.target).toLocaleString()}
                    </p>
                  </div>

                </div>


                <div className="goal-dashboard-bar">

                  <div
                    style={{
                      width: `${goalProgress}%`,
                    }}
                  ></div>

                </div>


                <div className="goal-dashboard-footer">

                  <span>
                    {Math.round(goalProgress)}% completed
                  </span>

                  <Link to="/goals">
                    Add Saving →
                  </Link>

                </div>

              </div>

            ) : (

              <div className="no-goal">

                <span>🎯</span>

                <p>
                  You don't have a purchase goal yet.
                </p>

                <Link to="/goals">
                  Create Goal
                </Link>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* QUICK ACTIONS */}

      <section className="quick-actions-section">

        <div>
          <h2>Quick Actions</h2>
          <p>Manage your finances quickly</p>
        </div>


        <div className="dashboard-actions">

          <Link
            to="/expenses"
            className="dashboard-action"
          >
            <span>💸</span>

            <div>
              <strong>Add Expense</strong>
              <small>Record your spending</small>
            </div>

            <b>→</b>
          </Link>


          <Link
            to="/budget"
            className="dashboard-action"
          >
            <span>💰</span>

            <div>
              <strong>Set Budget</strong>
              <small>Control monthly spending</small>
            </div>

            <b>→</b>
          </Link>


          <Link
            to="/goals"
            className="dashboard-action"
          >
            <span>🎯</span>

            <div>
              <strong>Create Goal</strong>
              <small>Save for something special</small>
            </div>

            <b>→</b>
          </Link>


          <Link
            to="/reports"
            className="dashboard-action"
          >
            <span>📊</span>

            <div>
              <strong>View Reports</strong>
              <small>Analyze your spending</small>
            </div>

            <b>→</b>
          </Link>

        </div>

      </section>

    </div>
  );
}


/* CATEGORY ICON */

function getCategoryIcon(category) {

  const icons = {
    Food: "🍔",
    Travel: "🚕",
    Education: "📚",
    Shopping: "🛍️",
    Entertainment: "🎮",
    Health: "💊",
    Other: "📦",
  };

  return icons[category] || "📦";
}


export default Dashboard;