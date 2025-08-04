"use client";
import { Button } from "@/components/ui/button";
import { usePropertiesStore } from "@/stores/propertiesStore";
import { AreaChartIcon, Bath, Bed, LocationEdit, Type } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { usePathname } from "next/navigation";

const Properties = () => {
  const { properties, getAllProperties, loading } = usePropertiesStore();

  useEffect(() => {
    getAllProperties();
  }, [getAllProperties]);

  const pathname = usePathname();
  const isHome = pathname === "/";

  const gridCols = isHome
    ? "grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3";

  const PropertyCardSkeleton = () => (
    <div className="w-full max-w-sm flex flex-col rounded-xl border border-orange-300">
      <Skeleton className="h-48 w-full rounded-t-xl" />
      <div className="p-5 flex flex-col gap-5">
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

  return (
    <div className="w-full px-4 md:px-8 lg:px-12">
      <div className={`grid ${gridCols} place-items-center gap-8 mt-5 mb-10`}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)
          : properties.map((property, index) => (
              <div
                key={index}
                className="w-full max-w-sm border border-orange-300 rounded-xl overflow-hidden"
              >
                <img
                  className="w-full h-64 object-cover"
                  src={property.images[0]}
                  alt={property.title || "Property"}
                />
                <div className="p-5 flex flex-col gap-5">
                  <div className="flex gap-2 items-center">
                    <LocationEdit />
                    <p className="text-xl font-semibold">{property.location}</p>
                  </div>
                  <div className="flex justify-between text-zinc-700">
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5" />
                      <p>{property.bedroom} Beds</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5" />
                      <p>{property.bathroom} Baths</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-zinc-700">
                    <div className="flex items-center gap-2">
                      <AreaChartIcon className="w-5 h-5" />
                      <p>{property.area} sqft</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Type className="w-5 h-5" />
                      <p>{property.propertyType}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button>
                      <Link href={`/listings/${property._id}`}>View Details</Link>
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

export default Properties;
 