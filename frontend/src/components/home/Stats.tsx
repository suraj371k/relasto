import { DollarSign, SmilePlus } from "lucide-react";

export default function Stats (){

    
  const nums = [
    {
      id: 1,
      para: "Owned from Properties transactions",
      number: "$15.4M",
      icon: <DollarSign size={40} />,
    },
    {
      id: 2,
      para: "Properties for Buy & sell Successfully",
      number: "25K+",
      icon: <DollarSign size={40} />,
    },
    {
      id: 3,
      para: "Owned from Properties transactions",
      number: "$15.4M",
      icon: <DollarSign size={40} />,
    },
    {
      id: 4,
      para: "Regular clients",
      number: "6000+",
      icon: <SmilePlus size={40} />,
    },
  ];

    return(
        <div className="bg-orange-50 py-5 flex justify-center items-center">
        <div className="w-full max-w-8xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {nums.map((num) => (
            <div
              className="flex flex-col items-center justify-center gap-3 p-4"
              key={num.id}
            >
              <span className="text-orange-500">{num.icon}</span>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                {num.number}
              </p>
              <p className="text-base sm:text-lg lg:text-2xl text-zinc-700 text-center">
                {num.para}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
}