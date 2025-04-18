import { Input } from "~/components/ui/input";
import { Form } from "react-router";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <Form className="bg-card p-6 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-500"
          >
            Email
          </label>
          <Input
            name="email"
            type="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-500"
          >
            Password
          </label>
          <Input
            name="password"
            type="password"
            id="password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-700 transition duration-200"
        >
          Login
        </button>
      </Form>
    </div>
  );
}
