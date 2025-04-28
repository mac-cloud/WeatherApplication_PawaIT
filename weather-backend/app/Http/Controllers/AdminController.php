<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
{
    // Only allow access to superusers
    $this->middleware('auth');
}

public function index()
{
    if (auth()->check() && auth()->user()->is_superuser) {
        return view('admin.dashboard');
    } else {
        return redirect()->route('login')->with('error', 'You must be an admin to access this page');
    }
}
}
