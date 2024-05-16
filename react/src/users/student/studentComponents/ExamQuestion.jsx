import { CheckIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

export default function ExamQuestion({ questions, currentPage }) {
    const [answers, setAnswers] = useState({
        question_id: null,
        answer: [],
    });
    return (
        <>
            {questions &&
                questions.map((question) => (
                    <div
                        key={question.id}
                        className="space-y-8 border-t-solid border-t-[1.5px] border-gray-400 w-[80dvw] mt-24 mb-10"
                    >
                        <div className="p-6 bg-gray-100 shadow-sm">
                            <p className="font-bold text-gray-700 ">
                                Question {currentPage}
                            </p>
                            <p className="text-gray-700">{question.question}</p>
                        </div>
                        <div className="p-6 bg-gray-100 shadow-sm space-y-7 border-t-solid border-t-[1.5px] border-gray-400">
                            {question.options &&
                                question.options.map((opt, i) => (
                                    <div
                                        key={i}
                                        className="flex gap-4 items-center"
                                    >
                                        <div className="relative rounded-full flex items-center justify-center aspect-square min-w-[30px] bg-gray-500 text-white border-solid border-white border-[2px] font-semibold  ">
                                            <label htmlFor="option">
                                                {" "}
                                                {String.fromCharCode(65 + i)}
                                            </label>

                                            <input
                                                className="absolute bottom-[-15%] right-[-15%]   rounded-sm focus:ring-0  text-purple-600 border-none "
                                                type="checkbox"
                                                id="option"
                                            />
                                        </div>
                                        <div className=" text-gray-700">
                                            {opt.option}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
        </>
    );
}
