"use client";

import { useState } from "react";
import WeatherDashboard from "@/components"; 

export default function Home() {
  const [city, setCity] = useState("London");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <WeatherDashboard defaultCity={city} />
    </div>
  );
}
