import React from "react";

export default function QuestionPagination({teacher,meta,onPageClick, onClick}) {


    return (
        <div className="w-[20dvw]  pt-10 border-r-solid border-r-[1.5px] border-gray-300 flex flex-col items-center gap-10">
            <div className="px-2">
                <div className="capitalize text-gray-700 font-semibold max-w-[15ch] leading-4">mr. {teacher} </div>
                <small>Professor</small>
            </div>
            <ol class=" overflow-hidden space-y-8">
                
            <li class="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-green-600 after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5">
                    <a
                        class="flex items-center font-medium w-full  "
                    >
                        <span class="w-8 h-8 bg-green-600 border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
                        {/* <svg
                                class="w-5 h-5 stroke-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7"
                                    stroke="stroke-current"
                                    stroke-width="1.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="my-path"
                                ></path>
                            </svg> */}
                        </span>
                    </a>
                </li>
                {meta.links && meta.links.slice(1, -1).map((link, ind)=> (
                <li class="relative flex-1 after:content-['']  after:w-0.5 after:h-full  after:bg-gray-200 after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5">
                    <a 
                     href="#"
                     onClick={ev => onClick(ev, link)}
                     key={ind}
                     aria-current="page"
                    class="flex items-center font-medium w-full  ">
                        <span class="w-8 h-8 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm  lg:w-10 lg:h-10">
                      {link.label }
                        </span>

                    </a>
                </li>
                  
                ))}
                
                
                
            </ol>
        </div>
    );
}
