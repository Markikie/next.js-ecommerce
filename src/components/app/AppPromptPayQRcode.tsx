"use client";
import { generate } from "promptparse";
import { QRCodeCanvas } from "qrcode.react";
type AppPromptPayQRcodeProps = {
  mobileNo: string;
  amount: number;
  message?: string;
};

const AppPromptPayQRcode = ({
  mobileNo,
  amount,
  message,
}: AppPromptPayQRcodeProps) => {
  const payload = generate.trueMoney({
    mobileNo: mobileNo,
    amount: amount,
    message: message,
  });
  return (
    <>
      <div className="flex justify-center items-center">
        {payload && (
          <QRCodeCanvas value={payload} size={256} className="w-256 h-256" />
        )}
      </div>
      <p className="text-center">
        Please scan the QR code to pay {amount.toLocaleString()} Baht
        <br />
        {message}
        <br />
        Thank you for your payment!
      </p>
    </>
  );
};
export default AppPromptPayQRcode;
