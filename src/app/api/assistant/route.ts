import { NextResponse } from "next/server";
import OpenAI from "openai";

const system = `Eres un asistente para bodas destino llamado The Planners. Das respuestas concisas y accionables para:
- Buscar hoteles y sugerir opciones con precios aproximados.
- Guiar a invitados en reservas (vuelos/hotel/RSVP).
- Ayudar a planners con contratos (resúmenes y checklist).`;

export async function POST(req: Request) {
  const { prompt } = await req.json().catch(() => ({ prompt: "" }));
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ ok: false, error: "OPENAI_API_KEY missing" }, { status: 500 });
  }
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const msg = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: String(prompt ?? "") },
    ],
    temperature: 0.4,
  });
  const text = msg.choices?.[0]?.message?.content ?? "";
  return NextResponse.json({ ok: true, text });
}

