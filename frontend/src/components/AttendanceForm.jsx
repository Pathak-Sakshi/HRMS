import { useState, useEffect } from "react";
import API from "../services/api";

export default function AttendanceForm({
  refresh,
  isModal = false,
  onClose = () => {},
}) {
  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setEmployeesLoading(true);
    try {
      const res = await API.get("/employees");
      setEmployees(res.data.data || res.data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    } finally {
      setEmployeesLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!form.employeeId) {
      errors.employeeId = "Please select an employee";
    }

    if (!form.date) {
      errors.date = "Date is required";
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        errors.date = "Cannot mark attendance for future dates";
      }
    }

    if (!form.status) {
      errors.status = "Status is required";
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
      await API.post("/attendance", form);

      setSuccess("Attendance marked successfully!");
      setForm({
        employeeId: "",
        date: "",
        status: "Present",
      });
      setFieldErrors({});

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      refresh();

      if (isModal) {
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      const errorMessage = err.message || "Failed to mark attendance";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const selectedEmployee = employees.find(
    (emp) => emp.id === parseInt(form.employeeId),
  );

  if (isModal) {
    return (
      <>
        <div className="modal-header">
          <h2>Mark Attendance</h2>
          <button type="button" onClick={onClose} className="modal-close">
            ✕
          </button>
        </div>
        <div className="modal-body">
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
              <label htmlFor="employeeId">Select Employee *</label>
              <select
                id="employeeId"
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                disabled={loading || employeesLoading}
              >
                <option value="">
                  {employeesLoading
                    ? "Loading employees..."
                    : "Choose Employee"}
                </option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.fullName} ({emp.employeeId})
                  </option>
                ))}
              </select>
              {fieldErrors.employeeId && (
                <span className="error-message">{fieldErrors.employeeId}</span>
              )}
              {selectedEmployee && (
                <p
                  className="text-gray text-italic"
                  style={{ marginTop: "0.5rem" }}
                >
                  📧 {selectedEmployee.email} | 🏢 {selectedEmployee.department}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                id="date"
                type="date"
                name="date"
                value={form.date}
                max={new Date().toLocaleDateString("en-CA")}
                onChange={handleChange}
                disabled={loading}
              />
              {fieldErrors.date && (
                <span className="error-message">{fieldErrors.date}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
              {fieldErrors.status && (
                <span className="error-message">{fieldErrors.status}</span>
              )}
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="btn btn-success"
          >
            {loading ? "Marking..." : "Mark Attendance"}
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="content-area">
      <h3>Mark Attendance</h3>

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
          <label htmlFor="employeeId">Select Employee *</label>
          <select
            id="employeeId"
            name="employeeId"
            value={form.employeeId}
            onChange={handleChange}
            disabled={loading || employeesLoading}
          >
            <option value="">
              {employeesLoading ? "Loading employees..." : "Choose Employee"}
            </option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.fullName} ({emp.employeeId})
              </option>
            ))}
          </select>
          {fieldErrors.employeeId && (
            <span className="error-message">{fieldErrors.employeeId}</span>
          )}
          {selectedEmployee && (
            <p
              className="text-gray text-italic"
              style={{ marginTop: "0.5rem" }}
            >
              📧 {selectedEmployee.email} | 🏢 {selectedEmployee.department}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            disabled={loading}
          />
          {fieldErrors.date && (
            <span className="error-message">{fieldErrors.date}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          {fieldErrors.status && (
            <span className="error-message">{fieldErrors.status}</span>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn-success">
          {loading ? "Marking..." : "Mark Attendance"}
        </button>
      </form>
    </div>
  );
}
