"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Simple = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const textVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, type: "spring" },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <div className="bg-orange-50 py-10">
      <div
        ref={ref}
        className="flex lg:flex-row flex-col min-h-screen gap-10 w-full justify-center items-center px-4"
      >
        {/* Left Text Block */}
        <motion.div
          variants={textVariant as any}
          initial="hidden"
          animate={controls}
          className="lg:w-[600px] w-full max-w-[90vw] p-5 flex flex-col gap-5"
        >
          <h2 className="lg:text-4xl text-2xl leading-10 lg:leading-[3.5rem] font-bold">
            Simple & easy way to find your dream Appointment
          </h2>
          <p className="text-lg text-zinc-700">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. In a free hour, when our power of choice is untrammelled
            and when nothing prevents our being able to do what we like best,
            every pleasure is to be welcomed.
          </p>
          <Button className="w-40 h-12">Get Started</Button>
        </motion.div>

        {/* Right Image Grid - Responsive */}
        <motion.div
          className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full max-w-[700px]"
          variants={{ visible: {}, hidden: {} }}
          initial="hidden"
          animate={controls}
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            {[
              { src: "img2", h: "72" },
              { src: "img4", h: "40" },
            ].map((img, i) => (
              <motion.img
                key={img.src}
                src={`/images/${img.src}.png`}
                alt=""
                className={`w-full h-${img.h} object-cover rounded-md`}
                custom={i}
                variants={imageVariant}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            {[
              { src: "img3", h: "40" },
              { src: "img5", h: "72" },
            ].map((img, i) => (
              <motion.img
                key={img.src}
                src={`/images/${img.src}.png`}
                alt=""
                className={`w-full h-${img.h} object-cover rounded-md`}
                custom={i + 2}
                variants={imageVariant}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex mt-10 lg:flex-row flex-col justify-center gap-20 items-center">
        <div>
          <Image
            src={"/images/img6.png"}
            width={500}
            height={600}
            className="lg:w-[500px] lg:h-[600px] w-full"
            alt="house"
          />
        </div>
        <div className="lg:w-[30vw] p-4 w-full flex flex-col gap-5">
          <h2 className="lg:text-4xl text-2xl  font-bold">Best rated host on popular rental sites</h2>
          <p className="text-xl  text-zinc-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            cupiditate placeat minima quaerat quam!
          </p>
          <div className="flex gap-3">
            <Input className="w-6 " type="checkbox" />
            <Label className="text-lg font-semibold">
              Find excellent deals
            </Label>
          </div>

          <div className="flex gap-3">
            <Input className="w-6 " type="checkbox" />
            <Label className="text-lg font-semibold">
              Friendly host & Fast support
            </Label>
          </div>

          <div className="flex gap-3">
            <Input className="w-6 " type="checkbox" />
            <Label className="text-lg font-semibold">
              Secure payment system
            </Label>
          </div>
            <Button className="w-40 h-12 cursor-pointer">Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default Simple;
