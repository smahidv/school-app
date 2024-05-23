import React from "react";

export default function QuestionOptions({
    handleAnswerChange,
    answers,
    question,
}) {
    return (
        <>
            {question.options &&
                question.options.map((opt, i) => {
                    const isChecked =
                        answers[question.id]?.includes(opt.option) || false;

                    return (
                        <div key={i} className="flex gap-4 items-center">
                            <div
                                className={`relative rounded-full flex items-center justify-center aspect-square min-w-[30px] text-white border-solid border-white border-[2px] font-semibold ${
                                    isChecked ? "bg-purple-600" : "bg-gray-500"
                                }`}
                            >
                                <label
                                    htmlFor={`${question.id}-${String(
                                        opt.option
                                    )}`}
                                >
                                    {String.fromCharCode(65 + i)}
                                </label>

                                <input
                                    className="absolute bottom-[-15%] right-[-15%] rounded-sm focus:ring-offset-0 focus:ring-0 text-purple-600 border-none  "
                                    // type={`${question.type =="checkbox" && "checkbox"} ${question.type =="radio" && "radio"}`}
                                    type="checkbox"
                                    id={`${question.id}-${String(opt.option)}`}
                                    value={String(opt.option)}
                                    checked={isChecked}
                                    onChange={(ev) => {
                                        handleAnswerChange(
                                            question.id,
                                            ev.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="text-gray-950">{opt.option}</div>
                        </div>
                    );
                })}
        </>
    );
}
