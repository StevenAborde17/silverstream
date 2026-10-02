import { useState } from "react";
import { SplashPage } from "./components/SplashPage.tsx";
import { BookingPage } from "./components/BookingPage.tsx";
import { ConfirmationPage } from "./components/ConfirmationPage.tsx";
import { AuthPage } from "./components/AuthPage.tsx";
import { CancellationModal } from "./components/CancellationModal.tsx";

type Page = "splash" | "booking" | "confirmation" | "auth";

function generateRef() {
  return "RP-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function App() {
  const [page, setPage] = useState<Page>("splash");
  const [bookingFormData, setBookingFormData] = useState<any>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Called when user clicks Book Now / Search Trains on splash
  const handleStartBooking = (quickData?: any) => {
    if (quickData) setBookingFormData(quickData);
    setPage("booking");
  };

  // Called when user submits booking form
  const handleBookingConfirm = (data: any) => {
    setConfirmedBooking(data);
    setPage("confirmation");
  };

  // Called when user confirms on the confirmation page
  const handleConfirmationProceed = () => {
    setPage("auth");
  };

  // Called after auth (sign in / create account / guest)
  const handleAuthComplete = (userData: any) => {
    const booking = {
      ...confirmedBooking,
      bookingRef: generateRef(),
      user: userData,
    };
    setActiveBooking(booking);
    setPage("splash");
    setConfirmedBooking(null);
    setBookingFormData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Called when cancellation is confirmed
  const handleCancelConfirmed = () => {
    setActiveBooking(null);
    setShowCancelModal(false);
  };

  return (
    <div className="min-h-screen">
      {page === "splash" && (
        <SplashPage
          onBook={handleStartBooking}
          booking={activeBooking}
          onCancel={() => setShowCancelModal(true)}
        />
      )}

      {page === "booking" && (
        <BookingPage
          initialData={bookingFormData}
          onConfirm={handleBookingConfirm}
          onBack={() => setPage("splash")}
        />
      )}

      {page === "confirmation" && confirmedBooking && (
        <ConfirmationPage
          bookingData={confirmedBooking}
          onConfirm={handleConfirmationProceed}
          onBack={() => setPage("booking")}
        />
      )}

      {page === "auth" && (
        <AuthPage
          onComplete={handleAuthComplete}
          onBack={() => setPage("confirmation")}
        />
      )}

      {showCancelModal && activeBooking && (
        <CancellationModal
          booking={activeBooking}
          onConfirmCancel={handleCancelConfirmed}
          onClose={() => setShowCancelModal(false)}
        />
      )}
    </div>
  );
}
