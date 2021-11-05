<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClientController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AdminController::class, 'register']);

Route::post('login', [AdminController::class, 'login']);

Route::post('add', [ClientController::class, 'addClient']);

Route::post('list/{id}', [ClientController::class, 'list']);

Route::delete('delete/{id}', [ClientController::class, 'deleteClient']);

Route::get('client/{id}', [ClientController::class, 'getClient']);

Route::put('update/{id}', [ClientController::class, 'updateClient']);
