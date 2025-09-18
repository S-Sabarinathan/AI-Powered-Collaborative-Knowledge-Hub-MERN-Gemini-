import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    summary: String,
    tags: [String],
  },
  { timestamps: true }
);

documentSchema.index({ title: "text", content: "text" });

export default mongoose.model("GeminiDocument", documentSchema);
