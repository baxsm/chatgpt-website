import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Working!",
  });
});

app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
      model: "nousresearch/nous-capybara-7b:free",
      prompt: `${prompt}`,
      max_tokens: 3000,
    });
    console.log(response)
    res.status(200).send({
      bot: response.choices[0].text || response.choices[0].message,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({ error });
  }
});

app.listen(5000, () =>
  console.log("Server is running on port: http://localhost:5000")
);
