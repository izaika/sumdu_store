<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
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
            User::where('email', $request->input('email'))->update(['api_key' => "$apikey"]);
            return $this->success(['api_key' => $apikey]);
        } else {
            return $this->noAuthorizedResponse();
        }
    }

    private function noAuthorizedResponse()
    {
        return $this->fail('Unauthorized', 401);
    }
}
