<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;
  
    protected $fillable = ['name','level_id',  'created_at', 'updated_at'];
    public function level()
    {
        return $this->belongsTo(Level::class, 'level_id');
    }
    public function User()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function exams()
    {
        return $this->hasMany(Exam::class);
    }

 
    
  

}
