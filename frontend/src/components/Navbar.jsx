import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="navbar">
      <h2>HRMS Lite</h2>
      <div className="nav-links">
        <Link to="/" className={isActive("/")}>
          Dashboard
        </Link>
        <Link to="/employees" className={isActive("/employees")}>
          Employees
        </Link>
        <Link to="/attendance" className={isActive("/attendance")}>
          Attendance
        </Link>
      </div>
    </div>
  );
}