// main file 
"use client";
import { useState } from "react";
import { Search, ThermometerSun, Wind, Droplets } from "lucide-react";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";
import Footer from "./Footer";


interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  description: string;
  wind_speed: number;
  city: string;
  icon: string;
  forecast: Array<{
    date: string;
    temp: number;
    description: string;
    icon: string;
  }>;
}

interface WeatherDashboardProps {
  
  defaultCity?: string;
}

const WeatherDashboard = ({
  //apiKey = process.env.OPENWEATHERMAP_API_KEY,
  defaultCity = "London",
}: WeatherDashboardProps) => {
  const [city, setCity] = useState(defaultCity);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await fetch(
        `http://localhost:8000/api/weather?city=${cityName}&unit=${isCelsius ? "metric" : "imperial"}`
      );
      if (!response.ok) throw new Error("City not found");
  
      const data = await response.json();
  
      setWeather({
        temp: data.temp,
        feels_like: data.feels_like,
        humidity: data.humidity,
        description: data.description,
        wind_speed: data.wind_speed,
        city: data.city,
        icon: data.icon,
        forecast: data.forecast, 
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };
  const convertTemp = (temp: number): string =>
    isCelsius ? `${Math.round(temp)}°C` : `${Math.round((temp * 9) / 5 + 32)}°F`;

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src="https://pawait.africa/wp-content/uploads/2024/08/full-logo.png" alt="PawaIT Logo" className="h-30 w-40" />
          <h1 className="text-2xl font-bold">PawaIT Weather App</h1>
        </div>
      </header>
     <div>
      <div className="flex flex-col md:flex-row gap-8">
        {weather ? (
          <WeatherCard
            description={weather.description}
            feels_like={weather.feels_like}
            humidity={weather.humidity}
            temp={weather.temp}
            convertTemp={convertTemp}
          />
        ) : (
          <aside className="w-full md:w-1/3 border p-4 rounded-lg bg-gray-50 text-center text-gray-500">
            Weather info will appear here
          </aside>
        )}
     
        <main className="w-full md:w-2/3">
          <div className="flex items-center gap-2 mb-6">
            <Search className="h-5 w-5 text-black" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            />
            <button
              onClick={() => fetchWeather(city)}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Search"}
            </button>
            <button
              onClick={() => setIsCelsius(!isCelsius)}
              className="px-4 py-2 border border-black rounded-md hover:bg-gray-100 text-black flex items-center"
            >
              <ThermometerSun className="h-4 w-4 mr-2" />
              {isCelsius ? "°F" : "°C"}
            </button>
          </div>
          
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {weather && (
            <div>
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold">{weather.city}</h2>
                  <p suppressHydrationWarning>{new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-center">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}
                    className="w-24 h-24 mx-auto"
                  />
                  <p suppressHydrationWarning className="text-2xl font-bold mt-2">{convertTemp(weather.temp)}</p>
                  <p>{weather.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-semibold mb-2">Wind</h3>
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-black" />
                    <span>{weather.wind_speed} km/h</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-semibold mb-2">Humidity</h3>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-black" />
                    <span>{weather.humidity}%</span>
                  </div>
                </div>
              </div>

              <ForecastCard forecast={weather.forecast} convertTemp={convertTemp} />

              
            </>
               <Footer /> 
               </div>
          )}
        </main>
        
       </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
