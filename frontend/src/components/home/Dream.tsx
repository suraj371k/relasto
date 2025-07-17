"use client"
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { DollarSign, Eye, SearchCheck, Shell, SmilePlus } from "lucide-react";
import * as motion from "motion/react-client";
import { useAnimation, useInView } from "motion/react";

const Stats = () => {
  const items = [
    {
      id: 1,
      para: "Search your location",
      icon: <SearchCheck size={40} />,
    },
    {
      id: 2,
      para: "Visit Appointment",
      icon: <Eye size={40} />,
    },
    {
      id: 3,
      para: "Get your dream house",
      icon: <Shell size={40} />,
    },
    {
      id: 4,
      para: "Enjoy your Appointment",
      icon: <SmilePlus size={40} />,
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const leftBoxVariants = {
    hidden: { opacity: 0, x: -100 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="mt-10 flex flex-col gap-10">
      <div
        ref={ref}
        className="w-full min-h-[60vh] flex justify-center items-center"
      >
        <div className="flex lg:flex-row flex-col justify-center items-center gap-10">
          {/* ✅ Animated Left Box */}
          <motion.div
            variants={leftBoxVariants as any}
            initial="hidden"
            animate={controls}
            className="bg-red-100 flex lg:w-[30vw] md:w-[80vw] w-[98vw] rounded-xl flex-col gap-5 p-5 h-88 shadow-md justify-center"
          >
            <h2 className="text-3xl font-semibold">
              Simple & easy way to find your dream Appointment
            </h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
              similique!
            </p>
            <Button className="w-40">Get Started</Button>
          </motion.div>

          {/* ✅ Animated Right Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid gap-10 grid-cols-1 lg:grid-cols-2"
          >
            {items.map((item) => (
              <motion.div
                variants={itemVariants as any}
                key={item.id}
                className="bg-red-50 rounded-xl shadow-md lg:w-[20vw] h-[16.5vh] md:w-[80vw] w-[100vw] flex items-center justify-center flex-col gap-5"
              >
                <span className="text-orange-500">{item.icon}</span>
                <p className="text-2xl font-semibold">{item.para}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
