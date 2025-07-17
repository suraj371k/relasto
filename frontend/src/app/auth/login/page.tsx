"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { LoginInput, LoginSchema } from "@/validations/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";

import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const { login, loading, error } = useAuthStore();
  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      toast.error("Error in login");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        backgroundImage: "url('/images/img1.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="max-w-full h-screen flex items-center justify-center"
    >
      <Card className="lg:w-xl md:w-lg w-sm p-5 bg-white/60 backdrop-blur-sm shadow-lg py-10">
        <CardHeader className="text-3xl font-semibold text-center">
          Welcom back!
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-md">Email:</Label>
            <Input placeholder="Enter Your Email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-md">Password:</Label>
            <Input
              type="password"
              placeholder="Enter Your Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Button className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
        <div className="flex gap-2 justify-center">
          <p>Don't have an account?</p>
          <Link className="text-blue-500" href={"/auth/signup"}>
            signup
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
