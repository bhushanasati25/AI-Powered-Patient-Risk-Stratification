import React, { useEffect, useState } from "react";

const AddPatientModal = ({ isOpen, onClose }) => {
    const [newPatient, setNewPatient] = useState({
        name: '',
        doctorName: '',
        disease: '',
        medications: [{ name: '', date: '', time: '' }],
        tasks: [{ description: '', dueDate: '' }]
    });

    // Disable background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Disable background scrolling
        } else {
            document.body.style.overflow = 'auto'; // Enable scrolling when modal is closed
        }

        return () => {
            document.body.style.overflow = 'auto'; // Cleanup on unmount
        };
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPatient((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMedicationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMedications = [...newPatient.medications];
        updatedMedications[index][name] = value;
        setNewPatient((prev) => ({
            ...prev,
            medications: updatedMedications
        }));
    };

    const handleTaskChange = (index, e) => {
        const { name, value } = e.target;
        const updatedTasks = [...newPatient.tasks];
        updatedTasks[index][name] = value;
        setNewPatient((prev) => ({
            ...prev,
            tasks: updatedTasks
        }));
    };

    const addMedication = () => {
        setNewPatient((prev) => ({
            ...prev,
            medications: [...prev.medications, { name: '', date: '', time: '' }]
        }));
    };

    const removeMedication = (index) => {
        const updatedMedications = newPatient.medications.filter((_, i) => i !== index);
        setNewPatient((prev) => ({
            ...prev,
            medications: updatedMedications
        }));
    };

    const addTask = () => {
        setNewPatient((prev) => ({
            ...prev,
            tasks: [...prev.tasks, { description: '', dueDate: '' }]
        }));
    };

    const removeTask = (index) => {
        const updatedTasks = newPatient.tasks.filter((_, i) => i !== index);
        setNewPatient((prev) => ({
            ...prev,
            tasks: updatedTasks
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Patient Data:", newPatient);
        onClose();
        setNewPatient({
            name: '',
            doctorName: '',
            disease: '',
            medications: [{ name: '', date: '', time: '' }],
            tasks: [{ description: '', dueDate: '' }]
        });
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
            {/* Background Overlay */}
            <div className={`fixed inset-0 bg-black opacity-30 ${isOpen ? 'block' : 'hidden'}`}></div>
            <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 h-auto max-w-4xl mx-auto mt-10 mb-10 overflow-y-auto max-h-[80vh] opacity-90"> {/* Increased opacity */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Add Patient</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close"
                    >
                        &times; {/* Using × character for close button */}
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                        <input
                            type="text"
                            name="name"
                            value={newPatient.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-3 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
                        <input
                            type="text"
                            name="doctorName"
                            value={newPatient.doctorName}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-3 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Disease</label>
                        <input
                            type="text"
                            name="disease"
                            value={newPatient.disease}
                            onChange={handleInputChange}
                            required
                            className="mt-1 p-3 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Medications</h3>
                    {newPatient.medications.map((medication, index) => (
                        <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50 shadow">
                            <div className="flex justify-between">
                                <label className="block text-sm font-medium text-gray-700">Medication Name</label>
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMedication(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={medication.name}
                                onChange={(e) => handleMedicationChange(index, e)}
                                required
                                className="mt-1 p-3 border border-gray-300 rounded w-full"
                            />
                            <div className="flex space-x-2 mt-2">
                                <div className="w-1/2">
                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={medication.date}
                                        onChange={(e) => handleMedicationChange(index, e)}
                                        required
                                        className="mt-1 p-3 border border-gray-300 rounded w-full"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-sm font-medium text-gray-700">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={medication.time}
                                        onChange={(e) => handleMedicationChange(index, e)}
                                        required
                                        className="mt-1 p-3 border border-gray-300 rounded w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addMedication}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
                    >
                        Add Another Medication
                    </button>

                    <h3 className="text-lg font-semibold mb-2">Tasks</h3>
                    {newPatient.tasks.map((task, index) => (
                        <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50 shadow">
                            <div className="flex justify-between">
                                <label className="block text-sm font-medium text-gray-700">Task Description</label>
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeTask(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <input
                                type="text"
                                name="description"
                                value={task.description}
                                onChange={(e) => handleTaskChange(index, e)}
                                required
                                className="mt-1 p-3 border border-gray-300 rounded w-full"
                            />
                            <div className="mt-2">
                                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={task.dueDate}
                                    onChange={(e) => handleTaskChange(index, e)}
                                    required
                                    className="mt-1 p-3 border border-gray-300 rounded w-full"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addTask}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
                    >
                        Add Another Task
                    </button>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Patient
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPatientModal;
