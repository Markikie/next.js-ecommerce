"use client";

import { Button } from "@/components/ui/button";
import AddProductForm from "./product/AddProductForm";

const DProduct = () => {
  return (
    <div className="p-4">
      <Button className="cursor-pointer">Add Product</Button>
      <AddProductForm />
    </div>
  );
};
export default DProduct;
