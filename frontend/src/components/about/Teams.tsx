"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Teams = () => {
  const teams = [
    { id: 1, name: "Kausal Pial", role: "CEO", image: "/images/team1.png" },
    { id: 2, name: "Floyd Miles", role: "President of Sales", image: "/images/team2.png" },
    { id: 3, name: "Darlene Robertson", role: "Marketing Coordinator", image: "/images/team3.png" },
    { id: 4, name: "Kausal Pial", role: "CEO", image: "/images/team4.png" },
    { id: 5, name: "Kausal Pial", role: "CEO", image: "/images/team5.png" },
    { id: 6, name: "Kausal Pial", role: "CEO", image: "/images/team6.png" },
    { id: 7, name: "Kausal Pial", role: "CEO", image: "/images/team7.png" },
    { id: 8, name: "Kausal Pial", role: "CEO", image: "/images/team8.png" },
    { id: 9, name: "Kausal Pial", role: "CEO", image: "/images/team9.png" },
    { id: 10, name: "Kausal Pial", role: "CEO", image: "/images/team10.png" },
    { id: 11, name: "Kausal Pial", role: "CEO", image: "/images/team11.png" },
    { id: 12, name: "Kausal Pial", role: "CEO", image: "/images/team12.png" },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="mt-10 py-10 container mx-auto">
      <div>
        <h2 className="text-4xl font-bold text-center">Relasto Team members</h2>
      </div>

      <motion.div
        ref={ref}
        className="grid lg:grid-cols-4 mt-10 md:grid-cols-2 gap-10 grid-cols-1"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
          hidden: {},
        }}
      >
        {teams.map((team) => (
          <motion.div
            key={team.id}
            className="flex flex-col gap-2 justify-center items-center"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img className="lg:w-[300px] rounded-xl" src={team.image} alt={team.name} />
            <p className="text-xl font-semibold">{team.name}</p>
            <p className="text-xl text-zinc-500">{team.role}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Teams;
