import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    const reply = response.choices?.[0]?.message?.content || "No reply.";
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error communicating with NANI AI.");
  }
});

app.listen(port, () => {
  console.log(`NANI AI backend running at http://localhost:${port}`);
});
