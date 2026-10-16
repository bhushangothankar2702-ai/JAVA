import { useEffect, useState } from "react";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [product, setProduct] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [monthlySaving, setMonthlySaving] = useState("");

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(storedGoals);
  }, []);

  const addGoal = (e) => {
    e.preventDefault();

    if (!product || !target || !saved || !monthlySaving) {
      alert("Please fill all fields");
      return;
    }

    const newGoal = {
      id: Date.now(),
      product,
      target: Number(target),
      saved: Number(saved),
      monthlySaving: Number(monthlySaving),
    };

    const updatedGoals = [...goals, newGoal];

    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));

    setProduct("");
    setTarget("");
    setSaved("");
    setMonthlySaving("");
  };

  const addSaving = (id) => {
    const amount = Number(prompt("Enter amount saved:"));

    if (!amount || amount <= 0) return;

    const updatedGoals = goals.map((goal) => {
      if (goal.id === id) {
        return {
          ...goal,
          saved: Math.min(goal.saved + amount, goal.target),
        };
      }

      return goal;
    });

    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const deleteGoal = (id) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);

    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Product Purchase Goals</h1>
          <p>Save money and achieve your product goals.</p>
        </div>
      </div>

      <div className="two-column">
        <div className="card">
          <h2 className="card-heading">Create New Goal</h2>

          <form onSubmit={addGoal}>
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="e.g. Laptop"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Target Amount</label>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Already Saved</label>
              <input
                type="number"
                placeholder="e.g. 10000"
                value={saved}
                onChange={(e) => setSaved(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Monthly Saving</label>
              <input
                type="number"
                placeholder="e.g. 5000"
                value={monthlySaving}
                onChange={(e) => setMonthlySaving(e.target.value)}
              />
            </div>

            <button type="submit" className="primary-btn">
              Add Goal
            </button>
          </form>
        </div>

        <div>
          <h2 className="card-heading">Your Goals</h2>

          {goals.length === 0 ? (
            <div className="card empty-state">
              <h3>No goals yet</h3>
              <p>Create your first product purchase goal.</p>
            </div>
          ) : (
            <div>
              {goals.map((goal) => {
                const remaining = Math.max(goal.target - goal.saved, 0);

                const progress =
                  goal.target > 0
                    ? Math.min((goal.saved / goal.target) * 100, 100)
                    : 0;

                const months =
                  goal.monthlySaving > 0
                    ? Math.ceil(remaining / goal.monthlySaving)
                    : 0;

                return (
                  <div className="card goal-card" key={goal.id}>
                    <div className="goal-top">
                      <div>
                        <h3>{goal.product}</h3>
                        <p>Target: ₹{goal.target.toLocaleString()}</p>
                      </div>

                      <button
                        className="delete-btn"
                        onClick={() => deleteGoal(goal.id)}
                      >
                        Delete
                      </button>
                    </div>

                    <div className="goal-progress">
                      <div
                        className="goal-progress-fill"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <p>{Math.round(progress)}% completed</p>

                    <div className="goal-stats">
                      <div>
                        <strong>₹{goal.saved.toLocaleString()}</strong>
                        <span>Saved</span>
                      </div>

                      <div>
                        <strong>₹{remaining.toLocaleString()}</strong>
                        <span>Remaining</span>
                      </div>

                      <div>
                        <strong>
                          {months > 0 ? `${months} months` : "Completed"}
                        </strong>
                        <span>Estimated</span>
                      </div>
                    </div>

                    <div className="goal-footer">
                      <button
                        className="primary-btn"
                        onClick={() => addSaving(goal.id)}
                      >
                        + Add Saving
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Goals;