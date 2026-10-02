import { useState } from "react";
import { X, AlertTriangle, Train, CheckCircle } from "lucide-react";

interface CancellationModalProps {
  booking: any;
  onConfirmCancel: () => void;
  onClose: () => void;
}

// Centers button text and keeps it clear of the button edges.
// Set inline so it can't be overridden by global button styles.
const centeredButton = { textAlign: "center" as const, paddingLeft: "1rem", paddingRight: "1rem" };

export function CancellationModal({ booking, onConfirmCancel, onClose }: CancellationModalProps) {
  const [step, setStep] = useState<"confirm" | "reason" | "done">("confirm");
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const reasons = [
    "Change of plans",
    "Found a better route/schedule",
    "Personal emergency",
    "Booked by mistake",
    "Weather/safety concern",
    "Other",
  ];

  const handleProceed = () => {
    if (step === "confirm") setStep("reason");
    else if (step === "reason") {
      if (!reason) return;
      setStep("done");
      setTimeout(() => { onConfirmCancel(); }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        {/* Header */}
        <div className={`px-6 py-5 flex items-center justify-between ${step === "done" ? "bg-green-600" : "bg-red-600"}`}>
          <div className="flex items-center gap-3 text-white">
            {step === "done" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
            <span style={{ fontWeight: 700 }}>
              {step === "done" ? "Booking Cancelled" : "Cancel Booking"}
            </span>
          </div>
          {step !== "done" && (
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6">
          {step === "confirm" && (
            <>
              {/* Booking info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Train className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{booking?.bookingRef}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-gray-400">Route: </span><span className="text-gray-700" style={{ fontWeight: 600 }}>{booking?.from?.split(" (")[0]} → {booking?.to?.split(" (")[0]}</span></div>
                  <div><span className="text-gray-400">Date: </span><span className="text-gray-700" style={{ fontWeight: 600 }}>{booking?.date}</span></div>
                  <div><span className="text-gray-400">Time: </span><span className="text-gray-700" style={{ fontWeight: 600 }}>{booking?.time}</span></div>
                  <div><span className="text-gray-400">Pax: </span><span className="text-gray-700" style={{ fontWeight: 600 }}>{booking?.passengers}</span></div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-5">
                <p className="text-yellow-800 text-sm" style={{ fontWeight: 600 }}>⚠️ Are you sure you want to cancel?</p>
                <ul className="mt-2 space-y-1 text-yellow-700 text-xs">
                  <li>• Cancellations within 24 hours of booking are free</li>
                  <li>• After 24 hours, a ₱50 cancellation fee applies</li>
                  <li>• Refunds are processed within 3–5 business days</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-3 rounded-xl transition-colors text-sm"
                  style={{ fontWeight: 600, ...centeredButton }}
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleProceed}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition-colors text-sm"
                  style={{ fontWeight: 600, ...centeredButton }}
                >
                  Proceed to Cancel
                </button>
              </div>
            </>
          )}

          {step === "reason" && (
            <>
              <p className="text-gray-600 text-sm mb-4">Please tell us why you're cancelling this trip:</p>
              <div className="space-y-2 mb-4">
                {reasons.map((r) => (
                  <button
                    key={r}
                    onClick={() => setReason(r)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${reason === r ? "border-red-400 bg-red-50 text-red-700" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}
                    style={{ fontWeight: reason === r ? 600 : 400 }}
                  >
                    {r}
                  </button>
                ))}
              </div>
              {reason === "Other" && (
                <textarea
                  placeholder="Please describe your reason..."
                  value={customReason}
                  onChange={e => setCustomReason(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-300 mb-4"
                  rows={3}
                />
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("confirm")}
                  className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-3 rounded-xl transition-colors text-sm"
                  style={{ fontWeight: 600, ...centeredButton }}
                >
                  Back
                </button>
                <button
                  onClick={handleProceed}
                  disabled={!reason}
                  className={`flex-1 py-3 rounded-xl text-sm transition-colors ${reason ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                  style={{ fontWeight: 600, ...centeredButton }}
                >
                  Confirm Cancellation
                </button>
              </div>
            </>
          )}

          {step === "done" && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-gray-800 mb-2" style={{ fontWeight: 700, fontSize: "1.1rem" }}>Booking Cancelled Successfully</h3>
              <p className="text-gray-500 text-sm">Your refund will be processed within 3–5 business days. You will receive a confirmation email shortly.</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="4" strokeOpacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <span className="text-gray-400 text-xs">Returning to home...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}