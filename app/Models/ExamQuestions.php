<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamQuestions extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'type', 'question','image','score', 'description', 'data', 'exam_id','correct_option'];

    public function exam()
    {
        return $this->belongsTo(Exam::class,'exam_id');
    }
}
