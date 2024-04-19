import React, { useState } from "react";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import QuestionAside from "../teacherComponents/QuestionAside";
import QuestionEditor from "../teacherComponents/QuestionEditor";
import ExamLayer from "../teacherComponents/ExamLayer";

export default function ExamView({ toggleEditor }) {
    const [question, setQuestion] = useState();
    const [examLayer, setExamLayer] = useState(false);

    function toggleExamLayer() {
        setExamLayer(!examLayer);
    }
    return (
        <>
            {examLayer && <ExamLayer  toggleExamLayer={toggleExamLayer} />}

            <div className={`bg-white  w-full h-full absolute top-0 z-20 ${examLayer && "pointer-events-none"}`}>
                <div className="p-4 flex gap-3 items-center border-solid border-b-[#e5dfdf] border-b-[1px] ">
                    <button onClick={toggleEditor}>
                        <ArrowLongLeftIcon className="text-gray-600 w-6" />
                    </button>
                    <div className="text-lg">Questions</div>
                    <button
                        onClick={toggleExamLayer}
                        className="flex gap-2 items-center bg-[rgb(96,209,83)] py-[2px] px-7 rounded-sm text-white ml-auto font-semibold "
                    >
                 
                    
                        Next
                        < ArrowLongRightIcon className="w-6 " />
                    </button>
                 
                </div>
                <div className="grid py-8 px-4 grid-cols-[20%_80%] bg-[#f8f9fa] h-[89vh] overflow-hidden">
                    <QuestionAside />
                    <div className=" ">
                        <div className="grid gap-8 mb-5 bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 relative  after:absolute after:w-full after:h-[1.5px] after:bg-gray-200 after:bottom-[50%] after:left-0 ">
                            <div className="w-full flex gap-2">
                                <span className="text-[rgb(96,131,255)] ">
                                    1.{" "}
                                </span>
                                <input
                                    className="outline-none w-full"
                                    type="text"
                                    placeholder="type your question here..."
                                />
                            </div>

                            <div className="flex gap-2 justify-end items-center">
                                <select
                                    className="text-white bg-[rgb(96,131,255)]  rounded-md border border-gray-300  py-1 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    name=""
                                    id=""
                                >
                                    <option value="text" className="text-white">
                                        text
                                    </option>
                                    <option value="radio">radio</option>
                                    <option value="">chekbox</option>
                                </select>
                                <input
                                    className="text-green-500 w-[100px] font-bold rounded-md border border-gray-300  py-1 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    type="number"
                                    placeholder="score "
                                />
                            </div>
                        </div>
                        <QuestionEditor />
                    </div>
                </div>
            </div>
        </>
    );
}
