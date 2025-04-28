// side section to display summary of the day
import React from "react";

interface WeatherCardProps {
  description: string;
  feels_like: number;
  humidity: number;
  temp: number;
  convertTemp: (temp: number) => string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ description, feels_like, humidity, temp, convertTemp }) => {
  return (
    <aside className="w-full md:w-1/3 border p-4 rounded-lg bg-gray-50 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
        alt="Weather Icon"
        className="mx-auto h-24 mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{description}</h2>
      <p className="mb-2">Feels like: {convertTemp(feels_like)}</p>
      <p className="mb-4">Humidity: {humidity}%</p>
      <div className="text-sm text-gray-600">
        {temp > 30 && "It's quite hot, stay hydrated!"}
        {temp <= 30 && temp > 15 && "Mild weather — enjoy your day!"}
        {temp <= 15 && "It's cool, wear a jacket!"}
      </div>
    </aside>
  );
};

export default WeatherCard;
