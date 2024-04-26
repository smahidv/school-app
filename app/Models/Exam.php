<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;
    protected $fillable = ['semester', 'description',  'module_id', 'user_id','duration','expire_date','enable_date','status' ,'created_at', 'updated_at'];
    public function classes()
    {
        return $this->belongsToMany(ClassRoom::class,'exams_class_rooms','exam_id','class_room_id');
    }
    public function questions()
    {
        return $this->hasMany(ExamQuestions::class);
    }

}
