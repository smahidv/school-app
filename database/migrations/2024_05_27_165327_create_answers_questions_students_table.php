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
        Schema::create('answers_questions_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id')->constrained('exam_questions');
            $table->foreignId('answers_students_id')->constrained('answers_students');
            $table->longText('answer');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('answers_questions_students');
    }
};
