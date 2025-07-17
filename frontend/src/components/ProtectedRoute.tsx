"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import Dashboard from "@/app/(protected)/dashboard/page";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, fetchProfile, loading } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // If no user in store, try to fetch profile from backend
        if (!user) {
          await fetchProfile();
        }
      } catch (error) {
        // If fetchProfile fails, redirect to login
        router.push("/auth/login");
        return;
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [user, router, fetchProfile]);

  // Show loading while checking authentication
  if (isChecking || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user after checking, show loading (will redirect)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>
  <Dashboard />
  {children}</>;
} 