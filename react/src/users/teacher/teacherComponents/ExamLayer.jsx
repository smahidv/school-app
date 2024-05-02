import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ReactSelect from "../../../core/ReactSelect";
import axiosClient from "../../../axios";

export default function ExamLayer({ toggleExamLayer, exam, setExam }) {
    const handleInputChange = (e, field) => {
        setExam({ ...exam, [field]: e.target.value });
    };

    const handleClassSelect = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.id);
        setExam({ ...exam, class_room_id: selectedValues });
    };

    const handleModuleSelect = (selectedOption) => {
        setExam({ ...exam, module_id: selectedOption.id });
        console.log(selectedOption);
        //  exemple {value: 'anglais', label: 'anglais', id: 9}
    };

    const dateTimeLocalKnow = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60_000
    )
        .toISOString()
        .slice(0, 16);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...exam };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;

       axiosClient.post("/exam", payload).then((res) => {
        window.location.reload();
console.log(res);
        }).catch((err) => {
            if (err && err.response) {
                setError(err.response.data.message);
            }
         
        });
    };

    return (
        <form action="#" method="POST" onSubmit={onSubmit}>
            <div className="absolute bg-white z-50 [box-shadow:0_0_0_9999px_#000000b0]  shadow-sm rounded-sm  left-[50%] top-[10%] bottom-10 translate-x-[-50%] overflow-y-scroll  ">
                {/* <pre>{JSON.stringify(exam, undefined, 2)}</pre>  */}

                <div className=" py-3 px-4 flex justify-between items-center  relative  after:absolute after:w-full after:h-[1.5px] after:bg-gray-200 after:bottom-[-1px] after:left-0 ">
                    <div className="text-[#282828]">Exam</div>
                    <button className="w-7" onClick={toggleExamLayer}>
                        <XMarkIcon className="text-red-500" />
                    </button>
                </div>

                <div className=" py-5 px-4 ">
                    <div className="text-[#282828] font-semibold text-sm">
                        Exam Instructions
                    </div>
                    <div className="mt-6 grid gap-4">
                        <div className="grid sm:grid-cols-[1fr_1fr] gap-x-20 gap-y-5">
                            <div>
                                <label className="text-sm  text-[#282828]">
                                    Subject Name
                                </label>
                                <ReactSelect
                                    onChange={handleModuleSelect}
                                    endpoint="/modules"
                                />
                            </div>

                            <div className="">
                                <label className="text-sm  text-[#282828]">
                                    Semester
                                </label>

                                <select
                                    className="mt-1 block outline-none p-[.3em] bg-[rgb(247,246,251)]"
                                    onChange={(e) =>
                                        handleInputChange(e, "semester")
                                    }
                                    value={exam.semester}
                                >
                                    <option value="Semester 1">
                                        Semester 1
                                    </option>
                                    <option value="Semester 2">
                                        Semester 2
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="enable_date"
                                    className="text-sm text-[#282828]"
                                >
                                    Exam start date
                                </label>
                                <input
                                    id="enable_date"
                                    onChange={(e) =>
                                        handleInputChange(e, "enable_date")
                                    }
                                    className="mt-1 block outline-none p-[.3em] bg-[rgb(247,246,251)]"
                                    type="datetime-local"
                                    value={exam.enable_date}
                                    min={dateTimeLocalKnow}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="expire_date"
                                    className="text-sm text-[#282828]"
                                >
                                    Exam expire date
                                </label>
                                <input
                                    id="expire_date"
                                    onChange={(e) =>
                                        handleInputChange(e, "expire_date")
                                    }
                                    className="mt-1 block outline-none p-[.3em] bg-[rgb(247,246,251)]"
                                    type="datetime-local"
                                    value={exam.expire_date}
                                    min={dateTimeLocalKnow}
                                />
                            </div>
                        </div>

                        <div className="">
                            <label className="mb-1">Classes</label>
                            <ReactSelect
                                onChange={handleClassSelect}
                                endpoint="/classes"
                                isMulti
                            />
                        </div>
                        <textarea
                            rows={5}
                            cols={40}
                            placeholder="Exam Description(optional)"
                            className="bg-[rgb(247,246,251)] rounded-md placeholder:text-gray-500 placeholder:text-sm  shadow-md outline-none  w-full px-4 py-1 "
                            value={exam.description}
                            onChange={(e) =>
                                handleInputChange(e, "description")
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-10 bg-[rgb(96,209,83)] py-[2px] px-7 rounded-sm text-white ml-auto font-semibold "
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}
