<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
{
    $city = $request->query('city', 'London');
    $apiKey = env('OPENWEATHERMAP_API_KEY');
    $client = new Client();

    try {
        $current = $client->get("https://api.openweathermap.org/data/2.5/weather", [
            'query' => [
                'q'     => $city,
                'appid' => $apiKey,
                'units' => 'metric',
                'lang'  => 'en',
            ]
        ]);
        $forecast = $client->get("https://api.openweathermap.org/data/2.5/forecast", [
            'query' => [
                'q'     => $city,
                'appid' => $apiKey,
                'units' => 'metric',
                'lang'  => 'en',
            ]
        ]);

        $currentData = json_decode($current->getBody(), true);
        $forecastData = json_decode($forecast->getBody(), true);

        // Reduce to 3 days at noon
        $threeDayForecast = collect($forecastData['list'])
            ->filter(fn($item) => str_contains($item['dt_txt'], '12:00:00'))
            ->take(3)
            ->map(fn($item) => [
                'date' => $item['dt_txt'],
                'temp' => $item['main']['temp'],
                'description' => $item['weather'][0]['description'],
                'icon' => $item['weather'][0]['icon'],
            ])->values();

        return response()->json([
            'temp' => $currentData['main']['temp'],
            'feels_like' => $currentData['main']['feels_like'],
            'humidity' => $currentData['main']['humidity'],
            'description' => $currentData['weather'][0]['description'],
            'wind_speed' => $currentData['wind']['speed'],
            'city' => $currentData['name'],
            'icon' => $currentData['weather'][0]['icon'],
            'forecast' => $threeDayForecast,
        ]);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch weather data'], 500);
    }
}

}
