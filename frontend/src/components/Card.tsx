// components/PropertyCard.tsx
"use client";
import { AreaChartIcon, Bath, Bed, LocationEdit, Type } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface Property {
  _id: string;
  images: string[];
  location: string;
  bedroom: number;
  bathroom: number;
  area: number;
  propertyType: string;
  price: number;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="w-full lg:w-[20vw] flex flex-col rounded-xl border border-orange-300">
      <img
        className="h-64 w-full rounded-t-xl object-cover"
        src={property.images?.[0]}
        alt="Property"
      />

      <div className="p-5 flex flex-col gap-7">
        <div className="flex gap-4 items-center">
          <LocationEdit />
          <p className="text-xl font-semibold">{property.location}</p>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <Bed />
            <p className="text-lg text-zinc-700">{property.bedroom} Bed Room</p>
          </div>
          <div className="flex gap-3 items-center">
            <Bath />
            <p className="text-lg text-zinc-700">{property.bathroom} Bath</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <AreaChartIcon />
            <p className="text-lg text-zinc-700">{property.area} sqft</p>
          </div>
          <div className="flex gap-3 items-center">
            <Type />
            <p className="text-lg text-zinc-700">{property.propertyType}</p>
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
  );
};

export default PropertyCard;
