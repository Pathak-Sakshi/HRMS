import { useEffect, useState } from "react";
import API from "../services/api";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchAttendance = async () => {
    setLoading(true);
    setError("");

    try {
      let url = "/attendance";
      if (date) {
        url += `?date=${date}`;
      }

      const res = await API.get(url);
      setRecords(res.data.data || res.data);
    } catch (err) {
      setError(err.message || "Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [date]);

  const handleFormClose = () => {
    setShowFormModal(false);
  };

  const handleFormSuccess = () => {
    setTimeout(() => {
      setShowFormModal(false);
    }, 2000);
    fetchAttendance();
  };

  return (
    <div className="container">
      <div className="top-bar">

  <div className="page-header">
    <h1 className="page-title">Attendance Management</h1>
  </div>

  <div className="filter">
    <div className="filter-group">
      <input
        id="dateFilter"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>

    {date && (
      <button onClick={() => setDate("")} className="btn-sm btn-secondary">
        Clear
      </button>
    )}
  </div>

  <button
    onClick={() => setShowFormModal(true)}
    className="btn btn-primary"
  >
    + Mark Attendance
  </button>

</div>

      {/* Modal Form */}
      <div className={`modal-overlay ${showFormModal ? "active" : ""}`}>
        <div className="modal">
          <AttendanceForm isModal={true} onClose={handleFormClose} refresh={handleFormSuccess} />
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <span className="loading-text">Loading attendance records...</span>
        </div>
      ) : (
        <AttendanceTable records={records} />
      )}
    </div>
  );
}