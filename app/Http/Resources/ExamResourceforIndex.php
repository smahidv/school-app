<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ExamResourceforIndex extends JsonResource
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
            'user_id' => $this->user_id,
            'module_id' => $this->module_id,
            'duration' => $this->duration,
            'expire_date' => $this->expire_date,
            'enable_date' => $this->enable_date,
            'status' => $this->status,
            'created_at' => Carbon::parse($this->created_at)->toDateString(),
            'exam_id' => $this->exam_id,
            'class_room_id' => $this->class_room_id,
            'name'=>$this->name,     
        ];
    }
}
