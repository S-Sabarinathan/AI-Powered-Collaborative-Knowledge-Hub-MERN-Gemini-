import express from "express";
import Document from "../models/GeminiDoc.js";
import { generateSummary, generateTags } from "../middleware/gemini.js";

const router = express.Router();

// Create
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    let summary = "No summary (AI unavailable)";
    let tags = ["untagged"];

    try {
      summary = await generateSummary(content);
      tags = await generateTags(content);
    } catch (aiErr) {
      console.error("⚠️ Gemini API failed:", aiErr.response?.data || aiErr.message);
      // fallback values stay as defined above
    }

    const doc = new Document({ title, content, summary, tags });
    const saved = await doc.save();
    res.json(saved);
  } catch (err) {
    console.error("❌ Backend error in POST /geminidocs:", err);
    res.status(500).json({ message: "Error creating doc", error: err.message });
  }
});


// Read all
router.get("/", async (req, res) => {
  const docs = await Document.find().sort({ createdAt: -1 });
  res.json(docs);
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const summary = await generateSummary(content);
    const tags = await generateTags(content);

    const updated = await Document.findByIdAndUpdate(
      req.params.id,
      { title, content, summary, tags },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Doc not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating doc", error: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Document.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Doc not found" });
    res.json({ message: "Doc deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting doc", error: err.message });
  }
});

// Search documents
router.post("/search", async (req, res) => {
  try {
    const { query } = req.body;
    console.log("📥 Incoming search query:", query);

    const docs = await Document.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    console.log("🔍 Found docs:", docs.length);

    if (!docs.length) {
      const fallback = await Document.find({
        title: new RegExp(query, "i"),
      }).limit(5);
      console.log("⚠️ Using fallback search:", fallback.length);
      return res.json(fallback.map((d) => ({ ...d.toObject(), score: 0.5 })));
    }

    res.json(docs.map((d) => ({ ...d.toObject(), score: d.score })));
  } catch (err) {
    console.error("❌ Search error:", err);
    res.status(500).json({ message: "Error searching docs", error: err.message });
  }
});



export default router;
