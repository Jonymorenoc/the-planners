import { NextResponse } from "next/server";

const MOCK = [
  { id: "h1", name: "Hotel Coral", location: "Cancún", rating: 4.6, minPrice: 180 },
  { id: "h2", name: "Mar de Luna", location: "Tulum", rating: 4.4, minPrice: 150 },
  { id: "h3", name: "Cielo Azul", location: "Playa del Carmen", rating: 4.8, minPrice: 220 },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const results = MOCK.filter(
    (h) => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)
  );
  return NextResponse.json({ ok: true, results });
}

