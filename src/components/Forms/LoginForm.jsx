import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AppleIcon, GoogleIcon, MetaIcon } from "../Utils/Icons";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const initialErrors = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  agree: "",
};

const LoginForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const { login } = useAuth();
  const navigate = useNavigate();

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidPassword = (value) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value);

  const validate = () => {
    const nextErrors = { ...initialErrors };

    if (!firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!lastName.trim()) nextErrors.lastName = "Last name is required.";

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (!isValidPassword(password)) {
      nextErrors.password =
        "Password must be at least 8 chars, with 1 uppercase, 1 number, and 1 special character.";
    }

    if (!agree) nextErrors.agree = "You must accept terms to continue.";

    setErrors(nextErrors);
    return Object.values(nextErrors).every((value) => !value);
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    login({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      role: "Security Analyst",
      avatarUrl: "",
    });
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
      <h2 className="text-center text-3xl font-semibold text-slate-900">
        Sign up
      </h2>
      <p className="mt-2 text-center text-sm text-slate-500 ">
        Already have an account?{" "}
        <a href="#" className="font-medium text-teal-600 hover:text-teal-700">
          Log in
        </a>
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <div className="mb-1 block">
            <Label
              className="!text-slate-700"
              htmlFor="firstName"
              value="First name"
            />
          </div>
          <TextInput
            id="firstName"
            type="text"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
              clearError("firstName");
            }}
            onBlur={validate}
            autoComplete="given-name"
            placeholder="Anand"
            color={errors.firstName ? "failure" : "gray"}
            className="[&_input]:!border-slate-300 [&_input]:!bg-white [&_input]:!text-slate-900 [&_input]:placeholder:!text-slate-400"
            required
          />
          {errors.firstName ? (
            <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
          ) : null}
        </div>

        <div>
          <div className="mb-1 block">
            <Label
              className="!text-slate-700"
              htmlFor="lastName"
              value="Last name"
            />
          </div>
          <TextInput
            id="lastName"
            type="text"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
              clearError("lastName");
            }}
            onBlur={validate}
            autoComplete="family-name"
            placeholder="Popalwar"
            color={errors.lastName ? "failure" : "gray"}
            className="[&_input]:!border-slate-300 [&_input]:!bg-white [&_input]:!text-slate-900 [&_input]:placeholder:!text-slate-400"
            required
          />
          {errors.lastName ? (
            <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
          ) : null}
        </div>

        <div>
          <div className="mb-1 block">
            <Label className="!text-slate-700" htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearError("email");
            }}
            onBlur={validate}
            autoComplete="email"
            placeholder="you@example.com"
            color={errors.email ? "failure" : "gray"}
            className="[&_input]:!border-slate-300 [&_input]:!bg-white [&_input]:!text-slate-900 [&_input]:placeholder:!text-slate-400"
            required
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <div className="mb-1 block">
            <Label
              className="!text-slate-700"
              htmlFor="password"
              value="Password"
            />
          </div>
          <div className="relative">
            <TextInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                clearError("password");
              }}
              onBlur={validate}
              autoComplete="new-password"
              placeholder="********"
              minLength={8}
              color={errors.password ? "failure" : "gray"}
              className="[&_input]:!border-slate-300 [&_input]:!bg-white [&_input]:!pr-10 [&_input]:!text-slate-900 [&_input]:placeholder:!text-slate-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          ) : null}
        </div>

        <div className="flex items-start gap-2 pt-1 text-xs text-slate-500 ">
          <Checkbox
            id="agreeTerms"
            checked={agree}
            onChange={(event) => {
              setAgree(event.target.checked);
              clearError("agree");
            }}
            className="!border-slate-300 !bg-white !text-teal-600 focus:!ring-teal-500"
            required
          />
          <Label
            htmlFor="agreeTerms"
            className="!text-xs !font-normal !text-inherit"
          >
            I agree to Aps's
            <a
              href="#"
              className="mx-1 text-blue-600 underline hover:text-blue-700"
            >
              Terms & Conditions
            </a>
            and acknowledge the
            <a
              href="#"
              className="ml-1 text-blue-600 underline hover:text-blue-700"
            >
              Privacy Policy
            </a>
          </Label>
        </div>
        {errors.agree ? (
          <p className="-mt-2 text-xs text-red-600">{errors.agree}</p>
        ) : null}

        <Button
          type="submit"
          className="w-full !rounded-full !bg-teal-600 !px-4 !py-3 !text-white hover:!bg-teal-700 focus:!ring-teal-500"
        >
          Create account
        </Button>
      </form>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
        <Button
          type="button"
          className="!flex !justify-center !rounded-full !bg-black !px-3 !py-2.5 !text-sm !font-medium !text-white transition hover:!bg-slate-900"
        >
          <AppleIcon fill="#fff" />
        </Button>
        <Button
          type="button"
          className="!flex !justify-center !rounded-full !bg-slate-100 !px-3 !py-2.5 !text-sm !font-medium !text-slate-700 transition hover:!bg-slate-200"
        >
          <GoogleIcon />
        </Button>
        <Button
          type="button"
          className="!flex !justify-center !rounded-full !bg-blue-600 !px-3 !py-2.5 !text-sm !font-medium !text-white transition hover:!bg-blue-700"
        >
          <MetaIcon />
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
