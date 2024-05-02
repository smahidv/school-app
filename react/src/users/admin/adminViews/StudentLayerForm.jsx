import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ReactSelect from "../../../core/ReactSelect";
import { useState } from "react";
import axiosClient from "../../../axios";

export default function StudentLayerForm({ toggleLayer }) {
  
    const [students, setStudents] = useState({
        fname: "",
        lname: "",
        pphone: "",
        tphone: "",
        email: "",
        address: "",
        class: "",
        gender: "",
        birth_place: "",
        birth_date: null,
        bacalaureat: "",
        image_url:null,
        image:null

    });
  

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setStudents({
                ...students,
                image: file,
                image_url: reader.result,
            });

            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };
    const handleInput = (e) => {
        e.persist();
        setStudents({ ...students, [e.target.name]: e.target.value });
    };
    const handleClassSelect = (selectedOption) => {
        setStudents({ ...students, class: selectedOption.id });
        console.log(selectedOption.id);
    };
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = { ...students };
        if (payload.image) {
            payload.image = payload.image_url;
          }
          delete payload.image_url;
        axiosClient.post("/student", payload).then((res) => {
            window.location.reload();
        });
        // .catch((err) => {
        //     if (err && err.response) {
        //         setError(err.response.data.message);
        //     }
        //     console.log(err, err.response);
        // });
    };
    return (
        <div className="w-full  overflow-auto mb-10 py-4 shadow-2xl ">
            <div className="flex items-center gap-5 relative px-4 after:absolute after:w-full after:h-[0.1px] after:bg-[rgb(202,202,203)] after:left-0 after:top-9 after:rounded-full">
                <button onClick={toggleLayer} className="w-6">
                    <XMarkIcon />
                </button>
                <div className="font-bold">Create new Student</div>
            </div>
            <div className="mt-9 px-4 ">
                <pre >{JSON.stringify(students, undefined, 2)}</pre>

                <form action="#" method="post " onSubmit={onSubmit}>
                    <div className="grid gap-6 ">
                        <div className="mt-1 flex items-center">
                            {students.image_url && (
                                <img
                                    src={students.image_url}
                                    alt=""
                                    className="w-32 h-32 object-cover"
                                />
                            )}
                            {!students.image_url && (
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
                        <div className="flex gap-5  ">
                            <div className="grid ">
                                <label
                                    htmlFor="first-name"
                                    className=" text-sm mb-2 capitalize"
                                >
                                    first name
                                </label>
                                <input
                                    id="first-name"
                                    name="fname"
                                    required
                                    className="bg-[rgb(247,247,247)] px-3 py-1 w-[300px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                    type="text"
                                    placeholder="student's first name"
                                    onChange={handleInput}
                                    value={students.fname}
                                />
                            </div>
                            <div className="grid">
                                <label
                                    htmlFor="last-name"
                                    className=" text-sm mb-2 capitalize"
                                >
                                    last name
                                </label>
                                <input
                                    id="last-name"
                                    name="lname"
                                    required
                                    className="bg-[rgb(247,247,247)] px-3 py-1 w-[300px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                    type="text"
                                    placeholder="student's last name"
                                    onChange={handleInput}
                                    value={students.lname}
                                />
                            </div>
                        </div>
                        <div className="flex gap-5 ">
                            <div>
                                <div className=" text-sm mb-2 capitalize">
                                    gender
                                </div>
                                <input
                                    className="bg-[rgb(247,247,247)] px-3 py-1 w-[300px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                    type="text"
                                    placeholder="student's gender"
                                    name="gender"
                                    onChange={handleInput}
                                    value={students.gender}
                                />
                            </div>

                            <div>
                                <div className=" text-sm mb-2 capitalize">
                                    bacalaureat
                                </div>
                                <input
                                    className="bg-[rgb(247,247,247)] px-3 py-1 w-[300px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                    type="text"
                                    placeholder="student's bacalaureat"
                                    name="bacalaureat"
                                    onChange={handleInput}
                                    value={students.bacalaureat}
                                />
                            </div>
                        </div>

                        <div className="flex gap-5 ">
                            <div>
                                <div className=" text-sm mb-2 capitalize">
                                    place of birth
                                </div>
                                <input
                                    className="bg-[rgb(247,247,247)] px-3 py-1 w-[300px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                    type="text"
                                    placeholder="student's birth_place"
                                    name="birth_place"
                                    onChange={handleInput}
                                    value={students.birth_place}
                                />
                            </div>
                            <div>
                                <div className=" text-sm mb-2 capitalize">
                                   date of birth
                                </div>
                                <input
                                    className="bg-[rgb(247,247,247)] px-3 py-1 w-[300px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                    type="date"
                                    placeholder="student's birth_date"
                                    name="birth_date"
                                    onChange={handleInput}
                                    value={students.birth_date}
                                />
                            </div>
                        </div>

                        <div className="grid">
                            <label className=" text-sm mb-2 capitalize ">
                                Phone
                            </label>
                            <div className="flex gap-5">
                                <input
                                    className="bg-[rgb(247,247,247)] px-3 py-1 w-[300px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                    type="text"
                                    placeholder="personal phone number"
                                    name="pphone"
                                    onChange={handleInput}
                                    value={students.pphone}
                                />
                                <input
                                    className="bg-[rgb(247,247,247)] px-3 py-1 w-[300px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                    type="text"
                                    placeholder="tutor phone number"
                                    name="tphone"
                                    onChange={handleInput}
                                    value={students.tphone}
                                />
                            </div>
                        </div>
                        <div>
                            <div className=" text-sm mb-2 capitalize">
                                email
                            </div>
                            <input
                                className="bg-[rgb(247,247,247)] px-3 py-1 w-[300px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                type="email"
                                placeholder="student's email"
                                name="email"
                                onChange={handleInput}
                                value={students.email}
                            />
                        </div>
                        <div>
                            <div className=" text-sm mb-2 capitalize">
                                address
                            </div>
                            <input
                                className="bg-[rgb(247,247,247)] px-3 py-1 w-[300px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                type="text"
                                placeholder="ex : 1st year"
                                name="address"
                                onChange={handleInput}
                                value={students.address}
                            />
                        </div>
                        <div>
                            <div className=" text-sm mb-2 capitalize">
                                class
                            </div>
                            <div className="w-[300px] ">
                                <ReactSelect
                                    name="class"
                                    onChange={handleClassSelect}
                                    value={students.class}
                                    endpoint={"/classes"}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#4d59e4] px-6 py-1 rounded-[5px] text-white w-[100px]"
                        >
                            save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
