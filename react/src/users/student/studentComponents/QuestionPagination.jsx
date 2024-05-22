export default function QuestionPagination({
    teacher,
    meta,
    onClick,
    reviewed,
    answeredQuestions,
}) {
    const answeredQuestionsTostring = Array.from(
        answeredQuestions,
        (x) => `${x}`
    );

    return (
        <div className="w-[20dvw]  pt-10 border-r-solid border-r-[1.5px] border-gray-300 flex flex-col items-center   gap-16">
            <div className="px-2">
                <div className="capitalize text-gray-700 font-semibold max-w-[15ch] leading-4">
                    mr. {teacher}
                </div>
                <small>Professor</small>
            </div>
            <ol className=" overflow-hidden space-y-8">
                {meta.links &&
                    meta.links.slice(1, -1).map((link, ind) => (
                        <li
                            key={ind}
                            className="relative flex-1 after:content-['']  after:w-0.5 after:h-9 after:bg-gray-200 after:inline-block after:absolute after:bottom-[-29.5px] after:left-[22px] "
                        >
                            <span
                                className={`absolute size-[14px] bg-yellow-400 bottom-0 right-[10px] rounded-full  ${
                                    reviewed[link.label] ? "block" : "hidden"
                                }`}
                            ></span>
                            <a
                                href="#"
                                onClick={(ev) => onClick(ev, link)}
                                aria-current="page"
                                className="flex items-center font-medium w-full "
                            >
                                <span
                                    className={`size-14 border-2 border-gray-200 bg-[rgb(238,242,255)]  rounded-full flex justify-center items-center mr-3 text-xl
                      ${
                          answeredQuestionsTostring.includes(link.label) &&
                          "bg-green-600 !border-gray-200"
                      } 
                      ${
                        meta.current_page == link.label ?
                        "border-green-600" : "border-gray-200"
                    }`}
                                >
                                    {answeredQuestionsTostring.includes(
                                        link.label
                                    ) ? (
                                        <svg
                                            className="w-5 h-5 stroke-white"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7"
                                                stroke="stroke-current"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="my-path"
                                            ></path>
                                        </svg>
                                    ) : (
                                        link.label
                                    )}
                                </span>
                            </a>
                        </li>
                    ))}
            </ol>
        </div>
    );
}
