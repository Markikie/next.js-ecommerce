"use client";

import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";
import AppPromptPayQRcode from "./AppPromptPayQRcode";

export default function AppCartList() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = useCartStore((state) => state.totalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return <p className="text-center mt-20">ตะกร้าสินค้าว่างเปล่า 🛒</p>;
  }

  const handlePayment = async () => {
    const { data: session } = await authClient.getSession();

    if (session) {
      setIsOpen(true);
    } else {
      router.push("/login");
    }
  };

  const handleConfirmPayment = async () => {
    const { data: session } = await authClient.getSession();

    if (session) {
      const orders = items.map((item) => {
        return {
          userId: session.user.id,
          price: item.price,
          productId: item.productId,
          qty: item.qty,
          status: "paid",
        };
      });

      const response = await axios.post("/api/order", orders);
      if (response.status === 201) {
        clearCart();
        toast.success("payment success");

        router.push("/product");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="mx-auto mt-20">
      <h1 className="text-xl font-semibold mb-4">ตะกร้าสินค้า</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>สินค้า</TableHead>
            <TableHead>จำนวน</TableHead>
            <TableHead>ราคา</TableHead>
            <TableHead>รวม</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.productId}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.qty}</TableCell>
              <TableCell>{item.price.toLocaleString()}฿</TableCell>
              <TableCell>{(item.price * item.qty).toLocaleString()}฿</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.productId)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="text-right mt-4 font-semibold">
        <div>รวมทั้งหมด: {total.toLocaleString()}฿</div>
        <div className="mt-4">
          <Button onClick={handlePayment} className="cursor-pointer">
            ชำระเงิน
          </Button>
        </div>
        <div>
          <AlertDialog open={isOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-bold text-center mb-3">
                  Pay with QR Code
                </AlertDialogTitle>

                <AlertDialogDescription>
                  <AppPromptPayQRcode mobileNo="0623831313" amount={total} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmPayment}>
                  Confirm Payment
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
