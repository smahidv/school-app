import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function TeacherClass() {
    return (
        <>
            <div className="p-4 flex gap-3 bg-slate-200">
                <Link to="/t/c/w">Exam</Link>
                <Link to="/t/c/p">Peaple</Link>
                <Link>Grades</Link>
            </div>
            <Outlet />
        </>
    );
}
