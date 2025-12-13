import { TestimonialSection } from "./ui/testemonails";

// Sample data for the testimonials
const testimonialsData = [
  {
    id: 1,
    quote:
      "هو سريع ومبتكر, وقد أنهى تصميم الموقع في أسبوع. مؤهل ومهني ممتاز!",
    name: "Sarah",
    role: "مريض",
    imageSrc: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900?q=80&w=1965&auto=format&fit=crop",
  },
  {
    id: 2,
    quote:
      "مدهش بالمهنية والتركيز على التفاصيل في تصميم الواجهة. موصى بها بشكل كبير!",
    name: "Martha",
    role: "مريض",
    imageSrc: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 3,
    quote:
      "خبراء مؤهلين, قاموا بتصميم الموقع بشكل مثالي ومبتكر.",
    name: "Victor",
    role: "مريض",
    imageSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxwcm9maWxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900?q=80&w=1887&auto=format&fit=crop",
  },
];

const TestimonialSectionDemo = () => {
  return (
    <TestimonialSection
      title="شاهد ما يقوله المرضى عن الموقع!"
      subtitle="تجربة محورية للعملاء من جميع أنحاء العالم"
      testimonials={testimonialsData}
    />
  );
};

export default TestimonialSectionDemo;