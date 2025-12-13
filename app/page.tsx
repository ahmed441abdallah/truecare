import dynamic from "next/dynamic";
import AnimatedHeroDemo from "@/components/AnimatedHeroDemo";
import About from "@/components/about";

// Lazy load below-the-fold components for better initial page load
const ExpertiseCarousel = dynamic(() => import("@/components/ExpertiseCarousel"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});
const Steper = dynamic(() => import("@/components/steper"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});
const TopDoctors = dynamic(() => import("@/components/top-doctors"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});
const TestimonialSectionDemo = dynamic(() => import("@/components/TestimonialSectionDemo"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});
const Faq = dynamic(() => import("@/components/faq"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200" />,
});
const ChatbotButton = dynamic(() => import("@/components/ChatbotButton"), {
  loading: () => null,
});

export default function Home() {
  return (
    <div>
      {/* <ImagesSliderDemo /> */}
      <AnimatedHeroDemo />
      <About />
      <ExpertiseCarousel />
      <Steper />
      <TopDoctors />
      <TestimonialSectionDemo />
      <Faq />
      <ChatbotButton />
    </div>
  );
}

