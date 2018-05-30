<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    protected function success($data, $code = 200)
    {
        $data['status'] = 0;
        return response()->json($data, $code);
    }

    protected function fail($message, $code)
    {
        $data['status'] = 1;
        $data['message'] = $message;
        return response()->json($data, $code);
    }
}
