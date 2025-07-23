"use client";

import Featured from "@/components/home/Featured";
import Simple from "@/components/home/Simple";
import Dream from "@/components/home/Dream";
import Stats from "@/components/home/Stats";
import { useAuthStore } from "@/stores/authStore";
import Dashboard from "./(protected)/dashboard/page";
import Hero from "@/components/home/Hero";

export default function Home() {
  const { user } = useAuthStore();

  const isUnauthenticated = !user;
  const isNormalUser = user?.role === "user";

  // If user is admin or other role, show Dashboard
  if (!isUnauthenticated && !isNormalUser) {
    return <Dashboard />;
  }

  // Show public or user home view
  return (
    <>
      <Hero />
      <Dream />
      <Stats />
      <Featured />
      <Simple />
    </>
  );
}
