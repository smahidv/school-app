import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLongLeftIcon, PhotoIcon } from "@heroicons/react/24/outline";
import BlackButton from "../../../core/BlackButton";
import axiosClient from "../../../axios";
import ReactSelect from "../../../core/ReactSelect";

export default function AdminTeacherForm() {
    const { id } = useParams();
    const [teacher, setTeacher] = useState({
    });
    const onImageChoose = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setTeacher({
                ...teacher,
                image: file,
                image_url: reader.result,
            });

            ev.target.value = '';
        };
        reader.readAsDataURL(file);
    };
    const handleInput = (e, field) => {
        e.persist();
        setTeacher({ ...teacher, [field]: e.target.value });
    };


     const handleMultiSelect = (selectedOptions,field) => {
        const selectedValues = selectedOptions.map((option) => option);
        setTeacher({ ...teacher, [field]: selectedValues });
    };

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...teacher };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;
        delete payload.matricule;
        if (payload.classrooms) {
            payload.classrooms = payload.classrooms.map(classroom => classroom.id);
        }
    
        // Extract module IDs
        if (payload.modules) {
            payload.modules = payload.modules.map(module => module.id);
        }
    
        let res = null;
        if (id) {
            res = axiosClient.put(`/teacher/${id}`, payload);
        }

        res.then((res) => {
            navigate("/admin/teachers");
        }).catch((err) => {
            if (err && err.response) {
                setError(err.response.data.message);
            }
        });
    };

    useEffect(() => {
        if (id) {
            axiosClient.get(`/teacher/${id}`).then(({ data }) => {
                setTeacher(prevTeacher => ({
                    ...data.data,
                    classrooms: data.data.classrooms?.map(classroom => ({
                        value: classroom.name, 
                        label: classroom.name, 
                        id: classroom.id
                    })),
                    modules: data.data.modules?.map(module => ({
                        value: module.name, 
                        label: module.name, 
                        id: module.id
                    }))
                }));
            });
        }
    }, [id]);
    
    return (
        <form action="#" method="post " onSubmit={onSubmit} >
         

            <div className="bg-white absolute w-full  h-full  overflow-auto pb-6  z-30 top-0      ">
       
                <div className=" relative ">
                    <div className="flex justify-between z-40 px-4 py-3 shadow-md bg-white fixed w-full">
                        <Link to="/admin/teachers">
                            <ArrowLongLeftIcon className="w-8  text-gray-500" />
                        </Link>
                        <BlackButton type="submit" content="create" />
                    </div>
                    <div></div>
                </div>
                <div className="grid gap-9 mt-24  ml-10 w-fit">
                    <div className="grid gap-6">
                        <p className="font-bold text-xl">
                            Personal Information
                        </p>
                        <div className="mt-1 flex items-center">
                            {teacher.image_url && (
                                <img
                                    src={teacher.image_url}
                                    alt=''
                                    className="w-32 h-32 object-cover"
                                />
                            )}
                            {!teacher.image_url && (
                                <span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                    <PhotoIcon className="w-8 h-8" />
                                </span>
                            )}

                            <button
                                type="button"
                                className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <input
                                    type="file"
                                    className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                                    onChange={onImageChoose}
                                />
                                Change
                            </button>
                        </div>
                        <div className="grid gap-6">
                            <div className="lg:flex lg:gap-6">
                                {" "}
                                <div>
                                    <small className="block capitalize">
                                        first name
                                    </small>
                                    <input
                                        className="bg-[rgb(243,244,246)] px-3 py-1 min-w-[300px] outline-none rounded-md text-[0.85rem]"
                                        type="text"
                                        placeholder="first name"
                                        value={teacher.first_name || ''}
                                        onChange={(e) =>
                                            handleInput(e, "first_name")
                                        }

                                    />
                                </div>
                                <div>
                                    <small className="block capitalize">
                                        last name
                                    </small>
                                    <input
                                        className="bg-[rgb(243,244,246)] px-3 py-1 min-w-[300px] outline-none rounded-md text-[0.85rem]"
                                        type="text"
                                        onChange={(e) =>
                                            handleInput(e, "last_name")
                                        }
                                        placeholder="last_name"
                                        value={teacher.last_name || ''}
                                    />
                                </div>
                                <div>
                                    <small className="block capitalize">
                                        gender
                                    </small>
                                    <input
                                        className="bg-[rgb(243,244,246)] px-3 py-1 min-w-[300px] outline-none rounded-md text-[0.85rem]"
                                        type="text"
                                        onChange={(e) =>
                                            handleInput(e, "gender")
                                        }
                                        placeholder="gender"
                                        value={teacher.gender || ''}
                                    />
                                </div>
                            </div>
                            <div className="lg:flex lg:gap-6">
                                <div>
                                    <small className="block capitalize">
                                        Place of birth
                                    </small>
                                    <input
                                        className="bg-[rgb(243,244,246)] px-3 py-1 min-w-[300px] outline-none rounded-md text-[0.85rem]"
                                        type="text"
                                        onChange={(e) =>
                                            handleInput(e, "birth_place")
                                        }
                                        placeholder="birth_place"
                                        value={teacher.birth_place || ''}
                                    />
                                </div>
                                <div>
                                    <small className="block capitalize">
                                        date of birth
                                    </small>
                                    <input
                                        className="bg-[rgb(243,244,246)] px-3 py-1 min-w-[300px] outline-none rounded-md text-[0.85rem]"
                                        type="date"
                                        onChange={(e) =>
                                            handleInput(e, "birth_date")
                                        }
                                        placeholder="birth_date"
                                        value={teacher.birth_date || ''}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <p className="font-bold text-xl">Contact Information</p>
                        <div className="grid gap-6">
                            <div className="lg:flex lg:gap-6">
                                {" "}
                                <div>
                                    <small className="block capitalize">
                                        phone
                                    </small>
                                    <input
                                        className="bg-[rgb(243,244,246)] px-3 py-1 min-w-[300px] outline-none rounded-md text-[0.85rem]"
                                        type="text"
                                        onChange={(e) =>
                                            handleInput(e, "phone")
                                        }
                                        placeholder="phone"
                                        value={teacher.phone || ''}
                                    />
                                </div>
                                <div>
                                    <small className="block capitalize">
                                        email
                                    </small>
                                    <input
                                        className="bg-[rgb(243,244,246)] px-3 py-1 min-w-[300px]outline-none rounded-md text-[0.85rem]"
                                        type="text"
                                        onChange={(e) =>
                                            handleInput(e, "email")
                                        }
                                        placeholder="email"
                                        value={teacher.email || ''}
                                    />
                                </div>
                                <div>
                                    <small className="block capitalize">
                                        address
                                    </small>
                                    <input
                                        className="bg-[rgb(243,244,246)] px-3 py-1 min-w-[300px] outline-none rounded-md text-[0.85rem]"
                                        type="text"
                                        onChange={(e) =>
                                            handleInput(e, "address")
                                        }
                                        placeholder="address"
                                        value={teacher.address || ''}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:flex grid gap-6 gap">
                        <div className="grid gap-4 min-w-[300px]">
                            <p className="font-bold text-xl">Classes</p>
                            <ReactSelect 
                            isMulti
                            endpoint={"/all-classes"}
                            onChange={(e) =>
                                handleMultiSelect(e, "classrooms")
                            }
                            value={teacher.classrooms || []}
                          
                            />
                        </div>
                        <div className="grid gap-4 min-w-[300px]">
                            <p className="font-bold text-xl">Subjects</p>
                            <ReactSelect 
                            isMulti
                            endpoint={"/all-modules"}
                            value={teacher.modules || []}
                            onChange={(e) =>
                                handleMultiSelect(e, "modules")
                            }
                           
                            />
                             
                        </div>
                    </div>
                </div>
                {/* <pre>{JSON.stringify(teacher, undefined, 2)}</pre> */}
            </div>
        </form>
    );
}
