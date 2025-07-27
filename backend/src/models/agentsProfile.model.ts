import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAgent extends Document {
  user: Types.ObjectId; 
  image: string;
  social: string[];
  experience: number;
  reviews: {
    userId: Types.ObjectId;
    comment: string;
    stars: number;
    date?: Date;
  }[];
  rating: number;
}

const agentSchema = new Schema<IAgent>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    social: {
      type: [String],
      default: [],
    },
    experience: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        stars: {
          type: Number,
          min: 1,
          max: 5,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Agent = mongoose.model<IAgent>("Agent", agentSchema);
