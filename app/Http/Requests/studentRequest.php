<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class studentRequest extends FormRequest
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
        return [
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'pphone' => 'required|string|max:20',
            'tphone' => 'nullable|string|max:20',
            'email' => 'required|email|unique:users,email',
            'address' => 'required|string|max:255',
            'class' => 'required',
            'image'=>'required',
            'gender'=> 'required|string|max:20',
            'bacalaureat'=> 'required|string|max:255',
            'birth_date'=> 'date|required',
            'birth_place'=> 'required|string',
        ];
    }
}
