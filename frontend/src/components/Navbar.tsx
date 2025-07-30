"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Menu, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

const Navbar = () => {
  const pathname = usePathname();
  const items = [
    { id: 1, name: "Home", href: "/"  },
    { id: 2, name: "Listings", href: "/listings"  },
    { id: 3, name: "About us", href: "/about" },
    { id: 4, name: "Agent", href: "/agents"  },
  ];



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const { user, fetchProfile , logout , loading } = useAuthStore();


  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const firstLetter = user?.name?.charAt(0).toUpperCase();

  // const filteredItems = items.filter(item => {
  //   // If no role is specified, show to everyone
  //   if (!item.role) return true;
  //   // If user is not logged in, don't show role-specific items
  //   if (!user) return false;
  //   // Show if user's role matches item's role
  //   return user.role === item.role;
  // });

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm"
    >
      <div className="container mx-auto flex justify-between p-4 items-center">
        {/* Logo with animation */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={150}
              height={60}
              alt="logo"
              className="h-auto"
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop nav links */}
        <motion.div
          className="hidden lg:flex items-center gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={itemVariants as any}>
              <Link
                href={item.href}
                className={`relative font-medium text-gray-700 hover:text-blue-600 transition-colors ${
                  pathname === item.href ? "text-blue-600" : ""
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 top-full block h-[2px] w-full bg-blue-600"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop search + login */}
        <motion.div
          className="hidden lg:flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full font-bold  w-10 h-10 p-0 text-lg">
                  {firstLetter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full">
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={() => {
                    logout()
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              className="shadow-md w-32 h-10 text-white"
              asChild
            >
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </motion.div>

        {/* Mobile Menu: Sheet */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-300"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-5 sm:w-[300px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Mobile navigation menu with links to Home, Listings, About us,
                and Agent pages
              </SheetDescription>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="h-full flex flex-col"
              >
                <div className="mb-8 pt-4">
                  <Image
                    src="/images/logo.png"
                    width={140}
                    height={56}
                    alt="logo"
                    className="h-auto"
                  />
                </div>

                <motion.div
                  className="flex flex-col gap-6 flex-1"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {items.map((item) => (
                    <motion.div key={item.id} variants={itemVariants as any}>
                      <Link
                        href={item.href}
                        className={`text-lg font-medium ${
                          pathname === item.href
                            ? "text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-auto pb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
          
                  <Button variant="default" className="w-full">
                    Login
                  </Button>
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
