import React from "react";
import { Button } from "./button";
import { Spinner } from "@/components/ui/spinner";
interface ButtonProps {
  isLoading: boolean;
  text?: string;
}
const SubmitButton = ({ isLoading, text }: ButtonProps) => {
  return (
    <Button type="submit" className="w-full">
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Spinner /> جاري التحميل...
        </span>
      ) : (
        text || "ابدأ"
      )}
    </Button>
  );
};

export default SubmitButton;
