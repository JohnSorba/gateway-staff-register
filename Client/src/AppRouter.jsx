import { BrowserRouter, Routes, Route } from "react-router-dom";
import AttendanceList from "./comps/AttendanceList";
import StaffList from "./comps/StaffList";
import Home from "./comps/Home";
import Header from "./comps/Navbar/Header";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance-list" element={<AttendanceList />} />
        <Route path="/staff-list" element={<StaffList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
