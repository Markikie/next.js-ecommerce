import conn from "@/db";
import { order } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

type NewOrder = typeof order.$inferInsert;

export async function POST(req: NextRequest) {
  const body = (await req.json()) as NewOrder[];
  const db = await conn;
  await db.insert(order).values(body);

  return NextResponse.json(
    {
      message: "Order created",
    },
    {
      status: 201,
    }
  );
}
