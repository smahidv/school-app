import React, { useState, useEffect } from "react";

import axiosClient from "../../../axios";

export default function GradeStudentInfo({ info, answertotalGrade }) {
  

    const [allGrades, setAllGrades] = useState({});

    

    const totalGrade = answertotalGrade + info.qsm_grade;

    
    useEffect(() => {
        setAllGrades(prevGrades => ({
            ...prevGrades,
            [info.student_work_id]: totalGrade
        }));
    }, [info.student_work_id, totalGrade]);

   
    const handleStoreGrades = async () => {
        try {
            axiosClient.put('/update-total-grade', allGrades);
        
        } catch (error) {
            console.error("Failed to store grades:", error);
        }
    };

    return (
        <div className="py-8 px-4 basis-[20dvw] min-w-[250px] border-l border-gray-300 bg-gray-50">
            <div className="text-center mb-6">
                <h1 className="capitalize font-semibold text-2xl text-gray-800 mb-2">
                    {info.student_fname} {info.student_lname}
                </h1>
                <img
                    src={info.student_img}
                    alt="Student"
                    className="rounded-full w-32 h-32 mx-auto shadow-lg"
                />
            </div>
            <div className="grid grid-cols-2 gap-4 my-4 mx-4">
                {info.answers.map((q, i) => (
                    <div className="flex gap-2 items-center" key={i}>
                        {q.type !== "text" && (
                            <>
                                <span className="font-medium text-gray-700">Question {i + 1}</span>
                                <svg
                                    id="Object"
                                    className={`fill-current w-4 h-4 ${
                                        q.isCorrect ? "text-green-500" : "text-red-500"
                                    }`}
                                    enableBackground="new 0 0 64 64"
                                    viewBox="0 0 64 64"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="32" cy="32" r="20.625" />
                                </svg>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className="mx-4 mb-6">
                <h2 className="text-lg text-gray-800 font-semibold mb-1">QSM Grade</h2>
                <div className="text-blue-700 font-bold text-2xl">
                    {info.qsm_grade}/20
                </div>
            </div>
            <div className="mx-4 mb-8">
                <h2 className="text-lg text-gray-800 font-semibold mb-1">Total Grade</h2>
                <div className="text-blue-700 font-bold text-2xl border-b border-gray-300 pb-16">
                    <span>
                        {isNaN(answertotalGrade) ? "__" : totalGrade}
                        /20
                    </span>
                </div>
            </div>
            <div className="mt-32 px-4">
                <div className="text-center mb-4">
                    <p className="text-gray-600">
                        Please review all grades before submitting. Once confirmed, click the button below to store grades.
                    </p>
                </div>
                <div className="flex justify-center">
                    <button 
                        onClick={handleStoreGrades}
                        className="capitalize text-xl text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 font-semibold rounded-lg shadow-md focus:ring-4 focus:ring-blue-300 transition duration-200">
                        Update Grades
                    </button>
                </div>
            </div>
        </div>
    );
}
