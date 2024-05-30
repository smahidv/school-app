import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function TeacherGradeLayout() {
    return (
        <div className="flex  m-6 mr-10  outline outline-1 outline-gray-200 rounded-sm items-stretch overflow-auto">
            <div className="basis-[12dvw] min-w-[90px] bg-gray-50 flex-grow-0 flex-shrink-0  border-r-[1px] border-solid border-r-gray-200">
                <div className="m-4 mt-20">
                    <div className="cursor-pointer bg-white text-gray-900   py-1 rounded-md px-4 relative shadow-md hover:bg-blue-50  transition-all duration-300">
                        <span className="absolute inset-y-0 left-0 w-1 bg-blue-400 rounded-l-md"></span>
                       <span className=" capitalize text-lg font-bold"> s1-exam 1</span>
                    </div>



                </div>
            </div>
            <div className="w-full">
                <div className="relative pl-20 pt-6 pb-4 space-x-16  border-b-[1px] border-solid border-b-gray-200">
                    <NavLink
                        className={({ isActive }) =>
                            ` capitalize text-lg text-primary hover:text-blue-700 ${
                                isActive
                                    ? "after:absolute text-blue-700 after:w-[120px] after:bottom-[-2px] after:rounded-md after:left-[45px] after:h-1 after:bg-blue-600"
                                    : ""
                            }`
                        }
                        to="/t/c/g/studentWork"
                    >
                        Student work
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            ` capitalize text-lg text-primary  ${
                                isActive
                                    ? "after:absolute text-blue-700 after:w-[120px] after:bottom-[-2px] after:rounded-md after:left-[165px] after:h-1 after:bg-blue-600"
                                    : ""
                            }`
                        }
                        to="/t/c/g/grading"
                    >
                        Grades
                    </NavLink>
                </div>
             
                    <Outlet />
     
            </div>
        </div>
    );
}
