"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ROLES = [
  { label: "User", value: "user" },
  { label: "Merchant", value: "merchant" },
  { label: "Vendor", value: "vendor" },
];

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password || !role) {
      alert("Please fill in all fields");
      return;
    }

    console.log({ email, password, role });
    // TODO: send to signup API
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/backgroundCreateaccount.png')" }}
    >
    

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center"
      >
        {/* Logo */}
        <Image
          src="/signlogo.png"
          alt="Logo"
          width={60}
          height={52}
          className="mx-auto mb-2"
        />

        <h2 className="text-xl font-semibold mb-1">
          Create your account
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Welcome! Please fill in the details to get started.
        </p>

        {/* Google Signup */}
        <button
          type="button"
          className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 mb-4"
        >
          <Image src="/Google.png" alt="Google" width={16} height={16} />
          Continue with Google
        </button>

        <div className="text-gray-400 text-sm mb-4">or</div>

        {/* Role */}
        <div className="mb-4 text-left">
          <label htmlFor="role" className="block mb-1 text-sm font-medium">
            Role
          </label>
          <select
            id="role"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
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
        </div>

        {/* Email */}
        <div className="mb-3 text-left">
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 text-left">
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          Continue →
        </button>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-black">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
