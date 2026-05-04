import { useEffect, useState } from "react";

function Admin() {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);

  const loadMovies = () => {
    fetch("https://cineverse-backend-cdpw.onrender.com/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  };

  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    window.location.href = "/movies";
    return;
  }

  const user = JSON.parse(storedUser);

  if (user.role !== "admin") {
    window.location.href = "/movies";
    return;
  }

  loadMovies();
}, []);

  const addMovie = () => {
    fetch("https://cineverse-backend-cdpw.onrender.com/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Date.now(),
        title,
      }),
    }).then(() => {
      setTitle("");
      loadMovies();
    });
  };

  const deleteMovie = (id) => {
    fetch(`https://cineverse-backend-cdpw.onrender.com/movies/${id}`, {
      method: "DELETE",
    }).then(() => loadMovies());
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

      <div className="flex gap-4 mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie Title"
          className="p-3 bg-zinc-800 rounded w-80"
        />

        <button
          onClick={addMovie}
          className="px-6 bg-green-600 rounded"
        >
          Add Movie
        </button>
      </div>

      <div className="space-y-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-zinc-900 p-4 rounded flex justify-between"
          >
            <span>{movie.title}</span>

            <button
              onClick={() => deleteMovie(movie.id)}
              className="px-4 py-1 bg-red-600 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;