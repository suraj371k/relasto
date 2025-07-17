"use client";

import React from "react";

const Vision = () => {
  return (
    <div className="mt-5 flex p-5 lg:flex-row flex-col justify-center items-center container mx-auto gap-20">
      <div>
        <img src="/images/about6.png" className="w-lg" alt="" />
      </div>
      <div className="relative flex flex-col gap-5">
        <h2 className="text-4xl font-bold">Our vision is simple.</h2>
        <p className="text-lg text-zinc-600 leading-8 md:max-w-md max-w-sm lg:max-w-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. In a free hour, On the other hand, we denounce with
          righteous indignation and dislike men who are so beguiled and
          demoralized by the charms of pleasure of the moment. In a free hour,
          On the other hand, we denounce with righteous indignation and dislike
          men .
        </p>
        <div className="flex flex-end flex-col">
          <p className="text-xl font-semibold">Kausar Pial</p>
          <p className="text-zinc-700 font-bold">CEO at Static Mania</p>
        </div>
      </div>
    </div>
  );
};

export default Vision;
