<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public static function getAuthKeyFromRequest(Request $request)
    {
        if ($request->header('Authorization')) {
            return explode(' ', $request->header('Authorization'))[1];
        } else {
            throw new \Exception('No Authorization header found');
        }
    }

    public function logIn(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if (!$user) {
            return $this->noAuthorizedResponse();
        }

        if (Hash::check($request->input('password'), $user->password)) {
            $apikey = base64_encode(str_random(40));
            $user->update(['api_key' => $apikey])->save();
            return $this->success(['api_key' => $apikey]);
        } else {
            return $this->noAuthorizedResponse();
        }
    }

    public function logOut(Request $request)
    {
        $key = AuthController::getAuthKeyFromRequest($request);
        $user = User::where('api_key', $key)->first();
        if ($user) {
            $user->update(['api_key' => null]);
        }

        return $this->success(['message' => 'Successfully logged out.'], 205);
    }

    private function noAuthorizedResponse()
    {
        return $this->fail('Unauthorized', 401);
    }
}
