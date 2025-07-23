"use client";
import { Button } from "@/components/ui/button";
import { usePropertiesStore } from "@/stores/propertiesStore";
import { AreaChartIcon, Bath, Bed, LocationEdit, Type } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

const Properties = () => {
  const { properties, getAllProperties, loading } = usePropertiesStore();

  useEffect(() => {
    getAllProperties();
  }, [getAllProperties]);

  const PropertyCardSkeleton = () => {
    return (
      <div className="lg:w-[25vw] w-full flex flex-col rounded-xl border border-orange-300">
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
    <div className="container py-10 mt-5 mx-auto gap-10 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 place-items-center">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))
        : properties.map((property, index) => (
            <div key={index}>
              <div>
                <img
                  className="lg:w-[25vw] w-full rounded-t-xl"
                  src={property.images[0]}
                />
              </div>
              <div className="p-5 lg:w-[25vw] rounded-b-xl w-full flex flex-col gap-7 border border-orange-300">
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
                <div className="flex justify-between">
                  <Button>
                    <Link href={`/listings/${property._id}`}>View Details</Link>
                  </Button>
                  <p className="text-2xl font-bold">${property.price}</p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Properties;
