"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { X } from "lucide-react";
import { useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./input-otp"
import { encrypt } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
 function PasskeyModal() {
    const [isOpen, setIsOpen] = useState(true);
    const [passkey, setPasskey] = useState("");
    const [error, setError] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const router = useRouter();
    const handlePasskeyChange = (value: string) => {
        setPasskey(value);
        setError(""); // Clear error when user types
        setIsValidating(false);
    }
    const handleClose = () => {
        setIsOpen(false);
    }
    const handleContinue = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsValidating(true);
        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const ecryptedkey=encrypt(passkey)
            localStorage.setItem("admin_passkey", ecryptedkey);
            setError("");
            setIsValidating(false);
            setIsOpen(false);
            router.push('/admin');
        } else {
            setError("مفتاح مرور غير صحيح. يرجى المحاولة مرة أخرى.");
            setPasskey(""); // Clear passkey on error
            setIsValidating(false);
            // Don't close modal - keep it open to show error
        }
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => {
            // Prevent closing when there's an error or during validation
            if (!open && (error || isValidating)) {
                return; // Don't close if there's an error or validating
            }
            setIsOpen(open);
        }}>
        <AlertDialogContent className="shad-alert-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between gap-2 text-right">التحقق من الوصول
                <X className="w-4 h-4 cursor-pointer" onClick={handleClose}/>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              يرجى إدخال مفتاح المرور للوصول إلى لوحة الإدارة.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div >
          <InputOTP value={passkey} onChange={handlePasskeyChange} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup className="flex items-center justify-center gap-4">
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
    {error && <p className="text-red-500 text-sm text-right mt-2">{error}</p>}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <Button onClick={handleContinue}>متابعة</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}
export default PasskeyModal;