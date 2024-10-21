import DateTimeDisplay from "./Utilities/DateTimeDisplay";
import "./Navbar/Header.css";

function Home() {
  return (
    <div className="home">
      <div className="title">
        <h1>
          <span>Gateway</span>
          {/* <br /> Daycare, Nursery, Preparatory & High School */}
        </h1>
        <h2>Online Staff Attendance Register</h2>
      </div>

      <div className="time-display">
        <h1>
          <DateTimeDisplay />
        </h1>
      </div>
    </div>
  );
}

export default Home;
