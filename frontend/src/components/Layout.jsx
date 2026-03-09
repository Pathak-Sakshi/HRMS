import { Link } from "react-router-dom";
import "./layout.css";

export default function Layout({ children }) {

  return (
    <div className="layout">

      <aside className="sidebar">
        <h2>HRMS Lite</h2>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/attendance">Attendance</Link>
        </nav>
      </aside>

      <main className="content">
        {children}
      </main>

    </div>
  );
}