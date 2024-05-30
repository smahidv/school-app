<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnswersStudent extends Model
{
    use HasFactory;


    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $fillable = ['user_id', 'exam_id'];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


