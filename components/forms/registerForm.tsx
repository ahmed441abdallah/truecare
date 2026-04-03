"use client";
import React, { useState } from "react";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { Mail, Phone, User } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientFormValidation } from "@/lib/validation";
import { z } from "zod";
import { Input } from "../ui/input";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { createPatient } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import doctorsData from "@/data/doctors.json";

type PatientFormValues = z.infer<typeof PatientFormValidation>;

function RegisterForm({ user }: { user: User }) {
  const router = useRouter();
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
 
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const onSubmit = async (values: PatientFormValues) => {
    setIsLoading(true);
    try {
      // Extract firstName from name (first word)
      const nameParts = values.name.trim().split(/\s+/);
      const firstName = nameParts[0] || values.name;
      const lastName = nameParts.slice(1).join(" ") || "";

      // Generate a unique integer patientId from user ID hash
      const patientId = Math.abs(user.$id.split('').reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0);
      }, 0));

      const formData = {
        patientId: patientId,
        firstName: firstName,
        lastName: lastName,
        email: values.email,
        phoneNumber: values.phone,
        birthDate: new Date(values.birthDate).toISOString().split('T')[0], // Convert to string (YYYY-MM-DD)
        gender: values.gender.toLowerCase(), // Convert to lowercase (male, female, other)
        address: values.address,
        occupation: values.occupation,
        emergenceContactName: values.emergencyContactName, // Fixed field name
        emergenceContactNumber: values.emergencyContactNumber, // Fixed field name
        primaryCarePhysician: values.primaryPhysician, // Fixed field name
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedications: values.currentMedication, // Fixed field name
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        treatmentConsent: values.treatmentConsent,
        disclosureConsent: values.disclosureConsent,
        privacyConsent: values.privacyConsent,
      }
      const newPatient = await createPatient(formData);
      if (newPatient) {
        toast.success("Patient created successfully");
        router.push(`/patients/${user.$id}/new-appointment`);
      } else {
        toast.error("Failed to create patient");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating patient");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-full sm:w-3/4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <section className=" text-3xl font-bold text-slate-800">
            <h2> معلوماتك الشخصية </h2>
          </section>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المستخدم</FormLabel>
                <FormControl>
                  <Input
                    placeholder="مثال: محمد أحمد"
                    {...field}
                    className="border shadow"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: example@example.com"
                      {...field}
                      className=" border shadow"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CustomFormField
              control={form.control}
              name="phone"
              label="رقم الهاتف"
              feildType="text"
              icon={<Phone />}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>تاريخ الميلاد</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full justify-between font-normal"
                        >
                          {field.value ? new Date(field.value).toLocaleDateString() : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>النوع</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div className="flex items-center gap-3  shadow p-1 rounded-sm">
                        <RadioGroupItem value="Male" id="r1" />
                        <Label htmlFor="r1">Male</Label>
                      </div>
                      <div className="flex items-center gap-3  shadow p-1 rounded-sm">
                        <RadioGroupItem value="Female" id="r2" />
                        <Label htmlFor="r2">Female</Label>
                      </div>
                      <div className="flex items-center gap-3  shadow p-1 rounded-sm    ">
                        <RadioGroupItem value="Other" id="r3" />
                        <Label htmlFor="r3">Other</Label>
                      </div>
                    </RadioGroup>
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: 123 شارع المدينة, المدينة, البلد"
                      {...field}
                      className=" border shadow"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المهنة</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: مهندس برمجيات"
                      {...field}
                      className=" border shadow"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الاتصال الطوارئ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: محمد أحمد"
                      {...field}
                      className=" border shadow"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف الطوارئ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: +201234567890"
                      {...field}
                      className=" border shadow"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <section className=" text-3xl font-bold text-slate-800">
            <h2> معلوماتك الطبية </h2>
          </section>
          <FormField
            control={form.control}
            name="primaryPhysician"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الطبيب المختص</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Primary Physician" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctorsData.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.name}>
                          <div className="flex items-center gap-2  rounded-sm border px-4 shadow-sm bg-gray-100">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span>{doctor.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="insuranceProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مزود التأمين</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: Blue Cross Blue Shield"
                      {...field}
                      className=" border shadow"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insurancePolicyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم سياسة التأمين</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: 123456789"
                      {...field}
                      className=" border shadow"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الحساسيات (إذا كانت موجودة)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: الفول السوداني, النباتات"
                      {...field}
                      className=" border shadow h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentMedication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الأدوية الحالية</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: الإيبوروفين, الباراسيتامول"
                      {...field}
                      className=" border shadow h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyMedicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التاريخ الطبي العائلي (إذا كان موجودا)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: القلب, السكر"
                      {...field}
                      className=" border shadow h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pastMedicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التاريخ الطبي السابق</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: حادثة قلبية في 2010, جراحة في 2015"
                      {...field}
                      className=" border shadow h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h2 className=" text-3xl font-bold text-slate-800">
              الموافقة والخصوصية
          </h2>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="treatmentConsent"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="!mt-0 cursor-pointer">
                      أوافق على الحصول على العلاج لحالتي الصحية.
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="disclosureConsent"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="!mt-0 cursor-pointer">
                    أوافق على استخدام وإفشاء معلوماتي الصحية لأغراض العلاج.
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacyConsent"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="!mt-0 cursor-pointer">
                    أوافق على الخصوصية والأمان
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
            <SubmitButton isLoading={isLoading} text="استمرار إلى الموعد" />
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;
