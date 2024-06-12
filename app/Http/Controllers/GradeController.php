<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Grade;
use Illuminate\Http\Request;

class GradeController extends Controller
{ 
  
    
    public function updateTotalGrade(Request $request)
    {
        try {
            $gradesToUpdate = $request->all(); // Assuming you're sending an array of grades from the client
    
            foreach ($gradesToUpdate as $answerId => $totalGrade) {
                $grade = Grade::where('answers_students_id', $answerId)->first(); // Fetch the grade record by answers_students_id
                if ($grade) {
                    // Check if total grade is provided, if not, keep the current value
                    if ($totalGrade !== null) {
                        $grade->total_exam_grade = $totalGrade; // Update the total_exam_grade
                        $grade->save(); // Save the changes
                    }
                } else {
                    // Grade record not found for the given answers_students_id
                    return response()->json(['error' => 'Grade record not found for answers_students_id: ' . $answerId], 404);
                }
            }
    
            return response()->json(['message' => 'Total exam grades updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update total exam grades'], 500);
        }
    }
    

    public function getGrades(Request $request)
    {
        // Extracting the values from the request
        $student_class_room_id = $request->input('student_class_room_id');
        $exam_id = $request->input('exam_id');
    
        // Your SQL query
        $query = "SELECT users.first_name, users.last_name, users.matricule, grades.total_exam_grade
                  FROM grades
                  JOIN answers_students ON grades.answers_students_id = answers_students.id
                  JOIN users ON users.id = answers_students.student_id
                  WHERE users.student_class_room_id = ? AND answers_students.exam_id = ?";
        
        // Executing the query with the extracted values
        $grades = DB::select($query, [$student_class_room_id, $exam_id]);
    
        // Do whatever you want with the $grades here
    
        // Returning the grades
        return $grades;
    }
    
    }
    






