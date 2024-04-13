<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'role' => $this->role,
            'email' => $this->email,
            'email_verified' => !!$this->email_verified_at,
            'SID' => $this->SID,
            'student_class' => $this->student_class,
            'student_phone' => $this->student_phone,
            'student_phone_tutor' => $this->student_phone_tutor,
            'student_address' => $this->student_address,
 
        ];
    }
}
