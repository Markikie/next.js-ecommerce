import { getProductService } from "@/services/product-service";
import AppProductDisplay from "@/components/app/AppProductDisplay";

export default async function ProductPage() {
  const products = await getProductService();
  return (
    <div className="flex flex-col items-center mt-20">
      <AppProductDisplay products={products} />
    </div>
  );
}
