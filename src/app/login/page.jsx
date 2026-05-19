"use client";

import React, { useState, Suspense } from "react";
import { Card, Separator } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation"; // 🛠️ Imported useSearchParams
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

// 🛠️ Wrap form logic in a sub-component to safely utilize Next.js searchParams hooks
const LoginFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  // 🛠️ Grab target callbackUrl from URL string parameters or default back to root path "/"
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisplayAlert(false);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Added tracking log to ensure form data is captured successfully
    console.log("Captured Login Payload:", user);

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      // 🛠️ Updated routing destination to execute using dynamic callbackUrl value
      router.push(callbackUrl);
      router.refresh();
    }

    if (error) {
      setAlertText(error.message || "Invalid email or password credentials");
      setDisplayAlert(true);
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackUrl: callbackUrl, // 🛠️ Pass it to BetterAuth social provider routing configuration parameters
    });
  };

  return (
    <>
      {displayAlert && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-rose-950/95 border border-rose-800 text-rose-200 px-5 py-3.5 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500 text-rose-950 font-bold">
            ✕
          </div>
          <div className="text-xs sm:text-sm font-medium">{alertText}</div>
          <button onClick={() => setDisplayAlert(false)} className="ml-2 text-rose-400 hover:text-white text-xs font-bold">
            ✕
          </button>
        </div>
      )}

      <div className="text-center my-3">
        <h1 className="text-2xl font-bold">Login</h1>
        <p>Start your adventure with Adoptpet</p>
      </div>
      <Card className="border rounded-none p-6">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            {/* 🛠️ Added name="email" directly to the underlying Input element */}
            <Input name="email" placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            {/* 🛠️ Added name="password" directly to the underlying Input element */}
            <Input name="password" placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex justify-center gap-2">
            <Button className={"rounded-none w-full bg-green-600 hover:bg-green-500 text-white font-bold"} type="submit">
              Login
            </Button>
          </div>
        </Form>

        <p className="text-center text-sm text-gray-500 my-4">
          Do not have an account yet?{" "}
          <Link href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-green-600 font-bold hover:underline">
            Register
          </Link>
        </p>

        <div className="flex justify-center items-center gap-3 my-2">
          <Separator />
          <div className="whitespace-nowrap text-xs text-gray-400"> Or sign up with </div>
          <Separator />
        </div>
        <div>
          <Button
            onClick={handleGoogleSignin}
            variant="outline"
            className={"w-full rounded-none mt-2"}
          >
            <FcGoogle /> Sign in with Google
          </Button>
        </div>
      </Card>
    </>
  );
};

// 🛠️ Main Component exporting structure wrapped with Suspense fallback boundaries
const LoginPage = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] relative">
      <Suspense fallback={<div className="text-gray-500 text-sm">Loading Authentication form...</div>}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
};

export default LoginPage;