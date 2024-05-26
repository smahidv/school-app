<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ExamsForTeacheRessources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'exam_id' => $this->id,
            'duration' => $this->duration,
            'expire_date' => Carbon::parse($this->expire_date)->toDateTimeString(),
            'enable_date' => Carbon::parse($this->enable_date,)->toDateTimeString(),
            'status' => $this->status,
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d'),
            'semester'=>$this->semester,
            'module' => $this->module->name,
            'class' => $this->classes->first()->name,
        ];
    }
}
