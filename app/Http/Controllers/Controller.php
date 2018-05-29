<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    protected function success($data, $code) {
        return response()->json(['data' => $data], $code);
    }
    protected function error($message, $code) {
        return response()->json(['message' => $message], $code);
    }
}
