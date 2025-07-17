"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Home,
  Eye,
  Heart,
  TrendingUp,
  Plus,
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

// Mock data for the agent
const agentData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@realestate.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "January 2022",
  rating: 4.8,
  totalSales: "$2.4M",
  activeListings: 12,
  totalProperties: 45,
  totalViews: 15420,
  totalLikes: 892,
}

// Mock properties data
const properties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    price: "$450,000",
    location: "Downtown, NYC",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200 sq ft",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    views: 234,
    likes: 18,
    datePosted: "2024-01-15",
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    price: "$1,200,000",
    location: "Beverly Hills, CA",
    bedrooms: 4,
    bathrooms: 3,
    area: "3,500 sq ft",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    views: 567,
    likes: 45,
    datePosted: "2024-01-10",
  },
  {
    id: 3,
    title: "Cozy Family Home",
    price: "$320,000",
    location: "Suburbs, TX",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,800 sq ft",
    image: "/placeholder.svg?height=200&width=300",
    status: "sold",
    views: 189,
    likes: 12,
    datePosted: "2024-01-05",
  },
  {
    id: 4,
    title: "Penthouse Suite",
    price: "$2,500,000",
    location: "Manhattan, NYC",
    bedrooms: 3,
    bathrooms: 3,
    area: "2,200 sq ft",
    image: "/placeholder.svg?height=200&width=300",
    status: "pending",
    views: 890,
    likes: 67,
    datePosted: "2024-01-20",
  },
  {
    id: 5,
    title: "Beachfront Condo",
    price: "$750,000",
    location: "Miami Beach, FL",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,400 sq ft",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    views: 445,
    likes: 32,
    datePosted: "2024-01-18",
  },
  {
    id: 6,
    title: "Historic Townhouse",
    price: "$680,000",
    location: "Boston, MA",
    bedrooms: 3,
    bathrooms: 2,
    area: "2,000 sq ft",
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    views: 312,
    likes: 24,
    datePosted: "2024-01-12",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export default function AgentDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || property.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm border-b"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={agentData.avatar || "/placeholder.svg"} alt={agentData.name} />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {agentData.name}</h1>
                <p className="text-gray-600">Manage your property listings</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agentData.totalProperties}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agentData.activeListings}</div>
                <p className="text-xs text-muted-foreground">Currently available</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agentData.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agentData.totalLikes}</div>
                <p className="text-xs text-muted-foreground">+8% from last week</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Agent Profile Card */}
        <motion.div
          className="mb-8"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Agent Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={agentData.avatar || "/placeholder.svg"} alt={agentData.name} />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{agentData.name}</h3>
                    <p className="text-sm text-gray-600">Real Estate Agent</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{agentData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{agentData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Sales</p>
                  <p className="font-medium text-green-600">{agentData.totalSales}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant={filterStatus === "all" ? "default" : "outline"} onClick={() => setFilterStatus("all")}>
              All
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              onClick={() => setFilterStatus("active")}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </Button>
            <Button variant={filterStatus === "sold" ? "default" : "outline"} onClick={() => setFilterStatus("sold")}>
              Sold
            </Button>
          </div>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProperties.map((property, index) => (
            <motion.div key={property.id} variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className={`absolute top-2 left-2 ${getStatusColor(property.status)}`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">{property.price}</p>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.area}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{property.views} views</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{property.likes} likes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredProperties.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
