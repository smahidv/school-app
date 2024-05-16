import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function TeacherClass() {
    return (
        <>
            <div className=" flex items-center  bg-slate-200">
                   <Link to="/t"><svg id="Layer_1" className="w-5 m-4" enableBackground="new 0 0 512 512"  viewBox="0 0 512 512"xmlns="http://www.w3.org/2000/svg"><g id="Layer_2_00000124144133331797538500000013861068849108152213_"><g id="_04.home"><path d="m492.5 294.3c-10.6 7.3-22 9.1-34.8 8.5-.1 52.7.4 104.3-.3 156.8-.5 28-24.4 51.5-52.4 52s-56.1.2-84.2.1c-9 0-15-6.5-15-16.1-.1-23.7 0-47.4-.1-71.1 0-15.6 0-31.3 0-46.9-.1-16.1-10.2-26.4-26.5-26.6-15.3-.2-30.6-.2-45.9 0-15.9.2-26.1 10.6-26.1 26.5-.1 38.7-.1 77.3-.1 116 0 12.9-5.4 18.3-18.4 18.3-25.4 0-50.8 0-76.2 0-33.5-.1-57.3-23.5-57.5-57.1-.2-50.6-.1-101.3-.1-151.9-46.4 4.4-73.4-47.8-40.2-81.5 68.6-68.6 137.2-137.2 205.9-205.7 4.3-4.5 9.3-8.2 14.8-11.2 16-8 40.9-5.5 56.1 10.1 38.5 39.5 77.8 78.2 116.8 117.2 29.9 30 59.6 60.2 90 89.8 20 19.5 18.1 56.9-5.8 72.8z"/></g></g></svg></Link>
                <Link to="/t/c/:classId/:moduleId"><div className="font-semibold text-xl text-gray-700 capitalize hover:bg-slate-50 p-4">Exam</div></Link>
                <Link to="/t/c/p"><div className="font-semibold text-xl text-gray-700 capitalize hover:bg-slate-50 p-4">peaple</div></Link>
                <Link><div className="font-semibold text-xl text-gray-700 capitalize hover:bg-slate-50 p-4">grades</div></Link>
            </div>
            <Outlet />
        </>
    );
}
