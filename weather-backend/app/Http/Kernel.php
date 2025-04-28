<?php

protected $middleware = [
    \Laravel\Lumen\Http\Middleware\CorsMiddleware::class,
    \Illuminate\Http\Middleware\TrustProxies::class,
    \Illuminate\Http\Middleware\ValidatePostSize::class,
    \Illuminate\Foundation\Http\Middleware\HandleCors::class, 
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
];
