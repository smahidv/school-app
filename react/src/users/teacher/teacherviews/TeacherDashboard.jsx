import React from "react";
import { NavLink } from "react-router-dom";

export default function TeacherDashboard() {
    return (
        <div className="m-6">
<div className="grid">
    <NavLink 
    to="/teacher/c/w"
    className="p-4 max-w-[200px]  h-[100px] border-solid border-black border-[1px] hover:shadow-md">
        <p>4IIR</p>
        <p>data lining</p>
    </NavLink>
    </div>
    </div>
    );
}
