import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SeatSelection() {
  const { id } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [movie, setMovie] = useState(null);
const [selectedDate, setSelectedDate] = useState("");
const [selectedTime, setSelectedTime] = useState("");

  const rows = ["A", "B", "C", "D", "E", "F"];

const seats = rows.flatMap((row) =>
  Array.from({ length: 10 }, (_, i) => `${row}${i + 1}`)
);

  useEffect(() => {
  fetch("https://cineverse-backend-cdpw.onrender.com/movies")
    .then((res) => res.json())
    .then((data) => {
      const foundMovie = data.find(
        (item) => item.id === Number(id)
      );

      setMovie(foundMovie);
    });
}, [id]);

useEffect(() => {
  if (!selectedDate || !selectedTime) return;

  fetch(
    `https://cineverse-backend-cdpw.onrender.com/bookings/${movie.title}/${selectedDate}/${selectedTime}`
  )
    .then((res) => res.json())
    .then((data) => {
      setBookedSeats(
  data.flatMap((item) =>
    item.seats ? item.seats : [item.seat]
  )
);
    });
}, [selectedDate, selectedTime, movie]);

const getTotalPrice = () => {
  return selectedSeats.reduce((total, seat) => {
    const row = seat[0];

    if (row === "A" || row === "B") {
      return total + movie.pricing.Silver;
    }
    if (row === "C" || row === "D") {
      return total + movie.pricing.Gold;
    }
    return total + movie.pricing.Recliner;
  }, 0);
};

const getNext7Days = () => {
  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const formatted = date.toISOString().split("T")[0];
    days.push(formatted);
  }

  return days;
};

const availableDates = getNext7Days();

const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
};

if (!movie) {
  return <div className="p-8 text-white">Loading...</div>;
}

  return (
  <div className="min-h-screen bg-zinc-950 text-white px-6 md:px-10 py-10">
    {/* Header */}
    <div className="mb-10">
      <p className="text-red-500 tracking-[0.3em] text-sm font-semibold mb-3">
        SELECT SEATS
      </p>

      <h1 className="text-5xl font-black mb-3">
        {movie.title}
      </h1>

      <p className="text-zinc-400 text-lg">
        {movie.genre} • {movie.duration}
      </p>
    </div>

    <div className="grid lg:grid-cols-[1fr_360px] gap-10">
      {/* Left Side */}
      <div>
        {/* Date */}
        <div className="mb-8">
          <p className="mb-4 text-lg font-semibold">
            Choose Date
          </p>

          <div className="flex flex-wrap gap-3">
            {availableDates.map((date) => (
  <button
    key={date}
    onClick={() => {
      setSelectedDate(date);
      setSelectedTime("");
      setSelectedSeats([]);
    }}
    className={`px-5 py-3 rounded-xl transition ${
      selectedDate === date
        ? "bg-red-600"
        : "bg-zinc-900 hover:bg-zinc-800"
    }`}
  >
    {formatDate(date)}
  </button>
))}
          </div>
        </div>

        {/* Time */}
        {selectedDate && (
          <div className="mb-8">
            <p className="mb-4 text-lg font-semibold">
              Choose Time
            </p>

            <div className="flex flex-wrap gap-3">
              {movie.shows[0].times
  .filter((time) => {
  const now = new Date();

  const selected = new Date(selectedDate);
  const today = new Date();

  selected.setHours(0,0,0,0);
  today.setHours(0,0,0,0);

  if (selected.getTime() !== today.getTime()) return true;

  const [clock, modifier] = time.split(" ");
  let [hours, minutes] = clock.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const showTime = new Date();
  showTime.setHours(hours, minutes, 0, 0);

  return showTime > now;
})
  .map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setSelectedTime(time);
                      setSelectedSeats([]);
                    }}
                    className={`px-5 py-3 rounded-xl transition ${
                      selectedTime === time
                        ? "bg-green-600"
                        : "bg-zinc-900 hover:bg-zinc-800"
                    }`}
                  >
                    {time}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Seats */}
        {selectedTime && (
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="w-full h-4 rounded-full bg-zinc-700 mb-3"></div>
            <p className="text-center text-zinc-400 mb-8 text-sm tracking-widest">
              SCREEN THIS WAY
            </p>

            <div className="space-y-3">
              {rows.map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-10 gap-2"
                >
                  {seats
                    .filter((seat) =>
                      seat.startsWith(row)
                    )
                    .map((seat) => {
                      const isBooked =
                        bookedSeats.includes(seat);

                      const rowStyle =
                        row === "A" || row === "B"
                          ? "bg-slate-700"
                          : row === "C" || row === "D"
                          ? "bg-amber-700"
                          : "bg-purple-700";

                      return (
                        <button
                          key={seat}
                          disabled={isBooked}
                          onClick={() => {
  if (selectedSeats.includes(seat)) {
    setSelectedSeats(selectedSeats.filter((s) => s !== seat));
  } else {
    setSelectedSeats([...selectedSeats, seat]);
  }
}}
                          className={`p-2 rounded-lg text-xs transition ${
                            isBooked
                              ? "bg-gray-700 cursor-not-allowed"
                              : selectedSeats.includes(seat)
                              ? "bg-red-600"
                              : `${rowStyle} hover:brightness-110`
                          }`}
                        >
                          {seat}
                        </button>
                      );
                    })}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-8 text-sm text-zinc-400">
              <span>Silver</span>
              <span>Gold</span>
              <span>Recliner</span>
            </div>
          </div>
        )}
      </div>

      {/* Right Summary */}
      <div className="h-fit sticky top-24 bg-zinc-900 border border-zinc-800 rounded-3xl p-7">
        <h2 className="text-2xl font-bold mb-6">
          Booking Summary
        </h2>

        <div className="space-y-4 text-zinc-300">
          <p>Movie: {movie.title}</p>
          <p>
  Date: {selectedDate ? formatDate(selectedDate) : "-"}
</p>
          <p>Time: {selectedTime || "-"}</p>
          <p>Seats: {selectedSeats.join(", ") || "-"}</p>
          <p className="text-xl font-bold text-white">
            Price: ₹{getTotalPrice()}
          </p>
        </div>

        <button
          disabled={selectedSeats.length === 0}
          onClick={() => {
            const bookingData = {
              movie: movie.title,
              date: selectedDate,
              time: selectedTime,
              seats: selectedSeats,
              price: getTotalPrice(),
            };

            localStorage.setItem(
              "checkoutBooking",
              JSON.stringify(bookingData)
            );

            window.location.href = "/checkout";
          }}
          className="w-full mt-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 disabled:cursor-not-allowed font-semibold transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
);
}

export default SeatSelection;