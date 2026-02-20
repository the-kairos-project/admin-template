import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900">Application Forms</h1>
      <p className="mt-4 text-gray-600">
        Welcome. Select a form from the navigation or visit a direct link.
      </p>
    </div>
  ),
});
