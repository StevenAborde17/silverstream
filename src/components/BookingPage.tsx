import { useState } from "react";
import { Train, ChevronLeft, MapPin, Calendar, Clock, Users, Tag, CheckCircle, Info, ArrowRight } from "lucide-react";

const stations = [
  "Manila (MNL)", "Makati (MKT)", "Quezon City (QC)", "Pasay (PSY)",
  "Caloocan (CLK)", "Paranaque (PRQ)", "Las Pinas (LPS)", "Muntinlupa (MTL)"
];

const transportTypes = [
  { id: "mrt", name: "MRT Line", icon: "🚄", desc: "Urban railway service" },
  { id: "intercity", name: "Inter-City Railway", icon: "✈️", desc: "Longer distance destinations" },
];

const travelClasses = [
  { id: "economy", name: "Economy", price: 45, desc: "Comfortable seating, standard amenities" },
  { id: "business", name: "Business", price: 120, desc: "Extra legroom, priority boarding" },
  { id: "first", name: "First Class", price: 250, desc: "Premium seats, meals included" },
];

const timeSlots = [
  "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM",
  "08:00 AM", "08:30 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
  "07:00 PM", "08:00 PM"
];

const discountCodes: Record<string, number> = {
  EARLY20: 20, WKND15: 15, SENIOR30: 30
};

// Left padding that clears the absolutely positioned icon in each field.
// Set inline so it can't be overridden by global input/select styles.
const fieldIconPadding = { paddingLeft: "2.75rem" };

interface BookingPageProps {
  initialData?: any;
  onConfirm: (bookingData: any) => void;
  onBack: () => void;
}

