<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class TeacherResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            "first_name" => $this->{"first_name"},
            "last_name" => $this->{"last_name"},
            'email' => $this->email,
            'matricule' => $this->matricule,
            'classrooms' => $this->classrooms->map->only(['name', 'id'])->values(),
            'phone' => $this->phone,
            'address' => $this->address,
            'birth_place'=>$this->place_birth,
            'birth_date'=>$this->date_birth,
            'gender'=>$this->gender,
            'image'=>$this->image ? URL::to($this->image) : null,
            'modules'=>$this->modules->map->only(['name', 'id'])->values()
 
        ];
    }
}
