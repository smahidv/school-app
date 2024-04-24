import React from "react";
import { v4 as uuidv4 } from "uuid";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function QuestionEditor({
    questions,
    selectedQuestionIndex,
    setQuestions,
}) {
    
    const selectedQuestion = questions[selectedQuestionIndex];

    const handleInputChange = (e, field) => {
        const updatedQuestion = {
            ...selectedQuestion,
            [field]: e.target.value,
        };
        const updatedQuestions = [...questions];
        updatedQuestions[selectedQuestionIndex] = updatedQuestion;
        setQuestions(updatedQuestions);
    };
    
    const onImageChoose = (ev) => {
        const files = ev.target.files;
        const updatedImages = [...selectedQuestion.image_url];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = () => {
                updatedImages.push(reader.result);
                handleInputChange(
                    { target: { value: updatedImages } },
                    "image_url"
                );
            };

            reader.readAsDataURL(file);
        }
    };
    const handleDeleteImage = (index) => {
        const updatedImages = [...selectedQuestion.image_url];
        updatedImages.splice(index, 1);
        const updatedQuestion = {
            ...selectedQuestion,
            image_url: updatedImages,
        };
        const updatedQuestions = [...questions];
        updatedQuestions[selectedQuestionIndex] = updatedQuestion;
        setQuestions(updatedQuestions);
    };

    //////////////////////////////////////options///////////////////////////////////

   
    const handleOptionChange = (e, index) => {
        
        const updatedOptions = [...selectedQuestion.data.options];
        updatedOptions[index].text = e.target.value;

        const updatedQuestion = {
            ...selectedQuestion,
            data: {
                ...selectedQuestion.data,
                options: updatedOptions,
            },
        };

        const updatedQuestions = [...questions];
        updatedQuestions[selectedQuestionIndex] = updatedQuestion;
        setQuestions(updatedQuestions);
    };

    const addOption = () => {
        const updatedOptions = [
            ...(selectedQuestion.data.options || []),
            { uuid: uuidv4(), text: "" },
        ];

        const updatedQuestion = {
            ...selectedQuestion,
            data: {
                ...selectedQuestion.data,
                options: updatedOptions,
            },
        };

        const updatedQuestions = [...questions];
        updatedQuestions[selectedQuestionIndex] = updatedQuestion;
        setQuestions(updatedQuestions);
    };

    function shouldHaveOptions(type = null) {
        type = type || selectedQuestion.type;
        return ["radio", "checkbox"].includes(type);
      }
  


    const deleteOption = (index) => {
        const updatedOptions = [...selectedQuestion.data.options];
        updatedOptions.splice(index, 1);

        const updatedQuestion = {
            ...selectedQuestion,
            data: {
                ...selectedQuestion.data,
                options: updatedOptions,
            },
        };

        const updatedQuestions = [...questions];
        updatedQuestions[selectedQuestionIndex] = updatedQuestion;
        setQuestions(updatedQuestions);
    };

   
    return (
        <div>
            {!selectedQuestion && (
                <div className="text-xs text-gray-600 text-center py-3">
                    You don't have any question defined
                </div>
            )}
            {selectedQuestion && (
                <div>
                    <div className="grid gap-8 mb-5 bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 relative  after:absolute after:w-full after:h-[1.5px] after:bg-gray-200 after:bottom-[50%] after:left-0">
                        <div className="w-full flex gap-2">
                            <span className="text-[rgb(96,131,255)] ">
                                {selectedQuestionIndex + 1}.
                            </span>
                            <input
                                className="outline-none w-full"
                                type="text"
                                placeholder="type your question here..."
                                value={selectedQuestion.question}
                                onChange={(e) =>
                                    handleInputChange(e, "question")
                                }
                            />
                        </div>

                        <div className="flex gap-2 justify-end items-center">
                            <select
                                className="text-white bg-[rgb(96,131,255)]  rounded-md border border-gray-300  py-1 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                name=""
                                id=""
                                onChange={(e) => handleInputChange(e, "type")}
                            >
                                <option value="text" className="text-white">
                                    text
                                </option>
                                <option value="radio">radio</option>
                                <option value="checkbox">checkbox</option>
                            </select>
                            <input
                                className="text-green-500 w-[100px] font-bold rounded-md border border-gray-300  py-1 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                type="number"
                                placeholder="score "
                                value={selectedQuestion.score}
                                onChange={(e) => handleInputChange(e, "score")}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <textarea
                            rows={5}
                            cols={40}
                            placeholder="Instructions (optional)"
                            className="bg-white rounded-md text-gray-500 placeholder:text-sm  shadow-md outline-none  w-full px-4 py-1"
                            onChange={(e) =>
                                handleInputChange(e, "description")
                            }
                        />
                    </div>

                    {/* /////////////////////////////////////////images/////////////////////////////////////////// */}
                    <div className="border-[1px] border-dashed border-[#cfcece] py-2 ">
                        <div className=" grid gap-x-2 gap-y-4 grid-flow-row grid-cols-[repeat(auto-fill,minmax(200px,1fr))] ">
                            {selectedQuestion.image_url &&
                                selectedQuestion.image_url.map(
                                    (imageUrl, index) => (
                                        <div className="group relative w-fit  hover:opacity-70">
                                            <img
                                                className="aspect-square"
                                                key={index}
                                                src={imageUrl}
                                                alt=""
                                            />
                                            <div
                                                onClick={() => {
                                                    handleDeleteImage(index);
                                                }}
                                                className="absolute top-[50%] cursor-pointer left-[50%] translate-x-[-50%] translate-y-[-50%]    text-red-600  invisible group-hover:visible"
                                            >
                                                <XMarkIcon className="w-10" />
                                            </div>
                                        </div>
                                    )
                                )}
                        </div>

                        <div className="relative m-2 flex gap-3 border-solid border-[1px] border-gray-400  bg-white hover:shadow-md w-fit px-3 py-1 ">
                            <svg
                                id="Слой_1"
                                className="w-4"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g fill="rgb(156,163,175)">
                                    <path d="m412.103 0h-312.19c-55.083 0-99.897 44.83-99.897 99.913v312.173c0 55.084 44.814 99.914 99.897 99.914h312.189c55.068 0 99.881-44.83 99.881-99.913v-312.174c.001-55.083-44.813-99.913-99.88-99.913zm-312.19 32.813h312.189c36.979 0 67.068 30.089 67.068 67.1v289.823c-19.811-13.094-34.273-48.174-48.258-82.69-21.678-53.514-44.093-108.854-95.091-108.854-48.851 0-71.058 34.287-90.653 64.537-19.915 30.698-33.614 49.54-63.127 49.54-31.724 0-49.316-23.392-69.696-50.501-19.713-26.208-41.775-55.44-79.517-62.119v-99.736c.001-37.011 30.091-67.1 67.085-67.1zm312.19 446.374h-312.19c-36.995 0-67.084-30.089-67.084-67.1v-178.494c21.916 6.587 36.749 25.912 53.289 47.914 22.415 29.801 47.826 63.575 95.924 63.575 48.851 0 71.058-34.287 90.653-64.537 19.915-30.698 33.614-49.54 63.127-49.54 28.888 0 47.089 44.926 64.681 88.345 18.972 46.832 38.507 95.061 77.262 106.374-6.315 30.487-33.354 53.463-65.662 53.463z" />
                                    <path d="m176.563 204.217c37.844 0 68.622-30.762 68.622-68.606s-30.778-68.606-68.622-68.606c-37.828 0-68.606 30.762-68.606 68.606s30.778 68.606 68.606 68.606zm0-104.4c19.739 0 35.809 16.054 35.809 35.793s-16.07 35.793-35.809 35.793-35.793-16.053-35.793-35.793 16.054-35.793 35.793-35.793z" />
                                </g>
                            </svg>
                            <p className=" text-gray-900 text-[.8rem]">
                                Add images here
                            </p>

                            <input
                                type="file"
                                className="absolute  left-0 top-0 right-0 bottom-0 opacity-0  "
                                onChange={onImageChoose}
                            />
                        </div>
                    </div>

                    {/* /////////////////////////////////////////images/////////////////////////////////////////// */}

                    {/* /////////////////////////////////////////options/////////////////////////////////////////// */}

                 
                {shouldHaveOptions() &&
                   <>
                        <div className="my-4">
                            {selectedQuestion.data &&
                                selectedQuestion.data.options &&
                                selectedQuestion.data.options.length === 0 && (
                                    <div className="text-xs text-gray-600 text-center py-2">
                                        You don't have any options defined
                                    </div>
                                )}
                            {selectedQuestion.data &&
                                selectedQuestion.data.options &&
                                selectedQuestion.data.options.length > 0 && (
                                    <div>
                                        {selectedQuestion.data.options.map(
                                            (option, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-3 items-center mb-4"
                                                >
                                                    <div 
                                                    className={`w-5 h-5 border-solid border-slate-400 border-[1.5px] 
                                            ${selectedQuestion.type==='radio' && 'rounded-full'}
                                                    `}></div>
                                                    <div className="text-[rgb(96,131,255)] font-semibold text-lg">
                                                        {String.fromCharCode(
                                                            65 + index
                                                        )}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Add answer"
                                                        className="bg-white rounded-md text-gray-500 placeholder:text-sm placeholder:font-semibold shadow-md outline-none  w-full px-4 py-1"
                                                        value={option.text}
                                                        onChange={(e) =>
                                                            handleOptionChange(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                    />
                                                    <TrashIcon
                                                        onClick={() =>
                                                            deleteOption(index)
                                                        }
                                                        className="w-4 text-red-500 cursor-pointer"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                        </div>
                        <div
                            className="flex gap-3 items-center cursor-pointer"
                            onClick={addOption}
                        >
                            <svg
                                className="w-4 text-[rgb(96,131,255)] fill-current"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="_03_Login" data-name="03 Login">
                                    <path d="m256 512a25 25 0 0 1 -25-25v-462a25 25 0 0 1 50 0v462a25 25 0 0 1 -25 25z" />
                                    <path d="m487 281h-462a25 25 0 0 1 0-50h462a25 25 0 0 1 0 50z" />
                                </g>
                            </svg>
                            <p className="text-[rgb(96,131,255)] w-fit  relative  after:absolute after:w-full after:h-[1px] after:bg-[rgb(96,131,255)]  after:bottom-[1.5px] after:left-0">
                                Add options
                            </p>
                        </div>
                    </> 
                }

                    {/* /////////////////////////////////////////options/////////////////////////////////////////// */}
                </div>
            )}
        </div>
    );
}
