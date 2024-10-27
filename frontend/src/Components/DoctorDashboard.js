import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import patientsData from "./patientsData.json"; // Your JSON data
import AddPatientModal from "./AddPatientModal";
import PatientTable from "./PatientTable";

const DoctorDashboard = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const handlePatientProgress = (patient) => {
        localStorage.setItem('selectedPatient', JSON.stringify(patient));
        navigate('/patient_progress'); // Navigate to the Progress Page
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 w-full">
            <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Add Patient
            </button>

            {isModalOpen && (
                <AddPatientModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            <PatientTable
                patients={patientsData}
                toggleDropdown={toggleDropdown}
                openDropdown={openDropdown}
                handlePatientProgress={handlePatientProgress}
            />
        </div>
    );
};

export default DoctorDashboard;
