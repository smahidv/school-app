<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first name');
            $table->string('last name');
            $table->string('image')->nullable();
            $table->integer('role');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('matricule')->nullable();
            $table->integer('student_class_room_id')->nullable();
            $table->string('phone')->nullable();
            $table->string('student_phone_tutor')->nullable();
            $table->string('address')->nullable();
            $table->date('date_birth')->nullable();
            $table->string('gender')->nullable();
            $table->string('place_birth')->nullable();
            $table->string('student_bacalaureat')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
