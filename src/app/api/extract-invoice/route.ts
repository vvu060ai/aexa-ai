import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import sharp from "sharp";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const PROMPT = `Extract all information from this invoice and return it as a valid JSON object only — no markdown, no explanation, no code fences.

Use this exact structure:
{
  "vendor": {
    "name": "",
    "address": "",
    "email": "",
    "phone": "",
    "gstin": ""
  },
  "billed_to": {
    "name": "",
    "address": "",
    "email": ""
  },
  "invoice_number": "",
  "invoice_date": "",
  "due_date": "",
  "payment_status": "",
  "line_items": [
    {
      "description": "",
      "quantity": 0,
      "rate": "",
      "amount": ""
    }
  ],
  "subtotal": "",
  "tax": "",
  "discount": "",
  "total_due": "",
  "payment_terms": "",
  "bank": {
    "bank_name": "",
    "account_name": "",
    "account_number": "",
    "ifsc": ""
  }
}`;

export async function POST() {
  const invoicePath = join(process.cwd(), "public", "invoice-demo.svg");
  const svgBuffer = readFileSync(invoicePath);
  const pngBuffer = await sharp(svgBuffer).png().toBuffer();
  const base64Image = pngBuffer.toString("base64");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          { text: PROMPT },
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Image,
            },
          },
        ],
      },
    ],
  });

  const text = response.text ?? "";

  let extracted: Record<string, unknown>;
  try {
    extracted = JSON.parse(text);
  } catch {
    const cleaned = text.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    extracted = JSON.parse(cleaned);
  }

  return NextResponse.json({ data: extracted });
}
