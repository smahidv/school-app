<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentsAnswersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'exam_id' => $this->exam_id,
            'sid' => $this->matricule,
            'student_fname' => $this->first_name,
            'student_lname' => $this->last_name,
            'student_image' => $this->image,//url
            'question_id' => $this->question_id,
            'answer' => $this->answer,
            'is_answer_correct' => $this->is_answer_correct,
            'answer_score' => $this->answer_score,
            'quiz_exam_grade' => $this->quiz_exam_grade,
        ];
    }
}
