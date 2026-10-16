function Reports() {
  const expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] += Number(
      expense.amount
    );
  });

  const categories = Object.entries(categoryTotals);

  let highestCategory = "-";
  let highestAmount = 0;

  categories.forEach(([category, amount]) => {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Reports 📊</h1>
        <p>Understand where your money is going.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">💸</span>
          <p>Total Spending</p>
          <h2>₹{total}</h2>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🧾</span>
          <p>Transactions</p>
          <h2>{expenses.length}</h2>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <p>Highest Category</p>
          <h2>{highestCategory}</h2>
        </div>

        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <p>Highest Spending</p>
          <h2>₹{highestAmount}</h2>
        </div>
      </div>

      <div className="card report-card">
        <h2>Category-wise Spending</h2>

        {categories.length === 0 ? (
          <div className="empty-state">
            <span>📊</span>
            <p>No expense data available.</p>
          </div>
        ) : (
          categories.map(([category, amount]) => {
            const percentage =
              total > 0 ? (amount / total) * 100 : 0;

            return (
              <div className="report-row" key={category}>
                <div className="report-info">
                  <strong>{category}</strong>
                  <span>₹{amount}</span>
                </div>

                <div className="report-bar">
                  <div
                    className="report-bar-fill"
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></div>
                </div>

                <small>
                  {percentage.toFixed(1)}%
                </small>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Reports;