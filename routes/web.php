<?php

$router->group(['prefix' => '/api'], function () use ($router) {
    $router->group(['prefix' => '/users'], function () use ($router) {
        $router->get('/', ['uses' => 'UserController@index', 'middleware' => 'auth']);
        $router->post('/', ['uses' => 'UserController@store']);
        // $router->get(   '/{id}',  ['uses' => 'UserController@show',     'middleware' => 'auth']);
        $router->get('/{id}', ['uses' => 'UserController@show']);
        $router->put('/{id}', ['uses' => 'UserController@update', 'middleware' => 'auth']);
        $router->delete('/{id}', ['uses' => 'UserController@destroy', 'middleware' => 'auth']);
        $router->post('/login', ['uses' => 'UserController@logIn']);
    });
});

$router->get('/{any:.*}', 'IndexController@index');