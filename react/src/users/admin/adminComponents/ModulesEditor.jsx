import React, { useEffect } from "react";
import BlackButton from "../../../core/BlackButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import { useOutletContext } from "react-router-dom";

export default function ModulesEditor() {
    const { l, setLevel, levelChange } = useOutletContext();

    function addModules(e, index) {
        e.preventDefault();
        e.stopPropagation();
        index = index !== undefined ? index : l.modules.length;
        l.modules.splice(index, 0, {
            id: uuidv4(),
            name: "",
        });

        setLevel({ ...l });
    }
    function deleteModule(module) {
        if (l.modules.length === 1) {

            return;
        }

   
        l.modules = l.modules.filter((m) => m.id !== module.id);
        setLevel({ ...l });
    }

    useEffect(() => {
        levelChange(l);
    }, [l]);

    return (
        <div>
            <div className="grid gap-4 mb-10">
                {l.modules.length > 0 ? (
                    l.modules.map((m, index = 0) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-2   "
                        >
                            <p>{index + 1}.</p>
                            <input
                                className="bg-[rgb(247,247,247)] px-3 py-2 md:w-full  max-w-[420px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                type="text"
                                placeholder="module name"
                                value={m.name}
                                onInput={(ev) => {
                                    m.name = ev.target.value;
                                    setLevel({ ...l });
                                }}
                            />
                            <BlackButton
                                content="+ add "
                                onClick={(e) => addModules(e, index + 1)}
                            />

                            {index === 0 ? (
                                <TrashIcon className="w-4 text-[rgb(138,139,140)] " />
                            ) : (
                                <TrashIcon
                                    className="w-4 text-red-500 cursor-pointer "
                                    onClick={(ev) => deleteModule(m)}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-xs text-gray-600 text-center py-3 mt-10">
                        You don't have any modules defined
                    </div>
                )}
            </div>
        </div>
    );
}
