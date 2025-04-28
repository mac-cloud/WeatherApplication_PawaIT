// footer section of the application
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-10 border-t pt-6 pb-4 bg-gray-50 text-gray-700">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h4 className="text-lg font-semibold mb-2">Stay Safe, Stay Prepared 🌤️</h4>
        <ul className="text-sm mb-4 space-y-1">
          <li>💧 Drink plenty of water during hot days.</li>
          <li>🧥 Carry a jacket if it's below 15°C.</li>
          <li>☂️ Always check the forecast before planning outdoor activities.</li>
          <li>💨 Secure loose items during windy conditions.</li>
        </ul>
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} PawaIT Weather App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
