"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Building2,
  ArrowRight,
  Sparkles
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export default function ContactPage() {
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formInView = useInView(formRef, { once: true, margin: "-50px" });
  const infoInView = useInView(infoRef, { once: true, margin: "-50px" });
  const mapInView = useInView(mapRef, { once: true, margin: "-50px" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">نحن هنا للمساعدة</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                دعنا نتواصل
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              لديك أسئلة؟ نحن نحب أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information Cards - Left Side */}
          <motion.div
            ref={infoRef}
            variants={containerVariants}
            initial="hidden"
            animate={infoInView ? "visible" : "hidden"}
            className="lg:col-span-1 space-y-6"
          >
            <motion.div variants={itemVariants} className="group">
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">الهاتف</h3>
                  <div className="space-y-2">
                    <a 
                      href="tel:+11234567890" 
                      className="block text-blue-100 hover:text-white transition-colors group/link"
                    >
                      <span className="text-sm font-medium">الطوارئ</span>
                      <span className="block text-lg font-semibold mt-1 group-hover/link:underline">+1 (123) 456-7890</span>
                    </a>
                    <a 
                      href="tel:+11234567891" 
                      className="block text-blue-100 hover:text-white transition-colors group/link"
                    >
                      <span className="text-sm font-medium">عام</span>
                      <span className="block text-lg font-semibold mt-1 group-hover/link:underline">+1 (123) 456-7891</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">البريد الإلكتروني</h3>
                <div className="space-y-3">
                  <a 
                    href="mailto:info@healthcare.com" 
                    className="block text-gray-600 hover:text-teal-600 transition-colors group/link"
                  >
                    <span className="text-sm font-medium text-gray-500">استفسار عام</span>
                    <span className="block text-base font-medium mt-1 group-hover/link:underline">info@healthcare.com</span>
                  </a>
                  <a 
                    href="mailto:support@healthcare.com" 
                    className="block text-gray-600 hover:text-teal-600 transition-colors group/link"
                  >
                    <span className="text-sm font-medium text-gray-500">الدعم</span>
                    <span className="block text-base font-medium mt-1 group-hover/link:underline">support@healthcare.com</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">العنوان</h3>
                <p className="text-gray-600 leading-relaxed">
                  123 شارع الرعاية الصحية<br />
                  الحي الطبي، المدينة 12345<br />
                  الولايات المتحدة
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">ساعات العمل</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span className="font-medium">الاثنين - الجمعة</span>
                    <span>8:00 صباحاً - 6:00 مساءً</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">السبت</span>
                    <span>9:00 صباحاً - 4:00 مساءً</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">الأحد</span>
                    <span className="text-gray-400">مغلق</span>
                  </div>
                  <div className="pt-3 mt-3 border-t border-gray-100">
                    <p className="text-sm font-semibold text-indigo-600">خدمات الطوارئ متاحة على مدار الساعة</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 lg:p-12">
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 text-right">أرسل لنا رسالة</h2>
                <p className="text-gray-600 text-right">املأ النموذج أدناه وسنعود إليك خلال 24 ساعة.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 text-right">
                      الاسم الأول <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="محمد"
                      className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 text-right">
                      اسم العائلة <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="أحمد"
                      className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 text-right">
                    عنوان البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mohammed.ahmed@example.com"
                    className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 text-right">
                    رقم الهاتف
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+20 123 456 7890"
                    className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 text-right">
                    الموضوع <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="كيف يمكننا مساعدتك؟"
                    className="w-full h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 text-right">
                    الرسالة <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="أخبرنا عن استفسارك..."
                    className="w-full min-h-[150px] rounded-md border-2 border-gray-200 bg-transparent px-4 py-3 text-base transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base font-semibold transition-all duration-300 disabled:opacity-70"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 ml-2" />
                      إرسال الرسالة
                      <ArrowRight className="w-5 h-5 mr-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, y: 60 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-right">اعثر علينا</h2>
                  <p className="text-gray-600 mt-1 text-right">قم بزيارة مكتبنا الرئيسي</p>
                </div>
              </div>
              <div className="relative w-full h-[500px] sm:h-[600px] rounded-2xl overflow-hidden border-2 border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.335640236!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Egypt!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid sm:grid-cols-3 gap-6"
        >
          <div className="group bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 text-center border border-blue-100 transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">محادثة مباشرة</h3>
            <p className="text-gray-600">تحدث معنا عبر الإنترنت للحصول على دعم فوري</p>
          </div>
          <div className="group bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-8 text-center border border-teal-100 transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">دعم على مدار الساعة</h3>
            <p className="text-gray-600">خط مساعدة للطوارئ متاح على مدار الساعة</p>
          </div>
          <div className="group bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-2xl p-8 text-center border border-cyan-100 transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">استجابة سريعة</h3>
            <p className="text-gray-600">نرد على جميع الاستفسارات خلال 24 ساعة</p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
