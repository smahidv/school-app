import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useClassModuleContext } from "../../../contexts/FindExamByClassModuleProvider";
import axiosClient from "../../../axios";

export default function TeacherPeaple() {
    const { currentUser } = useStateContext();
    const { classModule } = useClassModuleContext();
    const [data, setData] = useState();

    useEffect(() => {
        axiosClient
            .get(`getStudents?class_id=${classModule.class_id}`)
            .then(({ data }) => {
                setData(data);
            });
    }, []);

    return (
        <div className="mx-[10%] mt-10 space-y-20">
            <div>
                <div className="text-3xl border-b-gray-500  border-b-[1px] w-full pb-6">
                    Teacher
                </div>
                <div className="flex items-center gap-4 mt-4">
                    <img
                        className="w-9 h-9 rounded-full cursor-pointer"
                        src={`http://localhost:8000/${currentUser.image}`}
                        alt=""
                    />
                    <div className="text-xl capitalize">
                        {currentUser.first_name} {currentUser.last_name}
                    </div>
                </div>
            </div>
            <div>
                <div className="text-3xl border-b-gray-500  border-b-[1px] w-full pb-6">
                    Students
                </div>
                <div className="space-y-8">
                    {data &&
                        data.length > 0 &&
                        data.map((d,i) => (
                            <div key={i} className="flex items-center gap-4 mt-4">
                                <img
                                    className="w-9 h-9 rounded-full cursor-pointer"
                                    src={`http://localhost:8000/${d.image}`}
                                    alt=""
                                />
                                <div className="text-xl capitalize">
                                    {d.first_name}{" "}
                                    {d.last_name}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
