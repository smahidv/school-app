<?php

use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('guest')->group(function () {
    Route::post('login', LoginController::class);
});

Route::middleware('auth')->group(function () {
    Route::middleware('admin')->group(function () {
        Route::get('admin/dashboard', function () {
            return response()->json(['message' => 'welcome, this is admin!']);
        });
    });
    Route::middleware('user')->group(function () {
        Route::get('user/dashboard', function () {
            return response()->json(['message' => 'welcome, this is user!']);
        });
    });
});
