import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Alert.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import Timer from "./Timer";

function Alert({ type, message, onClose, isVisible, attendanceID }) {
  const [isRendered, setIsRendered] = useState(isVisible);

  useEffect(() => {
    setIsRendered(isVisible);

    // Code to run on component mount
    const timer = setTimeout(() => {
      setIsRendered(false);
      onClose();
    }, 30000); // Auto-dismiss after 3 seconds

    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  if (!isRendered) return null;

  return (
    <div className="alert-container">
      <div className={`alert ${type}`}>
        {type === "success" ? (
          <FaCheckCircle className="h-12 w-12" />
        ) : (
          <MdOutlineError className="h-12 w-12" />
        )}
        {attendanceID && (
          <>
            <p>Your Attendance Code:</p>
            <p className="attendance-code">{attendanceID}</p>
            <span>Copy Code</span>
          </>
        )}
        {message}
        <Timer />
        <span className={`close-button ${type}`} onClick={onClose}>
          OK
        </span>
      </div>
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.string.isRequired, // success or failure
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  attendanceID: PropTypes.string.isRequired,
};

export default Alert;
