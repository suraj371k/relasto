import React from "react";

const AboutHeader = () => {
  return (
    <section className="w-full lg:mt-20 md:mt-14 mt-8 py-10 flex flex-col justify-center items-center gap-10">
      {/* Header Content */}
      <header className="flex flex-col gap-7 items-center justify-center w-full px-4">
        <h1 className="lg:text-[3.4rem] md:text-4xl text-2xl w-full lg:w-[40vw] md:w-[80vw] text-center lg:leading-[4.5rem] md:leading-14 leading-12 tracking-wide font-bold">
          Reimagining real estate to make it easier to unlock.
        </h1>

        <p className="text-lg lg:w-[35vw] w-full md:w-[80vw] text-center text-zinc-600">
          On the other hand, we denounce with righteous indignation and dislike
          men who are so beguiled and demoralized by the charms of pleasure of
          the moment, so blinded by desire, that they cannot foresee the pain
          and trouble.
        </p>
      </header>

      {/* Image Grid */}
      <div className="flex flex-col items-center">
        <div className="flex lg:flex-row p-10 flex-col justify-center gap-8">
          <img
            src="/images/about1.png"
            alt="Modern real estate exterior"
            className="mb-4 lg:w-[38vw] w-full h-[400px] object-cover rounded"
          />
          <img
            src="/images/about2.png"
            alt="Living room with open layout"
            className="mb-4 lg:w-[20vw] w-full h-[400px] object-cover rounded"
          />
        </div>

        <div className="flex lg:flex-row flex-col justify-center gap-8">
          <img
            src="/images/about3.png"
            alt="Contemporary kitchen design"
            className="mb-4 lg:w-[20vw] w-full h-[400px] object-cover rounded"
          />
          <img
            src="/images/about4.png"
            alt="Cozy bedroom interior"
            className="mb-4 lg:w-[38vw] w-full h-[400px] object-cover rounded"
          />
        </div>
      </div>

 
    </section>
  );
};

export default AboutHeader;
