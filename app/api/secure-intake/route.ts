import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { company, email, objective, budget, timeline, compliance } = data ?? {};

    if (!company || typeof company !== "string" || company.trim().length < 2) {
      return NextResponse.json({ error: "Invalid company" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!objective || typeof objective !== "string" || objective.trim().length < 20) {
      return NextResponse.json({ error: "Objective too short" }, { status: 400 });
    }
    if (!budget || !timeline || compliance !== true) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // In a real implementation, enqueue to a secure processing pipeline here
    // Avoid logging PII in production; here we only acknowledge receipt

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (e) {
    return NextResponse.json({ error: "Malformed request" }, { status: 400 });
  }
}
