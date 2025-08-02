"use client";
import { useEffect, useState } from "react";
import { usePropertiesStore } from "@/stores/propertiesStore";
import { AreaChartIcon, Bath, Bed, LocationEdit, Type } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SuggestedProperties = () => {
  const { properties, getAllProperties, loading } = usePropertiesStore();
  const [suggested, setSuggested] = useState<typeof properties>([]);

 useEffect(() => {
  const fetchAndSet = async () => {
    if (properties.length === 0) {
      await getAllProperties();
    }

    // Wait until properties are updated
    const allProps = [...usePropertiesStore.getState().properties];

    const activeProps = allProps.filter((p) => p.status === "active");
    const shuffledActive = shuffleArray(activeProps);
    let selected = shuffledActive.slice(0, 4);

    if (selected.length < 4) {
      const inactiveProps = allProps.filter(
        (p) => p.status !== "active" && !selected.includes(p)
      );
      const shuffledInactive = shuffleArray(inactiveProps);
      selected = [...selected, ...shuffledInactive.slice(0, 4 - selected.length)];
    }

    setSuggested(selected);
  };

  fetchAndSet();
}, []);

  const PropertyCardSkeleton = () => {
    return (
      <div className="lg:w-[20vw] w-full flex flex-col rounded-xl border border-orange-300">
        <Skeleton className="h-48 w-full rounded-t-xl" />
        <div className="p-5 flex flex-col gap-7">
          <Skeleton className="h-5 w-2/3" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-[100px] rounded-md" />
            <Skeleton className="h-6 w-[80px]" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=" py-10 ">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="gap-10 grid sm:grid-cols-2 lg:grid-cols-4 place-items-center">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))
          : suggested.map((property) => (
              <div key={property._id}>
                <img
                  className="lg:w-[20vw] h-64 w-full rounded-t-xl object-cover"
                  src={property.images[0]}
                  alt={property.title}
                />
                <div className="p-5  lg:w-[20vw] rounded-b-xl w-full flex flex-col gap-7 border border-orange-300">
                  <div className="flex gap-4 items-center">
                    <LocationEdit />
                    <p className="text-xl font-semibold">{property.location}</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-3 items-center">
                      <Bed />
                      <p className="text-lg text-zinc-700">
                        {property.bedroom} Bed Room
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Bath />
                      <p className="text-lg text-zinc-700">
                        {property.bathroom} Bath
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-3 items-center">
                      <AreaChartIcon />
                      <p className="text-lg text-zinc-700">
                        {property.area} sqft
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Type />
                      <p className="text-lg text-zinc-700">
                        {property.propertyType}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button>
                      <Link href={`/listings/${property._id}`}>
                        View Details
                      </Link>
                    </Button>
                    <p className="text-2xl font-bold">${property.price}</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SuggestedProperties;
