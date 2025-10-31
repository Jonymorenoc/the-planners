import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { weddingId, email } = body as { weddingId?: string; email?: string };
    if (!weddingId) {
      return NextResponse.json({ ok: false, error: "weddingId requerido" }, { status: 400 });
    }
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();

    // Try to persist if DB is ready, otherwise return stub
    try {
      const invite = await prisma.inviteCode.create({
        data: {
          code,
          wedding: { connect: { id: weddingId } },
        },
      });
      return NextResponse.json({ ok: true, code: invite.code, email }, { status: 201 });
    } catch (e) {
      return NextResponse.json({ ok: true, code, email, note: "DB offline: code no persistido" }, { status: 201 });
    }
  } catch (e) {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }
}
