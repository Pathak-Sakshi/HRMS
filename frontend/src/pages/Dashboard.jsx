import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.get("/dashboard");
      setData(res.data.data || res.data);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <span className="loading-text">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger">
          <span>❌</span>
          <div>
            <p><strong>Error Loading Dashboard</strong></p>
            <p>{error}</p>
            <button onClick={fetchDashboard} className="btn-primary btn-sm mt-2">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container">
        <div className="empty-state">
          <p className="empty-title">No Data Available</p>
        </div>
      </div>
    );
  }

  const getTodayAttendancePercentage = () => {
    const total = data.presentToday + data.absentToday;
    if (total === 0) return 0;
    return Math.round((data.presentToday / total) * 100);
  };

  return (
    <div className="container">
      <h1 className="page-title">Dashboard</h1>

      {/* Main Statistics */}
      <div className="dashboard">
        <DashboardCard
          title="Total Employees"
          value={data.totalEmployees}
          variant="primary"
        />
        <DashboardCard
          title="Present Today"
          value={data.presentToday}
          variant="success"
        />
        <DashboardCard
          title="Absent Today"
          value={data.absentToday}
          variant="danger"
        />
        <DashboardCard
          title="Not Marked Yet"
          value={data.notMarkedToday}
          variant="warning"
        />
      </div>

      {/* Today's Attendance Summary */}
      <div className="content-area mt-4">
        <h3>Today's Attendance Summary</h3>
        <div className="dashboard mt-3">
          <div className="card">
            <p className="card-title">Attendance Rate</p>
            <h3 className="card-value">{getTodayAttendancePercentage()}%</h3>
            <p className="card-subtitle">
              {data.presentToday} Present out of {data.presentToday + data.absentToday} Marked
            </p>
          </div>
        </div>
      </div>

      {/* Last 7 Days Attendance Trend */}
      {data.last7DaysAttendance && (
        <div className="content-area mt-4">
          <h3>7-Day Attendance Trend</h3>
          <div className="dashboard-chart">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.last7DaysAttendance).map(([date, counts]) => (
                  <tr key={date}>
                    <td><strong>{new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</strong></td>
                    <td className="text-success">✓ {counts.present}</td>
                    <td className="text-danger">✗ {counts.absent}</td>
                    <td>{counts.present + counts.absent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

     
     
    </div>
  );
}