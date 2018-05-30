<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return $this->success($users);
    }

    public function store(Request $request)
    {
        $this->validateRequest($request);
        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);
        return $this->success(["message" => "The user with with id {$user->id} has been created"], 201);
    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return $this->noUserResponse();
        }

        return $this->success(['user' => $user]);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return $this->noUserResponse();
        }

        $this->validateRequest($request);
        $user->email = $request->get('email');
        $user->password = Hash::make($request->get('password'));
        $user->save();
        return $this->success(["message" => "The user with with id {$user->id} has been updated"]);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return $this->noUserResponse();
        }

        $user->delete();
        return $this->success(["message" => "The user with with id {$id} has been deleted"]);
    }

    private function validateRequest(Request $request)
    {
        $rules = [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|max:16',
        ];
        $this->validate($request, $rules);
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

    private function noUserResponse()
    {
        return $this->fail("The user with {$id} doesn't exist", 404);
    }
}
