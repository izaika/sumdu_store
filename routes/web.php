<?php

$router->group(['prefix' => '/api'], function () use ($router) {
    $router->group(['prefix' => '/users', 'middleware' => 'auth'], function () use ($router) {
        $router->get('/', 'UserController@index');
        $router->post('/', 'UserController@store');
        $router->get('/{id}', 'UserController@show');
        $router->put('/{id}', 'UserController@update');
        $router->delete('/{id}', 'UserController@destroy');
    });

    $router->group(['prefix' => '/auth'], function () use ($router) {
        $router->post('/login', ['uses' => 'AuthController@logIn']);
        $router->post('/logout', ['uses' => 'AuthController@logOut', 'middleware' => 'auth']);
    });

});

$router->get('/{any:.*}', 'IndexController@index');
