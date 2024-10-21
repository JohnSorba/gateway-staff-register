import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-container">
        <h1>Gateway Staff Attendance Register</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/staff-list" className="link button btn-black">
                Add Staff
              </Link>
            </li>
            <li>
              <Link to="/attendance-list" className="link button btn-black">
                Add Attendance
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
