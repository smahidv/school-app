import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import axiosClient from "../../../axios";
import { useClassModuleContext } from "../../../contexts/FindExamByClassModuleProvider";

export default function TeacherGradeLayout() {
    const [selectedExamIndex, setselectedExamIndex] = useState(0);
    const [data, setData] = useState(false);
    const {  classModule } = useClassModuleContext();

    useEffect(() => {
        axiosClient
            .get(`getAnswers?module_id=${classModule.module_id}&class_id=${classModule.class_id}`)
            .then(({ data }) => {
                setData(data);
            });
    }, []);

    return (
        <>
            {data && data.length > 0 && (
                <div>
                    <div className="flex  m-6 mr-10  outline outline-1 outline-gray-200 rounded-sm items-stretch overflow-auto">
                        <div className="basis-[12dvw] min-w-[90px] bg-gray-50 flex-grow-0 flex-shrink-0  border-r-[1px] border-solid border-r-gray-200">
                            <div className="m-4 mt-40 space-y-8 ">
                                {data.map((exam, index) => (
                                    <div
                                        key={index}
                                        onClick={() =>
                                            setselectedExamIndex(index)
                                        }
                                        className={`cursor-pointer  text-gray-900 py-1 rounded-md px-4 relative shadow-md transition-all duration-300 ${
                                            selectedExamIndex === index
                                                ? "bg-blue-100"
                                                : "bg-white"
                                        }`}
                                    >
                                        <span className="absolute inset-y-0 left-0 w-2 bg-blue-700 rounded-l-md "></span>
                                        <span className="capitalize text-lg font-bold text-gray-600 ">
                                            {exam.semester} exam {exam.exam_id}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full overflow-auto">
                            <div className="relative pl-20 pt-6 pb-4 w-full space-x-16  border-b-[1px] border-solid border-b-gray-200">
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
                         

                            <Outlet context={[data, selectedExamIndex]} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
