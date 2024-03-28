import { useEffect, useState } from "react";
import BlackButton from "../../../core/BlackButton";
import DeleteButton from "../../../core/DeleteButton";
import { v4 as uuidv4 } from "uuid";
import axiosClient from "../../../axios";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";

export default function FieldsView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fields, setFields] = useState({
        name: "",
        acronym: "",
        levels: [],
    });

    const [level, setLevel] = useState([...fields.levels]);

    const addLevel = (e, index) => {
        e.preventDefault();
        index = index !== undefined ? index : fields.levels.length;
        fields.levels.splice(index, 0, {
            id: uuidv4(),
            name: "",
            modules: [{ id: uuidv4(), name: "" }],
            classrooms: [{ id: uuidv4(), name: "" }],
        });
        setFields({
            ...fields,
        });
    };

    const deleteLevel = (lev) => {
        fields.levels = fields.levels.filter((level) => level.id != lev.id);
        setFields({ ...fields });
    };

    const levelChange = (lev) => {
        if (level.length > 0) {
            const newLevels = level.map((l) => {
                if (l.id == lev.id) {
                    return { ...lev };
                }
                return l;
            });
            setLevel(newLevels);
        }
    };
    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...fields };
        let res = null;
        if (id) {
            res = axiosClient.put(`/field/${id}`, payload);
        } else {
            res = axiosClient.post("/field", payload);
        }

        res.then((res) => {
            console.log(res);
            navigate("/admin/fields");
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

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/field/${id}`).then(({ data }) => {
                setFields(data);
                setLoading(false);
            });
        }
    }, []);
    const links = [
       {create:"/fields/create/classrooms",update:`/fields/create/${id}/classrooms`, text: "classrooms" },
     {create:"/fields/create/modules",update:`/fields/create/${id}/modules`, text: "modules" }
    ];

    return (
        <>
            {/* <pre>{JSON.stringify(fields, undefined, 2)}</pre> */}
            {loading && <div className="text-center text-lg">Loading...</div>}
            {!loading && (
                <form action="#" method="post" onSubmit={onSubmit}>
                    <div className="shadow-xl mb-20 pb-6  relative after:absolute after:w-full after:h-[0.1px] after:bg-[rgb(202,202,203)] after:left-0 after:top-9 after:rounded-full">
                        <div className="px-8 ">
                            <div className="  mb-8 font-bold ">
                                {!id ? "Create new Course" : "Update Course"}
                            </div>
                            <div className="grid gap-8">
                                {/* /////////////////////////////fields////////////////////////////// */}
                                <div>
                                    <div className="font-semibold mb-3 text-lg">
                                     Course
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            className="bg-[rgb(247,247,247)] px-3 py-1 md:w-full  max-w-[350px] outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                            type="text"
                                            placeholder="field name"
                                            value={fields.name}
                                            onChange={(ev) =>
                                                setFields({
                                                    ...fields,
                                                    name: ev.target.value,
                                                })
                                            }
                                        />
                                        <input
                                            className="bg-[rgb(247,247,247)] px-3 py-1  w-[100px]  outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                            type="text"
                                            placeholder="acronym"
                                            value={fields.acronym}
                                            onChange={(ev) =>
                                                setFields({
                                                    ...fields,
                                                    acronym:
                                                        ev.target.value.toUpperCase(),
                                                })
                                            }
                                            maxLength="3"
                                        />
                                        <BlackButton
                                            content="+ add levels"
                                            onClick={addLevel}
                                          
                                        />
                                    </div>
                                </div>

                                {/* /////////////////////////////levels////////////////////////////// */}
                                <div>
                                    <div className="grid ">
                                        {fields.levels.length > 0 ? (
                                            fields.levels.map((l, index) => (
                                                <div
                                                    key={l.id}
                                                    index={index}
                                                    className="grid gap-4 mb-16 "
                                                >
                                                    <div className="flex justify-between items-center ">
                                                        <div className="font-semibold  text-lg">
                                                            Level
                                                        </div>
                                                        <BlackButton
                                                            content="+ add level"
                                                            onClick={(e) =>
                                                                addLevel(
                                                                    e,
                                                                    index + 1
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="flex gap-3 items-center">
                                                        <p>{index + 1}.</p>
                                                        <input
                                                            className="bg-[rgb(247,247,247)] px-3 py-1 w-[200px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                                            type="text"
                                                            placeholder="ex : 1st year"
                                                            value={l.name}
                                                            onInput={(ev) => {
                                                                l.name =
                                                                    ev.target.value;
                                                                setLevel({
                                                                    ...level,
                                                                });
                                                            }}
                                                        />
                                                        <DeleteButton
                                                            onClick={() =>
                                                                deleteLevel(l)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-4 border-solid border-[1.34px] border-gray-300 rounded-md py-2 min-w-[300px]">
                                                        <div className="px-2 font-semibold mb-3 flex justify-between relative after:absolute after:w-full after:h-[1.5px] after:bg-[rgb(236,236,237)] after:left-0 after:bottom-[-10px] after:rounded-full">
                                                            Classrooms and
                                                            Modules
                                                        </div>
                                                        <div className="px-2 text-sm flex gap-3 relative after:absolute after:w-full after:h-[0.1px] after:bg-[rgb(202,202,203)] after:left-0 after:bottom-[1.5px] after:rounded-full">
                                                            <div className="flex gap-6 ">
                                                                {links.map(
                                                                    (
                                                                        link,
                                                                        ind
                                                                    ) => (
                                                                        <div
                                                                            className="flex gap-1 "
                                                                            key={
                                                                                ind
                                                                            }
                                                                        >
                                                                            <NavLink
                                                                                className="pb-3 z-10 "
                                                                                style={({
                                                                                    isActive,
                                                                                }) => ({
                                                                                    color: isActive
                                                                                        ? "#4d59e4"
                                                                                        : " ",
                                                                                    fontWeight:
                                                                                        isActive
                                                                                            ? "bold"
                                                                                            : " ",
                                                                                    borderBottom:
                                                                                        isActive
                                                                                            ? "2px solid #4d59e4"
                                                                                            : " ",
                                                                                })}
                                                                                to={
                                                                                  id ?  link.update : link.create
                                                                                }
                                                                            >
                                                                                {
                                                                                    link.text
                                                                                }
                                                                            </NavLink>
                                                                            {link.create === "/fields/create/modules"  && (
                                                                                <p className="text-[rgb(138,139,140)] relative w-fit ">
                                                                                    (
                                                                                    {
                                                                                        l.modules.length
                                                                                    }

                                                                                    )
                                                                                </p>
                                                                            )}
                                                                            {link.create === "/fields/create/classrooms"  && (
                                                                                <p className="text-[rgb(138,139,140)] relative w-fit ">
                                                                                    (
                                                                                    {
                                                                                        l.classrooms.length
                                                                                    }

                                                                                    )
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                        <Outlet
                                                            context={{
                                                                l,
                                                                levelChange,
                                                                setLevel,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-xs text-gray-600 text-center py-3">
                                                You don't have any levels
                                                defined
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-[#4d59e4] px-6 py-1 rounded-[5px] text-white w-[100px]"
                                >
                                    {!id ? "save" : "Update"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}
