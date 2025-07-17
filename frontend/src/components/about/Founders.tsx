import React from "react";

const Founders = () => {
  const items = [
    {
      id: 1,
      num: 1,
      title: "It all started in 1995",
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. In a free hour, on the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.`,
    },
    {
      id: 2,
      num: 2,
      title: "Donate launches in 2007",
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. In a free hour, on the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.`,
    },
    {
      id: 3,
      num: 3,
      title: "Relasto holds its initial public offering in 2008",
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. In a free hour, on the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.`,
    },
  ];

  return (
    <section className="container py-10 px-4 mx-auto">
      {/* Header */}
      <header className="flex flex-col gap-4 items-start md:ml-16 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">
          A note from our founders.
        </h2>
        <p className="text-base md:text-lg text-zinc-600 max-w-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. In a free hour,
        </p>
      </header>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-center lg:items-start">
        {/* Timeline */}
        <div className="flex flex-col mt-5 gap-6 w-full lg:w-1/2">
          {items.map((item) => (
            <div key={item.id} className="flex  flex-col">
              <div className="flex items-start gap-4">
                <span className="border-2 border-black px-3 py-1 rounded-full font-bold text-lg">
                  {item.num}
                </span>
                <h3 className="text-xl ml-5 md:text-2xl font-semibold">
                  {item.title}
                </h3>
              </div>
              <p className="lg:max-w-lg md:max-w-md max-w-sm ml-9 md:text-base text-zinc-600 mt-2 leading-relaxed pl-10">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center  px-4">
          <img
            src="/images/about5.png"
            alt="Founders"
            className="w-full max-w-lg rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Founders;
