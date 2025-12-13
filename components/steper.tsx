import React from "react";
import { Calendar } from "lucide-react";

// Data for service hours
const serviceHours = [
  { day: "السبت", time: "9AM - 10PM" },
  { day: "الأحد", time: "9AM - 10PM" },
  { day: "الاثنين", time: "24 ساعة" },
  { day: "الثلاثاء", time: "24 ساعة" },
  { day: "الأربعاء", time: "24 ساعة" },
  { day: "الخميس", time: "24 ساعة" },
];
const ScheduleItem = ({ day, time }) => (
  <div className="flex flex-col items-start p-2">
    {/* Icon */}
    <div
      className="flex items-center justify-center w-10 h-10 rounded-full mb-3"
      style={{ backgroundColor: ACCENT_COLOR, color: "white" }}
    >
      <Calendar size={20} />
    </div>

    <p className="text-lg font-semibold" style={{ color: DARK_TEXT_COLOR }}>
      {day}
    </p>

    {/* Time */}
    <p className="text-gray-600 text-sm">{time}</p>
  </div>
);

const steps = [
 
  
  {
    number: "03",
    title: "الاستشارة",
    description:
      "بعد ذلك, يمكنك القاء مع الطبيب والاستشارة عن مرضك بالطبيب.",
  },
  {
    number: "02",
    title: "حجز موعد",
    description:
      "بمجرد التسجيل, يمكنك حجز موعد مع الطبيب عبر النموذج الإلكتروني.",
  },
  {
    number: "01",
    title: "التسجيل",
    description:
      "قبل أن تقوم بحجز موعد مع طبيب, يجب عليك التسجيل على الموقع.",
  },

];

const ACCENT_COLOR = "#20C997";
const DARK_TEXT_COLOR = "#212121";
type FlowConnectorProps = {
  isLast: boolean;
};

const FlowConnector: React.FC<FlowConnectorProps> = ({ isLast }) => {
  if (isLast) return <div className="hidden md:block w-8"></div>; // Placeholder space
  return (
    <div className="hidden md:flex items-center justify-center w-full max-w-[180px] h-[75px] my-4">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 180 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M 0 35 Q 90 65 180 35"
          stroke={ACCENT_COLOR}
          strokeDasharray="8 8"
          strokeWidth="2"
          fill="none"
        />
        <polygon points="180,35 170,30 170,40" fill={ACCENT_COLOR} />
      </svg>
    </div>
  );
};

const StepCard = ({ number, title, description }) => (
  <div className="flex flex-col items-center text-center max-w-[280px] p-4">
    {/* Step Icon (Circle with Number) */}
    <div
      className="flex items-center justify-center w-16 h-16 rounded-full text-white font-bold text-xl mb-6 "
      style={{ backgroundColor: ACCENT_COLOR }}
    >
      {number}
    </div>

    {/* Title */}
    <h3
      className="text-xl font-semibold mb-3"
      style={{ color: DARK_TEXT_COLOR }}
    >
      {title}
    </h3>

    {/* Description */}
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const Steper = () => {
  return (
    <div className=" p-8" >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl text-neutral-800 md:text-4xl font-extrabold text-center mb-16"
          style={{ color: DARK_TEXT_COLOR }}
        >
          كيف يعمل الموقع؟
        </h2>

        {/* Steps Flow Container */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <StepCard
                number={step.number}
                title={step.title}
                description={step.description}
              />
              <FlowConnector isLast={index === steps.length - 1} />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div
        className="max-w-6xl w-full mx-auto my-8 p-6 bg-white rounded-xl "
        
      >
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/5 flex-shrink-0 relative hidden lg:block">
            <div
              className="h-[500px] w-full rounded-2xl overflow-hidden shadow-xl"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/5207118/pexels-photo-5207118.jpeg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          <div className="lg:w-3/5">
            <h2
              className="text-4xl text-neutral-800 font-extrabold mb-4"
              style={{ color: DARK_TEXT_COLOR }}
            >
              ساعات العمل
            </h2>

            <p className="text-gray-700 mb-8">
              الرعاية المتاحة والخبراء, تناسب لجدولك.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 mb-8">
              {serviceHours.map((item) => (
                <ScheduleItem key={item.day} day={item.day} time={item.time} />
              ))}
            </div>

            <p className="text-gray-700 mb-8">
              خطط زيارتك بسهولة. حجز مواعيد بسهولة للرعاية الشخصية.
            </p>

            <button
              className="px-6 py-3 text-white font-bold rounded-lg shadow-md transition duration-300 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: ACCENT_COLOR }}
            >
                حجز موعد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steper;
