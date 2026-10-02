import { useState } from "react";
import { Train, MapPin, Calendar, Clock, Users, Tag, CheckCircle, ChevronLeft, ArrowRight, Shield, Pencil } from "lucide-react";

interface ConfirmationPageProps {
  bookingData: any;
  onConfirm: () => void;
  onBack: () => void;
}

export function ConfirmationPage({ bookingData, onConfirm, onBack }: ConfirmationPageProps) {
  const [agreed, setAgreed] = useState(false);

  const {
    transport, from, to, date, time,
    travelClass, passengers,
    discountCode, discountPct,
    subtotal, serviceFee, discountAmt, total
  } = bookingData ?? {};

  // Safe numeric display
  const fmt = (n: number | undefined) => (typeof n === "number" && !isNaN(n) ? n : 0);

  const formatDate = (d: string) => {
    if (!d) return "";
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  const transportLabel = transport
    ? transport.charAt(0).toUpperCase() + transport.slice(1).replace(/-/g, " ") + " Train"
    : "—";

  const detailRows = [
    { label: "Transport Type", value: transportLabel, icon: <Train className="w-4 h-4 text-blue-500" /> },
    { label: "From", value: from || "—", icon: <MapPin className="w-4 h-4 text-blue-500" /> },
    { label: "To", value: to || "—", icon: <MapPin className="w-4 h-4 text-red-500" /> },
    { label: "Date", value: formatDate(date), icon: <Calendar className="w-4 h-4 text-blue-500" /> },
    { label: "Departure Time", value: time || "—", icon: <Clock className="w-4 h-4 text-blue-500" /> },
    { label: "Travel Class", value: travelClass || "—", icon: <Train className="w-4 h-4 text-blue-500" /> },
    { label: "Passengers", value: `${passengers ?? 1} Passenger${(passengers ?? 1) > 1 ? "s" : ""}`, icon: <Users className="w-4 h-4 text-blue-500" /> },
    ...(discountCode ? [{ label: "Promo Applied", value: `${discountCode} (${discountPct}% off)`, icon: <Tag className="w-4 h-4 text-green-500" /> }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <div className="bg-blue-700 text-white px-4 py-4 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-blue-600 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Train className="w-5 h-5" />
            <span style={{ fontWeight: 700 }}>SilverStream</span>
          </div>
          <span className="text-blue-200 text-sm">/ Booking Confirmation</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Card */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 style={{ fontWeight: 800, fontSize: "1.5rem" }}>Review Your Booking</h1>
          <p className="text-blue-200 text-sm mt-1">Please verify all details before confirming</p>
        </div>

        {/* Journey Summary */}
        <div className="bg-white rounded-2xl shadow-sm mb-4">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 rounded-t-2xl">
            <h2 className="text-gray-700 text-sm" style={{ fontWeight: 700 }}>Journey Details</h2>
          </div>

          {/* Visual Route */}
          <div className="p-5 bg-blue-50/50">
            <div className="flex items-center gap-3">
              <div className="flex-1 text-right">
                <div className="text-gray-800" style={{ fontWeight: 700, fontSize: "1rem" }}>
                  {from?.split("(")[0].trim() || "—"}
                </div>
                <div className="text-gray-400 text-xs">{from?.match(/\((.+)\)/)?.[1] || ""}</div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <div className="w-3 h-3 rounded-full border-2 border-blue-500 bg-white" />
                <div className="w-20 border-t-2 border-dashed border-blue-400 relative">
                  <Train className="w-5 h-5 text-blue-500 absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white" />
                </div>
                <div className="w-3 h-3 rounded-full bg-red-500" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800" style={{ fontWeight: 700, fontSize: "1rem" }}>
                  {to?.split("(")[0].trim() || "—"}
                </div>
                <div className="text-gray-400 text-xs">{to?.match(/\((.+)\)/)?.[1] || ""}</div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {detailRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  {row.icon}
                  <span className="text-gray-500 text-sm">{row.label}</span>
                </div>
                <span className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm mb-4">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 rounded-t-2xl">
            <h2 className="text-gray-700 text-sm" style={{ fontWeight: 700 }}>Price Breakdown</h2>
          </div>
          <div className="px-5 py-4">
            <div className="flex justify-between text-sm py-2">
              <span className="text-gray-500">Base fare × {passengers ?? 1} pax</span>
              <span className="text-gray-700" style={{ fontWeight: 600 }}>₱{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm py-2">
              <span className="text-gray-500">Service fee (5%)</span>
              <span className="text-gray-700" style={{ fontWeight: 600 }}>₱{fmt(serviceFee)}</span>
            </div>
            {fmt(discountAmt) > 0 && (
              <div className="flex justify-between text-sm py-2">
                <span className="text-green-600">Promo discount ({discountPct}%)</span>
                <span className="text-green-600" style={{ fontWeight: 600 }}>−₱{fmt(discountAmt)}</span>
              </div>
            )}
            <div className="border-t border-gray-100 mt-2 pt-3 flex justify-between items-center">
              <span className="text-gray-800" style={{ fontWeight: 700 }}>Total Amount</span>
              <span className="text-blue-600" style={{ fontWeight: 800, fontSize: "1.4rem" }}>₱{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
          <label className="flex items-start cursor-pointer" style={{ gap: "1rem" }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0"
            />
            <span className="text-gray-600 text-sm" style={{ paddingLeft: "0.25rem" }}>
              I agree to the{" "}
              <a href="#" className="text-blue-600 underline">Terms & Conditions</a>
              {" "}and{" "}
              <a href="#" className="text-blue-600 underline">Privacy Policy</a>
              . I confirm the details above are correct.
            </span>
          </label>
        </div>

        {/* Edit Booking */}
        <button
          onClick={onBack}
          className="w-full mb-3 border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 text-gray-700 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          style={{ fontWeight: 600 }}
        >
          <Pencil className="w-4 h-4" /> Edit Booking
        </button>

        {/* Confirm */}
        <button
          onClick={onConfirm}
          disabled={!agreed}
          className={`w-full py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 ${agreed ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          style={{ fontWeight: 700 }}
        >
          Confirm & Proceed <ArrowRight className="w-4 h-4" />
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs">
          <Shield className="w-3.5 h-3.5" />
          Secured by 256-bit SSL encryption
        </div>
      </div>
    </div>
  );
}
