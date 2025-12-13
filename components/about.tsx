import Image from "next/image";
export default function About() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-prose md:max-w-none">
              <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
               عن الموقع وخدماتنا
              </h2>
              <p className="mt-4 text-gray-700">
                نحن نهتم بالرعاية الصحية التي تستحقها، ونعمل على تقديم الرعاية الصحية المتكاملة والموجهة نحو الشخصية للمرضى. نؤمن بنهجنا الشامل في الصحة، والذي يتضمن غير المرضي فقط بل أيضاً التركيز على التعاون مع المرضى لتحقيق التقدم الصحي الشامل. فريقنا من الخبراء المؤهلين يؤمن بتقديم الرعاية الشخصية التي تتناسب مع الاحتياجات الفردية لكل فرد.
              </p>
            </div>
          </div>

          <div className="relative w-full h-[400px] mt-6">
            <Image
              src="https://images.pexels.com/photos/7735626/pexels-photo-7735626.jpeg"
              alt="Healthcare services"
              fill
              className="rounded object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="p-32 gap-8 grid grid-cols-1 sm:grid-cols-2">
        <div className="relative w-full h-[400px] mt-6">
          <Image
            src="https://images.pexels.com/photos/6627859/pexels-photo-6627859.jpeg"
            alt="Healthcare team"
            fill
            className="rounded object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
        <ol className="relative space-y-8 before:absolute before:-ml-px before:h-full before:w-0.5 before:rounded-full before:bg-gray-200">
          <li className="relative -ms-1.5 flex items-start gap-4">
            <span className="size-3 shrink-0 rounded-full bg-[#24AE7C]"></span>

            <div className="-mt-2">
              <h3 className="text-lg font-bold text-gray-900">فريقنا الخبراء</h3>

              <p className="mt-0.5 text-sm text-gray-700">
                فريقنا من الخبراء المؤهلين يؤمن بتقديم الرعاية الشخصية التي تتناسب مع الاحتياجات الفردية لكل فرد.
              </p>
            </div>
          </li>

          <li className="relative -ms-1.5 flex items-start gap-4">
            <span className="size-3 shrink-0 rounded-full bg-[#24AE7C]"></span>

            <div className="-mt-2">
              <h3 className="text-lg font-bold text-gray-900">
                رعاية المرضى المركزة
              </h3>

              <p className="mt-0.5 text-sm text-gray-700">
                نؤمن بالتركيز على الاحتياجات والتفضيلات الفردية للمرضى. نحن نطور خطط الرعاية التي تتناسب مع كل فرد، والتي تضمن لهم الحصول على العلاجات الأكثر فعالية ومناسبة لهم.
              </p>
            </div>
          </li>

          <li className="relative -ms-1.5 flex items-start gap-4">
            <span className="size-3 shrink-0 rounded-full bg-[#24AE7C]"></span>

            <div className="-mt-2">
              <h3 className="text-lg font-bold text-gray-900">
                الثقة منذ 2020
              </h3>

              <p className="mt-0.5 text-sm text-gray-700">
                منذ تأسيسنا في عام 2020، نحن نبني شهرة الثقة والموثوقية لنا. نحن نؤمن بالثقة من قبل المرضى، ونحن نؤمن بالحفاظ على هذه الثقة من خلال العلاج المتميز.
                .
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
