"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Save } from "lucide-react";
import { FormField } from "@/components/auth/FormField";
import { useAppSelector } from "@/lib/hooks";

// Define the form schema with Zod
const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .optional(),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const Settings = () => {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (user) {
      setFormState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: "",
        confirmPassword: "",
      });
      setLoading(true);
    }
  }, [user, loading]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate the form data
      const validatedData = formSchema.parse(formState);
      console.log("Form submitted:", validatedData);
      setErrors({});

      // Here you would typically send the data to your API
      // await saveUserSettings(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  };
  if (!loading) {
    return <div>Loading...</div>;
  }
  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // Handle account deletion logic here
      console.log("Account deletion requested");
    }
  };
  return (
    <div className="size-full lg:pt-14 pt-0 bg-[#F3F4F8] lg:px-10 px-0 flex flex-col items-start justify-start gap-6">
      <h1 className="hidden lg:block font-poppins text-[34px] font-bold">
        Settings
      </h1>
      <div className="w-full flex-grow lg:flex-grow h-[80%] max-h-[calc(100vh-60px)] flex items-center justify-center">
        <SettingsSection>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="h-full  relative"
          >
            <div>
              <h2 className="text-2xl font-poppins font-medium mb-6">
                Personal information
              </h2>

              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <FormField
                  id="firstName"
                  label="First name"
                  type="text"
                  required={true}
                  value={formState.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error" : ""}
                />

                <FormField
                  id="lastName"
                  label="Last name"
                  type="text"
                  required={true}
                  value={formState.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error" : ""}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  required={true}
                  autoComplete="new-email"
                  value={formState.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <FormField
                  id="password"
                  label="Password"
                  type="password"
                  required={false}
                  autoComplete="new-password"
                  value={formState.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                />

                <FormField
                  id="confirmPassword"
                  label="New Password"
                  type="password"
                  required={false}
                  value={formState.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "error" : ""}
                />
              </div>

              {/* Error messages */}
              <div className="mt-4">
                {Object.entries(errors).map(([key, value]) => (
                  <p key={key} className="text-red-500 text-sm">
                    {value}
                  </p>
                ))}
              </div>
            </div>

            {/* <div>
              <h2 className="text-2xl font-medium mb-6">Accessibility</h2>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Delete Account
              </button>
            </div> */}

            <div className="flex justify-end absolute bottom-0 right-0">
              <Button
                type="submit"
                className="bg-primary text-white font-poppins rounded-xl px-6 py-2 flex items-center gap-2"
              >
                <Save size={16} />
                Save Changes
              </Button>
            </div>
          </form>
        </SettingsSection>
      </div>
    </div>
  );
};

export default Settings;
