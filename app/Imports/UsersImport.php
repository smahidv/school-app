<?php

namespace App\Imports;

use App\Mail\CredentialsMail;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\WithHeadingRow;


class UsersImport implements ToCollection, WithHeadingRow
{

    public function collection(Collection $rows)
    {
        // dd($rows->toArray());
        $pwd = Str::random(8);
        foreach ($rows as $row) {
            $user = User::create([

                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'email' => $row['email'],
                'phone' => $row['phone'],
                'address' => $row['address'],
                'gender' => $row['gender'],
                'place_birth' => $row['place_birth'],
                'date_birth' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['date_birth']),
                'role' => 2,
                'password' => Hash::make($pwd),
            ]);
            $matricule = $this->generateNumber($user->id);
            $user->matricule = $matricule;
            $user->save();
       
        $fname =  $row['first_name'];
        $lname = $row['last_name'];
        $url = 'http://localhost:3000/auth';
        $title = 'Credentials for your account';
    
   
        Mail::to($row['email'])->send(new CredentialsMail($title, $fname, $lname, $matricule, $pwd, $url));
    }

    }

    private function generateNumber($userId)
    {
        // Get the current year
        $currentYear = date('Y');

        // Format the generated number
        $generatedNumber = $currentYear . '-' . str_pad($userId, 4, '0', STR_PAD_LEFT);

        return $generatedNumber;
    }


    // public function rules(): array
    // {
    //     return [
    //         '*.first_name' => 'required|string|max:255',
    //         '*.last_name' => 'required|string|max:255',
    //         '*.email' => 'required|email|unique:users,email:rfc,dns',
    //         '*.phone' => 'required|string|max:20',
    //         '*.address' => 'string',
    //         '*.gender' => 'required|string|max:20',
    //         '*.place_birth' => 'string',
    //         '*.date_birth' => 'date',
    //     ];

    // }


}
