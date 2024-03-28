<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'field_id',  'created_at', 'updated_at'];
    public function field()
    {
        return $this->belongsTo(Field::class,'field_id');
    }
    public function modules()
    {
        return $this->hasMany(Module::class, 'level_id');
    }
    public function classrooms()
    {
        return $this->hasMany(ClassRoom::class, 'level_id');
    }
}
