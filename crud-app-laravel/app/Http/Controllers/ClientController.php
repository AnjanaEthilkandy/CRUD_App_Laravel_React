<?php

namespace App\Http\Controllers;
use App\Models\Client;
use App\Models\Admin;

use Illuminate\Http\Request;

class ClientController extends Controller
{
    function addClient (Request $req){
        $client = new Client;
        $client->name= $req->input('name');
        $client->email= $req->input('email');
        $client->profile_pic= $req->file('file')->store('clients');
        $client->admin_id = $req->input('admin_id');
        $client->save();
        return $client;
    }

    function list($id) {  
       $clients = Client::where("admin_id", "=", $id)->get();   
      return $clients;
    }

    function deleteClient($id) {
        $result = Client::where('id', $id)->delete();
        if($result) {
            return ["result" => "Client deleted"];
        } else {
            return ["result" => "Operation Failed"];

        }
    }

    function getClient($id) {
        return Client::find($id);
    }

    function updateClient($id, Request $req) {
        $client = Client::find($id);
        $client->name= $req->input('name');
        $client->email= $req->input('email');
        if ($req->file('file')) {
            $client->profile_pic= $req->file('file')->store('clients');
        }
        $client->save();
        return $client;
    }
}
