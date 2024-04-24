import { XMarkIcon } from "@heroicons/react/24/outline";
import ReactSelect from "../../../core/ReactSelect";
import { useState } from "react";
import axiosClient from "../../../axios";
import { useParams } from "react-router-dom";

export default function StudentLayerForm({ toggleLayer }) {
    const { id } = useParams();
    const [students, setStudents] = useState({
        fname: "",
        lname: "",
        pphone: "",
        tphone: "",
        email: "",
        address: "",
        class: "",
    });
    const handleInput = (e) => {
        e.persist();
        setStudents({ ...students, [e.target.name]: e.target.value });
    };
    const handleClassSelect = (selectedOption) => {
        setStudents({ ...students, class: selectedOption.value });
    };
    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...students };
        let res = null;
        // if (id) {
        // res = axiosClient.put(`/field/${id}`, payload);
        // } else {
        res = axiosClient.post("/student", payload);
        // }

        res.then((res) => {
            window.location.reload();
            // if (id) {
            //   showToast("The survey was updated");
            // } else {
            //   showToast("The survey was created");
            // }
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
                <pre>{JSON.stringify(students, undefined, 2)}</pre>

                <form action="#" method="post " onSubmit={onSubmit}>
                    <div className="grid gap-6 ">
                        <div className="grid">
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
                                first name
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
