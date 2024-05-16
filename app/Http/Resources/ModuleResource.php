<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class ModuleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'module_id'=>$this->module_id,
            'module_name' => $this->module_name,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'class_room_name' => $this->class_room_name,
            'image' => $this->image ? URL::to($this->image) : null,


        ];
    }
}
