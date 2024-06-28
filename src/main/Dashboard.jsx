import React from "react";
import "../main/dashboard.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="screen">
                <Navbar/>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;