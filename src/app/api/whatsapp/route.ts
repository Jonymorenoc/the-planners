import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
  const { to, body } = await req.json().catch(() => ({}));
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.WHATSAPP_FROM; // e.g. whatsapp:+14155238886

  if (!sid || !token || !from) {
    return NextResponse.json({ ok: false, error: "Twilio envs missing" }, { status: 500 });
  }
  try {
    const client = twilio(sid, token);
    const res = await client.messages.create({
      from,
      to, // e.g. whatsapp:+52xxxxxxxxxx
      body,
    });
    return NextResponse.json({ ok: true, sid: res.sid });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "send_failed" }, { status: 500 });
  }
}

