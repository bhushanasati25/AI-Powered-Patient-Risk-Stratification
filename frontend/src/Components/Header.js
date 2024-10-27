// src/Components/Header.js
import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-blue-800 p-4 text-white flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-semibold">App Name</h1>
            <nav className="space-x-6">

                <Link to="/doctor_dashboard">Doctor Dashboard</Link>

                <Link
                    to="/signup"
                    className="text-blue-200 hover:text-white"
                >
                    Signup
                </Link>
                <Link
                    to="/login"
                    className="text-blue-200 hover:text-white"
                >
                    Login
                </Link>
            </nav>
        </header>
    );
}

export default Header;
