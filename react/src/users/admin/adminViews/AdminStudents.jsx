import React, { useEffect, useState } from "react";
import StudentSideInfo from "../adminComponents/StudentSideInfo";
import SearchBy from "../adminComponents/SearchBy";
import StudentLayerForm from "./StudentLayerForm";
import axiosClient from "../../../axios";
import PaginationStudents from "../adminComponents/PaginationStudents";

export default function AdminStudents() {
    const [students, setStudents] = useState([]);
    const [openStudentLayer, setOpenStudentLayer] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [meta, setMeta] = useState({});       
                   
    function toggleLayer() {
        setOpenStudentLayer(!openStudentLayer);
    }
    const getstudents = (url) => {
        url = url || "/student";
        axiosClient.get(url).then(({ data }) => {
            setStudents(data.data);
            setMeta(data.meta);
      
        });
    };
    const onDeleteClick = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
          axiosClient.delete(`/student/${id}`).then(() => {
            getstudents();
          });
        }
      };

    const changeSideInfo = (student) => {
        setSelectedStudent(student); 
        console.log(student);
   
   
    }

    const onPageClick = (link) => {
        getstudents(link.url);
      };

    useEffect(() => {
        getstudents();
        
    }, []);
    return (
        <>
            {openStudentLayer ? (
                <StudentLayerForm
                    toggleLayer={toggleLayer}
                    openStudentLayer={openStudentLayer}
                />
            ) : (
                <div className="flex gap-4  w-full  mb-20 py-10 justify-center bg-[rgb(251,252,253)] rounded-3xl shadow-sm">
                    <div className= {selectedStudent ? "w-[70%]" : "w-[100%] "} >
                        <div className="grid gap-4">
                            <div className="flex">
                                <button
                                    onClick={() => setOpenStudentLayer(true)}
                                    className="  ml-auto uppercase rounded-md  py-[4px] px-[5px] text-[.66rem] border-[1.5px] border-[solid] border-[#9ed1d0] text-[#9ed1d0] font-semibold"
                                >
                                    create student
                                </button>
                            </div>

                            <SearchBy />

                            <section className="container w-full  ">
                                <div className="flex flex-col ml-8 mr-4 ">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8  ">
                                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700  ">
                                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="py-2 px-4 text-xs font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                <div className="flex items-center gap-x-3">
                                                                    <button className="flex items-center gap-x-2">
                                                                        <span>
                                                                            SID
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-2 text-xs font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                Full name
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-2 text-xs font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                Email
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-2 text-xs font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                            >
                                                                Class
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="relative py-2 px-4"
                                                            >
                                                                <span className="sr-only">
                                                                    Actions
                                                                </span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className=" bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 ">
                                                        {students.length > 0 &&
                                                            students.map(
                                                                (student) => (
                                                                    <tr
                                                                        key={
                                                                            student.id
                                                                        }
                                                                        className={`cursor-pointer  ${selectedStudent === student ? 'bg-gray-100' : ''}`}

                                                                        onClick={() => changeSideInfo(student)} 
                                                                    >
                                                                        <td className="px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                                            <div className="inline-flex items-center gap-x-3">
                                                                                <span>
                                                                                    {
                                                                                        student.matricule
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-4 py-2 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                            {
                                                                                student[
                                                                                    "first name"
                                                                                ]
                                                                            }{" "}
                                                                            {
                                                                                student[
                                                                                    "last name"
                                                                                ]
                                                                            }
                                                                        </td>

                                                                        <td className="px-4 py-2 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                            <div className="flex items-center gap-x-2">
                                                                                <img
                                                                                    className="object-cover w-8 h-8 rounded-full"
                                                                                    src={student.image}
                                                                                    alt=""
                                                                                />
                                                                                <div>
                                                                                    <p className="text-xs font-normal text-gray-600">
                                                                                        {
                                                                                            student.email
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-4 py-2 text-xs font-medium text-gray-700 whitespace-nowrap">
                                                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                                                <h2 className="text-xs font-normal">
                                                                                    {
                                                                                        student.student_class
                                                                                    }
                                                                                </h2>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-4 py-2 text-xs whitespace-nowrap">
                                                                            <div className="flex items-center gap-x-6">
                                                                                <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                                                                    Edit
                                                                                </button>

                                                                                <button 
                                                                                onClick={ev => onDeleteClick(student.id)} 
                                                                                className="text-red-400 transition-colors duration-200 hover:text-red-400 focus:outline-none">
                                                                                    Delete
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {students.length > 0 &&   <PaginationStudents
                           meta={meta} onPageClick={onPageClick}
                                />}
                            </section>
                        </div>
                    </div>

                    <StudentSideInfo student={ selectedStudent }  />
                </div>
            )}
        </>
    );
}
