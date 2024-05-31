<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassRoomController;
use App\Http\Controllers\examController;
use App\Http\Controllers\FieldController;
use App\Http\Controllers\moduleController;
use App\Http\Controllers\studentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('guest')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);



});

Route::middleware('auth:sanctum')->group(function () {


    Route::post('/logout', [AuthController::class, 'logout']);


    Route::middleware('admin')->group(function () {
        Route::apiResource('field', FieldController::class);
        Route::apiResource('student', studentController::class);
        Route::post('/users-import', [TeacherController::class, 'import']);
        Route::apiResource('teacher', TeacherController::class);
        Route::get('/all-modules', [FieldController::class, 'getAllModules']);
        Route::get('/all-classes', [FieldController::class, 'getAllClasses']);


    });

 
    Route::middleware('teacher')->group(function () {
        Route::apiResource('exam', examController::class);
        Route::get('/teacher-modules', [FieldController::class, 'getModules']);
        Route::get('/teacher-classes', [FieldController::class, 'getClasses']);
        Route::get('TeacherClassModule', [ClassRoomController::class, 'getTeacherClass']);
        Route::get('/teacher-exams', [examController::class, 'getExamsForTeachers']);
        Route::get('/getAnswers', [AnswerController::class, 'getAnswers']);


    });


    Route::middleware('student')->group(function () {
        Route::get('/dashboard', [moduleController::class, 'fetchDataModules']);   
        Route::get('/getByExam/{exam}', [examController::class, 'getByExam']);
        Route::get('/getExams', [examController::class, 'getExams']);
        Route::post('/storeAnswer/{user}/{exam}', [AnswerController::class, 'storeAnswer']);
    });



});
