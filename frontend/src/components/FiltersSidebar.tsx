"use client";

import { usePropertiesStore } from "@/stores/propertiesStore";
import React, { useState } from "react";

const FiltersSidebar = () => {
  const { filters, setFilters, getAllProperties } = usePropertiesStore();

  const handleChange = (key: string, value: any) => {
    setFilters({ [key]: value });
  };

  const handleApply = () => {
    setFilters({ page: 1 }); // Reset to page 1 on filter change
    getAllProperties();
  };

  const handleReset = () => {
    setFilters({
      search: "",
      minPrice: undefined,
      maxPrice: undefined,
      propertyType: "",
      furnishing: "",
      bedroom: undefined,
      bathroom: undefined,
      location: "",
      page: 1,
      limit: 10,
    });
    getAllProperties();
  };

  return (
    <div className="w-full md:w-72 bg-white border h-[40vw] rounded-xl shadow p-4 space-y-5">
      <h2 className="text-xl font-semibold border-b pb-2">Filters</h2>

      {/* Search */}
      <div>
        <label className="text-sm font-medium">Search</label>
        <input
          type="text"
          value={filters.search || ""}
          onChange={(e) => handleChange("search", e.target.value)}
          placeholder="Title, location, etc."
          className="w-full mt-1 border rounded px-3 py-2"
        />
      </div>

      {/* Price Range */}
      <div className="flex gap-2">
        <div className="w-1/2">
          <label className="text-sm font-medium">Min Price</label>
          <input
            type="number"
            value={filters.minPrice || ""}
            onChange={(e) => handleChange("minPrice", Number(e.target.value))}
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>
        <div className="w-1/2">
          <label className="text-sm font-medium">Max Price</label>
          <input
            type="number"
            value={filters.maxPrice || ""}
            onChange={(e) => handleChange("maxPrice", Number(e.target.value))}
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="text-sm font-medium">Property Type</label>
        <select
          value={filters.propertyType || ""}
          onChange={(e) => handleChange("propertyType", e.target.value)}
          className="w-full mt-1 border rounded px-3 py-2"
        >
          <option value="">Any</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
          <option value="studio">Studio</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      {/* Furnishing */}
      <div>
        <label className="text-sm font-medium">Furnishing</label>
        <select
          value={filters.furnishing || ""}
          onChange={(e) => handleChange("furnishing", e.target.value)}
          className="w-full mt-1 border rounded px-3 py-2"
        >
          <option value="">Any</option>
          <option value="furnished">Furnished</option>
          <option value="unfurnished">Unfurnished</option>
          <option value="semi-furnished">Semi-Furnished</option>
        </select>
      </div>

      {/* Bedroom */}
      <div>
        <label className="text-sm font-medium">Bedrooms</label>
        <input
          type="number"
          value={filters.bedroom || ""}
          onChange={(e) => handleChange("bedroom", Number(e.target.value))}
          className="w-full mt-1 border rounded px-3 py-2"
          min={0}
        />
      </div>

      {/* Bathroom */}
      <div>
        <label className="text-sm font-medium">Bathrooms</label>
        <input
          type="number"
          value={filters.bathroom || ""}
          onChange={(e) => handleChange("bathroom", Number(e.target.value))}
          className="w-full mt-1 border rounded px-3 py-2"
          min={0}
        />
      </div>

      {/* Location */}
      <div>
        <label className="text-sm font-medium">Location</label>
        <input
          type="text"
          value={filters.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
          className="w-full mt-1 border rounded px-3 py-2"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-2 pt-2">
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded w-full"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FiltersSidebar;
