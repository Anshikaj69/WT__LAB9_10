// src/Services/AiModel.js
import { GoogleGenAI } from "@google/genai";
import { GEMENI_API_KEY } from "../config/config";

const ai = new GoogleGenAI({
  apiKey: GEMENI_API_KEY,
});

/* ---------- INTERNAL HELPERS ---------- */

function cleanJSON(text) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

async function generate(prompt) {
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  try {
    return JSON.parse(cleanJSON(res.text));
  } catch {
    return {};
  }
}

/* ---------- EXPERIENCE / SUMMARY ---------- */

export async function generateExperienceBullets(title) {
  return generate(`
Return ONLY valid JSON:
{
  "experience": ["<li>Bullet</li>"]
}

Job Title: ${title}
Generate 5–7 bullets.
`);
}

/* ---------- PROJECTS ---------- */

// Project-specific AI generator
export async function generateProjectSummary(projectName, techStack) {
 return generate(`
Return ONLY valid JSON:
{
  "projectSummary": ["<li>Bullet</li>"]
}
Project Name: ${projectName}
Tech Stack: ${techStack}
Generate 3–5 concise project bullets.
`);
}

