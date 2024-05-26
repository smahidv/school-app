import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function WarninglayeReviewed({ toggleWarning }) {
    return (
        <div className="absolute  z-40 [box-shadow:0_0_0_9999px_#000000b0] translate-x-[-50%] left-[50%] top-[20%]">
            <div className="relative bg-white rounded-lg shadow p-7">
                <button
                    onClick={toggleWarning}
                    type="button"
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                    <svg
                        className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        You have some questions left to review.
                    </h3>
                    <button
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-purple-600 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                        submit Anyway
                    </button>
                    <button
                        onClick={toggleWarning}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
