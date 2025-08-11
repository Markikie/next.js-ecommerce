import "server-only";

import conn from "@/db";
import { product } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const db = await conn;

export async function getProductService() {
  return await db.query.product.findMany({
    orderBy: desc(product.id),
    with: {
      productImages: true,
    },
  });
}
export async function getProductByIdService(id: number) {
  return await db.query.product.findFirst({
    where: eq(product.id, id),
    orderBy: desc(product.id),
    with: {
      productImages: true,
    },
  });
}
