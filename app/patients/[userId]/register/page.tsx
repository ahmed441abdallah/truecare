import RegisterForm from "@/components/forms/registerForm";
import { HeroHighlightDemo } from "@/components/ui/HeroHighlightDemo";
import { getUserById } from "@/lib/actions/patient.actions";
import React from "react";

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const user = await getUserById(userId);
  return (
    <div className=" p-4 sm:p-16 container">
      <section>
        <h2 className="text-3xl font-bold text-slate-800">مرحبا 👋,</h2>
        <p className="text-gray-700">دعنا نعرفك أكثر عن نفسك</p>
      </section>

      <RegisterForm user={user}></RegisterForm>
    </div>
  );
};

export default page;
