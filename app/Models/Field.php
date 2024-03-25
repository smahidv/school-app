<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'acronym', 'user_id',  'created_at', 'updated_at'];

    public function levels(){
        return $this->hasMany(Level::class);
    }
   public function modules()
{
    return $this->hasManyThrough(Module::class, Level::class);
}
    
}
