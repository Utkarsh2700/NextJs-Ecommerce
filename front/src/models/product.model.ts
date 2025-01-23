import mongoose, { Model } from "mongoose";

const ProductSchema = new mongoose.Schema({
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
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  properties: {
    type: Object,
  },
});

// export const Product  = mongoose.model.product || mongoose.model("product", ProductSchema);
export const Product: Model<any> =
  mongoose.models.product || mongoose.model("product", ProductSchema);
