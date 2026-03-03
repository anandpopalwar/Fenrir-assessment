import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AppleIcon, GoogleIcon, MetaIcon } from "../Utils/Icons";

const LoginForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fullName || !email || !password || !agree) {
      return;
    }
    login();
    navigate("/dashboard", { replace: true });
  };
  return (
    <div className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
      <h2 className="text-center text-3xl font-semibold text-slate-900">
        Sign up
      </h2>
      <p className="mt-2 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <a href="#" className="font-medium text-teal-600 hover:text-teal-700">
          Log in
        </a>
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="fullName"
        >
          Full name
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            autoComplete="name"
            required
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            placeholder="Anand Popalwar"
          />
        </label>

        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="email"
        >
          Email
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            placeholder="you@example.com"
          />
        </label>

        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="password"
        >
          Password
          <div className="relative mt-1.5">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
              minLength={8}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              placeholder="********"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-slate-400">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-current stroke-2"
              >
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </div>
        </label>

        <label className="flex items-start gap-2 pt-1 text-xs text-slate-600">
          <input
            type="checkbox"
            checked={agree}
            onChange={(event) => setAgree(event.target.checked)}
            required
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          <span>
            I agree to Apsˇs
            <a
              href="#"
              className="ml-1 mr-1 text-blue-600 hover:text-blue-700 underline"
            >
              Terms & Conditions
            </a>
            and acknowledge the
            <a
              href="#"
              className="ml-1 text-blue-600 hover:text-blue-700 underline "
            >
              Privacy Policy
            </a>
          </span>
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-teal-600 px-4 py-3 font-medium text-white transition hover:bg-teal-700"
        >
          Create account
        </button>
      </form>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
        <button
          type="button"
          className="rounded-full bg-black px-3 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 flex justify-center"
        >
          <AppleIcon fill="#fff" />
        </button>
        <button
          type="button"
          className="rounded-full bg-slate-100 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 flex justify-center"
        >
          <GoogleIcon />
        </button>
        <button
          type="button"
          className="rounded-full bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 flex justify-center"
        >
          <MetaIcon />
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
