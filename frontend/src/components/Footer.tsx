"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t py-10 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3">DreamNest</h2>
          <p className="text-sm text-muted-foreground">
            Your trusted partner in finding dream homes and lucrative investments.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/properties" className="hover:underline">Properties</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-md font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Newsletter / Socials */}
        <div>
          <h3 className="text-md font-semibold mb-2">Stay Updated</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Subscribe to our newsletter.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full"
            />
            <Button size="sm" className="w-full sm:w-auto">Subscribe</Button>
          </form>
          <div className="flex gap-4 text-gray-600 justify-start sm:justify-start md:justify-start lg:justify-start">
            <Link href="#"><Facebook className="w-5 h-5 hover:text-primary" /></Link>
            <Link href="#"><Instagram className="w-5 h-5 hover:text-primary" /></Link>
            <Link href="#"><Twitter className="w-5 h-5 hover:text-primary" /></Link>
            <Link href="#"><Linkedin className="w-5 h-5 hover:text-primary" /></Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-muted-foreground mt-10 px-2">
        © {new Date().getFullYear()} DreamNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
