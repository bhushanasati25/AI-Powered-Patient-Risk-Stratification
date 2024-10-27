
import React, { useState, useEffect } from 'react';
import ColumnChart from '../Components/ColumnChart';
import PieChart from '../Components/PieChart';
import DailyTask from '../Components/DailyTask';
import { CanvasJSChart } from 'canvasjs-react-charts';

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

];


const Dashboard = () => {

    const [currentDay, setCurrentDay] = useState(1);
    const [medications, setMedications] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [weeklyPoints, setWeeklyPoints] = useState(() => {
        const savedPoints = localStorage.getItem('weeklyPoints');
        return savedPoints ? JSON.parse(savedPoints) : 0;
    });


    useEffect(() => {
        const dayData = dailySchedule.find(day => day.day === currentDay);
        setMedications(dayData ? dayData.medications : []);
        setTasks(dayData ? dayData.tasks : []);
    }, [currentDay]);

    useEffect(() => {
        localStorage.setItem('weeklyPoints', JSON.stringify(weeklyPoints));
    }, [weeklyPoints]);

    useEffect(() => {
        const totalPoints = calculateTotalPoints();
        setWeeklyPoints(totalPoints);
    }, [medications, tasks]); // Recalculate points when medications or tasks change

    const calculateTotalPoints = () => {
        return [...medications, ...tasks].reduce((total, item) => total + (item.completed ? 2 : 0), 0);
    };

    const options = {
        animationEnabled: true,
        title: {
            text: "Risk Factor Progress"
        },
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}%",
            dataPoints: [
                { name: "Completed Points", y: weeklyPoints },
                { name: "Remaining", y: 100 - weeklyPoints }
            ]
        }]
    };

    return (
        <div className="p-4 bg-blue-50 min-h-screen">
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Left Section */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="p-6 border rounded-lg bg-white shadow-md">
                        <h2 className="text-xl font-semibold text-blue-700 mb-4">Patient Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-gray-600">Patient Name</p>
                                <p className="font-medium text-blue-800">Jitesh Gadage</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Disease</p>
                                <p className="font-medium text-blue-800">Hypertension</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Doctor</p>
                                <p className="font-medium text-blue-800">Dr. Raj Kale</p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="p-6 border rounded-lg bg-white shadow-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-blue-700">Daily Task [Week One]</h2>
                            <button className="text-blue-600 hover:text-blue-800">^</button>
                        </div>
                        <ul className="mt-4 space-y-3">
                            <li className="flex justify-between items-center">
                                <span className="font-medium text-blue-800">Drink 4L water daily</span>
                                <span className="text-gray-500">7:00 AM</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="font-medium text-blue-800">Take XYZ Medicines</span>
                                <span className="text-gray-500">8:00 AM</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="font-medium text-blue-800">Exercise</span>
                                <span className="text-gray-500">9:00 AM</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="font-medium text-blue-800">Task XYZ</span>
                                <span className="text-gray-500">10:00 AM</span>
                            </li>
                        </ul>
                    </div> */}

                    <DailyTask />


                </div>

                {/* Right Section */}
                <div className="space-y-4">
                    <div className="p-6 border rounded-lg bg-blue-100 shadow-md text-center">
                        <p className="text-blue-700">Risk</p>
                        <p className="text-lg font-semibold text-red-600 mt-2">High</p>
                    </div>
                    <div className="p-6 border rounded-lg bg-blue-100 shadow-md text-center">
                        <p className="text-blue-700">Next Date of Appointment</p>
                        <p className="text-lg font-semibold mt-2">Nov 10, 2024</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-white shadow-md">

                        <CanvasJSChart options={options} />

                    </div>
                    {/* <div className="p-4 border rounded-lg bg-white shadow-md">
                        <ColumnChart />
                    </div> */}


                </div>
            </div>
        </div>
    );
};


export default Dashboard;
