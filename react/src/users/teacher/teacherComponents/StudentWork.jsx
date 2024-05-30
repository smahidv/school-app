import React, { useState } from "react";
import GradeStudentInfo from "./GradeStudentInfo";
import PaginationGrading from "./PaginationGrading";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import PaginationStudents from "../../admin/adminComponents/PaginationStudents";

export default function StudentWork() {
  const [isWrong, setisWrong] = useState("");
    return (
        <div className="flex gap-8 p-10 ">
            <div className="flex-grow ">
                <div className="space-y-5">
                    <div className=" pb-6 border-b-[2px] border-purple-500">
                        <div className="text-xl  text-gray-800 font-semibold">Question 37</div>
                    </div>
                    <p className="text-gray-700 font-semibold text-lg pt-8">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Maxime eum pariatur accusamusr mo
                    </p>
                    <div className={`flex gap-8  p-4  bg-gray-50 ${isWrong==="wrong" ? "bg-red-50" :isWrong==="correct" && "bg-green-50"}`}>
                 
                            <p className="bg-white px-4 py-2 shadow-md text-gray-700 max-w-[600px]">
                                Lorem ipsum dolor sit, amet consectetur
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae fuga minima doloribus iure, inventore ea quasi soluta nesciunt sequi harum dolore, provident nisi ad tempore, veritatis asperiores eius! Doloribus, similique.
                                adipisicing elit. Maxime eum pariatur accusamusr
                                mo loreklorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque minima quaerat rem quidem illum ipsa sequi, accusantium maiores recusandae ut at cumque. Totam magnam rerum amet itaque ducimus, voluptates molestias.
                            </p>
                            
                        <div className="space-y-6">
                            <button 
                            className="block"
                            onClick={()=>{setisWrong("correct")}}

                            type="button">
                                <CheckIcon className="w-8 text-green-500 " />
                            </button>
                            <button 
                            onClick={()=>{setisWrong("wrong")}}
                            type="button">
                                <XMarkIcon className="w-8 text-red-500 self-end" />
                            </button>
                        </div>
                    </div>
                    <div className="space-x-5  p-4 rounded-sm mt-6">
                            <span
                            className="text-gray-700 font-semibold text-xl"
                         >Answer Score</span>
                            <span
                            className=" text-xl text-blue-700 font-bold"
                           >
                            {isWrong==="wrong" ?0 :isWrong==="correct" ? "score" : "___"}
                            </span>
                          </div>
                </div>

                {/* <PaginationStudents /> */}
            </div>

            <GradeStudentInfo />
        </div>
    );
}
