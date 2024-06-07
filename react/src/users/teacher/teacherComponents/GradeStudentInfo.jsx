import React from "react";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function GradeStudentInfo({ info,  answertotalGrade}) {
    const { currentUser } = useStateContext();

    return (
        <div className="p-8 basis-[20dvw] min-w-[200px] border-l border-gray-200">
         
            <div>
                <div className="text-center mb-6">
                    <h1 className="capitalize font-semibold text-2xl text-gray-700 mb-2">
                        {info.student_fname}{" "}{info.student_lname}
                    </h1>
                    <img
                        src={`http://localhost:8000/${currentUser.image}`}
                        alt="Student"
                        className="rounded-full w-32 h-32 mx-auto"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 my-4">
                    <div className="flex gap-2">
                        <span>Question1</span>
                        <svg
                            id="Object"
                            className="text-green-400 fill-current w-4"
                            enableBackground="new 0 0 64 64"
                            viewBox="0 0 64 64"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="32" cy="32" r="20.625" />
                        </svg>
                    </div>
                    <div className="flex gap-2">
                        <span>Question2</span>
                        <svg
                            id="Object"
                            className="text-red-400 fill-current w-4"
                            enableBackground="new 0 0 64 64"
                            viewBox="0 0 64 64"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="32" cy="32" r="20.625" />
                        </svg>
                    </div>
                    <div className="flex gap-2">
                        <span>Question3</span>
                        <svg
                            id="Object"
                            className="text-red-400 fill-current w-4"
                            enableBackground="new 0 0 64 64"
                            viewBox="0 0 64 64"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="32" cy="32" r="20.625" />
                        </svg>
                    </div>
                    <div className="flex gap-2">
                        <span>Question4</span>
                        <svg
                            id="Object"
                            className="text-red-400 fill-current w-4"
                            enableBackground="new 0 0 64 64"
                            viewBox="0 0 64 64"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="32" cy="32" r="20.625" />
                        </svg>
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg text-gray-700 font-semibold mb-1">
                        QSM Grade
                    </h2>
                    <div className="text-blue-700 font-bold text-2xl">
                        {info.qsm_grade}/20
                    </div>
                </div>
                <div>
                    <h2 className="text-lg text-gray-700 font-semibold mb-1">
                        Total Grade
                    </h2>
                    <div className="text-blue-700 font-bold text-2xl">
                    {isNaN(answertotalGrade) ? "__" : (answertotalGrade + info.qsm_grade)}/20
                    </div>
                </div>
            </div>
         
        </div>
    );
}
