import React, { useEffect, useState } from "react";
import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import QuestionAside from "../teacherComponents/QuestionAside";
import QuestionEditor from "../teacherComponents/QuestionEditor";
import ExamLayer from "../teacherComponents/ExamLayer";


export default function ExamView({ toggleEditor }) {
   
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

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
     useEffect(() => {
       
        setExam((prevExam) => ({
            ...prevExam,
            questions: questions
        }));
    }, [questions]);




    const addQuestion = () => {
        const newQuestion = {
           
            type: "text",
            question: "type your question here...",
            description: "",
            score: 0,
            image: [],
            image_url: [],
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
            {examLayer && <ExamLayer exam={exam}  setExam={setExam} toggleExamLayer={toggleExamLayer} />}

            <div
                className={`bg-white absolute w-full min-h-screen top-0 z-30   ${
                    examLayer && "pointer-events-none overflow-hidden"
                }`}
            >
                {/* <pre>{JSON.stringify(exam, undefined, 2)}</pre> */}
                <div className="p-4 flex gap-3 items-center border-solid border-b-[#e5dfdf] border-b-[1px] ">
                    <button onClick={toggleEditor}>
                        <ArrowLongLeftIcon className="text-gray-600 w-6" />
                    </button>
                    <div className="text-lg">Questions</div>
                    <button
                        onClick={toggleExamLayer}
                        className="flex gap-2 items-center bg-[rgb(96,209,83)] py-[2px] px-7 rounded-sm text-white ml-auto font-semibold "
                    >
                        Next
                        <ArrowLongRightIcon className="w-6 " />
                    </button>
                </div>
                
                <div className="grid py-8 px-4 grid-cols-[20%_80%] bg-[#f8f9fa]  min-h-screen ">
                 

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
            </div>
        </>
    );
}

