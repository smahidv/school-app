<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        /**  @var User $user */
        $user = User::query()->where('email', $request->get('email'))->first();
        if (empty($user)) {
            return response()->json([
                'message' => 'The user does not exist'
            ]);
        }
        if (Hash::check($request->get('password'), $user->password)) {
            return response()->json([
                'message' => 'success',
                'user' => $user,
                'token' => $user->createToken('main')->plainTextToken
            ]);
        }
        return response()->json([
            'message' => 'Email or password are wrong'
        ], 422);
    }


    public function logout(Request $request)
    {
      /** @var User $user */
      $user = Auth::user();
      // Revoke the token that was used to authenticate the current request...
      $user->currentAccessToken()->delete();
  
      return response([
        'success' => true
      ]);
    }
  
}

