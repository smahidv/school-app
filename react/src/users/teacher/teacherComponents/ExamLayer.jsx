import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ReactSelect from "../../../core/ReactSelect";

export default function ExamLayer({ toggleExamLayer }) {
    return (
        <div className="absolute bg-white z-50 w-[50%] [box-shadow:0_0_0_9999px_#000000b0]  shadow-sm rounded-sm  left-[50%] top-[10%] bottom-10 translate-x-[-50%] overflow-y-scroll ">
            <div className=" py-3 px-4 flex justify-between items-center  relative  after:absolute after:w-full after:h-[1.5px] after:bg-gray-200 after:bottom-[-1px] after:left-0 ">
                <div className="text-[#282828]">Exam</div>
                <button className="w-6" onClick={toggleExamLayer}>
                    <XMarkIcon />
                </button>
            </div>

            <div className=" py-5 px-4 ">
                <div className="text-[#282828] font-semibold text-sm">
                    Exam Instructions
                </div>
                <div className="mt-6 grid gap-4">
                    <div className="grid grid-cols-[1fr_1fr] gap-x-20 gap-y-5">
                        <div>
                            <label
                                htmlFor=""
                                className="text-sm  text-[#282828]"
                            >
                                Module Name
                            </label>
                            <ReactSelect />
                        </div>

                        <div className="">
                            <label
                                htmlFor=""
                                className="text-sm  text-[#282828]"
                            >
                                Semester
                            </label>

                            <select className="mt-1 block outline-none p-[.3em] bg-[rgb(247,246,251)]">
                                <option value="">Semester 1</option>
                                <option value="">Semester 2</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor=""
                                className="text-sm text-[#282828]"
                            >
                                Exam start date
                            </label>
                            <input
                                className="mt-1 block outline-none p-[.3em] bg-[rgb(247,246,251)]"
                                type="datetime-local"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor=""
                                className="text-sm text-[#282828]"
                            >
                                Exam expire date
                            </label>
                            <input
                                className="mt-1 block outline-none p-[.3em] bg-[rgb(247,246,251)]"
                                type="datetime-local"
                            />
                        </div>
                       
                   
                    </div>

                    <div className="">
                        <label htmlFor="" className="mb-1">
                            Classes
                        </label>
                        <ReactSelect />
                    </div>
                    <textarea
                        rows={5} cols={40}
                        placeholder="Exam Description(optional)"
                        className="bg-[rgb(247,246,251)] rounded-md text-gray-500 placeholder:text-sm  shadow-md outline-none  w-full px-4 py-1 "
                    />
                </div>

                <button
                    type="submit"
                    className="mt-10 bg-[rgb(96,209,83)] py-[2px] px-7 rounded-sm text-white ml-auto font-semibold "
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
