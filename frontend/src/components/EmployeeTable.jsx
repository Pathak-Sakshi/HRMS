import { useState } from "react";
import API from "../services/api";

export default function EmployeeTable({ employees, refresh }) {
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
      return;
    }

    setDeleting(id);
    setError("");

    try {
      await API.delete(`/employees/${id}`);
      refresh();
    } catch (err) {
      setError(err.message || "Failed to delete employee");
    } finally {
      setDeleting(null);
    }
  };

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👥</div>
        <p className="empty-title">No Employees Found</p>
        <p className="empty-description">Add your first employee using the form above</p>
      </div>
    );
  }

  return (
    <div className="content-area">
      <h5>Employee List</h5>

      {error && (
        <div className="alert alert-danger">
          <span>❌</span>
          <p>{error}</p>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td><strong>{emp.employeeId}</strong></td>
                <td>{emp.fullName}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    disabled={deleting === emp.id}
                    className="btn-danger btn-sm"
                  >
                    {deleting === emp.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}