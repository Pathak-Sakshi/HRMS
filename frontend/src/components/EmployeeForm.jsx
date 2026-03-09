import { useState } from "react";
import API from "../services/api";

export default function EmployeeForm({ refresh, onClose, isModal = false }) {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!form.employeeId.trim()) {
      errors.employeeId = "Employee ID is required";
    }

    if (!form.fullName.trim()) {
      errors.fullName = "Full Name is required";
    } else if (form.fullName.trim().length < 2) {
      errors.fullName = "Full Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    if (!form.department.trim()) {
      errors.department = "Department is required";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      await API.post("/employees", form);

      setSuccess("Employee added successfully!");
      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: ""
      });
      setFieldErrors({});

      setTimeout(() => {
        setSuccess("");
        if (isModal && onClose) {
          onClose();
        }
      }, 2000);

      refresh();
    } catch (err) {
      const errorMessage = err.message || "Failed to add employee";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // For modal, don't show the outer wrapper
  if (isModal) {
    return (
      <>
        {error && (
          <div className="alert alert-danger">
            <span>❌</span>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span>✓</span>
            <p>{success}</p>
          </div>
        )}

        <form className="form" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="employeeId">Employee ID *</label>
            <input
              id="employeeId"
              type="text"
              name="employeeId"
              placeholder="E.g., EMP001"
              value={form.employeeId}
              onChange={handleChange}
              disabled={loading}
            />
            {fieldErrors.employeeId && (
              <span className="error-message">{fieldErrors.employeeId}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              disabled={loading}
            />
            {fieldErrors.fullName && (
              <span className="error-message">{fieldErrors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
            {fieldErrors.email && (
              <span className="error-message">{fieldErrors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <input
              id="department"
              type="text"
              name="department"
              placeholder="E.g., IT, HR, Sales"
              value={form.department}
              onChange={handleChange}
              disabled={loading}
            />
            {fieldErrors.department && (
              <span className="error-message">{fieldErrors.department}</span>
            )}
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={loading}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Adding..." : "Add Employee"}
            </button>
          </div>
        </form>
      </>
    );
  }

  // Original non-modal version
  return (
    <div className="content-area">
      <h3>Add New Employee</h3>

      {error && (
        <div className="alert alert-danger">
          <span>❌</span>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span>✓</span>
          <p>{success}</p>
        </div>
      )}

      <form className="form" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="employeeId">Employee ID *</label>
          <input
            id="employeeId"
            type="text"
            name="employeeId"
            placeholder="E.g., EMP001"
            value={form.employeeId}
            onChange={handleChange}
            disabled={loading}
          />
          {fieldErrors.employeeId && (
            <span className="error-message">{fieldErrors.employeeId}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={form.fullName}
            onChange={handleChange}
            disabled={loading}
          />
          {fieldErrors.fullName && (
            <span className="error-message">{fieldErrors.fullName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
          {fieldErrors.email && (
            <span className="error-message">{fieldErrors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="department">Department *</label>
          <input
            id="department"
            type="text"
            name="department"
            placeholder="E.g., IT, HR, Sales"
            value={form.department}
            onChange={handleChange}
            disabled={loading}
          />
          {fieldErrors.department && (
            <span className="error-message">{fieldErrors.department}</span>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}