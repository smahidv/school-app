<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
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
            "first name" => $this->{"first_name"},
            "last name" => $this->{"last_name"},
            'role' => $this->role,
            'email' => $this->email,
            'email_verified' => !!$this->email_verified_at,
            'matricule' => $this->matricule,
            'student_class' => $this->whenLoaded('classRoom', function () {
                return $this->classRoom->name;
            }),
            'phone' => $this->phone,
            'student_phone_tutor' => $this->student_phone_tutor,
            'address' => $this->address,
            'birth_place'=>$this->place_birth,
            'birth_date'=>$this->date_birth,
            'student_bacalaureat'=>$this->student_bacalaureat,
            'gender'=>$this->gender,
            'image'=>$this->image ? URL::to($this->image) : null

 
        ];
    }
}
