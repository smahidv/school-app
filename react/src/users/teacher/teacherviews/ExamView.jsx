import React, { useEffect, useState } from "react";
import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import QuestionAside from "../teacherComponents/QuestionAside";
import QuestionEditor from "../teacherComponents/QuestionEditor";
import ExamLayer from "../teacherComponents/ExamLayer";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../../axios";


export default function ExamView() {
    const { id } = useParams();
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const showQuestion = (index) => {
        setSelectedQuestionIndex(index);
    };

    const handleDeleteQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);

        if (selectedQuestionIndex === index) {
            const newIndex = Math.max(0, index - 1);
            setSelectedQuestionIndex(newIndex);
        }
    };
    const [questions, setQuestions] = useState([
        {
          
            type: "text",
            question: "type your question here...",
            description: "",
            score: 0,
            image: [],
            image_url: [],
            correct_option:[],
            data: [
                  {
                   
                    option: ""
                  }
                ]
        },
    ]);

    const [examLayer, setExamLayer] = useState(false);

    const [exam, setExam] = useState(
        {
         module_id:null,
          semester:"Semester 1",
          enable_date:"",
          expire_date:"",
          class_room_id:[],
          description:"",
          questions:questions
 
         }
     );

     const handleInputChange = (e, field) => {
        setExam({ ...exam, [field]: e.target.value });
    };

    const handleClassSelect = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.id);
        setExam({ ...exam, class_room_id: selectedValues });
    };

    const handleModuleSelect = (selectedOption) => {
        setExam({ ...exam, module_id: selectedOption.id });
        console.log(selectedOption);
        //  exemple {value: 'anglais', label: 'anglais', id: 9}
    };
     useEffect(() => {
       
        setExam((prevExam) => ({
            ...prevExam,
            questions: questions
        }));
    }, [questions]);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/exam/${id}`).then(({ data }) => {
                setExam(data.data);
                setQuestions(data.data.questions);
                setLoading(false);
                
            });
        }
    }, []);


    const addQuestion = () => {
        const newQuestion = {
           
            type: "text",
            question: "type your question here...",
            description: "",
            score: 0,
            image: [],
            image_url: [],
            correct_option:[],
            data: [
                  {
                   
                    option: ""
                  }
                ]
              
        };
        setQuestions([...questions, newQuestion]);
        setSelectedQuestionIndex(questions.length);
    };

    function toggleExamLayer() {
        setExamLayer(!examLayer);
    }
    
  

    return (
        <>
            {examLayer && 
            <ExamLayer
             exam={exam}  
             handleModuleSelect={handleModuleSelect}
             handleClassSelect={handleClassSelect}
             toggleExamLayer={toggleExamLayer}
             handleInputChange={handleInputChange} 
             id={id}
             />}
            {loading ? (
                           
                                                    <div className="flex justify-center items-center my-5 text-gray-900 text-xl animate-pulse">
                                                        <span>loading...</span>
                                                    </div>
                                      
                                        )
           : (<div
                className={`  min-h-screen   ${
                    examLayer && "pointer-events-none overflow-hidden"
                }`}
            >
                {/* <pre>{JSON.stringify(exam, undefined, 2)}</pre>  */}
           
                <div className="p-6 pr-10  flex gap-3 items-center border-solid border-b-[#e5dfdf] border-b-[1px] ">
                    <Link to="/t/" >
                        <ArrowLongLeftIcon className="text-gray-600 w-6" />
                    </Link>
                    <div className="text-xl">Questions</div>
                    <button
                        onClick={toggleExamLayer}
                        className="flex gap-2 items-center bg-[rgb(96,209,83)] py-2 px-7 rounded-sm text-white ml-auto font-semibold "
                    >
                        Next
                        <ArrowLongRightIcon className="w-6 " />
                    </button>
                </div>
                
                <div className="grid py-8 px-4 grid-cols-[20%_78%] bg-[#f8f9fa]  min-h-screen gap-9">
                 

                    <QuestionAside
                        questions={questions}
                        selectedQuestionIndex={selectedQuestionIndex}
                        addQuestion={addQuestion}
                        showQuestion={showQuestion}
                        handleDeleteQuestion={handleDeleteQuestion}
                    />
       
                    <QuestionEditor
                        questions={questions}
                        setQuestions={setQuestions}
                        addQuestion={addQuestion}
                        selectedQuestionIndex={selectedQuestionIndex}
                    />
                </div>
            </div>)}
        </>
    );
}

