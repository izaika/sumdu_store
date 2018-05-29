<?php

$router->group(['prefix' => '/api'], function () use ($router) {
    $router->group(['prefix' => '/users'], function () use ($router) {
      $router->get('/', 'UserController@index');
      $router->post('/', 'UserController@store');
      $router->get('/{id}', 'UserController@show');
      $router->put('/{id}', 'UserController@update');
      $router->delete('/{id}', 'UserController@destroy');
    });
});

$router->get('/{any:.*}', 'IndexController@index');
