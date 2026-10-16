import { useState } from "react";

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      alert("Please fill all required fields.");
      return;
    }

    const expense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date,
      description,
    };

    onAddExpense(expense);

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
    setDescription("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add New Expense</h2>

      <div className="form-group">
        <label>Expense Name</label>
        <input
          type="text"
          placeholder="Example: College Canteen"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            placeholder="500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Education</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Date</label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Description</label>

        <textarea
          placeholder="Optional description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button className="primary-btn" type="submit">
        + Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;