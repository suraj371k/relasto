"use client";

import { usePropertiesStore } from "@/stores/propertiesStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Home,
  Bed,
  Bath,
  MapPin,
  DollarSign,
  RotateCcw,
  Filter,
} from "lucide-react";
import { useCallback } from "react";

const FiltersSidebar = () => {
  const { filters, setFilters, getAllProperties } = usePropertiesStore();

  const handleChange = useCallback(
    (key: string, value: any) => {
      setFilters({ [key]: value });
    },
    [setFilters]
  );

  const handleApply = useCallback(() => {
    setFilters({ page: 1 });
    getAllProperties();
  }, [setFilters, getAllProperties]);

  const handleReset = useCallback(() => {
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
  }, [setFilters, getAllProperties]);

  // Count active filters
  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "page" || key === "limit") return false;
    return value !== "" && value !== undefined && value !== null;
  }).length;

  return (
    <Card className="w-full mb-10   h-fit sticky top-4">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {activeFiltersCount}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label
            htmlFor="search"
            className="text-sm font-medium flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search
          </Label>
          <Input
            id="search"
            type="text"
            value={filters.search || ""}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="Title, location, etc."
            className="w-full"
          />
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Price Range
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label
                htmlFor="minPrice"
                className="text-xs text-muted-foreground"
              >
                Min Price
              </Label>
              <Input
                id="minPrice"
                type="number"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  handleChange("minPrice", Number(e.target.value) || undefined)
                }
                placeholder="0"
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="maxPrice"
                className="text-xs text-muted-foreground"
              >
                Max Price
              </Label>
              <Input
                id="maxPrice"
                type="number"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  handleChange("maxPrice", Number(e.target.value) || undefined)
                }
                placeholder="Any"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Property Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Home className="h-4 w-4" />
            Property Type
          </Label>
          <Select
            value={filters.propertyType || "any"}
            onValueChange={(value) => handleChange("propertyType", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any type</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Furnishing */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Furnishing</Label>
          <Select
            value={filters.furnishing || "any"}
            onValueChange={(value) => handleChange("furnishing", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any furnishing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any furnishing</SelectItem>
              <SelectItem value="furnished">Furnished</SelectItem>
              <SelectItem value="unfurnished">Unfurnished</SelectItem>
              <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Bedrooms & Bathrooms */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Rooms</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label
                htmlFor="bedroom"
                className="text-xs text-muted-foreground flex items-center gap-1"
              >
                <Bed className="h-3 w-3" />
                Bedrooms
              </Label>
              <Input
                id="bedroom"
                type="number"
                value={filters.bedroom || ""}
                onChange={(e) =>
                  handleChange("bedroom", Number(e.target.value) || undefined)
                }
                placeholder="Any"
                min={0}
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="bathroom"
                className="text-xs text-muted-foreground flex items-center gap-1"
              >
                <Bath className="h-3 w-3" />
                Bathrooms
              </Label>
              <Input
                id="bathroom"
                type="number"
                value={filters.bathroom || ""}
                onChange={(e) =>
                  handleChange("bathroom", Number(e.target.value) || undefined)
                }
                placeholder="Any"
                min={0}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div className="space-y-2">
          <Label
            htmlFor="location"
            className="text-sm font-medium flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Location
          </Label>
          <Input
            id="location"
            type="text"
            value={filters.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Enter location"
            className="w-full"
          />
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={handleApply} className="w-full" size="lg">
            Apply Filters
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full bg-transparent"
            size="lg"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FiltersSidebar;
