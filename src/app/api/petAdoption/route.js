import { NextResponse } from "next/server";

const store = globalThis.__adoptPetRequests ||= [];

export async function GET() {
  return NextResponse.json(store, { status: 200 });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const newRequest = {
      id: payload.id || crypto.randomUUID?.() || Date.now().toString(),
      petName: payload.petName || "",
      userName: payload.userName || "",
      userEmail: payload.userEmail || "",
      requestDate: payload.requestDate || new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      pickupDate: payload.pickupDate || "",
      message: payload.message || "",
      status: payload.status || "pending",
      createdAt: new Date().toISOString(),
    };

    store.push(newRequest);
    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }
}