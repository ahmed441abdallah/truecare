"use client";
import "react-phone-number-input/style.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../ui/CustomFormField";
import { Form } from "@/components/ui/form";
import { Mail, Phone, User } from "lucide-react";
import SubmitButton from "../ui/SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PataintForm() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = { name, email, phone };
      const outcome = await createUser(userData);
      if (outcome.status === "created") {
        router.push(`/patients/${outcome.user.$id}/register`);
      } else if (outcome.status === "exists") {
        toast.error("المستخدم موجود بالفعل بهذا العنوان الإلكتروني");
      } else if (outcome.status === "network") {
        toast.error(
          "تعذر الاتصال بالخادم (انتهت المهلة). تحقق من الإنترنت أو أعد المحاولة."
        );
      } else {
        toast.error("فشل إنشاء المستخدم. يرجى المحاولة مرة أخرى.");
      }
    } catch (error: unknown) {
      toast.error("فشل إنشاء المستخدم. يرجى المحاولة مرة أخرى.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-xl text-right">مرحباً... 👋</h1>
          <p className="text-gray-600 text-right">ابدأ مع المواعيد.</p>
        </section>
        <CustomFormField
          control={form.control}
          name="name"
          label="الاسم الكامل"
          feildType="text"
          icon={<User />}
        />
        <CustomFormField
          control={form.control}
          name="email"
          label="عنوان البريد الإلكتروني"
          feildType="email"
          icon={<Mail />}
        />
        <CustomFormField
          control={form.control}
          name="phone"
          label="رقم الهاتف"
          feildType="text"
          icon={<Phone />}
        />

        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
}
