import React, { useEffect, useState } from "react";
import uploadFile from "../../../../src/images/upload-file.png";
import SearchBy from "../adminComponents/SearchBy";
import axiosClient from "../../../axios";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function AdminTeachers() {
    const [teachers, setTeachers] = useState([]);
    const [meta, setMeta] = useState({});
    const [showMore, setShowMore] = useState([]);
    const teacher = true;
    const getTeachers = (url) => {
        url = url || "/teacher";
        axiosClient.get(url).then(({ data }) => {
            setTeachers(data.data);
            setMeta(data.meta);
        });
    };
    const toggleShowMore = (index) => {
      
        setShowMore(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            console.log(newState);
            return newState;
           
        });
    };
    useEffect(() => {
        getTeachers();
    }, []);
    return (
        <div className=" rounded-md  ">
            <div className="flex  justify-center  border-[1px] border-dashed border-[#cfcece] py-4">
                <div className="flex flex-col items-center ">
                    <img
                        className="w-[45px] aspect-square"
                        src={uploadFile}
                        alt="upload file icon"
                    />
                    <p className="text-xs mt-5  ">
                        <ipu
                            type="button"
                            className="underline font-bold  text-gray-700"
                        >
                            Click to upload{" "}
                        </ipu>
                        <span className="ml-2">or drag and drop</span>
                    </p>
                    <small className="text-gray-700">
                        Maximum file size 2048KB.
                    </small>
                </div>
            </div>
            <div className="flex justify-between items-center bg-[rgb(249,250,252)] mt-8 rounded-md py-1 px-4 shadow-sm">
                <SearchBy teacher={teacher} />
                <p className="font-semibold text-sm text-gray-700">
                    + Add filter
                </p>
            </div>
            <div className="py-12 px-[8%]   ">
                <ul className="grid grid-cols-8 grid-flow-col gap-x-3 relative after:absolute after:h-[1.2px] after:bg-slate-100 after:rounded-md after:w-[calc(100%+35px)] after:translate-x-[-30px] after:bottom-[-10px] ">
                    <li className="text-sm font-bold">Id</li>
                    <li className="text-sm font-bold ">Full name</li>
                    <li className="col-span-2 text-sm font-bold">Email</li>
                    <li className="text-sm font-bold col-span-2">classes</li>
                    <li className="text-sm font-bold col-span-2">subjects</li>
                </ul>

                {teachers.length > 0 &&
                    teachers.map((t, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-8 grid-flow-col gap-x-5  items-center mt-5 relative after:absolute after:h-[1.2px] after:bg-slate-100 after:rounded-md after:w-[calc(100%+35px)] after:translate-x-[-20px] after:bottom-[-6px]"
                        >
                            <div className=" text-xs text-gray-700  ">
                                {t.matricule}
                            </div>
                            <div className="  text-xs  capitalize truncate text-gray-500 ">
                                {t.first_name} {t.last_name}
                            </div>
                            <div className="col-span-2  text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                <div className="  flex items-center gap-x-2">
                                    <img
                                        className="object-cover w-8 h-8 rounded-full"
                                        src={t.image}
                                        alt=""
                                    />

                                    <p className="  text-xs  font-normal text-gray-500 py-1 truncate">
                                        {t.email}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="flex gap-1 items-center">
                                    <div className=" text-xs  w-fit px-2 py-1 rounded-full text-center text-emerald-500 bg-emerald-100/60 ">
                                        {t.classrooms[0].name}
                                    </div>
                                    <div className="text-xs  w-fit px-2 py-1 font-semibold rounded-full text-center text-emerald-500 bg-emerald-100/60 ">
                                        +{t.classrooms.length}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="flex gap-x-1 items-center">
                                    <div className=" text-xs w-fit px-4  text-gray-500 capitalize border-solid border-[.5px] border-gray-200 text-center rounded-xl py-1 ">
                                        {t.modules[0].name}
                                    </div>
                                    <div className=" text-xs w-fit  text-gray-900 font-semibold capitalize border-solid border-[.5px] border-gray-200 text-center rounded-full py-1  px-2 ">
                                        +{t.modules.length}
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <EllipsisHorizontalIcon 
                                
                               onClick={() => toggleShowMore(index)}
                                className="w-8 px-1 py-[.5] bg-[rgb(249,250,252)] rounded-md ml-auto cursor-pointer " />
                                {showMore[index]  &&
                                <div className="absolute top-[-68px]  border-solid border-gray-200 border-[1px] bg-white  py-2 shadow-sm">
                                    <Link
                                        to={`/admin/teachers/${t.id}`}
                                        className="capitalize w-fit text-xs font-semibold px-4  py-[.5px] "
                                    >
                                        edit
                                    </Link>

                                    <button className="capitalize w-fit text-xs font-semibold px-4  py-[.5px] ">
                                        delete
                                    </button>
                                </div>
                                }
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
