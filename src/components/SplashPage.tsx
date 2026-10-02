import { useState } from "react";
import { Train, Clock, Shield, Star, ChevronRight, MapPin, Calendar, Users, Zap, Award, ArrowRight } from "lucide-react";

interface ImageFallbackProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

function ImageWithFallback(props: ImageFallbackProps) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;
  return didError ? (
    <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`} style={style}>
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="Error loading image" data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  );
}

const HERO_IMAGE = "https://images.unsplash.com/photo-1527295110-5145f6b148d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0cmFpbiUyMHJhaWx3YXklMjBzdGF0aW9ufGVufDF8fHx8MTc5MDgzNDc2N3ww&ixlib=rb-4.1.0&q=80&w=1080";
const INTERIOR_IMAGE = "https://images.unsplash.com/photo-1514043016-1076e5413b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMGludGVyaW9yJTIwcGFzc2VuZ2VyJTIwc2VhdHN8ZW58MXx8fHwxNzkwODM0NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080";
const SCENIC_IMAGE = "https://images.unsplash.com/photo-1783036102585-d11142bb9881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMHRyYXZlbCUyMHNjZW5pYyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3OTA4MzQ3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const LUXURY_IMAGE = "https://images.unsplash.com/photo-1778432195266-4491fc66d1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmFpbiUyMGZpcnN0JTIwY2xhc3MlMjBjYWJpbnxlbnwxfHx8fDE3OTA4MzQ3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080";
const PROMO_IMAGE = "https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlsd2F5JTIwdHJhdmVsJTIwZGlzY291bnQlMjBwcm9tb3xlbnwxfHx8fDE3OTA4MzQ3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080";

const stations = ["Manila (MNL)", "Makati (MKT)", "Quezon City (QC)", "Pasay (PSY)", "Caloocan (CLK)", "Paranaque (PRQ)", "Las Pinas (LPS)", "Muntinlupa (MTL)"];

const promos = [
  { id: 1, title: "Early Bird Special", discount: "20% OFF", desc: "Book 14 days in advance", code: "EARLY20", color: "from-blue-600 to-blue-800", img: PROMO_IMAGE },
  { id: 2, title: "Weekend Getaway", discount: "15% OFF", desc: "Travel Sat-Sun any route", code: "WKND15", color: "from-purple-600 to-purple-800", img: SCENIC_IMAGE },
  { id: 3, title: "Senior Citizen", discount: "30% OFF", desc: "Valid ID required at check-in", code: "SENIOR30", color: "from-green-600 to-green-800", img: INTERIOR_IMAGE },
];

interface SplashPageProps {
  onBook: (quickData?: any) => void;
  booking?: any;
  onCancel?: () => void;
}

export function SplashPage({ onBook, booking, onCancel }: SplashPageProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  const handleQuickBook = () => {
    onBook({ from, to, date, passengers });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <Train className="w-5 h-5 text-white" />
            </div>
            <span className="text-blue-900" style={{ fontWeight: 700, fontSize: "1.2rem" }}>SilverStream</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Routes</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Schedules</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Promos</a>
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
          </div>
          <button
            onClick={() => onBook()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm transition-colors"
            style={{ fontWeight: 600 }}
          >
            Book Now
          </button>
        </div>
      </nav>

      {/* Active Booking Banner */}
      {booking && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-green-600 text-white px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Train className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm" style={{ fontWeight: 600 }}>Active Booking: {booking.bookingRef}</p>
                <p className="text-xs text-green-100">{booking.from} → {booking.to} | {booking.date} at {booking.time} | {booking.passengers} pax | {booking.travelClass}</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="flex-shrink-0 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs transition-colors"
              style={{ fontWeight: 600 }}
            >
              Cancel Booking
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden" style={{ minHeight: "100vh" }}>
        <ImageWithFallback
          src={HERO_IMAGE}
          alt="Railway Station"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        {/* Lighter overlay so the image is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-900/50 to-blue-900/85" />

        {/* Top text area — image is clearly visible behind this */}
        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center ${booking ? "pt-32" : "pt-28"} pb-10`}>
          <div className="mb-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs px-4 py-1.5 rounded-full" style={{ fontWeight: 500 }}>
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            Philippines' #1 Railway Booking Platform
          </div>
          <h1 className="text-white mb-4" style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.15 }}>
            Travel Smarter,<br />Travel by Rail
          </h1>
          <p className="text-blue-100 mb-10 max-w-xl" style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
            Fast, affordable, and comfortable railway journeys across the country. Book your tickets in seconds.
          </p>

          {/* Quick Booking Card */}
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-5 sm:p-6">
            <h2 className="text-gray-800 mb-4 text-left" style={{ fontWeight: 700, fontSize: "1.1rem" }}>Quick Booking</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1" style={{ fontWeight: 500 }}>From</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-400 px-3 py-2.5">
                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <select
                    value={from}
                    onChange={e => setFrom(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-gray-700 min-w-0"
                  >
                    <option value="">Select Station</option>
                    {stations.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1" style={{ fontWeight: 500 }}>To</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-400 px-3 py-2.5">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <select
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-gray-700 min-w-0"
                  >
                    <option value="">Select Station</option>
                    {stations.filter(s => s !== from).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1" style={{ fontWeight: 500 }}>Date</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-400 px-3 py-2.5">
                  <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <input
                    type="date"
                    min={today}
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-gray-700 min-w-0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1" style={{ fontWeight: 500 }}>Passengers</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-400 px-3 py-2.5">
                  <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <select
                    value={passengers}
                    onChange={e => setPassengers(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-gray-700 min-w-0"
                  >
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Passenger{n > 1 ? "s" : ""}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <button
              onClick={handleQuickBook}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              style={{ fontWeight: 600, fontSize: "1rem" }}
            >
              Search Trains <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 sm:gap-12 text-white">
            {[["2M+", "Passengers/yr"], ["150+", "Routes"], ["99.2%", "On-time Rate"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div style={{ fontWeight: 800, fontSize: "clamp(1.4rem, 4vw, 2rem)" }}>{val}</div>
                <div className="text-blue-200 text-xs mt-0.5" style={{ fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-3" style={{ fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>Why Choose SilverStream?</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">Experience the future of railway travel with our cutting-edge booking platform</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Zap className="w-6 h-6 text-blue-600" />, title: "Instant Booking", desc: "Book your tickets in under 60 seconds with our streamlined process" },
              { icon: <Clock className="w-6 h-6 text-blue-600" />, title: "Real-time Updates", desc: "Live schedule updates and delay notifications delivered instantly" },
              { icon: <Shield className="w-6 h-6 text-blue-600" />, title: "Secure Payments", desc: "Bank-level encryption protects every transaction you make" },
              { icon: <Award className="w-6 h-6 text-blue-600" />, title: "Rewards Program", desc: "Earn RailPoints on every booking and redeem for free tickets" },
            ].map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="text-gray-800 mb-2" style={{ fontWeight: 700 }}>{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-8 text-center" style={{ fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>Travel in Comfort</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:row-span-2 rounded-2xl overflow-hidden" style={{ height: "400px" }}>
              <ImageWithFallback src={INTERIOR_IMAGE} alt="Train Interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ height: "192px" }}>
              <ImageWithFallback src={SCENIC_IMAGE} alt="Scenic Journey" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ height: "192px" }}>
              <ImageWithFallback src={LUXURY_IMAGE} alt="Luxury Class" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden" style={{ height: "192px" }}>
              <ImageWithFallback src={HERO_IMAGE} alt="Railway Station" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Promos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-gray-900" style={{ fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>Hot Promos</h2>
            <button className="text-blue-600 text-sm flex items-center gap-1 hover:gap-2 transition-all" style={{ fontWeight: 600 }}>
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promos.map((p) => (
              <div key={p.id} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-40">
                  <ImageWithFallback src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-80`} />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full w-fit mb-1" style={{ fontWeight: 500 }}>Limited Time</span>
                    <h3 style={{ fontWeight: 700, fontSize: "1.1rem" }}>{p.title}</h3>
                    <p className="text-white/80 text-xs">{p.desc}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs" style={{ fontWeight: 800 }}>
                    {p.discount}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Promo Code</p>
                    <p className="text-gray-800 tracking-widest text-sm" style={{ fontWeight: 700 }}>{p.code}</p>
                  </div>
                  <button
                    onClick={() => onBook()}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-8 text-center" style={{ fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>Popular Routes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { from: "Manila", to: "Makati", duration: "25 min", price: "₱45", rating: 4.9, trips: "120 daily" },
              { from: "Quezon City", to: "Pasay", duration: "40 min", price: "₱65", rating: 4.7, trips: "80 daily" },
              { from: "Caloocan", to: "Muntinlupa", duration: "55 min", price: "₱85", rating: 4.8, trips: "60 daily" },
              { from: "Manila", to: "Paranaque", duration: "30 min", price: "₱55", rating: 4.6, trips: "100 daily" },
              { from: "Makati", to: "Las Pinas", duration: "35 min", price: "₱60", rating: 4.7, trips: "90 daily" },
              { from: "Pasay", to: "Quezon City", duration: "45 min", price: "₱70", rating: 4.8, trips: "75 daily" },
            ].map((r) => (
              <div key={`${r.from}-${r.to}`} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="text-sm text-gray-800" style={{ fontWeight: 700 }}>{r.from}</div>
                    <div className="flex-1 border-t-2 border-dashed border-gray-200 mx-2 relative">
                      <Train className="w-3.5 h-3.5 text-blue-500 absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-0.5" />
                    </div>
                    <div className="text-sm text-gray-800" style={{ fontWeight: 700 }}>{r.to}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {r.duration}</span>
                  <span className="flex items-center gap-1"><Train className="w-3 h-3" /> {r.trips}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" /> {r.rating}</span>
                  <span className="text-blue-600" style={{ fontWeight: 700 }}>{r.price}</span>
                </div>
                <button
                  onClick={() => onBook({ from: r.from, to: r.to })}
                  className="mt-3 w-full border border-blue-200 hover:bg-blue-50 text-blue-600 text-xs py-2 rounded-lg transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Book this route
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Train className="w-5 h-5" />
                <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>SilverStream</span>
              </div>
              <p className="text-blue-200 text-sm">The Philippines' premier railway booking platform since 2020.</p>
            </div>
            {[
              { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
              { title: "Services", links: ["Book Tickets", "Group Travel", "Corporate", "Freight"] },
              { title: "Support", links: ["Help Center", "Refund Policy", "Track Booking", "Feedback"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="mb-3 text-sm" style={{ fontWeight: 700 }}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => <li key={l}><a href="#" className="text-blue-300 hover:text-white text-sm transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-blue-800 pt-6 text-center text-blue-400 text-xs">
            © 2026 SilverStream. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </footer>
    </div>
  );
}