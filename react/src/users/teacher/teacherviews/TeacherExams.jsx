import React, { useState } from "react";
import BlackButton from "../../../core/BlackButton";
import ExamView from "./ExamView";
import ExamTable from "../teacherComponents/ExamTable";
import { useParams } from "react-router-dom";

export default function TeacherExams() { 

    const {classId,moduleId} = useParams();
 
    const [openEditor, setOpenEditor] = useState(false);
    function toggleEditor(e) {
        setOpenEditor(!openEditor);
    }



    return (
        <div>
            {openEditor && <ExamView toggleEditor={toggleEditor} />}
            <div className={` p-5 ${openEditor && "pointer-events-none"}`}>
                <BlackButton onClick={toggleEditor} content="Create New" />
                <ExamTable
                classId={classId}
                moduleId={moduleId}
                 />
            </div>
        </div>
    );
}
