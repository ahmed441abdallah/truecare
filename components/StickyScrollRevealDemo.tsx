"use client";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "General Consultation",
    description:
      "Our general practitioners are your first point of contact for all health concerns. They provide routine checkups, health assessments, and preventive care, ensuring early detection and management of potential health issues before they become serious.",
    content: (
      <div className="flex h-full w-full items-center justify-center ">
        <img
          src="https://images.pexels.com/photos/4269355/pexels-photo-4269355.jpeg"
          alt="servises"
        />
      </div>
    ),
  },
  {
    title: "Specialist Medical Care",
    description:
      "We provide access to a diverse range of medical specialists including cardiologists, dermatologists, pediatricians, neurologists, and orthopedic surgeons",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="https://images.pexels.com/photos/4269202/pexels-photo-4269202.jpeg"
          alt="servises"
          className=" object-cover"
        />
      </div>
    ),
  },
  {
    title: "Diagnostic & Laboratory Services",
    description:
      "Accurate diagnosis is the foundation of effective treatment. Our fully equipped diagnostic center offers advanced imaging, blood analysis, and other laboratory tests to provide quick and reliable results, enabling faster and more informed medical decisions",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <img
          src="https://images.pexels.com/photos/5215008/pexels-photo-5215008.jpeg"
          alt="servises"
        />
      </div>
    ),
  },
  {
    title: "Emergency & Urgent Care",
    description:
      "Medical emergencies require immediate and professional attention. Our 24/7 emergency unit is staffed with skilled doctors and nurses trained to respond swiftly and effectively to critical health situations.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <img
          src="https://images.pexels.com/photos/8460376/pexels-photo-8460376.jpeg"
          alt="servises"
          className=" object-cover"
        />
      </div>
    ),
  },
];
export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
