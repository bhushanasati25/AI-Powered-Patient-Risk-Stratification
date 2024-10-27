// src/Components/Signup.js
import React, { useState } from "react";

function Signup() {
    const [userType, setUserType] = useState("patient"); // "patient" or "doctor"

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        password: ""
    });

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup Data", { userType, ...formData });
    };


    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Signup</h2>

            {/* User Type Selection */}
            <div className="mb-4">
                <label className="mr-2">
                    <input
                        type="radio"
                        value="patient"
                        checked={userType === "patient"}
                        onChange={handleUserTypeChange}
                        className="mr-1"
                    />
                    Patient
                </label>
                <label className="ml-4">
                    <input
                        type="radio"
                        value="doctor"
                        checked={userType === "doctor"}
                        onChange={handleUserTypeChange}
                        className="mr-1"
                    />
                    Doctor
                </label>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                {/* Doctor-specific Fields */}
                {userType === "doctor" && (
                    <>
                        <input
                            type="text"
                            name="specialization"
                            placeholder="Specialization"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="licenseNumber"
                            placeholder="License Number"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Signup
                </button>
            </form>
        </div>
    );
}

export default Signup;
