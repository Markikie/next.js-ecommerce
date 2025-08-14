/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useCartStore } from "@/lib/cart-store";

const AppCartButton = ({ product }: any) => {
  const addItem = useCartStore((state) => state.addItem);
  const addToCart = () => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      qty: 1,
    });

    console.log("add to cart");
  };
  return (
    <Button onClick={() => addToCart()} className="mt-10 cursor-pointer">
      <ShoppingCart /> เพิ่มลงในรถเข็น
    </Button>
  );
};
export default AppCartButton;
