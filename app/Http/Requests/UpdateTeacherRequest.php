<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTeacherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('teacher');
        // php artisan route:list
        return [
            'id' => 'exists:users,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            // 'email' => 'required|email|unique:users,email,'.$id,
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'gender' => 'required|string|max:20',
            'image' => 'nullable',
            'place_birth' => 'string',
            'date_birth' => 'date',
            'classrooms' => 'required|array',
            // 'modules' => 'required|array'
        ];
    }
}
