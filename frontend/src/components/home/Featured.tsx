import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Properties from "../Properties";

const Featured = () => {
  return (
    <div className="mt-10">
      <div className="flex lg:flex-row flex-col items-center gap-5 lg:justify-between">
        <h2 className="lg:text-4xl text-2xl font-bold ml-20 mb-5">Featured Properties</h2>
        <div className="flex gap-2 items-center">
          <Link className="text-orange-500 text-xl" href={"/listings"}>Explore All</Link>
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
