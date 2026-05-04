import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("https://cineverse-backend-cdpw.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          alert(data.message);
          return;
        }

        localStorage.setItem("token", data.token);
localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);
        alert("Login Successful");
        window.location.href = "/movies";
      });
  };

  return (
    <div className="p-8 text-white max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-8">Login</h1>

      <input
        placeholder="Email"
        className="w-full p-3 mb-4 bg-zinc-800 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-6 bg-zinc-800 rounded"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full py-3 bg-green-600 rounded-lg"
      >
        Login
      </button>
    </div>
  );
}

export default Login;