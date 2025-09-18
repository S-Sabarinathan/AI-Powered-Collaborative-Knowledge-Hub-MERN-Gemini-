import axios from "axios";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta";
const MODEL = "gemini-1.5-flash-latest"; // ✅ correct model name
// or "gemini-1.5-pro-latest"

export async function generateSummary(content) {
  const res = await axios.post(
    `${GEMINI_API_URL}/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: `Summarize this:\n\n${content}` }] }],
    }
  );
  return res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary";
}

export async function generateTags(content) {
  const res = await axios.post(
    `${GEMINI_API_URL}/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            { text: `Generate 3-5 comma separated tags for:\n\n${content}` },
          ],
        },
      ],
    }
  );
  return (
    res.data.candidates?.[0]?.content?.parts?.[0]?.text
      ?.split(",")
      .map((t) => t.trim()) || []
  );
}

export async function generateEmbedding(content) {
  return []; // fallback until billing is enabled
}

export async function answerQuestion(question, docs) {
  const context = docs
    .map((d) => `Title: ${d.title}\nContent: ${d.content}`)
    .join("\n\n");

  const prompt = `Answer the question using these documents:\n\n${context}\n\nQuestion: ${question}`;

  const res = await axios.post(
    `${GEMINI_API_URL}/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    { contents: [{ parts: [{ text: prompt }] }] }
  );
  return res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No answer";
}
