import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "@template/convex";

export const Route = createFileRoute("/apply")({
  component: ApplicationForm,
});

// CUSTOMIZE: Replace with your actual form fields and mutation
function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const createContact = useMutation(api.admin.createDocument);

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Thank you!</h1>
        <p className="mt-4 text-gray-600">
          Your application has been received.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Apply</h1>
      <form
        className="mt-8 space-y-6"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          await createContact({
            tableName: "contacts",
            fields: {
              firstName: form.get("firstName") as string,
              lastName: form.get("lastName") as string,
              email: form.get("email") as string,
              organization: form.get("organization") as string,
            },
          });
          setSubmitted(true);
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              name="firstName"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              name="lastName"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          <input
            name="organization"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
