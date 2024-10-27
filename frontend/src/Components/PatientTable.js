import React from "react";

const PatientTable = ({ patients, toggleDropdown, openDropdown, handlePatientProgress }) => {
    return (
        <main className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left">Name</th>
                        <th className="px-6 py-4 text-left">Diseases</th>
                        <th className="px-6 py-4 text-left">Appointment Date</th>
                        <th className="px-6 py-4 text-left">Risk</th>
                        <th className="px-6 py-4 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={index} className="border-b">
                            <td className="px-6 py-4">{patient.name}</td>
                            <td className="px-6 py-4">{patient.disease}</td>
                            <td className="px-6 py-4">{patient.appointment_date}</td>
                            <td
                                className={`px-6 py-4 ${patient.risk === "High" ? "text-red-500" : "text-green-500"
                                    }`}
                            >
                                {patient.risk}
                            </td>
                            <td className="px-6 py-4">
                                <div className="relative">
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        View Options
                                    </button>
                                    {openDropdown === index && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                            <ul>
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handlePatientProgress(patient)}
                                                >
                                                    See Patient's Progress
                                                </li>
                                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                    See Resource Allocation
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default PatientTable;
