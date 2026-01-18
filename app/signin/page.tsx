"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ROLES = [
  { label: "User", value: "user" },
  { label: "Merchant", value: "merchant" },
  { label: "Vendor", value: "vendor" },
];

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password || !role) {
      alert("Please fill in all fields");
      return;
    }

    // TEMP: role-based redirect (replace with real auth later)
    if (role === "user") {
      router.push("/");
    } else if (role === "merchant") {
      router.push("/company/merchant/Dashboard");
    } else if (role === "vendor") {
      router.push("/dashboard/vendor");
    } else {
      alert("Invalid role selected");
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Background for Login.svg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6"
      >
        <Image
          src="/signlogo.png"
          alt="Logo"
          width={60}
          height={52}
          className="mx-auto mb-2"
        />

        <h2 className="text-xl font-semibold text-center mb-1">
          Sign in to Printable
        </h2>

        <p className="text-sm text-center text-gray-500 mb-4">
          Welcome back! Please sign in to continue
        </p>

        {/* Google Login (UI only) */}
        <button
          type="button"
          className="w-full border rounded-md py-2 flex items-center justify-center gap-2 mb-4 border-gray-300"
        >
          <Image src="/Google.png" alt="Google" width={16} height={16} />
          Continue with Google
        </button>

        <div className="text-center text-gray-400 text-sm mb-4">or</div>

        {/* Role */}
        <label htmlFor="role" className="block mb-1 text-sm font-medium">
          Role
        </label>
        <select
          id="role"
          className="w-full border rounded-md px-3 py-2 mb-4 border-gray-300"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select role</option>
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        {/* Email */}
        <label htmlFor="email" className="block mb-1 text-sm font-medium">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email address"
          className="w-full border rounded-md px-3 py-2 mb-3 border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <label htmlFor="password" className="block mb-1 text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="w-full border rounded-md px-3 py-2 mb-4 border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          Continue →
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-medium text-black">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
