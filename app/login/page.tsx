"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder — no real auth logic
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-start justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-2xl max-w-md w-full mx-auto mt-24 mb-16"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/03a7a183-510f-4804-9261-d3b87d909420/e4d205a9d4764abe84a826bb025eef1b.png?v=1786450486615"
            alt="Asad Store"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="font-display text-2xl font-bold text-[var(--foreground)] text-center mt-4">
          Welcome Back
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] text-center mb-6">
          Sign in to your Asad account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none">
                <Mail size={16} aria-hidden="true" />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none">
                <Lock size={16} aria-hidden="true" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl pl-10 pr-12 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a
              href="#"
              className="text-xs text-[var(--primary)] hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[var(--primary)] hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs text-[var(--muted-foreground)] select-none">or</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--border)]/30 font-medium py-3 rounded-xl transition-all"
        >
          <span className="font-bold text-[var(--primary)] text-base leading-none">G</span>
          Continue with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-sm text-[var(--muted-foreground)] text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[var(--primary)] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
