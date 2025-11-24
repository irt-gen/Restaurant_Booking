import React, { useState, useMemo } from "react";
import { Calendar, Clock, CreditCard, Users, ChevronRight, CheckCircle } from "lucide-react";
import markers from "../pizzaz/markers.json";

export default function BookingWidget({ restaurantId = "nova-slice-lab" }) {
  const restaurant = useMemo(
    () => markers.places.find((r) => r.id === restaurantId) || markers.places[0],
    [restaurantId]
  );

  const [step, setStep] = useState("form"); // 'form' | 'payment'
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("19:00");

  if (!restaurant) return <div className="p-4">Restaurant not found</div>;

  const handleBook = () => {
    setStep("payment");
  };

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden bg-white shadow-xl rounded-3xl border border-black/5 font-sans">
      {/* Header Image */}
      <div className="relative h-40 w-full">
        <img
          src={restaurant.thumbnail}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-5 text-white">
          <h2 className="text-2xl font-bold">{restaurant.name}</h2>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <span>{restaurant.city}</span>
            <span>•</span>
            <span>{restaurant.price}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {step === "form" ? (
          <div className="space-y-6">
            {/* Guest Selector */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-black/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <Users className="h-5 w-5 text-slate-700" />
                </div>
                <span className="text-sm font-medium text-slate-900">
                  Guests
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-black/5 hover:bg-slate-100 active:scale-95 transition-all"
                >
                  -
                </button>
                <span className="w-4 text-center text-base font-semibold">
                  {guests}
                </span>
                <button
                  onClick={() => setGuests(guests + 1)}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-black/5 hover:bg-slate-100 active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Date & Time Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Date
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 focus-within:border-black/30 transition-colors">
                  <Calendar className="h-4 w-4 text-slate-400 flex-none" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium outline-none text-slate-900"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Time
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 focus-within:border-black/30 transition-colors">
                  <Clock className="h-4 w-4 text-slate-400 flex-none" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium outline-none text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Summary & Action */}
            <div className="pt-2">
              <div className="flex justify-between text-sm text-slate-500 mb-6 px-1">
                <span>Reservation hold fee</span>
                <span className="font-medium text-slate-900">$10.00</span>
              </div>
              <button
                onClick={handleBook}
                className="w-full py-4 rounded-full bg-[#F46C21] text-white text-sm font-bold tracking-wide shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:bg-[#e05d15] active:scale-[0.99] transition-all"
              >
                Reserve Table
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 border-4 border-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">
                Almost there!
              </h3>
              <p className="text-slate-500 text-sm px-4">
                We are holding your table at <strong>{restaurant.name}</strong> for
                10 minutes.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-black/5 mx-2">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-slate-500">Date</span>
                <span className="font-medium">{date}</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-slate-500">Time</span>
                <span className="font-medium">{time}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Guests</span>
                <span className="font-medium">{guests} people</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={`https://dummy-payment.com/checkout/${restaurantId}?amt=1000`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0070BA] py-4 text-sm font-bold text-white hover:bg-[#005ea6] transition-colors"
              >
                <CreditCard className="h-4 w-4" />
                Pay $10.00 with PayPal
              </a>
              
              <button
                onClick={() => setStep("form")}
                className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors"
              >
                Cancel reservation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}