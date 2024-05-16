import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosClient from "../../../axios";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

export default function TeacherDashboard() {
    const [teacherClass, setTeacherClass] = useState();
    const [loading, setLoading] = useState(false);

    function getClasses() {
        axiosClient.get("/TeacherClassModule").then(({ data }) => {
            setLoading(false);
            setTeacherClass(data);
        });
    }

    useEffect(() => {
        setLoading(true);
        getClasses();
    }, []);

    return (
        <div className="m-6">
            {loading ? (
                <div className="grid md:grid-cols-4 ">
                    <div className="w-[250px] h-[250px] rounded-md animate-pulse bg-gray-200"></div>
                    <div className="w-[250px] h-[250px] rounded-md animate-pulse bg-gray-200"></div>
                    <div className="w-[250px] h-[250px] rounded-md animate-pulse bg-gray-200"></div>
                    <div className="w-[250px] h-[250px] rounded-md animate-pulse bg-gray-200"></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 gap-8">
                    {teacherClass &&
                        teacherClass.map((classItem, i) => (
                            <div
                                key={i}
                                className="border-solid border-gray-200 border-[1px] rounded-sm hover:shadow-md max-w-[300px]"
                            >
                                <div className="bg-[rgb(54,71,79)] pb-10 pt-4">
                                <p className="px-4  text-xl font-semibold text-white">{classItem.class_name}</p>
                                <p className=" px-4 text-xl font-semibold text-white capitalize">{classItem.module_name}</p>

                                </div>
<div className="w-fit ml-auto  p-4 mt-6 ">
                                <NavLink to={`/t/c/${classItem.class_id}/${classItem.module_id}`}>
                                    <ArrowTopRightOnSquareIcon className="w-8 text-gray-700"/>
                                </NavLink>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
