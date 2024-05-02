<?php

use App\Http\Controllers\AuthController;
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
    Route::get('/classes', [FieldController::class, 'getClasses']);
    Route::get('/modules', [FieldController::class, 'getModules']);
    Route::post('/logout', [AuthController::class, 'logout']);


    Route::middleware('admin')->group(function () {
        Route::apiResource('field', FieldController::class);
        Route::apiResource('student', studentController::class);
        Route::post('/users-import', [TeacherController::class, 'import']);
        Route::get('/users-export', [TeacherController::class, 'export']);


    });

    Route::middleware('teacher')->group(function () {
        Route::apiResource('exam', examController::class);

    });

    Route::middleware('student')->group(function () {
        Route::get('/dashboard', [moduleController::class, 'fetchDataModules']);

    });


});
