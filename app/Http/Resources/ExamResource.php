<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class ExamResource extends JsonResource
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
            'status' => $this->status,
            'description' => $this->description,
            'duration' => $this->duration,
            'module_id' => $this->module_id,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'enable_date' => (new \DateTime($this->expire_date))->format('Y-m-d H:i:s'),
            'expire_date' => (new \DateTime($this->enable_date))->format('Y-m-d H:i:s'),
            'classroom_ids' => $this->classes()->pluck('class_rooms.id'),
            'questions' => ExamQuestionResource::collection($this->questions)
        ];
    }
}
