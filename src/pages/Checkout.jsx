function Checkout() {
  const booking = JSON.parse(
    localStorage.getItem("checkoutBooking")
  );

  if (!booking) {
    return (
      <div className="p-8 text-white">
        No booking found
      </div>
    );
  }

  const handlePayment = () => {
    fetch("https://cineverse-backend-cdpw.onrender.com/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  ...booking,
  status: "Confirmed",
  bookedAt: new Date().toISOString(),
  userEmail: JSON.parse(
    localStorage.getItem("user")
  ).email,
})
    })
      .then((res) => res.json())
      .then(() => {
        localStorage.removeItem("checkoutBooking");
        window.location.href = "/bookings";
      });
  };

  return (
    <div className="p-8 text-white max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="bg-zinc-900 p-6 rounded-xl space-y-3">
        <p>Movie: {booking.movie}</p>
        <p>Date: {booking.date}</p>
        <p>Time: {booking.time}</p>
        <p>Seats: {booking.seats?.join(", ")}</p>
        <p className="text-xl font-bold">
          Total: ₹{booking.price}
        </p>
      </div>

      <select className="w-full mt-6 p-3 bg-zinc-800 rounded">
        <option>UPI</option>
        <option>Credit Card</option>
        <option>Debit Card</option>
        <option>Net Banking</option>
      </select>

      <button
        onClick={handlePayment}
        className="w-full mt-6 py-3 bg-green-600 rounded-lg"
      >
        Pay Now
      </button>
    </div>
  );
}

export default Checkout;