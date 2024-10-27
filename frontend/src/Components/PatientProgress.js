import React, { useEffect, useState } from "react";

// Function to update daily schedule completion status based on risk level
const updateCompletionStatus = (dailySchedule, riskLevel) => {
    const completionProbability = {
        'High': 0.3,    // 30% chance of completion
        'Medium': 0.5,  // 50% chance of completion
        'Low': 0.8      // 80% chance of completion
    };

    const probability = completionProbability[riskLevel] || 0.5;

    const markCompleted = () => Math.random() < probability;

    const updatedSchedule = dailySchedule.map(day => {
        const updatedMedications = day.medications.map(medication => ({
            ...medication,
            completed: markCompleted()
        }));

        const updatedTasks = day.tasks.map(task => ({
            ...task,
            completed: markCompleted()
        }));

        return {
            ...day,
            medications: updatedMedications,
            tasks: updatedTasks
        };
    });

    return updatedSchedule;
};

// Mocked patient data with daily schedule
const patientData = {
    name: "Raj",
    disease: "Hypertension",
    appointment_date: "25 Sep 2024",
    reward_points: 75,
    risk: "Medium",
    dailySchedule: [
        {
            day: 1,
            medications: [
                { id: 1, name: 'Aspirin', dosage: '81 mg', time: '8:00 AM', instructions: 'Take with water after breakfast', completed: false },
                { id: 2, name: 'Clopidogrel', dosage: '75 mg', time: '8:00 AM', instructions: 'Take with water', completed: false },
                { id: 3, name: 'Atorvastatin', dosage: '20 mg', time: '8:00 PM', instructions: 'Take before bedtime', completed: false }
            ],
            tasks: [
                { id: 1, name: 'Blood Pressure Monitoring', time: '8:00 AM', instructions: 'Record blood pressure', completed: false },
                { id: 2, name: '30 minutes of light walking', time: '5:00 PM', instructions: 'Ensure a safe, level walking area', completed: false }
            ]
        },
        {
            day: 2,
            medications: [
                { id: 1, name: 'Aspirin', dosage: '81 mg', time: '8:00 AM', instructions: 'Take with water after breakfast', completed: false },
                { id: 2, name: 'Clopidogrel', dosage: '75 mg', time: '8:00 AM', instructions: 'Take with water', completed: false },
                { id: 3, name: 'Atorvastatin', dosage: '20 mg', time: '8:00 PM', instructions: 'Take before bedtime', completed: false },
                { id: 4, name: 'Lisinopril', dosage: '10 mg', time: '9:00 AM', instructions: 'Take with or without food', completed: false }
            ],
            tasks: [
                { id: 1, name: 'Blood Pressure Monitoring', time: '8:00 AM', instructions: 'Record blood pressure', completed: false },
                { id: 2, name: 'Arm and leg stretching exercises', time: '10:00 AM', instructions: 'Do for 15-20 minutes', completed: false }
            ]
        },
    ]
};

const PatientProgress = () => {
    const [patient, setPatient] = useState(patientData);
    const [riskLevel, setRiskLevel] = useState("Medium");
    const [currentDay, setCurrentDay] = useState(1);

    useEffect(() => {
        // Update daily schedule based on risk level when the component mounts
        const updatedSchedule = updateCompletionStatus(patient.dailySchedule, riskLevel);
        setPatient(prevState => ({
            ...prevState,
            dailySchedule: updatedSchedule
        }));
    }, [riskLevel]);

    const currentSchedule = patient.dailySchedule.find(day => day.day === currentDay);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-6">Patient Progress</h1>

            <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Patient: {patient.name}</h2>
                <p className="text-lg mb-2">Disease: {patient.disease}</p>
                <p className="text-lg mb-2">Appointment Date: {patient.appointment_date}</p>
                <p className="text-lg mb-4">Reward Points: {patient.reward_points}</p>

                {/* Daily Schedule */}
                <h3 className="text-xl font-bold mt-6 mb-4">Day {currentDay} Schedule</h3>

                {currentSchedule ? (
                    <>
                        {/* Medications */}
                        <h4 className="text-lg font-semibold mb-2">Medications:</h4>
                        {currentSchedule.medications.map((med) => (
                            <div key={med.id} className="flex justify-between items-center mb-3">
                                <div>
                                    <p>{med.name} - {med.dosage} at {med.time}</p>
                                    <p className="text-sm text-gray-500">{med.instructions}</p>
                                </div>
                                <button
                                    className={`ml-4 px-4 py-2 rounded text-white ${med.completed ? "bg-green-500" : "bg-red-500"}`}
                                >
                                    {med.completed ? "Completed" : "Not Completed"}
                                </button>
                            </div>
                        ))}

                        {/* Tasks */}
                        <h4 className="text-lg font-semibold mt-4 mb-2">Tasks:</h4>
                        {currentSchedule.tasks.map((task) => (
                            <div key={task.id} className="flex justify-between items-center mb-3">
                                <div>
                                    <p>{task.name} at {task.time}</p>
                                    <p className="text-sm text-gray-500">{task.instructions}</p>
                                </div>
                                <button
                                    className={`ml-4 px-4 py-2 rounded text-white ${task.completed ? "bg-green-500" : "bg-red-500"}`}
                                >
                                    {task.completed ? "Completed" : "Not Completed"}
                                </button>
                            </div>
                        ))}

                        {/* Navigation for Days */}
                        <div className="mt-6">
                            <button
                                onClick={() => setCurrentDay(currentDay - 1)}
                                disabled={currentDay === 1}
                                className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
                            >
                                Previous Day
                            </button>
                            <button
                                onClick={() => setCurrentDay(currentDay + 1)}
                                disabled={currentDay === patient.dailySchedule.length}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Next Day
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No schedule available for this day.</p>
                )}
            </div>
        </div>
    );
};

export default PatientProgress;
