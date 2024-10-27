// src/Components/DailyTask.js
import React, { useState } from 'react';

// Sample JSON data for multiple days
const dailySchedule = [
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
    {
        day: 3,
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
    {
        day: 4,
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
    {
        day: 5,
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
    {
        day: 6,
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
    }
    // Continue similarly for days 3 to 15...
];

const DailyTask = () => {
    const [currentDay, setCurrentDay] = useState(1);
    const dayData = dailySchedule.find(day => day.day === currentDay);
    const [medications, setMedications] = useState(dayData ? dayData.medications : []);
    const [tasks, setTasks] = useState(dayData ? dayData.tasks : []);
    const [alertMessage, setAlertMessage] = useState('');

    // Utility function to get the current time in "HH:MM AM/PM" format
    const getCurrentTime = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutesStr} ${ampm}`;
    };

    // Function to compare times
    const isTimeBefore = (time) => {
        const currentTime = new Date(`01/01/2000 ${getCurrentTime()}`);
        const taskTime = new Date(`01/01/2000 ${time}`);
        return currentTime < taskTime;
    };

    // Toggle medication completion with time validation
    const toggleMedicationCompletion = (id, time) => {
        if (isTimeBefore(time)) {
            setAlertMessage("You can't complete this medication before the allotted time.");
            return;
        }
        const updatedMedications = medications.map(medication =>
            medication.id === id ? { ...medication, completed: !medication.completed } : medication
        );
        setMedications(updatedMedications);
        setAlertMessage(''); // Clear any previous alert messages
    };

    // Toggle task completion with time validation
    const toggleTaskCompletion = (id, time) => {
        if (isTimeBefore(time)) {
            setAlertMessage("You can't complete this task before the allotted time.");
            return;
        }
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        setAlertMessage(''); // Clear any previous alert messages
    };

    const totalPoints = [...medications, ...tasks].reduce((total, item) => total + (item.completed ? 2 : 0), 0);

    const goToPreviousDay = () => {
        if (currentDay > 1) {
            const previousDay = currentDay - 1;
            setCurrentDay(previousDay);
            updateDataForDay(previousDay);
        }
    };

    const goToNextDay = () => {
        if (currentDay < dailySchedule.length) {
            const nextDay = currentDay + 1;
            setCurrentDay(nextDay);
            updateDataForDay(nextDay);
        }
    };

    const updateDataForDay = (day) => {
        const newDayData = dailySchedule.find(d => d.day === day);
        setMedications(newDayData ? newDayData.medications : []);
        setTasks(newDayData ? newDayData.tasks : []);
    };

    return (
        <div className="p-6 border rounded-lg bg-white shadow-md">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-blue-700">Daily Task [Day {currentDay}]</h2>
                <div>
                    <button
                        onClick={goToPreviousDay}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                        disabled={currentDay === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={goToNextDay}
                        className="text-blue-600 hover:text-blue-800"
                        disabled={currentDay === dailySchedule.length}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Display alert message if any */}
            {alertMessage && (
                <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
                    {alertMessage}
                </div>
            )}

            {/* Medications Section */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-blue-700">Medications</h3>
                <ul className="mt-2 space-y-3">
                    {medications.map(medication => (
                        <li key={medication.id} className="flex justify-between items-center">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={medication.completed}
                                    onChange={() => toggleMedicationCompletion(medication.id, medication.time)}
                                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className={`font-medium ${medication.completed ? 'line-through text-gray-500' : 'text-blue-800'}`}>
                                    {medication.name} - {medication.dosage} ({medication.time})
                                </span>
                            </div>
                            <span className="text-gray-500">{medication.completed ? 2 : 0} Points</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tasks Section */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-blue-700">Tasks</h3>
                <ul className="mt-2 space-y-3">
                    {tasks.map(task => (
                        <li key={task.id} className="flex justify-between items-center">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTaskCompletion(task.id, task.time)}
                                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-blue-800'}`}>
                                    {task.name} ({task.time})
                                </span>
                            </div>
                            <span className="text-gray-500">{task.completed ? 2 : 0} Points</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Total Rewards */}
            <div className="mt-6 font-semibold text-blue-700">
                Total Rewards: {totalPoints} Points
            </div>
        </div>
    );
};

export default DailyTask;

