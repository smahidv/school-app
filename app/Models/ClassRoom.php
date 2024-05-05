<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassRoom extends Model
{
    use HasFactory;
    protected $fillable = ['name','level_id',  'created_at', 'updated_at'];
    public function level()
    {
        return $this->belongsTo(Level::class, 'level_id');
    }

    public function exams()
{
    return $this->belongsToMany(Exam::class,'exams_class_rooms','exam_id','class_room_id');
}

public function users()
{
    return $this->belongsToMany(User::class,'users_class_rooms','user_id','class_room_id');
}







}
