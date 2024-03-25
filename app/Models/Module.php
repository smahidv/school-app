<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;
    use \Znck\Eloquent\Traits\BelongsToThrough;
    protected $fillable = ['name','level_id',  'created_at', 'updated_at'];
    public function level()
    {
        return $this->belongsTo(Level::class, 'level_id');
    }
  
}
