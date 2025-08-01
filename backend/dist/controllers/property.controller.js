"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePropertyStatus = exports.getSuggestedProperties = exports.getPropertyById = exports.getAgentProperties = exports.updateProperty = exports.deleteProperty = exports.getAllProperties = exports.uploadPropertyImage = exports.createProperty = void 0;
const property_schema_1 = require("../schemas/property.schema");
const property_model_1 = __importDefault(require("../models/property.model")); // Adjust based on your file structure
const createProperty = async (req, res) => {
    try {
        const { title, description, price, parking, outdoor, ac, yearBuilt, location, area, bedroom, bathroom, images, propertyType, furnishing, status } = req.body;
        if (!title || !description || !price || !yearBuilt ||
            !location || !area || bedroom == null || bathroom == null ||
            !propertyType || !furnishing || !images || !status) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }
        const propertyData = {
            title,
            description,
            price: Number(price),
            parking: parking === "true" || parking === true,
            outdoor: outdoor === "true" || outdoor === true,
            ac: ac === "true" || ac === true,
            yearBuilt: Number(yearBuilt),
            agentName: req.user?.userId, // set from auth middleware
            location,
            area: Number(area),
            bedroom: Number(bedroom),
            bathroom: Number(bathroom),
            images: Array.isArray(images) ? images : [images], // in case it's sent as single string
            propertyType,
            furnishing,
            status
        };
        const newProperty = await property_model_1.default.create(propertyData);
        const populatedProperty = await property_model_1.default.findById(newProperty._id).populate("agentName", "name email phoneNumber");
        return res.status(201).json({
            message: "Property created successfully",
            property: populatedProperty,
        });
    }
    catch (error) {
        console.error("Create Property Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.createProperty = createProperty;
//upload image
const uploadPropertyImage = async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }
        // Each file's .path is the Cloudinary URL (set by multer-storage-cloudinary)
        const imageUrls = files.map((file) => file.path);
        return res.status(200).json({ imageUrls });
    }
    catch (error) {
        console.error("Image Upload Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.uploadPropertyImage = uploadPropertyImage;
// GET /properties?search=&minPrice=&maxPrice=&propertyType=&furnishing=&bedroom=&bathroom=&page=&limit=
const getAllProperties = async (req, res) => {
    try {
        const { search, minPrice, maxPrice, propertyType, furnishing, bedroom, bathroom, page = 1, limit = 10, location, } = req.query;
        // Build filter object
        const filter = {};
        if (search && typeof search === "string") {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
            ];
        }
        if (minPrice) {
            filter.price = { ...filter.price, $gte: Number(minPrice) };
        }
        if (maxPrice) {
            filter.price = { ...filter.price, $lte: Number(maxPrice) };
        }
        if (propertyType && typeof propertyType === "string") {
            filter.propertyType = propertyType;
        }
        if (furnishing && typeof furnishing === "string") {
            filter.furnishing = furnishing;
        }
        if (bedroom) {
            filter.bedroom = Number(bedroom);
        }
        if (bathroom) {
            filter.bathroom = Number(bathroom);
        }
        if (location && typeof location === "string") {
            filter.location = { $regex: location, $options: "i" };
        }
        const skip = (Number(page) - 1) * Number(limit);
        const [properties, total] = await Promise.all([
            property_model_1.default.find(filter)
                .skip(skip)
                .limit(Number(limit))
                .sort({ createdAt: -1 }),
            property_model_1.default.countDocuments(filter),
        ]);
        return res.status(200).json({
            properties,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
        });
    }
    catch (error) {
        console.error("Get All Properties Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllProperties = getAllProperties;
const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if property exists
        const property = await property_model_1.default.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        await property_model_1.default.findByIdAndDelete(id);
        return res.status(200).json({ message: "Property deleted successfully" });
    }
    catch (error) {
        console.error("Delete Property Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteProperty = deleteProperty;
const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        // Validate input using zod schema
        const parseResult = property_schema_1.PropertySchema.partial().safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ errors: parseResult.error.errors });
        }
        // Check if property exists
        const property = await property_model_1.default.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        // Update property
        const updatedProperty = await property_model_1.default.findByIdAndUpdate(id, { $set: parseResult.data }, { new: true });
        return res.status(200).json({
            message: "Property updated successfully",
            property: updatedProperty,
        });
    }
    catch (error) {
        console.error("Update Property Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateProperty = updateProperty;
const getAgentProperties = async (req, res) => {
    try {
        const { agentId } = req.params;
        // Find properties where agentName matches the given agentId
        const properties = await property_model_1.default.find({ agentName: agentId }).lean();
        return res.status(200).json({
            message: "Properties fetched successfully",
            properties,
        });
    }
    catch (error) {
        console.error("Get Agent Properties Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAgentProperties = getAgentProperties;
const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await property_model_1.default.findById(id).populate("agentName", "name email phoneNumber");
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        return res.status(200).json({
            message: "Property fetched successfully",
            property,
        });
    }
    catch (error) {
        console.error("Get Property By ID Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getPropertyById = getPropertyById;
const getSuggestedProperties = async (req, res) => {
    try {
        // Use MongoDB aggregation to get 4 random properties
        const suggestedProperties = await property_model_1.default.aggregate([
            { $sample: { size: 4 } },
        ]);
        return res.status(200).json({
            message: "Suggested properties fetched successfully",
            properties: suggestedProperties,
        });
    }
    catch (error) {
        console.error("Get Suggested Properties Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSuggestedProperties = getSuggestedProperties;
const updatePropertyStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // Validate status
        const validStatuses = ["active", "pending", "sold"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value. Allowed values are: active, pending, sold." });
        }
        const updatedProperty = await property_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        return res.status(200).json({
            message: "Property status updated successfully",
            property: updatedProperty,
        });
    }
    catch (error) {
        console.error("Update Property Status Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updatePropertyStatus = updatePropertyStatus;
