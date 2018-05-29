<?php

namespace App\Http\Controllers;

use App\User;

class IndexController extends Controller
{
    public function index() {
        return view('index', [
          'base_url' => env('APP_ENV') === 'dev' ? 'http://localhost:8080' : url('/dist')
        ]);
    }
}
