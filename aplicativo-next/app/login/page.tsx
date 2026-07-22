"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

interface User {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

interface LoggedInUser {
  nombre: string;
  apellido: string;
  email: string;
}

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [error, setError] = useState("");
  const [loggedUser, setLoggedUser] = useState<LoggedInUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        try {
          setLoggedUser(JSON.parse(storedUser));
        } catch (e: unknown) {
          localStorage.removeItem("loggedInUser");
        }
      }
      setIsLoaded(true);
    }
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim() || !apellido.trim() || !email.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor ingresa un correo válido");
      return;
    }

    if (!validatePassword(password)) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === email)) {
      setError("Este correo ya está registrado");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      nombre,
      apellido,
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.");
    setMode("login");
    setNombre("");
    setApellido("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Correo y contraseña son obligatorios");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor ingresa un correo válido");
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email);

    if (!user) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    const loggedInUser: LoggedInUser = {
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
    };

    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    setLoggedUser(loggedInUser);
    alert(`¡Bienvenido ${user.nombre} ${user.apellido}!`);
    router.push("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedUser(null);
    setEmail("");
    setPassword("");
  };

  if (!isLoaded) {
    return null;
  }

  if (loggedUser) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-20">
        <div className="bg-green-50 p-6 rounded-lg shadow border border-green-200">
          <h1 className="text-3xl font-bold mb-4 text-green-800">✓ Sesión activa</h1>
          <div className="space-y-3">
            <p className="text-lg">
              <span className="font-semibold text-green-900">Usuario:</span> <span className="text-green-800">{loggedUser.nombre} {loggedUser.apellido}</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold text-green-900">Correo:</span> <span className="text-green-800">{loggedUser.email}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setMode("login");
            setError("");
            setNombre("");
            setApellido("");
          }}
          className={`px-6 py-2 rounded transition ${
            mode === "login"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => {
            setMode("signup");
            setError("");
            setEmail("");
            setPassword("");
          }}
          className={`px-6 py-2 rounded transition ${
            mode === "signup"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Crear cuenta
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        {mode === "login" ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-black">Iniciar sesión</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black">Correo</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="mt-1 block w-full rounded border px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="mt-1 block w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Entrar
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-black">Crear cuenta</h1>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black">Nombre</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="mt-1 block w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">Apellido</label>
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Tu apellido"
                    className="mt-1 block w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Correo</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="mt-1 block w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="mt-1 block w-full border px-3 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                >
                  Crear cuenta
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
