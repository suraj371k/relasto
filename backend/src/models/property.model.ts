import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProperty extends Document {
  title: string;
  description: string; 
  price: number;
  parking: boolean;
  outdoor: boolean;
  ac: boolean;
  yearBuilt: number;
  agentName: Types.ObjectId;   
  location: string;
  area: number;
  bedroom: number;
  bathroom: number;
  images?: [string];
  propertyType: "house" | "apartment" | "villa" | "studio" | "commercial";
  furnishing: "furnished" | "semi-furnished" | "unfurnished";
  status: "active" | "pending" | "sold"
}

const propertySchema = new Schema<IProperty>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    parking: {
        type: Boolean,
        required: true,
    },
    outdoor: {
        type: Boolean,
        required: true,
    },
    ac: {
        type: Boolean,
        required: true,
    },
    yearBuilt: {
        type: Number,
        required: true,
    },
    agentName: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    bedroom: {
        type: Number,
        required: true,
    },
    bathroom: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
    },
    propertyType: {
        type: String,
        enum: ["house", "apartment", "villa", "studio", "commercial"],
        required: true,
    },
    furnishing: {
        type: String,
        enum: ["furnished", "semi-furnished", "unfurnished"],
        required: true,
    },
    status: {
        type: String,
        enum: ["active" , "pending" , "sold"],
        required: true
    }
})

const Property = mongoose.model<IProperty>("Property" , propertySchema);

export default Property;