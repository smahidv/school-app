import React, { useState } from "react";
import BlackButton from "../../../core/BlackButton";
import ExamView from "./ExamView";

export default function TeacherExams() {
    const [openEditor, setOpenEditor] = useState(false);
    function toggleEditor(e) {
        setOpenEditor(!openEditor);
    }
    return (
        <div>
            {openEditor && <ExamView toggleEditor={toggleEditor} />}
            <div className={` p-5 ${openEditor && "pointer-events-none"}`}>
                <BlackButton onClick={toggleEditor} content="Create New" />
            </div>
        </div>
    );
}
