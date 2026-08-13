"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: no real auth logic
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
            alt="Asad logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="font-display text-2xl font-bold text-[var(--foreground)] text-center mt-4">
          Create Account
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] text-center mb-6">
          Join Asad and start shopping
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl pl-10 pr-12 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[var(--foreground)] mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl pl-10 pr-12 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 pt-1">
            <input
              id="agreed"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded accent-[var(--primary)] cursor-pointer flex-shrink-0"
            />
            <label
              htmlFor="agreed"
              className="text-sm text-[var(--muted-foreground)] leading-snug cursor-pointer"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-[var(--primary)] hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-[var(--primary)] hover:underline"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[var(--primary)] hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-200 mt-2"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs text-[var(--muted-foreground)] px-1">or</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--border)]/30 font-medium py-3 rounded-xl transition-all duration-200"
        >
          <span className="font-bold text-[var(--primary)] text-base leading-none">G</span>
          Continue with Google
        </button>

        {/* Bottom Link */}
        <p className="text-sm text-[var(--muted-foreground)] text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[var(--primary)] font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
