import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    fetch("https://cineverse-backend-cdpw.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
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

        alert("Registered Successfully");
        window.location.href = "/login";
      });
  };

  return (
    <div className="p-8 text-white max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-8">Register</h1>

      <input
        placeholder="Name"
        className="w-full p-3 mb-4 bg-zinc-800 rounded"
        onChange={(e) => setName(e.target.value)}
      />

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
        onClick={handleRegister}
        className="w-full py-3 bg-red-600 rounded-lg"
      >
        Register
      </button>
    </div>
  );
}

export default Register;