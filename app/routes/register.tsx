import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Form, Link, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register - Nepak Point" }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const registerUserData = {
    name: String(name),
    email: String(email),
    password: String(password),
  };

  // Auth registrer
  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerUserData),
  });
  if (!response.ok) {
    return null;
  }
  const registerResult = await response.json();

  return redirect("/login");
}

export default function Register() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 8) {
      setError("Password must be at least 8 characters.");
    } else {
      setError("");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Register Account</h1>
      <Form
        method="post"
        action="/register"
        className="bg-card p-6 rounded shadow-md w-full max-w-sm"
      >
        <div className="mb-4">
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-500"
          >
            Name
          </Label>
          <Input
            name="name"
            type="text"
            id="name"
            placeholder="Enter your name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-500"
          >
            Email
          </Label>
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-500"
          >
            Password
          </Label>
          <Input
            name="password"
            type="password"
            id="password"
            placeholder="Enter your email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
        <Button
          type="submit"
          className="w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-700 transition duration-200"
          disabled={!!error}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}
