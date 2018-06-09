<?php

$router->group(['prefix' => '/api'], function () use ($router) {
    $router->group(['prefix' => '/users', 'middleware' => 'auth'], function () use ($router) {
        $router->get('/', 'UserController@index');
        $router->post('/', 'UserController@store');
        $router->get('/{id}', 'UserController@show');
        $router->put('/{id}', 'UserController@update');
        $router->delete('/{id}', 'UserController@destroy');
    });

    $router->group(['prefix' => '/categories'], function () use ($router) {
        $router->get('/', 'CategoryController@index');
        $router->post('/', ['uses' => 'CategoryController@store', 'middleware' => 'auth']);
        $router->get('/{id}', ['uses' => 'CategoryController@show', 'middleware' => 'auth']);
        $router->put('/{id}', ['uses' => 'CategoryController@update', 'middleware' => 'auth']);
        $router->delete('/{id}', ['uses' => 'CategoryController@destroy', 'middleware' => 'auth']);
    });

    $router->group(['prefix' => '/products'], function () use ($router) {
        $router->get('/', 'ProductController@index');
        $router->get('/{id}', ['uses' => 'ProductController@show']);
        $router->post('/', ['uses' => 'ProductController@store', 'middleware' => 'auth']);
        $router->put('/{id}', ['uses' => 'ProductController@update', 'middleware' => 'auth']);
        $router->delete('/{id}', ['uses' => 'ProductController@destroy', 'middleware' => 'auth']);
        $router->post('/fileUpload', ['uses' => 'ProductController@fileUpload', 'middleware' => 'auth']);
    });

    $router->group(['prefix' => '/orders'], function () use ($router) {
        $router->get('/', ['uses' => 'OrderController@index', 'middleware' => 'auth']);
        $router->get('/{id}', ['uses' => 'OrderController@show', 'middleware' => 'auth']);
        $router->post('/', 'OrderController@store');
        $router->put('/{id}', ['uses' => 'OrderController@update', 'middleware' => 'auth']);
        $router->delete('/{id}', ['uses' => 'OrderController@destroy', 'middleware' => 'auth']);
    });

    $router->group(['prefix' => '/auth'], function () use ($router) {
        $router->post('/login', ['uses' => 'AuthController@logIn']);
        $router->post('/logout', ['uses' => 'AuthController@logOut', 'middleware' => 'auth']);
    });

});

$router->get('/{any:.*}', 'IndexController@index');
