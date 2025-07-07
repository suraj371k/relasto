"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { motion } from "motion/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type RegisterInput } from '@/validations/userSchema';
import { useForm, Controller } from "react-hook-form";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function Signup() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const router = useRouter()

  const { register: userRegister, loading } = useAuthStore()

  const onSubmit = async (data: RegisterInput) => {
    try {
       userRegister(data)
      toast.success("User registered successfully")
      router.push('/auth/login')
    } catch (error) {
      toast.error("Error in signup")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/img1.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card className="w-xl p-5 shadow-lg py-10 bg-white/60 backdrop-blur-sm">
        <CardHeader className="text-3xl font-semibold text-center">
          Signup Form
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-md">Name:</Label>
            <Input placeholder="Enter Your Name" {...register('name')} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-md">Email:</Label>
            <Input placeholder="Enter Your Email" {...register('email')} />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-md">Phone Number:</Label>
            <Input placeholder="Enter Your Number" {...register('phoneNumber')} />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-md">Password:</Label>
            <Input type="password" placeholder="Enter Your Password" {...register('password')} />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-md">Role:</Label>
            <Controller
              name="role"
              control={control}
              defaultValue="user"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Your Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && <p className="text-red-500">{errors.role.message}</p>}
          </div>
          <div>
            <Button className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </div>
        </form>
        <div className="flex gap-2 justify-center">
          <p>Already have an account?</p>
          <Link className="text-blue-500" href={"/auth/login"}>
            login
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
