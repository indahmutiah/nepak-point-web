import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { data, Form, Link, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import type { Route } from "./+types/login";
import { getSession, commitSession } from "../sessions.server";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login - Nepak Point" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    return redirect("/dashboard");
  }

  console.log("token:", session.get("token"));

  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const loginUserData = {
    email,
    password,
  };

  // Auth Login
  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginUserData),
  });
  if (!response.ok) {
    session.flash("error", "Invalid username/password");
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  const loginResult: { token: string } = await response.json();

  session.set("token", loginResult.token);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login({ loaderData }: Route.ComponentProps) {
  const { error } = loaderData;
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
    } else {
      setErrorMessage("");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {error ? <div className="error">{error}</div> : null}
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <Form
        method="post"
        action="/login"
        className="bg-card p-6 rounded shadow-md w-full max-w-sm"
      >
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
        </div>
        <Button
          type="submit"
          className="w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-700 transition duration-200"
          disabled={errorMessage !== ""}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
