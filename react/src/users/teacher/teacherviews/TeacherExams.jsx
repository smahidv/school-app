import React, { useEffect, useState } from "react";
import axiosClient from "../../../axios";
import { PencilIcon } from "@heroicons/react/24/outline";
import { NavLink, useParams } from "react-router-dom";

export default function ExamTable() {
    const [exams, setExams] = useState([]);
    const { classId, moduleId } = useParams();
    const [loading, setLoading] = useState(false);

    function getClassExams() {
        axiosClient
            .get(`/teacher-exams?classRoomId=${classId}&moduleId=${moduleId}`)
            .then(({ data }) => {
                setLoading(false);
                setExams(data.data);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching exams:", error);
            });
    }

    useEffect(() => {
        setLoading(true);
        getClassExams();
    }, []);

    return (
        <div className="overflow-auto mb-5">
            <div className="max-w-full px-3 mb-6 w-full mx-auto">
                <div className="flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white mt-5">
                    <div className="flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                        <h3 className="px-9 pt-5 flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                            <span className="mr-3 font-semibold text-dark">
                                Exams
                            </span>
                            {exams.length > 0 && (
                                <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                                    All exams from
                                    <span className="font-semibold text-primary underline mx-3 cursor-pointer">
                                        {exams[0].class}
                                    </span>
                                    <span className="font-semibold text-primary underline cursor-pointer">
                                        {exams[0].module}
                                    </span>
                                </span>
                            )}
                        </h3>

                        <div className="flex-auto block py-8 pt-6 px-9">
                            <div className="overflow-x-auto">
                                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                    <thead className="align-bottom">
                                        <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                            <th className="pb-3 text-start max-w-[10px]"></th>
                                            <th className="pb-3 text-start max-w-[10px]">
                                                ID
                                            </th>

                                            <th className="pb-3 text-start min-w-[175px]">
                                                FROM
                                            </th>
                                            <th className="pb-3 text-start min-w-[175px]">
                                                TILL
                                            </th>
                                            <th className="pb-3 text-end min-w-[100px]">
                                                SEMESTER
                                            </th>
                                            <th className="pb-3 min-w-[175px]">
                                                STATUS
                                            </th>
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading && (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center"
                                                >
                                                    <div className="flex justify-center items-center my-5 text-gray-900 text-xl animate-pulse">
                                                        <span>loading...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {exams && exams.length > 0 ? (
                                            exams.map((exam, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-b border-dashed last:border-b-0"
                                                >
                                                    <td className="p-3 pl-0">
                                                        <NavLink
                                                            to={`/t/exam/${exam.exam_id}`}
                                                            className="font-semibold text-light-inverse text-md/normal"
                                                        >
                                                            <PencilIcon className="w-4" />
                                                        </NavLink>
                                                    </td>
                                                    <td className="p-3 pl-0 font-bold text-light-inverse text-md/normal underline">
                                                        {exam.exam_id}
                                                    </td>
                                                    <td className="p-3 pl-0">
                                                        <span className="font-semibold text-light-inverse text-md/normal">
                                                            {exam.enable_date}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 pl-0 text-start">
                                                        <span className="font-semibold text-light-inverse text-md/normal">
                                                            {exam.expire_date}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 pr-0 text-end">
                                                        <span className="font-semibold text-light-inverse text-md/normal">
                                                            {exam.semester}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 pr-0 text-center">
                                                        <span
                                                            className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg ${
                                                                exam.status ===
                                                                "Ongoing"
                                                                    ? "text-primary bg-primary-light"
                                                                    : exam.status ===
                                                                      "Finished"
                                                                    ? "text-danger bg-danger-light"
                                                                    : exam.status ===
                                                                      "Upcoming"
                                                                    ? "text-success bg-success-light"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {exam.status}
                                                        </span>
                                                    </td>
                                              
                                              
                                                </tr>
                                            ))
                                        ) : !loading ? (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-xl text-gray-700 flex justify-center mt-6"
                                                >
                                                    No exams created
                                                </td>
                                            </tr>
                                        ) : (
                                            ""
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
