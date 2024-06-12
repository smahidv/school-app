<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExamAnswerRequest;

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
            'student_id' => $user->id,
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
            ->join('exam_questions', 'exam_questions.id', '=', 'answers_questions_students.question_id') // Ensure correct join
            ->where('users.student_class_room_id', $classId)
            ->where('exams.module_id', $moduleId)
            ->select(
                'exams.id as exam_id',
                'exams.semester',
                'exam_questions.question',
                'exam_questions.type', // Ensure type is included in the select
                'exam_questions.score',
                'answers_students.id as student_work_id',
                'answers_students.*',
                'users.first_name as student_fname',
                'users.last_name as student_lname',
                'users.image as student_img',
                'users.matricule',
                'answers_questions_students.id as answer_id', // Ensure unique answer ID is selected
                'answers_questions_students.answer',
                'answers_questions_students.question_id',
                // 'answers_questions_students.answer_score',
                'answers_questions_students.is_answer_correct',
                'grades.quiz_exam_grade'
            )
            ->get();
    
        $processedResults = [];
    
        foreach ($results as $result) {
            $examId = $result->exam_id;
            $studentWorkId = $result->student_work_id;
            $studentId = $result->matricule;
            $studentFName = $result->student_fname;
            $studentLName = $result->student_lname;
            $student_img = url($result->student_img);
            $qsmGrade = $result->quiz_exam_grade;
    
            $answer = json_decode($result->answer, true);
            $questionId = $result->question_id;
            $question = $result->question;
            $answerScore = $result->score;
            $isAnswerCorrect = $result->is_answer_correct;
            $answerId = $result->answer_id; // Use the unique answer ID
            $questionType = $result->type; // Ensure type is used
    
            $index = array_search($examId, array_column($processedResults, 'exam_id'));
    
            if ($index === false) {
                $processedResults[] = [
                    'exam_id' => $examId,
                    'semester' => $result->semester,
                    'student_work' => [
                        [
                            'student_work_id' => $studentWorkId,
                            'qsm_grade' => $qsmGrade,
                            'student_id' => $studentId,
                            'student_fname' => $studentFName,
                            'student_lname' => $studentLName,
                            'student_img' =>$student_img,
                            'answers' => [
                                [
                                    'question_id' => $questionId,
                                    'answer' => $answer,
                                    'score' => $answerScore,
                                    'question' => $question,
                                    'isCorrect' => $isAnswerCorrect,
                                    'answer_id' => $answerId, // Ensure correct answer_id is used
                                    'type' => $questionType // Ensure correct type is used
                                ]
                            ]
                        ]
                    ]
                ];
            } else {
                $studentWorkIndex = array_search($studentWorkId, array_column($processedResults[$index]['student_work'], 'student_work_id'));
                if ($studentWorkIndex === false) {
                    $processedResults[$index]['student_work'][] = [
                        'student_work_id' => $studentWorkId,
                        'qsm_grade' => $qsmGrade,
                        'student_id' => $studentId,
                        'student_fname' => $studentFName,
                        'student_lname' => $studentLName,
                        'student_img' =>$student_img,
                        'answers' => [
                            [
                                'question_id' => $questionId,
                                'answer' => $answer,
                                'score' => $answerScore,
                                'isCorrect' => $isAnswerCorrect,
                                'answer_id' => $answerId, // Ensure correct answer_id is used
                                'question' => $question,
                                'type' => $questionType // Ensure correct type is used
                            ]
                        ]
                    ];
                } else {
                    $processedResults[$index]['student_work'][$studentWorkIndex]['answers'][] = [
                        'question_id' => $questionId,
                        'answer' => $answer,
                        'score' => $answerScore,
                        'isCorrect' => $isAnswerCorrect,
                        'answer_id' => $answerId, // Ensure correct answer_id is used
                        'question' => $question,
                        'type' => $questionType // Ensure correct type is used
                    ];
                }
            }
        }
    
        return response()->json($processedResults, 201);
    }
    
    public function getStudents(Request $request)
    {
        $validatedData = $request->validate([
       
            'class_id' => 'required|exists:class_rooms,id'  
        ]);
        
  
        $classId = $validatedData['class_id']; 
    
  
        $results =  DB::select('select users.first_name,users.last_name,users.image  from users where users.student_class_room_id=:class_id',
        ['class_id' =>  $classId ]);

          

    return $results;
    }
    
    
    
}
