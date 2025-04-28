// details on the 3 days prediction
import React from "react";

interface Forecast {
  date: string;
  temp: number;
  description: string;
  icon: string;
}

interface ForecastCardProps {
  forecast: Forecast[];
  convertTemp: (temp: number) => string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, convertTemp }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">3-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="border rounded-lg p-4 text-center">
            <p suppressHydrationWarning className="text-sm mb-2">
              {new Date(day.date).toLocaleDateString()}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              className="w-16 h-16 mx-auto"
            />
            <p suppressHydrationWarning className="text-lg font-bold mt-2">{convertTemp(day.temp)}</p>
            <p className="text-sm">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
