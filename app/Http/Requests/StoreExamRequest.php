<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExamRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' => auth()->id(), 
            'enable_date' => date('Y-m-d H:i:s', strtotime($this->enable_date)),
            'expire_date' => date('Y-m-d H:i:s', strtotime($this->expire_date)),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'exists:users,id',
            'module_id' => 'exists:modules,id',
            'class_room_id' => 'array|exists:class_rooms,id',
            'description' => 'nullable|string',
            'semester' => 'string',
           'enable_date' => 'required|date',
            'expire_date' => 'required|date|after:enable_date',
            'questions' => 'array',
        ];
    }
}
