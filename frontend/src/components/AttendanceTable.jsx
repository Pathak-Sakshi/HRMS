import { useMemo } from "react";

export default function AttendanceTable({ records }) {
  const statusBadge = (status) => {
    return status === "Present"
      ? "🟢 Present"
      : "🔴 Absent";
  };

  const getStatusClass = (status) => {
    return status === "Present" ? "text-success" : "text-danger";
  };

  const totalPresent = useMemo(
    () => records.filter(r => r.status === "Present").length,
    [records]
  );

  const totalAbsent = useMemo(
    () => records.filter(r => r.status === "Absent").length,
    [records]
  );

  if (records.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <p className="empty-title">No Attendance Records</p>
        <p className="empty-description">Mark attendance using the form above</p>
      </div>
    );
  }

  return (
    <div className="content-area">
      <div className="flex-between mb-3">
        <h5>Attendance Records</h5>
        <div className="flex gap-3">
          <span className="text-success">✓ Present: {totalPresent}</span>
          <span className="text-danger">✗ Absent: {totalAbsent}</span>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Email</th>
              <th>Department</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td><strong>{r.Employee.fullName}</strong></td>
                <td>{r.Employee.email}</td>
                <td>{r.Employee.department}</td>
                <td>{new Date(r.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td className={getStatusClass(r.status)}>{statusBadge(r.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}