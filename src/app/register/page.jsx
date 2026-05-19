"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Card, Separator } from "@heroui/react";
import Link from "next/link";

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
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisplayAlert(false);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Debug tracking log to verify form capture
    console.log("Captured User Payload:", user);

    if (user.password !== user.confirmPassword) {
      setAlertText("Passwords do not match");
      setDisplayAlert(true);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image,
      });

      if (data) {
        router.push("/");
      }

      if (error) {
        setAlertText(error.message);
        setDisplayAlert(true);
      }
    } catch (err) {
      setAlertText("An unexpected runtime error occurred.");
      setDisplayAlert(true);
      console.error(err);
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google"
    });
  };

  return (
    <div className="max-w-7xl mx-auto relative">
      {displayAlert && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-rose-950/95 border border-rose-800 text-rose-200 px-5 py-3.5 rounded-2xl shadow-xl">
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
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p>Start your adventure with Adoptpet</p>
      </div>
      <Card className="border rounded-none p-6 max-w-md mx-auto flex flex-col gap-4">
        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input name="name" placeholder="Enter your name" />
            <FieldError />
          </TextField>

          <TextField name="image" type="url">
            <Label>Photo URL</Label>
            <Input name="image" placeholder="Image url" />
            <FieldError />
          </TextField>

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
            <Input name="email" placeholder="aborty@example.com" />
            <FieldError />
          </TextField>
          
          <TextField
            isRequired
            name="password"
            type="password"
            value={passwordValue}
            onChange={setPasswordValue}
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input name="password" placeholder="Enter your password" />
            <Description>
              Must be at least 6 characters with 1 uppercase and 1 lowercase letter
            </Description>
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            validate={(value) => {
              if (value !== passwordValue) {
                return "Passwords do not match";
              }
              return null;
            }}
          >
            <Label>Confirm Password</Label>
            <Input name="confirmPassword" placeholder="Re-enter your password" />
            <FieldError />
          </TextField>

          <div className="flex justify-center gap-2">
            <Button className={"rounded-none w-full bg-green-600 hover:bg-green-500 text-white font-bold"} type="submit">
              Create Account
            </Button>
          </div>
        </Form>

        <p className="text-center text-sm text-gray-500 my-2">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 font-bold hover:underline">
            Login
          </Link>
        </p>

        <div className="flex justify-center items-center gap-3">
          <Separator />
          <div className="whitespace-nowrap text-xs text-gray-400"> Or sign up with </div>
          <Separator />
        </div>
        <div>
          <Button onClick={handleGoogleSignin} variant="outline" className={'w-full rounded-none'}><FcGoogle /> Sign in with Google</Button>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;