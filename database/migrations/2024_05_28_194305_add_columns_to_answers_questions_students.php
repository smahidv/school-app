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
        Schema::table('answers_questions_students', function (Blueprint $table) {
            $table->boolean('is_answer_correct');
            $table->integer('answer_score');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('answers_questions_students', function (Blueprint $table) {
            $table->dropColumn('is_answer_correct');
            $table->dropColumn('answer_score');
        });
    }
};
