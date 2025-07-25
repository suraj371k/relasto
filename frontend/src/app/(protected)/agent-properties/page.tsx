"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/stores/authStore";
import { usePropertiesStore } from "@/stores/propertiesStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";

const AgentProperties = () => {
  const { loading, error, getAgentProperties, agentProperties, updateStatus } =
    usePropertiesStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?._id) {
      getAgentProperties(user._id);
    }
  }, [getAgentProperties, user?._id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Properties</h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          Failed to load properties: {error}
        </div>
      ) : agentProperties.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded-lg">
          You don't have any properties listed yet.
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[120px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentProperties.map((property) => (
                <TableRow key={property._id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src;
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {property.title}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {property.location}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${property.price.toLocaleString()}
                  </TableCell>
                 
                  <TableCell className="text-right">
                    <Select
                      defaultValue={property.status}
                      onValueChange={(
                        newStatus: "active" | "pending" | "sold"
                      ) => {
                        updateStatus(property._id, newStatus);
                      }}
                    >
                      <SelectTrigger className="w-[120px] ml-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="active"
                          className="flex items-center"
                        >
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          Active
                        </SelectItem>
                        <SelectItem value="pending">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                          Pending
                        </SelectItem>
                        <SelectItem value="sold">
                          <span className="w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
                          Sold
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <button
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                      aria-label="Delete property"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AgentProperties;
