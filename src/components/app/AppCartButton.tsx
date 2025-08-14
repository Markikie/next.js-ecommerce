"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

const AppCartButton = () => {
  const addToCart = () => {
    console.log("add to cart");
  };
  return (
    <Button onClick={() => addToCart()} className="mt-10 cursor-pointer">
      <ShoppingCart /> เพิ่มลงในรถเข็น
    </Button>
  );
};
export default AppCartButton;
