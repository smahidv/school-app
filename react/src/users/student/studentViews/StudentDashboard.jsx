import React, { useEffect, useState } from "react";
import { BellAlertIcon } from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios";

export default function StudentDashboard() {
    const [data, setData] = useState([]);
    const { currentUser } = useStateContext();
    const [loading, setLoading] = useState(false);

    const getData = () => {
        axiosClient
            .get(
                `/dashboard?student_class_room_id=${currentUser.student_class_room_id}`
            )
            .then(({ data }) => {
                setLoading(false);
                setData(data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    useEffect(() => {
        setLoading(true);
        getData();
    }, []);

    return (
        <>
            {loading && (
                <div className="grid md:grid-cols-4 mt-8">
                    <div className="w-[250px] h-[250px] rounded-md animate-pulse bg-gray-200"></div>
                    <div className="w-[250px] h-[250px] rounded-md animate-pulse bg-gray-200"></div>
                    <div className="w-[250px] h-[250px] rounded-md animate-pulse bg-gray-200"></div>
                </div>
            )}
            <div className="w-full  grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]  gap-7 mr-6 my-10">
                {data.map((d, index) => (
                    <NavLink
                        key={index}
                        to={`/s/${d.module_id}`}
                        className="border-[.5px] rounded-xl  border-solid border-gray-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer"
                    >
                        <div className="relative bg-[rgb(228,230,236)] rounded-t-xl">
                            <div className="px-4 py-2">
                                <div className="font-bold hover:underline text-lg">
                                    {d.module_name}
                                </div>

                                <p className="text-xs">{d.class_room_name}</p>

                                <div className="text-xs">
                                    {d.first_name} {d.last_name}
                                </div>
                            </div>

                            <div className="absolute bottom-[-10px] right-6  z-30  ">
                                <img
                                    className="w-[50px] aspect-square  rounded-full"
                                    src={d.image}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="h-[80px]"></div>
                        <div className="p-4 relative after:absolute after:w-full after:h-[0.1px] after:bg-[rgb(202,202,203)] after:left-0 after:top-0 after:rounded-full">
                            <BellAlertIcon className="w-5 ml-auto text-gray-700 " />
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
}
