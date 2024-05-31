import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axiosClient from "../../../axios";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import SchoolYellowTheme from "../../../images/2148224268.jpg";
import MathTheme from "../../../images/math-colourful-rulers.jpg";
import GeometricTheme from "../../../images/top-view-geometric-forms.jpg";
import ScienceTheme from "../../../images/top-view-math-science.jpg";
import NotepadTheme from "../../../images/notepad-set-square.jpg";
import LaboratorTheme from "../../../images/still-life-laboratory-samples.jpg";
import MicroscopeTheme from "../../../images/microscope-school-items-frame.jpg";
import { useClassModuleContext } from "../../../contexts/FindExamByClassModuleProvider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function TeacherDashboard() {
    const [teacherClassroom, setTeacherClassroom] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setClassModule, classModule } = useClassModuleContext();


    const themes = [
        MicroscopeTheme,
        LaboratorTheme,
        NotepadTheme,
        ScienceTheme,
        GeometricTheme,
        MathTheme,
        SchoolYellowTheme,
    ];

    function getClasses() {
        axiosClient.get("/TeacherClassModule").then(({ data }) => {
            setLoading(false);
            setTeacherClassroom(data);
        });
    }

    function handleChoosenModuleClass(item) {
        setClassModule({
            class_name:item.class_name,
            module_name: item.module_name,
            class_id:item.class_id,
            module_id:item.module_id
        });
    
    }

    useEffect(() => {
        setClassModule({
            class_name:null ,
            module_name:null ,
        });
        setLoading(true);
        getClasses();
    }, []);

    return (
        <div className="m-12">
            <div className="my-6 flex justify-end">
                <Link
                    to="/t/exam"
                    className="text-white bg-slate-900 px-6 py-2 rounded-[5px] capitalize w-fit"
                >
                    <span>Add New Exam</span>
                </Link>
            </div>

            {loading ? (
                <div className="my-12">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 gap-8">
                    {teacherClassroom &&
                        teacherClassroom.map((classItem, i) => (
                            <div
                                key={i}
                                className="border-solid border-gray-200 border-[1px] rounded-md max-w-[300px]"
                            >
                                <div className="relative">
                                    <LazyLoadImage
                                        src={themes[i % themes.length]}
                                        alt={`${classItem.class_name} theme`}
                                        className="w-full h-[250px] object-cover rounded-md"
                                        effect="blur"
                                        
                                    />
                                    <div className="absolute bottom-0 left-0 p-4 bg-white bg-opacity-70 w-full rounded-b-md">
                                        <p className="text-xl font-bold text-gray-900 hover:underline">
                                            {classItem.class_name}
                                        </p>
                                        <p className="font-bold text-gray-900 hover:underline capitalize">
                                            {classItem.module_name}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-fit ml-auto p-4 mt-6 group cursor-pointer">
                                    <NavLink
                                        to={`/t/c/${classItem.class_id}/${classItem.module_id}`}
                                        onClick={() => handleChoosenModuleClass(classItem)}
                                    >
                                        <ArrowTopRightOnSquareIcon className="w-8 group-hover:text-gray-900 text-gray-500" />
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
