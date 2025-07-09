import { Response , Request} from "express";
import { PropertySchema } from "../schemas/property.schema";
import { AuthenticatedRequest } from "../middlewares/protected";
import Property from "../models/property.model"; // Adjust based on your file structure

export const createProperty = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Extract uploaded file URLs
    const files = req.files as Express.Multer.File[];
    const imageUrls = files.map(file => (file as any).path); // cloudinary adds path

    // Build full request body with coerced types
    const body = {
      ...req.body,
      price: Number(req.body.price),
      yearBuilt: Number(req.body.yearBuilt),
      area: Number(req.body.area),
      bedroom: Number(req.body.bedroom),
      bathroom: Number(req.body.bathroom),
      parking: req.body.parking === "true",
      outdoor: req.body.outdoor === "true",
      ac: req.body.ac === "true",
      images: imageUrls,
    };

    const result = PropertySchema.safeParse(body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.errors,
      });
    }

    // Auth check
    if (!req.user || req.user.role !== "agent") {
      return res.status(403).json({ message: "Only agents can create properties" });
    }

    const newProperty = await Property.create({
      ...result.data,
      agentName: req.user.userId, // Use agentId from auth
    });

    return res.status(201).json({
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error("Create Property Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /properties?search=&minPrice=&maxPrice=&propertyType=&furnishing=&bedroom=&bathroom=&page=&limit=
export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      propertyType,
      furnishing,
      bedroom,
      bathroom,
      page = 1,
      limit = 10,
      location,
    } = req.query;

    // Build filter object
    const filter: any = {};

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
      Property.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Property.countDocuments(filter),
    ]);

    return res.status(200).json({
      properties,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.error("Get All Properties Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if property exists
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await Property.findByIdAndDelete(id);

    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Delete Property Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate input using zod schema
    const parseResult = PropertySchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ errors: parseResult.error.errors });
    }

    // Check if property exists
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Update property
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { $set: parseResult.data },
      { new: true }
    );

    return res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Update Property Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAgentProperties = async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;

    // Find properties where agentName matches the given agentId
    const properties = await Property.find({ agentName: agentId });

    return res.status(200).json({
      message: "Properties fetched successfully",
      properties,
    });
  } catch (error) {
    console.error("Get Agent Properties Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({
      message: "Property fetched successfully",
      property,
    });
  } catch (error) {
    console.error("Get Property By ID Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSuggestedProperties = async (req: Request, res: Response) => {
  try {
    // Use MongoDB aggregation to get 4 random properties
    const suggestedProperties = await Property.aggregate([
      { $sample: { size: 4 } }
    ]);

    return res.status(200).json({
      message: "Suggested properties fetched successfully",
      properties: suggestedProperties,
    });
  } catch (error) {
    console.error("Get Suggested Properties Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
