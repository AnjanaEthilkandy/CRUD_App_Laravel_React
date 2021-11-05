<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class AdminController extends Controller
{

    function register(Request $req) 
    {         
        $response = Http::asForm()->post(env("GOOGLE_RECAPTCHA_URL"), [
            'secret' => env("GOOGLE_RECAPTCHA_SECRET"),
            'response' => $req->input('token'),
            'remoteip' => $req->ip(),
        ]);
        if( $response['success'] == true ){
            $user = new Admin;
            $user->name = $req->input('name');
            $user->email = $req->input('email');
            $user->password = Hash::make($req->input('password'));
            $user->save();
            return $user;
        } else {
            return response()->json(['errors'=>'reCAPTCHA verification failed.'],422);
        }
    }

    function login(Request $req) 
    {
        $user = Admin::where('email', $req->email)->first();
        if(!$user || !Hash::check($req->password, $user->password )){
            return ["error" => "User Email or Password is not matched"];
        }
        return $user;
    }

}
