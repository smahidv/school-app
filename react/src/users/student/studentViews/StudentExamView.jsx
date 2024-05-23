import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Navigate, useParams } from "react-router-dom";
import axiosClient from "../../../axios";
import ExamQuestion from "../studentComponents/ExamQuestion";
import QuestionPagination from "../studentComponents/QuestionPagination";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

export default function StudentExamView() {
    const { id } = useParams();
    const { userToken, currentUser } = useStateContext();
    const [exam, setExam] = useState({});
    const [questions, setQuestions] = useState();
    const [meta, setMeta] = useState({});
    const [reviewed, setReviewed] = useState({});
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
   


    const handleAnswerChange = (question_id, student_opt) => {
        
        setAnswers((prevAnswers) => {

            const currentAnswers = prevAnswers[question_id] || [];

            let updatedAnswers;
            if (currentAnswers.includes(student_opt)) {
                updatedAnswers = currentAnswers.filter(
                    (opt) => opt !== student_opt
                );
            } else {
                updatedAnswers = [...currentAnswers, student_opt];
            }

   
            setAnsweredQuestions((prevAnsweredQuestions) => {
                const updatedAnsweredQuestions = [...prevAnsweredQuestions];
                if (
                    updatedAnswers.length > 0 &&
                    !updatedAnsweredQuestions.includes(meta.current_page)
                ) {
                    updatedAnsweredQuestions.push(meta.current_page);
                } else if (
                    updatedAnswers.length === 0 &&
                    updatedAnsweredQuestions.includes(meta.current_page)
                ) {
                    return updatedAnsweredQuestions.filter(
                        (page) => page !== meta.current_page
                    );
                }

                return updatedAnsweredQuestions;
            });

            return {
                ...prevAnswers,
                [question_id]: updatedAnswers,
            };
        });
    };








    function getExamQuestions(url) {
        url = url || `/getByExam/${id}`;
        axiosClient.get(url).then(({ data }) => {
            setExam(data.exam);
            setQuestions(data.questions.data);
            setMeta(data.questions.meta);
        });
    }

    function handleReview(current_page) {
        setReviewed((prevState) => ({
            ...prevState,
            [current_page]: !prevState[current_page],
        }));
    }

    function fancyTimeFormat(duration) {
        // Hours, minutes and seconds
        const hrs = ~~(duration / 3600);
        const mins = ~~((duration % 3600) / 60);
        const secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;

        return ret;
    }
    function onClick(ev, link) {
        ev.preventDefault();
        if (!link.url) {
            return;
        }
        onPageClick(link);
    }
    const onPageClick = (link) => {
        getExamQuestions(link.url);
    };
    useEffect(() => {
        getExamQuestions();
    }, []);

    return userToken && currentUser.role === 3 ? (
        <>
            {questions ? (
                <div className="flex  min-h-[100dvh]  ">
                    <QuestionPagination
                        teacher={exam.teacher}
                        meta={meta}
                        onClick={onClick}
                        reviewed={reviewed}
                        answeredQuestions={answeredQuestions}
                    />

                    <div className="relative  py-10  p-[min(5em,_5dvw)]">
                        <div className="flex justify-between   ">
                            <div className="leading-3 relative after:absolute after:h-[1.5px] after:bg-gray-300 after:w-[50px] after:right-[-50px] after:top-[20px] after:rotate-90 ">
                                <p className="text-gray-700 capitalize font-bold text-3xl">
                                    {exam.module}
                                </p>
                                <small className="capitalize text-gray-500 font-semibold">
                                    {exam.semestre}
                                </small>
                            </div>

                            <div className="leading-3 relative after:absolute after:h-[1.5px] after:bg-gray-300 after:w-[50px] after:left-[-50px]  after:top-[20px] after:rotate-90">
                                <div className="flex gap-2 items-center ">
                                    <svg
                                        className="text-purple-600 fill-current w-8"
                                        viewBox="-57 -19 602 602.49769"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="m240.691406 167.921875c-7.503906 0-13.574218 6.070313-13.574218 13.574219v112.816406c-9.097657 4.78125-15.246094 14.363281-15.246094 25.304688 0 15.804687 12.855468 28.65625 28.660156 28.65625 15.808594 0 28.664062-12.851563 28.664062-28.65625 0-10.859376-6.074218-20.277344-14.933593-25.148438v-112.972656c0-7.503906-6.066407-13.574219-13.570313-13.574219zm0 0" />
                                        <path d="m470.140625 484.480469-53.011719 3.671875c32.972656-34.40625 55.167969-77.839844 63.714844-125.503906 10.933594-61.148438-1.601562-123.582032-35.371094-175.796876-16.046875-24.753906-36.164062-46.148437-59.320312-63.3125l32.335937-49.179687c4.152344-6.230469 2.394531-14.691406-3.832031-18.765625-6.230469-4.144531-14.691406-2.394531-18.757812 3.832031l-32.339844 49.101563c-19.796875-11.496094-41.269532-20.28125-63.949219-25.945313-14.929687-3.75-30.09375-5.988281-45.269531-6.871093v-49.820313h64.027344c7.515624 0 13.582031-6.0625 13.582031-13.570313 0-7.503906-6.066407-13.570312-13.582031-13.570312h-155.675782c-7.507812 0-13.570312 6.066406-13.570312 13.570312 0 7.507813 6.0625 13.570313 13.570312 13.570313h64.507813v49.820313c-36.640625 2-72.570313 12.296874-105.378907 30.5-1.363281.800781-2.71875 1.59375-4.078124 2.316406l-32.410157-49.179688c-4.15625-6.226562-12.539062-7.984375-18.765625-3.832031-6.226562 4.152344-7.980468 12.535156-3.832031 18.757813l32.417969 49.179687c-40.800782 30.261719-71.136719 72.417969-86.867188 121.433594-19 59.160156-14.847656 122.710937 11.738282 178.917969 26.585937 56.203124 73.050781 99.71875 130.855468 122.625 28.976563 11.503906 59.390625 17.164062 89.890625 17.164062 30.261719 0 60.601563-5.660156 89.417969-17 6.949219-2.714844 10.378906-10.625 7.667969-17.566406-2.71875-6.945313-10.621094-10.378906-17.566407-7.660156-105.941406 41.675781-226.976562-6.234376-275.597656-109.140626-46.222656-97.234374-13.25-213.320312 74.488282-272.484374.71875-.316407 1.355468-.640626 2-1.113282.640624-.402344 1.273437-.878906 1.75-1.441406 3.910156-2.554688 7.910156-4.949219 11.976562-7.1875 32.734375-18.277344 68.421875-27.0625 103.789062-27.300781.636719.082031 1.277344.160156 1.914063.160156.644531 0 1.199219-.078125 1.832031-.160156 41.042969.480469 81.363282 12.53125 116.007813 34.882812.402343.40625.878906.722657 1.355469 1.046875.5625.316406 1.121093.636719 1.679687.953125 23.789063 15.886719 44.707031 36.722657 61.070313 62.035157 55.652343 85.984374 42.644531 198.316406-26.976563 269.609374l6.144531-54.53125c.796875-7.425781-4.550781-14.128906-11.976562-15.007812-7.425782-.878906-14.132813 4.550781-15.007813 11.976562l-9.976562 89.257813c-.484375 3.992187.875 7.984375 3.667969 10.941406 2.558593 2.710938 6.152343 4.148438 9.824218 4.148438h.953125l92.851563-6.382813c7.503906-.484375 13.09375-7.03125 12.613281-14.457031-.554687-7.582031-7.027344-13.253906-14.53125-12.691406zm0 0" />
                                    </svg>
                                    <div className="text-gray-700 font-bold text-3xl">
                                        {fancyTimeFormat(exam.duration)}
                                    </div>
                                </div>
                                <small className="text-gray-500 ml-auto w-fit ">
                                    time left
                                </small>
                            </div>
                        </div>
                        <button
                                type="submit"
                                className=" text-white absolute bg-purple-600 rounded-full  py-[4px] px-12 right-[6%] top-[90px]"
                            >
                                <span className="text-lg font-semibold">Submit</span>
                            </button>
                
                        <ExamQuestion
                            questions={questions}
                            current_page={meta.current_page}
                            handleReview={handleReview}
                            reviewed={reviewed}
                            handleAnswerChange ={handleAnswerChange }
                            answers={answers}
    

                        />

                        <div className="flex justify-center gap-10 ">
                            <button
                                onClick={(ev) => onClick(ev, meta.links[0])}
                                type="button"
                                className="shadow-sm text-gray-600 hover:border-gray-600 hover:border-solid hover:border-[1px] bg-gray-100 rounded-full relative w-[130px] overflow-auto py-2"
                            >
                                <div className="absolute w-[30%] h-full left-0 top-0 rounded-full bg-[rgb(238,242,255)] flex justify-center">
                                    <ArrowLeftIcon className="w-5" />
                                </div>
                                <p className="font-semibold pl-8"> Previous</p>
                            </button>
                            <button
                                onClick={(ev) =>
                                    onClick(
                                        ev,
                                        meta.links[meta.links.length - 1]
                                    )
                                }
                                type="button"
                                className="shadow-sm text-gray-600 hover:border-gray-600 hover:border-solid hover:border-[1px] bg-gray-100  rounded-full relative w-[130px] overflow-auto py-2 "
                            >
                                <p className="font-semibold pr-8"> Next</p>
                                <div className="absolute w-[30%] h-full right-0 top-0 rounded-full bg-[rgb(238,242,255)] flex justify-center ">
                                    <ArrowRightIcon className="w-5" />
                                </div>
                            </button>
        
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
                    <span className="sr-only">Loading...</span>
                    <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
                </div>
            )}
        </>
    ) : (
        <Navigate to="/auth" />
    );
}