export function BookingPage({ initialData, onConfirm, onBack }: BookingPageProps) {
  const [transport, setTransport] = useState(initialData?.transport || "mrt");
  const [from, setFrom] = useState(initialData?.from || "");
  const [to, setTo] = useState(initialData?.to || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [time, setTime] = useState("07:00 AM");
  const [travelClass, setTravelClass] = useState("economy");
  const [passengers, setPassengers] = useState(parseInt(initialData?.passengers || "1"));
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMsg, setDiscountMsg] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = new Date().toISOString().split("T")[0];

  const basePrice = travelClasses.find(c => c.id === travelClass)?.price || 45;
  const subtotal = basePrice * passengers;
  const serviceFee = Math.round(subtotal * 0.05);
  const discountAmt = Math.round(subtotal * appliedDiscount / 100);
  const total = subtotal + serviceFee - discountAmt;

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (discountCodes[code]) {
      setAppliedDiscount(discountCodes[code]);
      setDiscountMsg({ type: "success", msg: `Code applied! ${discountCodes[code]}% off` });
    } else {
      setAppliedDiscount(0);
      setDiscountMsg({ type: "error", msg: "Invalid promo code" });
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!from) e.from = "Please select departure station";
    if (!to) e.to = "Please select destination";
    if (from && to && from === to) e.to = "Destination must differ from departure";
    if (!date) e.date = "Please select a date";
    return e;
  };

  const handleConfirm = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    const cls = travelClasses.find(c => c.id === travelClass);
    onConfirm({
      transport,
      from, to, date, time,
      travelClass: cls?.name,
      passengers,
      discountCode: appliedDiscount > 0 ? discountCode.toUpperCase() : null,
      discountPct: appliedDiscount,
      basePrice, subtotal, serviceFee, discountAmt, total,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <div className="bg-blue-700 text-white px-4 py-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-blue-600 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Train className="w-5 h-5" />
            <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>SilverStream</span>
          </div>
          <span className="text-blue-200 text-sm ml-2">/ Book a Trip</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Form */}
          <div className="flex-1 space-y-5">
            {/* Transport Type */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-800 mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs" style={{ fontWeight: 700 }}>1</span>
                Select Transport Type
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {transportTypes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTransport(t.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${transport === t.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="text-2xl mb-1">{t.icon}</div>
                    <div className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stations */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-800 mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs" style={{ fontWeight: 700 }}>2</span>
                Select Stations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Departure Station</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                    <select
                      value={from}
                      onChange={e => { setFrom(e.target.value); setErrors(v => ({ ...v, from: "" })); }}
                      className={`w-full pr-3 py-3 border rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.from ? "border-red-400" : "border-gray-200"}`}
                      style={fieldIconPadding}
                    >
                      <option value="">Choose departure station</option>
                      {stations.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {errors.from && <p className="text-red-500 text-xs mt-1">{errors.from}</p>}
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Destination Station</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                    <select
                      value={to}
                      onChange={e => { setTo(e.target.value); setErrors(v => ({ ...v, to: "" })); }}
                      className={`w-full pr-3 py-3 border rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.to ? "border-red-400" : "border-gray-200"}`}
                      style={fieldIconPadding}
                    >
                      <option value="">Choose destination station</option>
                      {stations.filter(s => s !== from).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to}</p>}
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-800 mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs" style={{ fontWeight: 700 }}>3</span>
                Select Date & Time
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Travel Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                    <input
                      type="date" min={today} value={date}
                      onChange={e => { setDate(e.target.value); setErrors(v => ({ ...v, date: "" })); }}
                      className={`w-full pr-3 py-3 border rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 ${errors.date ? "border-red-400" : "border-gray-200"}`}
                      style={fieldIconPadding}
                    />
                  </div>
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 600 }}>Departure Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                    <select
                      value={time}
                      onChange={e => setTime(e.target.value)}
                      className="w-full pr-3 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      style={fieldIconPadding}
                    >
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Class */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-800 mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs" style={{ fontWeight: 700 }}>4</span>
                Select Travel Class
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {travelClasses.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setTravelClass(c.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${travelClass === c.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>{c.name}</span>
                      {travelClass === c.id && <CheckCircle className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="text-blue-600 mb-1" style={{ fontWeight: 700 }}>₱{c.price}<span className="text-gray-400 text-xs">/pax</span></div>
                    <div className="text-gray-500 text-xs">{c.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Passengers */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-800 mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs" style={{ fontWeight: 700 }}>5</span>
                Number of Passengers
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setPassengers(p => Math.max(1, p - 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-blue-400 flex items-center justify-center text-gray-700 transition-colors"
                  style={{ fontWeight: 700, fontSize: "1.2rem" }}
                >−</button>
                <div className="text-center">
                  <div className="text-gray-800" style={{ fontWeight: 700, fontSize: "1.8rem" }}>{passengers}</div>
                  <div className="text-gray-500 text-xs">Passenger{passengers > 1 ? "s" : ""}</div>
                </div>
                <button
                  onClick={() => setPassengers(p => Math.min(10, p + 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-blue-400 flex items-center justify-center text-gray-700 transition-colors"
                  style={{ fontWeight: 700, fontSize: "1.2rem" }}
                >+</button>
                <div className="ml-4 flex-1 bg-blue-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-xs text-blue-700">
                    <Info className="w-3.5 h-3.5" />
                    <span>Max 10 passengers per booking. Group discounts available for 5+.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Discount */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-800 mb-4 flex items-center gap-2" style={{ fontWeight: 700 }}>
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs" style={{ fontWeight: 700 }}>6</span>
                Discount Code <span className="text-gray-400 text-xs" style={{ fontWeight: 400 }}>(Optional)</span>
              </h3>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter promo code (e.g. EARLY20)"
                    value={discountCode}
                    onChange={e => { setDiscountCode(e.target.value); setDiscountMsg(null); }}
                    className="w-full pr-3 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 uppercase placeholder:normal-case"
                    style={fieldIconPadding}
                  />
                </div>
                <button
                  onClick={handleApplyDiscount}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Apply
                </button>
              </div>
              {discountMsg && (
                <p className={`mt-2 text-xs flex items-center gap-1 ${discountMsg.type === "success" ? "text-green-600" : "text-red-500"}`}>
                  {discountMsg.type === "success" ? <CheckCircle className="w-3.5 h-3.5" /> : "✕"}
                  {discountMsg.msg}
                </p>
              )}
              <div className="mt-3 flex gap-2 flex-wrap">
                {["EARLY20", "WKND15", "SENIOR30"].map(code => (
                  <button
                    key={code}
                    onClick={() => { setDiscountCode(code); setDiscountMsg(null); }}
                    className="text-xs bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 px-3 py-1 rounded-full transition-colors"
                  >{code}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking Summary */}
          <div className="lg:w-80 xl:w-96">
            <div className="bg-white rounded-2xl shadow-sm sticky top-20">
              <div className="bg-blue-600 text-white p-5 rounded-t-2xl">
                <h3 style={{ fontWeight: 700, fontSize: "1rem" }}>Booking Summary</h3>
                <p className="text-blue-200 text-xs mt-0.5">Updates automatically as you fill in details</p>
              </div>
              <div className="p-5 space-y-4">
                {/* Route */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-2" style={{ fontWeight: 600 }}>
                    <Train className="w-3.5 h-3.5" /> Route
                  </div>
                  {from && to ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{from.split(" (")[0]}</span>
                      <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{to.split(" (")[0]}</span>
                    </div>
                  ) : <span className="text-gray-400 text-sm">Not selected yet</span>}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    { label: "Transport", value: transportTypes.find(t => t.id === transport)?.name || "-" },
                    { label: "Travel Class", value: travelClasses.find(c => c.id === travelClass)?.name || "-" },
                    { label: "Date", value: date || "Not selected" },
                    { label: "Time", value: time },
                    { label: "Passengers", value: `${passengers} pax` },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="text-gray-400 text-xs" style={{ fontWeight: 500 }}>{item.label}</div>
                      <div className="text-gray-700 text-xs" style={{ fontWeight: 600 }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">₱{basePrice} × {passengers} pax</span>
                    <span className="text-gray-700" style={{ fontWeight: 600 }}>₱{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service fee (5%)</span>
                    <span className="text-gray-700" style={{ fontWeight: 600 }}>₱{serviceFee}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount ({appliedDiscount}%)</span>
                      <span className="text-green-600" style={{ fontWeight: 600 }}>−₱{discountAmt}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-2 flex justify-between">
                    <span className="text-gray-800" style={{ fontWeight: 700 }}>Total</span>
                    <span className="text-blue-600" style={{ fontWeight: 800, fontSize: "1.2rem" }}>₱{total}</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
                  style={{ fontWeight: 700 }}
                >
                  Confirm Booking <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-gray-400 text-xs flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  Free cancellation within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}