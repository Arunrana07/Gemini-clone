import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
console.log(apiKey);

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const output = result.response.text();

    console.log("✅ AI Output:", output);
    res.json({ output });
  } catch (error) {
    console.error("❌ Error generating content:", error);
    res.status(500).json({ error: "Error generating response" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
