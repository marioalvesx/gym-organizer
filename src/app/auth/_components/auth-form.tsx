"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

export function AuthForm() {
  const form = useForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn("email", { email: data.email, redirect: false });

      toast({
        title: "Magik link sent",
        description: "Check your email for the magik link to login",
      });
    } catch (error) {
      toast({
        title: "Error sending magic link",
        description: "An unexpected error occurred",
      });
    }
  });

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-[400px] p-6 sm:gap-0 sm:grid sm:grid-cols-2 lg:min-h-[600px]">
      <div className="order-2 flex items-center justify-center w-full py-6 sm:order-1 sm:py-12">
        <img
          alt="Image"
          className="object-cover"
          height="450"
          src="/placeholder.svg"
          style={{
            aspectRatio: "800/450",
            objectFit: "cover",
          }}
          width="800"
        />
      </div>
      <div className="order-1 flex items-center justify-center sm:order-2">
        <div className="w-full max-w-md space-y-4 sm:px-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                required
                {...form.register("email")}
              />
            </div>
            <Button className="w-full">Send Magic Link</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
