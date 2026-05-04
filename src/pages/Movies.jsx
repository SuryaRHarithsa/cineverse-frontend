import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://cineverse-backend-cdpw.onrender.com/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 md:px-10 py-10">
      <div className="mb-12">
        <p className="text-red-500 font-semibold tracking-[0.3em] text-sm mb-3">
          NOW SHOWING
        </p>

        <h1 className="text-5xl md:text-6xl font-black mb-4">
          Book Your Next
          <span className="text-red-500"> Movie Night</span>
        </h1>

        <p className="text-zinc-400 text-lg max-w-2xl">
          Discover blockbusters, premium seating, and a cinematic booking experience.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div
  key={movie.id}
  className="group max-w-sm mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/30 transition duration-300"
>
  <div className="relative aspect-[2/3] overflow-hidden">
    <img
      src={movie.poster}
      alt={movie.title}
      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

    <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm font-semibold">
      ★ 8.8
    </div>

    <div className="absolute bottom-4 left-4 right-4">
      <h2 className="text-2xl font-bold mb-3">
        {movie.title}
      </h2>

      <div className="flex gap-2 flex-wrap">
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-sm">
          {movie.genre}
        </span>

        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-sm">
          {movie.duration}
        </span>
      </div>
    </div>
  </div>

  <div className="p-5">
    <button
      onClick={() => navigate(`/seat/${movie.id}`)}
      className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold transition"
    >
      Book Tickets
    </button>
  </div>
</div>
        )
        
        )}
      </div>
    </div>
  );
}

export default Movies;