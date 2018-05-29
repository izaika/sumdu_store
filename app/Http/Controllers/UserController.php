<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\User;

class UserController extends Controller
{
    public function index() {
        $users = User::all();
        return $this->success($users, 200);
    }


    public function store(Request $request) {
        $this->validateRequest($request);
        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password'))
        ]);
        return $this->success("The user with with id {$user->id} has been created", 201);
    }


    public function show($id) {
        $user = User::find($id);
        if (!$user) return $this->noUserResponse();
        
        return $this->success($user, 200);
    }
    
    
    public function update(Request $request, $id) {
        $user = User::find($id);
        if (!$user) return $this->noUserResponse();

        $this->validateRequest($request);
        $user->email = $request->get('email');
        $user->password = Hash::make($request->get('password'));
        $user->save();
        return $this->success("The user with with id {$user->id} has been updated", 200);
    }
    
    
    public function destroy($id) {
        $user = User::find($id);
        if (!$user) return $this->noUserResponse();

        $user->delete();
        return $this->success("The user with with id {$id} has been deleted", 200);
    }


    public function validateRequest(Request $request){
        $rules = [
            'email' => 'required|email|unique:users', 
            'password' => 'required|min:6|max:16'
        ];
        $this->validate($request, $rules);
    }


    private function noUserResponse() {
        return $this->error("The user with {$id} doesn't exist", 404);
    }
}
