<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamWithQuestionsResource extends JsonResource
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
            'teacher' => $this->user->first_name . ' ' . $this->user->last_name,
            'description'=>$this->description,
            'semester'=>$this->semester,
            'module' => $this->module->name,
            'class' => $this->classes->map(function ($class) {
                return $class['name'];
            }),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'enable_date' => (new \DateTime($this->enable_date))->format('Y-m-d H:i:s'),
            'expire_date' => (new \DateTime($this->expire_date))->format('Y-m-d H:i:s'),
            'questions' => ExamQuestionResource::collection($this->questions)
            
        ];
    }
}
