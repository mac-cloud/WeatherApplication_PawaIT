<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city', 'Nairobi');
        $apiKey = env('OPENWEATHERMAP_API_KEY');

        $client = new Client();

        try {
            $response = $client->get("https://api.openweathermap.org/data/2.5/weather", [
                'query' => [
                    'q'     => $city,
                    'appid' => $apiKey,
                    'units' => 'metric',
                    'lang'  => 'en',
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            Log::info('Weather API Response', $data);

            return response()->json($data);

        } catch (\Exception $e) {
            Log::error('Weather API Error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch weather data'], 500);
        }
    }
}
