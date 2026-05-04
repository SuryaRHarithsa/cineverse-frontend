import { useEffect, useState } from "react";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "/login";
      return;
    }

    fetch("https://cineverse-backend-cdpw.onrender.com/bookings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  const cancelBooking = (id) => {
    fetch(`https://cineverse-backend-cdpw.onrender.com/bookings/${id}/cancel`, {
      method: "PATCH",
    }).then(() => {
      setBookings((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, status: "Cancelled" }
            : item
        )
      );
    });
  };


const timeAgo = (date) => {
  if (!date) return "Booked recently";

  const seconds = Math.floor(
    (new Date() - new Date(date)) / 1000
  );

  const mins = Math.floor(seconds / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (mins < 1) return "Booked just now";
  if (mins < 60) return `Booked ${mins} mins ago`;
  if (hours < 24) return `Booked ${hours} hrs ago`;

  return `Booked ${days} day(s) ago`;
};
  

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 md:px-10 py-10">
      <h1 className="text-5xl font-black mb-10">
        My Tickets
      </h1>

      {bookings.length === 0 ? (
        <p className="text-zinc-400">
          No bookings yet.
        </p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
            >
              {/* Top Accent */}
              <div className="h-2 bg-red-600"></div>

              <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-zinc-400 text-sm mb-2">
                      CINEMA TICKET
                    </p>

                    <h2 className="text-3xl font-bold">
                      {booking.movie}
                    </h2>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      booking.status === "Cancelled"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-5 text-sm md:text-base">
                  <div>
                    <p className="text-zinc-500">Date</p>
                    <p>{booking.date}</p>
                  </div>

                  <div>
                    <p className="text-zinc-500">Time</p>
                    <p>{booking.time}</p>
                  </div>

                  <div>
                        <p className="text-zinc-500">Seat(s)</p>
                        <p>
                          {Array.isArray(booking.seats)
                        ? booking.seats.join(", ")
                        : booking.seat || "-"}
                        </p>
                </div>

                  <div>
                    <p className="text-zinc-500">Price</p>
                    <p>₹{booking.price}</p>
                  </div>
                </div>

                <p className="text-zinc-500 text-sm mt-4">
                    {timeAgo(booking.bookedAt)}
                </p>

                {booking.status !== "Cancelled" && (
                  <button
                    onClick={() =>
                      cancelBooking(booking._id)
                    }
                    className="w-full mt-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold transition"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>

              {/* Ticket Cutouts */}
              <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-zinc-950"></div>
              <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-zinc-950"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;