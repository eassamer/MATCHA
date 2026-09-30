"use client";
import Image from "next/image";
import { FormField, FormFieldInput } from "../FormField";
import { TermsAndPolicy } from "../TermsAndPolicy";
import { SignInOptions } from "./SigninOptions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { login } from "@/hooks/auth";
import { getErrorMessage } from "@/lib/api";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const SigninFormFields: FormFieldInput[] = [
    {
      label: "Email",
      type: "email",
      required: true,
      onChange: (e) => {
        setEmail(e.target.value);
      },
    },
    {
      label: "Password",
      type: "password",
      required: true,
      onChange: (e) => {
        setPassword(e.target.value);
      },
    },
  ];
  const router = useRouter();

  // The backend sets the jwt cookie; the app shell loads the user from
  // /users/user/me on the next page, so nothing is handed over via localStorage.
  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await login({ email, password });
      toast.success("Logged in successfully");
      router.push("/home");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div
      className="
        flex
        flex-col
        lg:px-0
        lg:justify-center
        lg:items-center
        px-8
        h-screen
        w-screen
        lg:h-full
        lg:w-full
        lg:overflow-none"
    >
      <div className="lg:hidden gap-8 flex items-center justify-center">
        <Image src="/logo.png" width={172} height={70} alt="Logo" />
      </div>
      <div className="flex flex-col justify-around lg:w-full lg:justify-between lg:px-10">
        <h1 className="font-extrabold text-[34px]">Sign In</h1>
        <form
          className="flex flex-col lg:flex-row gap-4 py-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {SigninFormFields.map((field, index) => (
            <FormField key={index} {...field} />
          ))}
          <button type="submit" className="hidden"></button>
        </form>
      </div>
      <div
        className="
                flex
                flex-col
                lg:justify-around
                items-center
                h-full
                sm:w-fit
                gap-5
                lg:h-fit
                lg:px-10
                md:gap-0"
      >
        <Button type={true} className="font-bold" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Signing in..." : "Sign In"}
        </Button>
        <SignInOptions />
      </div>
      <div className="flex flex-col items-center pb-3">
        <TermsAndPolicy />
      </div>
    </div>
  );
};
