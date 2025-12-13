"use client";

import { useState } from "react";
import Image from "next/image";

const expertiseData = [
  {
    category: "الطب العام",
    title: "يقدم الطبيب العام فحوصات الصحة الشاملة.",
    src: "https://images.pexels.com/photos/4989130/pexels-photo-4989130.jpeg",
  },
  {
    category: "رعاية الطفل",
    title: "يقدم الطبيب الطفلي رعاية الصحة والسعادة للأطفال.",
    src: "https://images.pexels.com/photos/8460036/pexels-photo-8460036.jpeg",
  },
  {
    category: "القلب",
    title: "يقدم الطبيب القلبي فحوصات القلب ويعالج الأمراض القلبية.",
    src: "https://images.pexels.com/photos/6291261/pexels-photo-6291261.jpeg",
  },
  {
    category: "الجلدية",
    title: "Expert care for your skin, hair.",
    src: "https://images.pexels.com/photos/3736397/pexels-photo-3736397.jpeg",
  },
  {
    category: "العصبية",
    title: "يقدم الطبيب العصبي رعاية متكاملة لأمراض العصبية.",
    src: "https://images.pexels.com/photos/4226139/pexels-photo-4226139.jpeg",
  },
  {
    category: "العظمية",
    title: "يقدم الطبيب العظمي رعاية متكاملة لأمراض العظمية.",
    src: "https://images.pexels.com/photos/5452281/pexels-photo-5452281.jpeg",
  },
  {
    category: "العيون",
    title: "يقدم الطبيب العيوني رعاية متكاملة لأمراض العيون.",
    src: "https://images.pexels.com/photos/5996759/pexels-photo-5996759.jpeg",
  },
  {
    category: "الأسنان",
    title: "يقدم الطبيب الأسناني رعاية متكاملة لأمراض الأسنان.",
    src: "https://images.pexels.com/photos/3779704/pexels-photo-3779704.jpeg",
  },
];

export default function ExpertiseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = expertiseData.length;

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
  };

  const getCardPosition = (index: number) => {
    let position = index - currentIndex;
    if (position < -totalCards / 2) position += totalCards;
    else if (position > totalCards / 2) position -= totalCards;
    return position;
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-neutral-900 mb-12 text-center">
        في جميع التخصصات, نقدم الرعاية الأفضل مع خبراءنا.
        </h2>

        {/* --- Carousel Container --- */}
        <div className="relative h-[480px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {expertiseData.map((card, index) => {
              const position = getCardPosition(index);
              const isCenter = position === 0;
              const scale = isCenter ? "scale-100" : "scale-90";
              const opacity = isCenter ? "opacity-100" : "opacity-50";
              const zIndex = isCenter ? "z-20" : "z-10";
              const translate = `translateX(calc(${position * 120}%))`;

              return (
                <div
                  key={card.title}
                  className={`absolute w-[300px] h-[450px] rounded-2xl shadow-xl bg-white transition-all duration-500 ease-in-out cursor-pointer ${scale} ${opacity} ${zIndex}`}
                  style={{
                    transform: translate,
                    left: "50%",
                    marginLeft: "-150px",
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    {/* Image */}
                    <Image
                      src={card.src}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="300px"
                      loading="lazy"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end text-white hover:bg-black/20 transition-all duration-300">
                      <p className="text-sm font-semibold mb-1 text-gray-200 inline-block ">
                        {card.category}
                      </p>
                      <h3 className="text-2xl font-bold leading-snug">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Navigation Controls --- */}
        <div className="flex justify-center items-center mt-16 space-x-4">
          {/* Previous Button */}
          <button
            onClick={prevCard}
            className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            aria-label="Previous card"
          >
            <svg
              className="w-5 h-5 text-gray-600 transform rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>

          {/* Indicators */}
          <div className="flex space-x-2">
            {expertiseData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex
                    ? "bg-gray-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextCard}
            className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            aria-label="Next card"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

