import React, { useEffect, useState } from "react";
import BlackButton from "../../../core/BlackButton";
import axiosClient from "../../../axios";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function AdminFields() {
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);

    const onDeleteClick = (id) => {
        if (window.confirm("Are you sure you want to delete this field?")) {
            axiosClient.delete(`/field/${id}`).then(() => {
                getFields();
                // showToast('The survey was deleted');
            });
        }
    };
    const getFields = () => {
        setLoading(true);
        axiosClient.get("/field").then(({ data }) => {
            setFields(data);
            setLoading(false);
        });
    };

    useEffect(() => {
        getFields();
    }, []);

    return (
        <>
            <div className=" flex justify-start">
                <BlackButton to="/fields/create" content="add field" />
            </div>
            {loading && <div className="text-lg mt-12">Loading...</div>}
            {!loading && (
                <>
                    <div className="grid gap-6 items-center mt-10 md:grid-cols-[repeat(auto-fill,_300px)]">
                        {fields.length > 0 &&
                            fields.map((field) => (
                                <div
                                    key={field.id}
                                    className="border-solid border-[1.34px] border-gray-300 rounded-md p-4 min-w-[300px] "
                                >
                                    <div className="flex justify-between items-center ">
                                        <p className="text-[rgb(63,84,104)] text-xs">
                                            {field.name}
                                        </p>
                                        <div className="flex gap-3 items-start">
                                            <Link
                                                to={`/fields/create/${field.id}`}
                                            >
                                                <PencilIcon className="w-4 cursor-pointer" />
                                            </Link>

                                            <TrashIcon
                                                onClick={() => {
                                                    onDeleteClick(field.id);
                                                }}
                                                className="w-4 text-red-500 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="text-3xl font-bold">
                                        {field.acronym}
                                    </div>
                                    {/* <div className="text-right text-[rgb(63,84,104)] text-[0.6rem]">
                                        created_at: {field.created_at}
                                    </div> */}
                                </div>
                            ))}
                    </div>
                </>
            )}
        </>
    );
}
