<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class ExamQuestionResource extends JsonResource
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
            'image_url' => $this->formatImages($this->image),
            'type' => $this->type,
            'question' => $this->question,
            'score' => $this->score,
            'description' => $this->description,
            'data' => json_decode($this->data)
        ];

        
    }

    private function formatImages($images)
    {
        $decodedImages = json_decode($images, true) ?? [];
        return array_map(function($image) {
            return URL::to($image);
        }, $decodedImages);
    }
}
