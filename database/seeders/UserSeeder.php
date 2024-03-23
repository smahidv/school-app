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
                'first name' => 'oumaimaAdmin',
                'last name' => 'smahi',
                'email' => 'admin@gmail.com',
                'password' => Hash::make(1234567),
                'role' => User::ROLE_ADMIN,
                'image'=>'images/admin.jpg',
            ],[
                'first name' => 'oumaimateacher',
                'last name' => 'smahi',
                'email' => 'teacher@gmail.com',
                'password' => Hash::make(1234567),
                'role' => User::ROLE_TEACHER,
                'image'=>''
            ],[
                'first name' => 'ahmedstudent',
                'last name' => 'salali',
                'email' => 'student@gmail.com',
                'password' => Hash::make(1234567),
                'role' => User::ROLE_STUDENT,
                'image'=>''
            ]
        ];
        User::query()->insert($users);
    }
}
