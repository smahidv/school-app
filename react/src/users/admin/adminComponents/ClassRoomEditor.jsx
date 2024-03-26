import React, { useEffect } from "react";
import BlackButton from "../../../core/BlackButton";
import { v4 as uuidv4 } from "uuid";
import { useOutletContext } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function ClassRoomEditor() {
    const { l, setLevel, levelChange } = useOutletContext();
    function addClassrooms(e, index) {
        e.preventDefault();
        e.stopPropagation();
        index = index !== undefined ? index : l.classrooms.length;
        l.classrooms.splice(index, 0, {
            uuid: uuidv4(),
            name: "",
        });

        setLevel({ ...l });
    }
    
    function deleteClassroom(classroom) {
      
        l.classrooms = l.classrooms.filter((c) => c.uuid != classroom.uuid);
        setLevel({ ...l });
    }
    useEffect(() => {
        levelChange(l);
    }, [l]);
    return (
        <div>
            <div className="grid gap-4 mb-10">
                {l.classrooms.length > 0 ? (
                    l.classrooms.map((c, index = 0) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 px-2   "
                        >
                            <p>{index + 1}.</p>
                            <input
                                className="bg-[rgb(247,247,247)] px-3 py-2 md:w-full  max-w-[420px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                type="text"
                                placeholder="Classroom name"
                                value={c.name}
                                onInput={(ev) => {
                                    c.name = ev.target.value;
                                    setLevel({ ...l });
                                }}
                            />
                            <BlackButton
                                content="+ add "
                                onClick={(e) => addClassrooms(e, index+1)}
                            />

                            { index === 0 ?(
                            <TrashIcon
                            className="w-4 text-[rgb(138,139,140)] "

                        />
                        ):(
                            <TrashIcon
                                className="w-4 text-red-500 cursor-pointer "
                                onClick={(ev) => deleteClassroom(c)}
                            />
                            )
 }
                        </div>
                    ))
                ) : (
                    <div className="text-xs text-gray-600 text-center py-3 mt-10">
                        You don't have any classrooms defined
                    </div>
                )}
            </div>
        </div>
    );
}
