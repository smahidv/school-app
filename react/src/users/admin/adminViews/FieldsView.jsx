import { useState } from "react";
import BlackButton from "../../../core/BlackButton";
import DeleteButton from "../../../core/DeleteButton";
import ModulesEditor from "../adminComponents/ModulesEditor";
import { v4 as uuidv4 } from "uuid";

export default function FieldsView() {
    const [fields, setFields] = useState({
        fname: "",
        acr: "",
        levels: [],
    });
    const [level, setLevel] = useState([...fields.levels]);
    const addLevel = (e) => {
        e.preventDefault();
        fields.levels.push({
            id: uuidv4(),
            lname: "",
            modules: [],
        });
        setFields({
            ...fields,
        });
    };

    const deleteLevel = (lev) => {
        fields.levels = fields.levels.filter((level) => level.id != lev.id);
        setFields({ ...fields });
        debugger;
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
    function onSubmit(e){
        e.preventDefault();
  
        console.log("submit");
    }

    return (
        <form action="#" method="post" onSubmit={onSubmit} >
            <div className="shadow-xl pb-6  relative after:absolute after:w-full after:h-[0.1px] after:bg-[rgb(202,202,203)] after:left-0 after:top-9 after:rounded-full">
                <div className="px-8 ">
                    <div className="  mb-8 font-bold ">Create new field</div>
                    <div className="grid gap-4">
                        {/* /////////////////////////////fields////////////////////////////// */}
                        <div>
                            <div className="font-semibold mb-3">Fields</div>
                            <div className="flex gap-4">
                                <input
                                    className="bg-[rgb(247,247,247)] px-3 py-2 md:w-full  max-w-[420px] outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                    type="text"
                                    placeholder="field name"
                                    value={fields.fname}
                                    onChange={(ev) =>
                                        setFields({
                                            ...fields,
                                            fname: ev.target.value,
                                        })
                                    }
                                />
                                <input
                                    className="bg-[rgb(247,247,247)] px-3 py-1  w-[100px]  outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                    type="text"
                                    placeholder="acronym"
                                    value={fields.acr}
                                    onChange={(ev) =>
                                        setFields({
                                            ...fields,
                                            acr: ev.target.value.toUpperCase(),
                                        })
                                    }
                                    maxLength="3"
                                />
                            </div>
                        </div>

                        {/* /////////////////////////////levels////////////////////////////// */}
                        <div>
                            <div className="flex justify-between items-center ">
                                <div className="font-semibold mb-3">Levels</div>
                                <BlackButton
                                    content="+ add level"
                                    onClick={addLevel}
                                />
                            </div>
                            <div className="grid gap-3  ">
                                {fields.levels.length > 0 ? (
                                    fields.levels.map((l, index) => (
                                        <div
                                            key={l.id}
                                            index={index}
                                            className="grid gap-3 relative after:absolute after:w-full after:h-[1.5px] after:bg-[rgb(236,236,237)] after:left-0 after:bottom-3 after:rounded-full"
                                        >
                                            <div className="flex gap-3 items-center">
                                                <p>{index + 1}.</p>
                                                <input
                                                    className="bg-[rgb(247,247,247)] px-3 py-2 w-[200px]    outline-none border-solid border-[1.34px] border-gray-300 rounded-md text-[0.85rem]"
                                                    type="text"
                                                    placeholder="level"
                                                    value={l.lname}
                                                    onInput={(ev) => {
                                                        l.lname =
                                                            ev.target.value;
                                                        setLevel({ ...level });
                                                    }}
                                                />
                                                <DeleteButton
                                                    onClick={() =>
                                                        deleteLevel(l)
                                                    }
                                                />
                                            </div>
                                            <ModulesEditor
                                                level={l}
                                                levelChange={levelChange}
                                                setLevel={setLevel}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-xs text-gray-600 text-center py-3">
                                        You don't have any levels defined
                                    </div>
                                )}
                            </div>
                        </div>

                        <button 
                        type="submit"
                        className="bg-[#4d59e4] px-6 py-1 rounded-[5px] text-white w-[100px]">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
