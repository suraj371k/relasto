import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Properties from "../Properties";

const Featured = () => {
  return (
    <div className="mt-10">
      <div className="flex justify-between container mx-auto">
        <h2 className="text-4xl font-bold">Featured Properties</h2>
        <div className="flex gap-2 items-center">
          <Link className="text-orange-500 text-xl" href={"/"}>Explore All</Link>
          <ArrowRight className="text-orange-500" />
        </div>
      </div>
      <div>
        <Properties />
      </div>
    </div>
  );
};

export default Featured;
