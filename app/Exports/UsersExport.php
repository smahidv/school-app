<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return User::select(
            "first_name",
            "last_name",
            "image",
            "email",
            "matricule",
            "phone",
            "address",
            "gender",
            "place_birth",
            "date_birth"
        )->get();
    }

    public function headings(): array
    {
        return [
            "first_name",
            "last_name",
            "image",
            "email",
            "matricule",
            "phone",
            "address",
            "gender",
            "place_birth",
            "date_birth"
        ];
    }
}
