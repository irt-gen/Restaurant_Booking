import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import BookingWidget from "./BookingWidget";
import TimingsWidget from "./TimingsWidget";
import markers from "../pizzaz/markers.json";

function App() {
  // State to toggle between widgets for demo purposes
  const [view, setView] = useState("booking"); // 'booking' | 'timings'
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(
    markers.places[0].id
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 gap-8">
      {/* Controls for Demo */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex flex-col sm:flex-row gap-4 items-center w-full max-w-md">
        <select
          value={selectedRestaurantId}
          onChange={(e) => setSelectedRestaurantId(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 text-sm w-full"
        >
          {markers.places.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        
        <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
          <button
            onClick={() => setView("booking")}
            className={`flex-1 px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
              view === "booking" ? "bg-white shadow text-black" : "text-gray-500"
            }`}
          >
            Booking
          </button>
          <button
            onClick={() => setView("timings")}
            className={`flex-1 px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
              view === "timings" ? "bg-white shadow text-black" : "text-gray-500"
            }`}
          >
            Timings
          </button>
        </div>
      </div>

      {/* Widget Rendering */}
      <div className="w-full flex justify-center">
        {view === "booking" ? (
          <BookingWidget restaurantId={selectedRestaurantId} />
        ) : (
          <TimingsWidget restaurantId={selectedRestaurantId} />
        )}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("pizzaz-booking-root"));
root.render(<App />);