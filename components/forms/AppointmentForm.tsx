"use client"
import SubmitButton from "@/components/ui/SubmitButton"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { motion } from "motion/react"
import doctorsData from "@/data/doctors.json"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import toast from "react-hot-toast"
import { createAppointment } from "@/lib/actions/appointment.actions"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    primaryPhysician: z.string().min(1, {
      message: "Please select a primary physician.",
    }),
    reason: z.string().min(2, {
      message: "Reason must be at least 2 characters.",
    }),
    note: z.string().min(2, {
      message: "Notes must be at least 2 characters.",
    }),
    schedule: z.date().min(new Date(), {
      message: "Date must be in the future.",
    }),
    cancellationReason: z.string().optional(),
  })

  function AppointmentForm({ type, userId, patientId }: { type: "create" | "cancel" | "schedule", userId: string, patientId: string }) {
    const router = useRouter();
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1] as const,
        },
      },
    };
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        primaryPhysician: "",
        reason: "",
        note: "",
        schedule: new Date(),
        cancellationReason: "",
      },
    })
    const [isLoading, setIsLoading] = useState(false);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form submitted with values:", values);
        setIsLoading(true);
        let status;
        switch (type) {
            case "schedule":
             status = "scheduled";
            break;
            case "cancel":
            status = "cancelled";
            break;
            default:
            status = "pending";
            break;
        }
        try{
            if(type==="create" && patientId){
                const appointmentData={
                    userId,
                    patient:patientId,
                    primaryPhysician:values.primaryPhysician,
                    reason:values.reason,
                    schedule:new Date(values.schedule),
                    status:status as Status,
                    note:values.note,
                }
                const appointment = await createAppointment(appointmentData);
                if(appointment){
                    toast.success("Appointment created successfully");
                    form.reset();
                    setTimeout(() => {
                        router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
                    }, 2000);
                }
                else{
                    toast.error("Failed to create appointment");
                }

            }

        }

        catch(error){
            console.error("Error creating appointment:", error);
            toast.error("Failed to create appointment");
        }
        finally{
            setIsLoading(false);
        }


      console.log(values)
    }
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="primaryPhysician"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الطبيب الرئيسي</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر الطبيب الرئيسي" />
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
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={itemVariants}
          >
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>سبب الموعد</FormLabel>
                  <FormControl>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Input placeholder="سبب الموعد" {...field} className="border h-40 mb-4" />
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات للطبيب</FormLabel>
                  <FormControl>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Input placeholder="اكتب ملاحظاتك هنا..." {...field} className="border h-40 mb-4" />
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="schedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاريخ ووقت الموعد</FormLabel>
                  <FormControl>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <DatePicker
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date) => field.onChange(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                        className="w-[680px] border rounded-md px-3 py-2"
                        placeholderText="Select date and time"
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <motion.p
            className="text-sm text-gray-500 mt-4"
            variants={itemVariants}
          >
              يمكنك طلب موعد لمدة 30 يوم في المستقبل.
          </motion.p>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SubmitButton isLoading={isLoading} text="طلب الموعد" />
          </motion.div>
        </form>
      </Form>
    )
}

export default AppointmentForm;