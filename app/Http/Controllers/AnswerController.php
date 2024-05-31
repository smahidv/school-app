<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExamAnswerRequest;
use App\Http\Resources\StudentsAnswersResource;
use App\Models\AnswersQuestionsStudent;
use App\Models\AnswersStudent;
use App\Models\Exam;
use App\Models\ExamQuestions;
use App\Models\Grade;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnswerController extends Controller
{
    public function storeAnswer(StoreExamAnswerRequest $request, User $user, Exam $exam)
    {
        
     $validated = $request->validated();

     $examAnswer = AnswersStudent::create([
            'user_id' => $user->id,
            'exam_id' => $exam->id,

        ]);

        foreach ($validated['answers'] as $questionId => $answer) {
            $question = ExamQuestions::where(['id' => $questionId, 'exam_id' => $exam->id])->get();

            if (!$question) {
                return response("Invalid question ID: \"$questionId\"", 400);
            }

            foreach ($question as $q) {
            $correct_answer= json_decode($q["correct_option"]);
 
           $is_answer_correct = $correct_answer === $answer ? 1 : 0;

           $score = $is_answer_correct ? $q["score"] : 0;
            }

          AnswersQuestionsStudent::create([
                'question_id' => $questionId,
                'answers_students_id' => $examAnswer->id,
                'is_answer_correct'=>  $is_answer_correct,
                'answer' => is_array($answer) ? json_encode($answer) : $answer,
               'answer_score'=>  $score
    
            ]);
        }
        $totalScore = AnswersQuestionsStudent::where('answers_students_id', $examAnswer->id)->sum('answer_score');
      
        Grade::create([
            'answers_students_id' => $examAnswer->id,
            'quiz_exam_grade'=> $totalScore ,

        ]);

        return response("", 201);
    }



    public function getAnswers(Request $request, Exam $exam)
    {
        // Validate the request to ensure module_id and class_id are present
        $validatedData = $request->validate([
            'module_id' => 'required|exists:modules,id', 
            'class_id' => 'required|exists:class_rooms,id'  
        ]);
    
        $moduleId = $validatedData['module_id'];
        $classId = $validatedData['class_id']; 
    
        // Perform the query using the Query Builder
        $results = DB::table('exams')
            ->join('answers_students', 'exams.id', '=', 'answers_students.exam_id')
            ->join('users', 'users.id', '=', 'answers_students.student_id')
            ->join('answers_questions_students', 'answers_questions_students.answers_students_id', '=', 'answers_students.id')
            ->join('grades', 'grades.answers_students_id', '=', 'answers_students.id')
            ->where('users.student_class_room_id', $classId)
            ->where('exams.module_id', $moduleId)
            ->select('exams.*', 'answers_students.*', 'users.*', 'answers_questions_students.*', 'grades.*')
            ->get();
    
        // You can now return the results, manipulate them, or pass them to a view
        return StudentsAnswersResource::collection($results);
    }
}
