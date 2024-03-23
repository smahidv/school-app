import React, { useEffect, useState } from "react";
import BlackButton from "../../../core/BlackButton";
import DeleteButton from "../../../core/DeleteButton";
import { v4 as uuidv4 } from "uuid";

export default function ModulesEditor({ level, levelChange ,setLevel}) {
    function addModules(e) {
        e.preventDefault();
        e.stopPropagation();
        level.modules.push({
            uuid: uuidv4(),
            name: "",
        });
        setLevel({ ...level });
    }
    function deleteModule(module) {
        level.modules = level.modules.filter((m) => m.uuid != module.uuid);
        setLevel({ ...level });
    }
    useEffect(() => {
        levelChange(level);
    }, [level]);

    return (
        <div>
            <div className="font-semibold mb-3 flex justify-between">
                <p>Modules</p>
                <BlackButton content="+ add module" onClick={addModules} />
            </div>

            <div className="grid gap-4 mb-10">
                {level.modules.length > 0 ? (
                    level.modules.map((m, index = 0) => (
                        <div
                            key={m.uuid}
                            className="flex items-center gap-3   "
                        >
                            <p>{index + 1}.</p>
                            <input
                                className="bg-[rgb(247,247,247)] px-3 py-2 md:w-full  max-w-[420px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                type="text"
                                placeholder="module name"
                                value={m.name}
                                onInput={(ev) => {
                                    m.name = ev.target.value;
                                    setLevel({ ...level });
                                }}
                            />

                            <DeleteButton onClick={(ev) => deleteModule(m)} />
                        </div>
                    ))
                ) : (
                    <div className="text-xs text-gray-600 text-center py-3">
                  You don't have any modules defined
                </div>
                )}
            </div>
        </div>
    );
}
