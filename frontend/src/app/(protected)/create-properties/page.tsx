"use client";
import React, { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { usePropertiesStore } from "@/stores/propertiesStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type FormValues = {
  title: string;
  description: string;
  price: number;
  parking: boolean;
  outdoor: boolean;
  ac: boolean;
  yearBuilt: number;
  location: string;
  area: number;
  bedroom: number;
  bathroom: number;
  images: string[];
  propertyType: "house" | "apartment" | "villa" | "studio" | "commercial";
  furnishing: "furnished" | "semi-furnished" | "unfurnished";
};

const propertyTypes = [
  "house",
  "apartment",
  "villa",
  "studio",
  "commercial",
] as const;
const furnishingTypes = ["furnished", "semi-furnished", "unfurnished"] as const;
const features = ["parking", "outdoor", "ac"] as const;

const CreatePropertyForm = () => {
  const { createProperties, uploadImages, loading, error } =
    usePropertiesStore();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      parking: false,
      outdoor: false,
      ac: false,
      images: [],
      propertyType: "house",
      furnishing: "furnished",
    },
  });

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);

      // Create previews more efficiently
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);

      // Clear input
      e.target.value = "";
    },
    []
  );

  const onSubmit = useCallback(
    async (data: FormValues) => {
      try {
        // Show loading immediately
        const toastId = toast.loading("Creating property...");

        // Process images only if there are new ones
        if (selectedFiles.length > 0) {
          toast.loading("Uploading images...", { id: toastId });
          const uploadedUrls = await uploadImages(selectedFiles);
          data.images = uploadedUrls;
        }

        toast.loading("Creating property listing...", { id: toastId });
        await createProperties(data as any);

        // Clear form on success
        reset({
          parking: false,
          outdoor: false,
          ac: false,
          images: [],
          propertyType: "house",
          furnishing: "furnished",
        });

        setSelectedFiles([]);
        setPreviewUrls([]);
        toast.success("Property created successfully", { id: toastId });
      } catch (err) {
        console.error("❌ Failed to create property:", err);
        toast.error("Failed to create property");
      }
    },
    [selectedFiles, uploadImages, createProperties]
  );

  // Memoize preview images to prevent unnecessary re-renders
  const previewImages = useMemo(
    () =>
      previewUrls.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt="preview"
          className="w-20 h-20 object-cover rounded"
          onLoad={() => URL.revokeObjectURL(img)} // Clean up memory
        />
      )),
    [previewUrls]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 space-y-6"
    >
      <h2 className="text-2xl font-semibold">Create Property</h2>

      {/* Title */}
      <div>
        <Label>Title</Label>
        <Input
          {...register("title", { required: true })}
          placeholder="Luxury Villa in LA"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">Title is required</p>
        )}
      </div>

      {/* Description */}
      <div>
        <Label>Description</Label>
        <Textarea
          {...register("description", { required: true })}
          placeholder="Describe the property..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm">Description is required</p>
        )}
      </div>

      {/* Price */}
      <div>
        <Label>Price ($)</Label>
        <Input
          type="number"
          {...register("price", { required: true, min: 1000 })}
        />
        {errors.price && (
          <p className="text-red-500 text-sm">Valid price is required</p>
        )}
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4">
        {features.map((feature) => (
          <div key={feature} className="flex items-center space-x-2">
            <Checkbox
              id={feature}
              checked={watch(feature)}
              onCheckedChange={(checked) => setValue(feature, Boolean(checked))}
            />
            <Label htmlFor={feature}>
              {feature.charAt(0).toUpperCase() + feature.slice(1)}
            </Label>
          </div>
        ))}
      </div>

      {/* Location and Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Location</Label>
          <Input {...register("location", { required: true })} />
        </div>
        <div>
          <Label>Area (sq ft)</Label>
          <Input type="number" {...register("area", { required: true })} />
        </div>
      </div>

      {/* Bedroom, Bathroom, Year Built */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Bedrooms</Label>
          <Input type="number" {...register("bedroom", { required: true })} />
        </div>
        <div>
          <Label>Bathrooms</Label>
          <Input type="number" {...register("bathroom", { required: true })} />
        </div>
        <div>
          <Label>Year Built</Label>
          <Input type="number" {...register("yearBuilt", { required: true })} />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <Label>Property Type</Label>
        <select
          {...register("propertyType")}
          className="border rounded-md px-3 py-2 w-full"
        >
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Furnishing */}
      <div>
        <Label>Furnishing</Label>
        <select
          {...register("furnishing")}
          className="border rounded-md px-3 py-2 w-full"
        >
          {furnishingTypes.map((f) => (
            <option key={f} value={f}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Image Upload */}
      <div>
        <Label>Upload Images</Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="flex gap-2 mt-2 flex-wrap">{previewImages}</div>
      </div>

      {/* Submit */}
      <div>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
          Create Property
        </Button>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </form>
  );
};

export default React.memo(CreatePropertyForm);
