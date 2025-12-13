import Image from "next/image";
import Link from "next/link";
import doctorsData from "@/data/doctors.json";

interface Doctor {
  id: number;
  name: string;
  category: string;
  categories: string[];
  image: string;
  experience: string;
  years: number;
  specialization: string;
  description: string;
}

export default function TopDoctors() {
  // Get top 4 doctors (or all if less than 4)
  const topDoctors = (doctorsData as Doctor[]).slice(0, 4);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-neutral-800 sm:text-3xl text-right">
              الأطباء الخبراء
          </h2>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topDoctors.map((doctor: Doctor) => (
            <li key={doctor.id}>
              <Link href="/doctors" className="group block overflow-hidden">
                <div className="relative h-[350px] w-full overflow-hidden sm:h-[450px]">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                <div className="relative bg-white pt-3 text-right">
                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {doctor.category}
                  </h3>

                  <p className="mt-2">
                    <span className="tracking-wider text-gray-900">
                      {doctor.name}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-neutral-800  md:text-3xl">
              الموقع يبسط الرعاية الصحية للجميع
            </h2>

            <p className="hidden text-gray-500 md:mt-4 md:block">
              انضم إلى آلاف المرضى الراضين الذين حصلوا على الرعاية المرغوبة والجودة من خلال منصتنا. صحتك هي أولويتنا.
            </p>

           
          </div>
        </div>

        <img
          alt=""
          src="https://images.pexels.com/photos/8293776/pexels-photo-8293776.jpeg"
          className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
        />
      </section>
    </section>
  );
}
