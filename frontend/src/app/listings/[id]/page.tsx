"use client";

import type React from "react";

import { usePropertiesStore } from "@/stores/propertiesStore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  Car,
  Trees,
  Wind,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  User,
  MessageSquare,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import SuggestedProperties from "@/components/SuggestedProperty";

export default function PropertyDetails() {
  const params = useParams();
  const id = params.id as string;
  const { error, loading, properties, getPropertyBYId } = usePropertiesStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });



  useEffect(() => {
    getPropertyBYId(id);
  }, [getPropertyBYId, id]);

  const property = properties[0];

  const nextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Contact form submitted:", contactForm);
    // Reset form
    setContactForm({ name: "", email: "", phoneNumber: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg">Loading property details...</div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg text-red-500">
            {error || "Property not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gray-100">
                {property.images && property.images.length > 0 && (
                  <>
                    <Image
                      src={
                        property.images[currentImageIndex] || "/placeholder.svg"
                      }
                      alt={`Property image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                    {property.images.length > 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                          onClick={nextImage}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {property.images.length}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {property.images && property.images.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {property.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          idx === currentImageIndex
                            ? "border-primary"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                    {property.title}
                  </CardTitle>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Property Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Car className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="font-medium">Parking</span>
                    </div>
                    <Badge variant={property.parking ? "default" : "secondary"}>
                      {property.parking ? "Available" : "Not Available"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="font-medium">Year Built</span>
                    </div>
                    <Badge variant="outline">{property.yearBuilt}</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Trees className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="font-medium">Outdoor Space</span>
                    </div>
                    <Badge variant={property.outdoor ? "default" : "secondary"}>
                      {property.outdoor ? "Available" : "Not Available"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Wind className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="font-medium">Air Conditioning</span>
                    </div>
                    <Badge variant={property.ac ? "default" : "secondary"}>
                      {property.ac ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form Sidebar */}
        <div className="lg:col-span-1">
          <Card className=" top-8">
            <CardHeader>
              <CardTitle className="flex text-2xl items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact Agent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={contactForm.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="I'm interested in this property. Please contact me with more details."
                    rows={4}
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Quick Contact</p>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>agent@realestate.com</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-10 p-5">
            <CardHeader>
              <CardTitle className="flex text-2xl items-center">
                Agent Information
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-5">
              <div className="flex">
                <Image
                  src={"/images/team1.png"}
                  alt="agent image"
                  width={120}
                  height={120}
                />
              </div>
              <div>
                {typeof property.agentName === "object" &&
                  property.agentName !== null && (
                    <div className="flex flex-col gap-1">
                      <p className="text-xl font-semibold"> {property.agentName.name}</p>
                      <p className="text-zinc-500">{property.agentName.email}</p>
                      <p className="text-zinc-500">{property.agentName.phoneNumber}</p>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <SuggestedProperties />
      </div>
    </div>
  );
}
