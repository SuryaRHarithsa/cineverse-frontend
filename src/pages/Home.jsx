import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const featuredMovies = [
    "Interstellar",
    "Avengers Endgame",
    "Oppenheimer",
    "Inception",
  ];

  return (
    <div className="bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80')",
          }}
        ></div>

        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative z-10 max-w-3xl">
          <p className="text-red-500 font-semibold tracking-[0.3em] text-sm mb-4">
            CINEMA EXPERIENCE
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Book Your Next
            <span className="text-red-500"> Movie Night</span>
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl mb-8 max-w-2xl">
            Premium movie booking with smart seat selection,
            secure checkout, instant confirmations and blockbuster shows.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/movies")}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition"
            >
              Browse Movies
            </button>

            <button
              onClick={() => navigate("/bookings")}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur font-semibold transition"
            >
              My Bookings
            </button>
          </div>
        </div>
      </section>

      {/* Now Showing */}
      <section className="px-6 md:px-12 py-20">
        <h2 className="text-4xl font-bold mb-10">
          Now Showing
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMovies.map((movie) => (
            <div
              key={movie}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:-translate-y-1 transition"
            >
              <img
  src={
    movie === "Interstellar"
      ? "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
      : movie === "Avengers Endgame"
      ? "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
      : movie === "Oppenheimer"
      ? "https://image.tmdb.org/t/p/original/ptpr0kGAckfQkJeJIt8st5dglvd.jpg"
      : "https://image.tmdb.org/t/p/original/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg"
  }
  alt={movie}
  className="h-52 w-full object-cover rounded-xl mb-5"
/>

              <h3 className="text-xl font-semibold mb-4">
                {movie}
              </h3>

              <button
                onClick={() => navigate("/movies")}
                className="w-full py-2 bg-red-600 rounded-lg hover:bg-red-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 md:px-12 py-20 bg-zinc-900">
        <h2 className="text-4xl font-bold mb-10">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Premium Seating",
            "Secure Payments",
            "Fast Booking",
            "Easy Cancellation",
          ].map((item) => (
            <div
              key={item}
              className="p-6 rounded-2xl bg-zinc-800 border border-zinc-700"
            >
              <h3 className="text-xl font-semibold">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-6 md:px-12 py-24 text-center">
        <h2 className="text-5xl font-black mb-6">
          Ready For Movie Night?
        </h2>

        <p className="text-zinc-400 text-lg mb-8">
          Book tickets now and enjoy the big screen experience.
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="px-10 py-4 bg-red-600 hover:bg-red-700 rounded-xl font-semibold"
        >
          Explore Movies
        </button>
      </section>
    </div>
  );
}

export default Home;