import { AnimatedMarqueeHero } from "./hero";

// A list of sample image URLs for the demo
const DEMO_IMAGES = [
    "https://images.pexels.com/photos/4226123/pexels-photo-4226123.jpeg",
    "https://images.pexels.com/photos/7089296/pexels-photo-7089296.jpeg",
    "https://images.pexels.com/photos/7579833/pexels-photo-7579833.jpeg",
    "https://images.pexels.com/photos/7221119/pexels-photo-7221119.jpeg",
    "https://images.pexels.com/photos/6566815/pexels-photo-6566815.jpeg",
    "https://images.pexels.com/photos/6393010/pexels-photo-6393010.jpeg",
    "https://images.pexels.com/photos/5867706/pexels-photo-5867706.jpeg",
    "https://images.pexels.com/photos/6291170/pexels-photo-6291170.jpeg",
    "https://images.pexels.com/photos/5452225/pexels-photo-5452225.jpeg",
    "https://images.pexels.com/photos/5215017/pexels-photo-5215017.jpeg"
  
];

const AnimatedHeroDemo = () => {
  return (
    <AnimatedMarqueeHero
      tagline="انضم إلى أكثر من 1000 مريض سعيد"
      title={
        <>
        وداعاً للانتظار،
          <br />
         احجز موعدك، وابدأ رحلة علاجك الآن.
        </>
      }
      description="احجز موعدك مع خبرائنا واحصل على أفضل العلاجات لصحتك."
      ctaText="ابدأ الآن"
      ctaLink="/getstart"
      images={DEMO_IMAGES}
    />
  );
};

export default AnimatedHeroDemo;