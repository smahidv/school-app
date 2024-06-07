import React, { useState } from "react";
import GradeStudentInfo from "./GradeStudentInfo";
import PaginationGrading from "./PaginationGrading";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useOutletContext } from "react-router-dom";

export default function StudentWork() {
    const [data, selectedExamIndex] = useOutletContext();
    const selectedExam = data[selectedExamIndex];
    const [selectedStudentWorkIndex, setSelectedStudentWorkIndex] = useState(0);
    const [isWrong, setIsWrong] = useState({});
    const [questionScore, setQuestionScore] = useState({});
    const [answertotalGrade,  setAnswertotalGrade] = useState({});

    function nextStudentWork() {
        setSelectedStudentWorkIndex((prevState) => {
            if (prevState < selectedExam.student_work.length - 1) {
                return prevState + 1;
            } else {
                return prevState;
            }
        });
    }

    function prevStudentWork() {
        setSelectedStudentWorkIndex((prevState) => {
            if (prevState > 0) {
                return prevState - 1;
            } else {
                return prevState;
            }
        });
    }
    const studentWorkId = selectedExam.student_work[selectedStudentWorkIndex].student_work_id;

    const handleGradeChange = (answerId, status, score) => {

        setIsWrong((prevState) => ({
            ...prevState,
            [answerId]: status,
        }));

        setQuestionScore((prevState) => ({
            ...prevState,
            [answerId]: status === "correct" ? score : 0,
        }));

        setAnswertotalGrade((prevState) => {
            const currentTotal = prevState[studentWorkId] || 0;
            const prevScore = questionScore[answerId] || 0;
            const newScore = status === "correct" ? score : 0;
            const newTotal = currentTotal - prevScore + newScore;

            return {
                ...prevState,
                [studentWorkId]: newTotal,                                                                                                             
            };
        });
    };

    console.log(questionScore);
    console.log(answertotalGrade);

    return (
        <div className="flex">
            <div className="flex-grow p-10 pt-20">
                {selectedExam.student_work[selectedStudentWorkIndex].answers.map((q, i) => (
                    <div key={i} className="space-y-5 mb-16">
                        <div className="pb-6 border-b-[2px] border-purple-500">
                            <div className="text-xl text-gray-800 font-semibold">
                                Question {q.question_id}
                            </div>
                        </div>
                        <p className="text-gray-700 font-semibold text-lg pt-8 capitalize">
                            {q.question}
                        </p>
                        <div
                            className={`flex gap-8 p-4 bg-gray-50 ${
                                isWrong[q.answer_id] === "wrong"
                                    ? "bg-red-50"
                                    : isWrong[q.answer_id] === "correct" && "bg-green-50"
                            }`}
                        >
                            <p className="bg-white px-4 py-2 shadow-md text-blue-900 font-bold capitalize text-lg max-w-[600px] w-[600px] h-fit self-center rounded-md">
                                {q.answer}
                            </p>

                            <div className="space-y-6">
                                <button
                                    className={`block ${
                                        isWrong[q.answer_id] === "correct" ? "pointer-events-none" : ""
                                    }`}
                                    onClick={() => handleGradeChange(q.answer_id, "correct", q.score)}
                                    type="button"
                                >
                                    <CheckIcon
                                        className={`w-9 text-green-500" ${
                                            isWrong[q.answer_id] === "correct" ? "text-gray-400" : "text-green-500"
                                        }`}
                                    />
                                </button>
                                <button
                                    className={`block ${
                                        isWrong[q.answer_id] === "wrong" ? "pointer-events-none" : ""
                                    }`}
                                    onClick={() => handleGradeChange(q.answer_id, "wrong", q.score)}
                                    type="button"
                                >
                                    <XMarkIcon
                                        className={`w-9 text-red-500" ${
                                            isWrong[q.answer_id] === "wrong" ? "text-gray-400" : "text-red-500"
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="space-x-5 p-4 rounded-sm mt-6">
                            <span className="text-gray-700 font-semibold text-xl">
                                Answer Score
                            </span>
                            <span className="text-xl text-blue-700 font-bold">
                                {isWrong[q.answer_id] === "wrong" ? 0 : isWrong[q.answer_id] === "correct" ? q.score : "__"}
                            </span>
                        </div>
                    </div>
                ))}
                <PaginationGrading
                    prevPage={prevStudentWork}
                    nextPage={nextStudentWork}
                    currentPage={selectedStudentWorkIndex}
                    Pagelength={selectedExam.student_work.length}
                />
            </div>

            <GradeStudentInfo
                info={selectedExam.student_work[selectedStudentWorkIndex]}
                answertotalGrade={answertotalGrade[studentWorkId]}
            />
        </div>
    );
}
