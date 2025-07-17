import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import * as motion from "motion/react-client";

const Header = () => {
  return (
    <header className="flex bg-orange-50 lg:flex-row flex-col gap-10 justify-center items-center min-h-screen w-full">
      <motion.section
        initial={{ opacity: 0, x: -200 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="max-w-2xl flex flex-col gap-7 p-4"
      >
        <h1 className="lg:text-5xl text-3xl font-bold leading-12 text-center lg:leading-16">
          Find the Perfect Property You'll Love to Call Home
        </h1>
        <p className="text-lg text-center text-zinc-700">
          We help individuals and businesses discover, customize, and invest in
          properties that match their goals.
        </p>
        <Button className="hover:scale-105 transition duration-300 cursor-pointer">
          Explore Properties
        </Button>
      </motion.section>

      <motion.figure
        initial={{ opacity: 0, x: 200 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Image
          src="/images/img1.png"
          width={600}
          height={600}
          alt="Modern villa with spacious lawn and stylish architecture"
          priority
        />
        <figcaption className="sr-only">
          Image of a modern villa with a spacious lawn
        </figcaption>
      </motion.figure>
    </header>
  );
};

export default Header;
