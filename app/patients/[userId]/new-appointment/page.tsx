"use client"
import { motion } from "motion/react"
import AppointmentForm from "@/components/forms/AppointmentForm"
import { useState, useEffect } from "react";
import { getPatient } from "@/lib/actions/patient.actions";
import { useParams } from "next/navigation";
 
function NewAppointmentPage () {
    const {userId} = useParams();
    const userIdString = Array.isArray(userId) ? userId[0] : userId ?? '';
    const [patient, setPatient] = useState<any>(null);
    
    useEffect(() => {
      if (userIdString) {
        getPatient(userIdString).then(setPatient);
      }
    }, [userIdString]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  

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

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };
const [isLoading, setIsLoading] = useState(false);

  return (
    <motion.div
      className="container mx-auto p-4 sm:p-16 grid grid-cols-1 sm:grid-cols-2 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="" variants={itemVariants}>
        <motion.h1
          className="text-3xl font-bold text-slate-900 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          اهلا بك في حجز موعد جديد
        </motion.h1>
        <motion.p
          className="text-gray-500 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
            حجز موعد جديد في 10 ثواني
        </motion.p>
       <AppointmentForm type="create" userId={userIdString} patientId={patient?.$id} />
      </motion.div>
      <motion.div
        className="hidden sm:block"
        variants={imageVariants}
      >
        <motion.img
          src="https://images.pexels.com/photos/7176036/pexels-photo-7176036.jpeg"
          alt=""
          className="w-full h-[600px] rounded-2xl object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
  }

export default NewAppointmentPage;