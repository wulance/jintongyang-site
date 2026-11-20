import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";

/**
 * Inquiry endpoint. Validates the brief and hands it to a delivery adapter.
 * No adapter is configured yet: wire email / CRM in `deliver` before launch.
 */
async function deliver(): Promise<boolean> {
  return false;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  if (parsed.data.website) return NextResponse.json({ ok: true, delivered: false });

  const delivered = await deliver();
  return NextResponse.json({ ok: true, delivered });
}
