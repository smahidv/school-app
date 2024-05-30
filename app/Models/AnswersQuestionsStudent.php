<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnswersQuestionsStudent extends Model
{
    use HasFactory;
    
    protected $fillable = ['question_id', 'answers_students_id', 'answer','is_answer_correct','answer_score'];
}
