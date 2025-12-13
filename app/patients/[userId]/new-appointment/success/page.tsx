"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { getAppointmentById } from "@/lib/actions/appointment.actions";
import { Calendar, Clock, User } from "lucide-react";


function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96] as const,
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function AppointmentDetails({ appointment }: { appointment: any }) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 1,
                ease: [0.25, 0.4, 0.25, 1] as const,
            },
        },
    };

    if (!appointment) return null;

    const scheduleDate = new Date(appointment.schedule);
    const formattedDate = scheduleDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const formattedTime = scheduleDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    return (
        <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 max-w-4xl mx-auto"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gradient-to-br from-indigo-500/[0.15] to-indigo-500/[0.05] backdrop-blur-md border border-indigo-500/20 rounded-xl p-6"
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-indigo-500/20 rounded-full p-3 mb-4">
                            <User className="h-6 w-6 text-indigo-400" />
                        </div>
                        <p className="text-xs uppercase tracking-wider text-white/60 mb-2">الطبيب</p>
                        <p className="text-white font-semibold text-lg">{appointment.primaryPhysician}</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gradient-to-br from-rose-500/[0.15] to-rose-500/[0.05] backdrop-blur-md border border-rose-500/20 rounded-xl p-6"
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-rose-500/20 rounded-full p-3 mb-4">
                            <Calendar className="h-6 w-6 text-rose-400" />
                        </div>
                        <p className="text-xs uppercase tracking-wider text-white/60 mb-2">تاريخ الموعد</p>
                        <p className="text-white font-semibold text-lg">{formattedDate}</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gradient-to-br from-violet-500/[0.15] to-violet-500/[0.05] backdrop-blur-md border border-violet-500/20 rounded-xl p-6"
                >
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-violet-500/20 rounded-full p-3 mb-4">
                            <Clock className="h-6 w-6 text-violet-400" />
                        </div>
                        <p className="text-xs uppercase tracking-wider text-white/60 mb-2">وقت الموعد</p>
                        <p className="text-white font-semibold text-lg">{formattedTime}</p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
    appointment,
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    appointment?: any;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1] as const,
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
                    >
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-white/60 tracking-wide">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
                            <span className="w-full bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                {title1}{" "}
                            </span>
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    {appointment && <AppointmentDetails appointment={appointment} />}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric }

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const appointmentId = searchParams.get('appointmentId');
    const [appointment, setAppointment] = useState<any>(null);

    useEffect(() => {
        if (appointmentId) {
            getAppointmentById(appointmentId).then(setAppointment);
        }
    }, [appointmentId]);

    return (
        <HeroGeometric
            badge="موعد محظوظ تم تأكيده"
            title1="موعدك"
            title2="تم حجزه بنجاح"
            appointment={appointment}
        />
    );
}
