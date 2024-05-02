<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $users  = [
            [
                'first name' => 'ahmed',
                'last name' => 'filali',
                'email' => 'ahmedFilali@gmail.com',
                'password' => Hash::make(1234567),
                'role' => User::ROLE_TEACHER,
                'image'=>'',
                'matricule'=>'2024-0002',
                'phone'=>'0647895552',
                'date_birth'=>'1960-04-27',
                'place_birth'=>'settat',
                'gender'=>'male',
                'address'=>'settat hay smaala bloc 18'
            ]
        ];
        User::query()->insert($users);
    }
}
