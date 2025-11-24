import React, { useMemo } from "react";
import { MapPin, Clock } from "lucide-react";
import markers from "../pizzaz/markers.json";

export default function TimingsWidget({ restaurantId = "nova-slice-lab" }) {
  const restaurant = useMemo(
    () => markers.places.find((r) => r.id === restaurantId) || markers.places[0],
    [restaurantId]
  );

  if (!restaurant) return null;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden bg-white shadow-xl rounded-3xl border border-black/5 font-sans">
      <div className="flex items-center gap-4 border-b border-black/5 p-5 bg-slate-50/50">
        <img
          src={restaurant.thumbnail}
          alt=""
          className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-sm"
        />
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">
            {restaurant.name}
          </h2>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Operating Hours</span>
          </div>
        </div>
      </div>

      <div className="p-2">
        <div className="flex flex-col divide-y divide-black/5">
          {days.map((day) => {
            const isToday = day === today;
            const hours = restaurant.hours ? restaurant.hours[day] : "Closed";
            
            return (
              <div
                key={day}
                className={`flex justify-between items-center px-5 py-3.5 text-sm transition-colors rounded-xl ${
                  isToday
                    ? "bg-green-50/80 text-green-900 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className={`w-12 ${isToday ? "font-bold" : ""}`}>
                  {day}
                </span>
                <span className={isToday ? "text-green-700" : "text-slate-500"}>
                  {hours}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-black/5 text-center">
        <p className="text-xs text-slate-400">
          Hours may vary on holidays.
        </p>
      </div>
    </div>
  );
}