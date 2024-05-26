import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axiosClient from "../../../axios";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function StudentSubject() {
    const [exams, setExams] = useState([]);
    const { id } = useParams();
    const { currentUser } = useStateContext();
    const [loading, setLoading] = useState(false);

    function getClassExams() {
        axiosClient
            .get(
                `/getExams?moduleId=${id}&classRoomId=${currentUser.student_class_room_id}`
            )
            .then(({ data }) => {
                setLoading(false);
                setExams(data.data);
            });
    }

    useEffect(() => {
        setLoading(true);
        getClassExams();
    }, []);

    return (
        <div className="mr-12 my-10 w-full grid gap-y-6">
            <div className="bg-student-class bg-cover bg-center bg-no-repeat bg-origin-border pb-4 px-4 rounded-md h-[35vh] flex items-end">
                <p className="text-3xl font-bold">
                    {exams.length > 0 && exams[0].module}
                </p>
            </div>
            <div className="grid gap-4">
                {loading ? (
                    <div className="space-y-6">
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className="flex  animate-pulse border-solid border-gray-300 border-[1px] p-4"
                            >
                                <div className="flex-shrink-0">
                                    <span className="flex justify-center items-center bg-gray-300 rounded-full w-12 h-12 "></span>
                                </div>
                                <div className="ml-4 mt-2 w-full">
                                    <h3 className="h-3 bg-gray-300 rounded-full  w-48 mb-4"></h3>
                                    <p className="h-2 bg-gray-300 rounded-full  mb-2.5"></p>
                                    <p className="h-2 bg-gray-300 rounded-full   mb-2.5"></p>
                                    <p className="h-2 bg-gray-300 rounded-full    mb-2.5"></p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : exams.length > 0 ? (
                    exams.map((e, index) => (
                        <div
                            key={index}
                            className="border-solid border-gray-300 border-[1px] p-4 rounded-sm hover:bg-blue-100"
                        >
                            <div className="mb-4 flex justify-between items-center">
                                <div className="flex gap-4 items-center ">
                                    <img
                                        className="rounded-full aspect-square size-[35px]"
                                        src={e.user["image"]}
                                        alt=""
                                    />
                                    <div>
                                        <p className="capitalize text-gray-800 font-semibold text-xl">
                                            {e.user["fname"]}
                                            {"  "}
                                            {e.user["lname"]}
                                        </p>
                                        <p className="text-gray-500">
                                            {e.created_at}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`rounded-full py-1 px-3 ${
                                        e.status === "Ongoing"
                                            ? "text-primary bg-primary-light "
                                            : e.status === "Finished"
                                            ? "text-danger bg-danger-light "
                                            : e.status === "Upcoming"
                                            ? "text-success bg-success-light"
                                            : ""
                                    }`}
                                >
                                    {e.status}
                                </div>
                            </div>
                            <div>
                                A new exam is now available for you to take.
                                Please review the following details carefully
                                before beginning the exam:
                            </div>
                            <ul>
                                <li>
                                    <span className="font-bold">
                                        description:{" "}
                                    </span>
                                    {e.description}
                                </li>
                                <li>
                                    <span className="font-bold">
                                        Duration:{" "}
                                    </span>
                                    {e.duration}
                                </li>
                                <li>
                                    <span className="font-bold">
                                        Start Date and Time:{" "}
                                    </span>{" "}
                                    {e.enable_date}
                                </li>
                                <li>
                                    <span className="font-bold">
                                        End Date and Time:{" "}
                                    </span>{" "}
                                    {e.expire_date}
                                </li>
                            </ul>
                            <div
                                className={`rounded-md py-2 px-4 mt-6 mb-4 w-fit ${
                                    e.status === "Upcoming" ||
                                    e.status === "Finished"
                                        ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                                        : "bg-green-500 text-white"
                                }`}
                            >
                                {e.status === "Ongoing" ? (
                                    <NavLink to={`/exam/${e.exam_id}`}>
                                        <span className="font-semibold">
                                            Take the Exam
                                        </span>
                                    </NavLink>
                                ) : (
                                    <span className="font-semibold">
                                        Take the Exam
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-xl flex justify-center mt-14">
                        No exam is available
                    </div>
                )}
            </div>
        </div>
    );
}
