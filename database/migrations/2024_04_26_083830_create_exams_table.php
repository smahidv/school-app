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
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class, 'user_id');
            $table->foreignIdFor(\App\Models\Module::class, 'module_id');
            $table->foreignIdFor(\App\Models\ClassRoom::class, 'class_room_id');
            $table->string('semester',50);
            $table->longtext('description')->nullable();
            $table->integer('duration')->nullable();
            $table->date('expire_date');
            $table->date('enable_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};
