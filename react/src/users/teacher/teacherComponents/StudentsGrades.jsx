import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axiosClient from "../../../axios";
import { useClassModuleContext } from "../../../contexts/FindExamByClassModuleProvider";
import StatisticGrades from "./StatisticGrades";

export default function StudentsGrades() {
    const [data, selectedExamIndex] = useOutletContext();
    const selectedExam = data[selectedExamIndex];
    const { classModule } = useClassModuleContext();
    const [grades, setGrades] = useState(false);

    useEffect(() => {
        axiosClient
            .get(
                `getGrades?student_class_room_id=${classModule.class_id}&exam_id=${selectedExam.exam_id}`
            )
            .then((response) => {
                setGrades(response.data);
            })
            .catch((error) => {
                console.error("Error fetching grades:", error);
            });
    }, [selectedExamIndex]);

    return (
        <div className="grid grid-cols-2">
            <div className="p-10 relative overflow-x-auto shadow-md ">
                <button
                    type="button"
                    className="text-semibold text-xl bg-green-700 text-white block ml-auto px-5 py-1 rounded-md"
                >
                    Publish
                </button>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-2xl font-bold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        {selectedExam.semester} - Exam {selectedExam.exam_id}
                    </caption>
                    <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                STUDENT
                            </th>
                            <th scope="col" className="px-6 py-3">
                                SID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                GRADES
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades &&
                            grades.length > 0 &&
                            grades.map((g, i) => (
                                <tr
                                    key={i}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <th
                                        scope="row"
                                        className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {g.first_name} {g.last_name}
                                    </th>
                                    <td className="px-6 py-4">{g.matricule}</td>
                                    <td className="px-6 py-4 font-bold text-xl text-green-700">
                                        {g.total_exam_grade}/20
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {grades.length > 0 && <StatisticGrades grades={grades} />}
        </div>
    );
}
