import { useEffect, useState } from "react";
import API from "../services/api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.get("/employees");
      setEmployees(res.data.data || res.data);
    } catch (err) {
      setError(err.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFormClose = () => {
    setShowFormModal(false);
  };

  const handleFormSuccess = () => {
    setShowFormModal(false);
    fetchEmployees();
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Employee Management</h1>
        <button 
          onClick={() => setShowFormModal(true)} 
          className="btn btn-primary"
        >
          + Add Employee
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          <span>❌</span>
          <div>
            <p><strong>Error</strong></p>
            <p>{error}</p>
            <button onClick={fetchEmployees} className="btn-primary btn-sm mt-2">
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Modal Overlay */}
      <div className={`modal-overlay ${showFormModal ? "active" : ""}`} onClick={handleFormClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Add New Employee</h2>
            <button 
              className="modal-close" 
              onClick={handleFormClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          <div className="modal-body">
            <EmployeeForm 
              refresh={handleFormSuccess} 
              onClose={handleFormClose}
              isModal={true}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <span className="loading-text">Loading employees...</span>
        </div>
      ) : (
        <EmployeeTable employees={employees} refresh={fetchEmployees} />
      )}
    </div>
  );
}