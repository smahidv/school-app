import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useClassModuleContext } from "../../../contexts/FindExamByClassModuleProvider";

export default function TeacherGradeLayout() {
    

    const [selectedExamIndex, setselectedExamIndex] = useState(0);
    const data = [
        {
            exam_id: 15,
          
            semester: 1,
            student_work: [
                {
                    student_work_id: 56,
                    qsm_grade: 9,
                    student_id: "2024-0016",
                    student_fname: "mohamed",
                    student_lname: "alal",
                    answers: [
                        {
                            question_id: 57,
                            answer: "this is mohamed answer",
                            question:"question",
                            score: 5,
                            isCorrect: 0,
                            answer_id:1
                        },
                        {
                            question_id: 58,
                            score: 4,
                            isCorrect: 1,
                            question:"question",
                            answer: "this is mohamed answer",
                            answer_id:2
                        },
                    ],
                },
                {
                    student_work_id: 57,
                    qsm_grade: 8,
                    student_id: "2024-0017",
                    student_fname: "hadid",
                    student_lname: "moni",
                    answers: [
                        {
                            question_id: 57,
                            question:"question",
                            answer: "this is my answer",
                            score: 5,
                            isCorrect: 1,
                            answer_id:3
                        },
                        {
                            question_id: 58,
                            score: 4,
                            isCorrect: 1,
                            question:"question",
                            answer: "this is another answer",
                            answer_id:4                        },
                    ],
                },
            ],
        },

        {
            exam_id: 16,
            semester: 2,
            student_work: [
                {
                    student_work_id: 58,
                    qsm_grade: 7,
                    student_id: "2024-0017",
                    student_fname: "zahira",
                    student_lname: "badi",
                    answers: [
                        {
                            question_id: 66,
                            question:"question",
                            answer: "this is my answer",
                            score: 5,
                            isCorrect: 1,
                            answer_id:5
                        },
                        {
                            question_id: 61,
                            question:"question",
                            score: 4,
                            isCorrect: 1,
                            answer: "this is another answer",
                            answer_id:7
                        },
                    ],
                },
                {
                    student_work_id: 59,
                    qsm_grade: 6,
                    student_id: "2024-0018",
                    student_fname: "malak",
                    student_lname: "fassi",
                    answers: [
                        {
                            question_id: 60,
                            question:"question",
                            answer: "this is my answer",
                            score: 5,
                            isCorrect: 0,
                            answer_id:8
                        },
                        {
                            question_id: 61,
                            question:"question",
                            score: 4,
                            isCorrect: 0,
                            answer: "this is another answer",
                            answer_id:9
                        }
                    ],
                },
            ],
        },
    ];


    return (
        <>
          
                <div>
                    <div className="flex  m-6 mr-10  outline outline-1 outline-gray-200 rounded-sm items-stretch overflow-auto">
                        <div className="basis-[12dvw] min-w-[90px] bg-gray-50 flex-grow-0 flex-shrink-0  border-r-[1px] border-solid border-r-gray-200">
                            <div className="m-4 mt-40 space-y-8 ">
                            {data.map((exam,index) => (
                                <div 
                                key={index}
                                onClick={()=>( setselectedExamIndex(index))}

                                className="cursor-pointer bg-white  text-gray-900   py-1 rounded-md px-4 relative shadow-md hover:bg-blue-50  transition-all duration-300">
                                    <span className="absolute inset-y-0 left-0 w-1 bg-blue-400 rounded-l-md"></span>
                                    <span className=" capitalize text-lg font-bold">
                                        s{exam.semester}-exam {exam.exam_id}
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

                            <Outlet context={[data,selectedExamIndex]}/>
                        </div>
                    </div>
                </div>
       
        </>
    );
}
