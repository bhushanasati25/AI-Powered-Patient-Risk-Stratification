import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import DoctorDashboard from "./Components/DoctorDashboard"; // Import your component
import PatientProgress from "./Components/PatientProgress"; // Import your component

import Login from "./Components/Login";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex justify-center p-4">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>

          <Routes>
            <Route path="/patient_dashboard" element={<Dashboard />} />
          </Routes>
          <Routes>
            <Route path="/doctor_dashboard" element={<DoctorDashboard />} />

          </Routes>
          <Routes>
            <Route path="/patient_progress" element={<PatientProgress />} />
          </Routes>

        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
