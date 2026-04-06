import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import "../styles/Analytics.css";

export default function SpendingAnalytics() {
  const navigate = useNavigate();

  const spendingData = [
    { name: "Electronics", value: 450, color: "#3AB46F" },
    { name: "Fashion", value: 380, color: "#FCB045" },
    { name: "Home & Garden", value: 220, color: "#FD1D1D" },
    { name: "Sports", value: 150, color: "#FF6B6B" },
    { name: "Books", value: 50, color: "#4ECDC4" },
  ];

  const COLORS = spendingData.map((item) => item.color);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
          <p className="value">${payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <h1>💰 Spending Analytics</h1>
      </div>

      <div className="analytics-content">
        {/* Pie Chart Section */}
        <div className="chart-section">
          <h2>Total Spent by Category</h2>
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value}`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <h2>Category Breakdown</h2>
          <div className="category-list">
            {spendingData.map((item, index) => (
              <div key={index} className="category-item">
                <div className="category-header">
                  <div className="category-color" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="category-name">{item.name}</span>
                </div>
                <div className="category-stats">
                  <span className="category-amount">${item.value}</span>
                  <span className="category-percentage">
                    {((item.value / spendingData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="summary-box">
            <h3>Total Spent</h3>
            <p className="total-amount">
              ${spendingData.reduce((sum, item) => sum + item.value, 0)}
            </p>
            <p className="summary-text">Across {spendingData.length} categories</p>
          </div>
        </div>
      </div>
    </div>
  );
}
