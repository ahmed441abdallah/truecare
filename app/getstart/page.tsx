"use client";

import PataintForm from "@/components/forms/pataintForm";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import PasskeyModal from "@/components/ui/PasskeyModal";

const PageContent = () => {
  const searchParams = useSearchParams();
  const adminParam = searchParams.get("admin");
  
  // Fallback: try reading from window.location if searchParams is empty
  const adminFromUrl = typeof window !== "undefined" 
    ? new URLSearchParams(window.location.search).get("admin")
    : null;
  const isAdmin = adminParam === "true" || adminFromUrl === "true";
  
  
  console.log(isAdmin);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex items-center justify-center p-4 md:p-8">
      {
        isAdmin && (
         <PasskeyModal />
        )
      }
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Form Section */}
        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-white/20">
            
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <PataintForm />
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-right"
            >
              <p className="text-sm text-gray-600">
                © TrureCare {new Date().getFullYear()}
              </p>
              <Link
                href="getstart/?admin=true"
                className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200 hover:underline"
              >
                الادمن ؟
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Right Side - Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20 z-10"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                  "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))",
                  "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2), rgba(34, 197, 94, 0.2))",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Image with parallax effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="https://images.pexels.com/photos/12902932/pexels-photo-12902932.jpeg"
                alt="متخصص صحي"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0vw, 50vw"
                priority
              />
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 bg-white/30 backdrop-blur-md rounded-full"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 left-10 w-16 h-16 bg-green-400/30 backdrop-blur-md rounded-full"
              animate={{
                y: [0, 15, 0],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute top-1/2 right-20 w-12 h-12 bg-blue-400/30 backdrop-blur-md rounded-full"
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Content overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2 text-right">
                  رحلتك الصحية تبدأ من هنا
                </h2>
                <p className="text-white/90 text-lg text-right">
                  استمتع برعاية صحية مخصصة مع فريقنا الخبير
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default page;
