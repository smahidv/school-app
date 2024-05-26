import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ReactSelect from "../../../core/ReactSelect";
import axiosClient from "../../../axios";
import { useNavigate } from "react-router-dom";

export default function ExamLayer({
    toggleExamLayer,
    exam,
    handleInputChange,
    handleClassSelect,
    handleModuleSelect,
    id,
}) {
    const navigate = useNavigate();
    const dateTimeLocalKnow = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60_000
    )
        .toISOString()
        .slice(0, 16);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...exam };
        payload.questions.forEach((question) => {
            if (
                Array.isArray(question.image_url) &&
                question.image_url.length > 0
            ) {
                question.image = question.image_url;
            }

            delete question.image_url;
        });
        let res = null;
        if (id) {

            res = axiosClient.put(`/exam/${id}`, payload);
        } else {
            res = axiosClient.post("/exam", payload)
        }

            res.then((res) => {
                navigate("/t/c");
            })
            .catch((err) => {
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
                                    endpoint="/teacher-modules"
                                />
                            </div>

                            <div className="">
                                <label className="text-sm  text-[#282828]">
                                    Semester
                                </label>

                                <select
                                    className="mt-1 block outline-none p-[.3em] bg-[rgb(247,246,251)] w-full"
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
                                endpoint="/teacher-classes"
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
                        className="mt-10 bg-[rgb(96,209,83)] py-1 px-7 rounded-sm text-white ml-auto font-semibold "
                    >
                        {!id ? "Submit" : "Update"}
                    </button>
                </div>
            </div>
        </form>
    );
}
