import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./components/Auth";
import FileUpload from "./components/FileUpload";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { BrowserRouter as Navigate } from "react-router-dom";



const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? (
        <>
            <Navbar />  {/* Show Navbar for authenticated pages */}
            {children}
        </>
    ) : (
        <Navigate to="/" /> // ✅ Navigate works now
    );
};
function App() {
    return (
        <Router>
            <div className="container mt-5">
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/fileupload" element={<PrivateRoute><FileUpload /></PrivateRoute>} /> {/* New Route */}
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
