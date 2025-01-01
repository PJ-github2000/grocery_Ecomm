"use client"

import React from "react";
import { motion } from "motion/react";

export const DrawCircleText = () => {
  return (
    <div className="text-yellow-50">
      <h1 className=" text-center text-rose-300 text-3xl sm:text-5xl leading-snug">
      <span className="hidden md:inline-block">
      Streamline Grocery{" - "}
        </span> LogIn to {" "}
        <span className="relative inline-block text-rose-500 font-bold">
        Desu Provisions
          {/* <svg
            viewBox="0 0 286 73"
            fill="none"
            className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{
                duration: 1.25,
                ease: "easeInOut",
              }}
              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
              stroke="#ff5350"
              strokeWidth="3"
            />
          </svg> */}
        </span>{" "}
        <span className="hidden md:inline-block">
          Now!
        </span>
      </h1>
    </div>
  );
};