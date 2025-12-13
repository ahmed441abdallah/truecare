import { Badge } from '@/components/badge';
import { Cpu, Fingerprint, Pencil, Settings2, Sparkles, User, Zap, Stethoscope, Calendar, Activity, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export function ServicesPage() {
    return (
        <main className='p-4 md:p-8 lg:p-12'>
             <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl"> خدماتنا </h2>
                    <p> نقدم مجموعة واسعة من الخدمات لمساعدتك في إدارة صحتك ورفاهيتك.</p>
                </div>

                <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">سريع</h3>
                        </div>
                        <p className="text-sm">يدعم بشكل كامل مساعدة المرضى والأطباء.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">أمان البيانات </h3>
                        </div>
                        <p className="text-sm"> نضمن أن بياناتك آمنة ومتوافقة مع جميع القوانين واللوائح ذات الصلة.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Fingerprint className="size-4" />

                            <h3 className="text-sm font-medium">الجدولة </h3>
                        </div>
                        <p className="text-sm"> بسط جدولة المرضى، وأدر المواعيد، واحتفظ بسجلات دقيقة مع منصتنا البديهية.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Pencil className="size-4" />

                            <h3 className="text-sm font-medium">متتبعو الصحة</h3>
                        </div>
                        <p className="text-sm"> تتبع صحتك ورفاهيتك مع متتبعات الصحة الشاملة لدينا.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Settings2 className="size-4" />

                            <h3 className="text-sm font-medium">التحكم</h3>
                        </div>
                        <p className="text-sm"> تحكم في صحتك ورفاهيتك مع لوحة التحكم الشاملة لدينا.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />

                            <h3 className="text-sm font-medium">مبني للذكاء الاصطناعي</h3>
                        </div>
                        <p className="text-sm"> مبني لمستقبل الرعاية الصحية، تحدث مع طبيبك واحصل على توصيات مخصصة.</p>
                    </div>
                </div>
            </div>
        </section>
        <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-end">
            <div>
              <Badge>خدمات الرعاية الصحية</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-right">
                حلول رعاية صحية شاملة
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-right">
                تمكين المرضى ومقدمي الرعاية الصحية بأدوات مبتكرة لإدارة صحية أفضل وتقديم رعاية محسنة.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              className="relative rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col overflow-hidden group"
            >
              <Image
                src="https://images.pexels.com/photos/4226123/pexels-photo-4226123.jpeg"
                alt="مساعد صحي مدعوم بالذكاء الاصطناعي"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 transition-all"></div>
              <div className="relative z-10">
                <Stethoscope className="w-8 h-8 stroke-1 text-white" />
              </div>
              <div className="flex flex-col relative z-10" >
                <h3 className="text-xl tracking-tight text-white">مساعد صحي مدعوم بالذكاء الاصطناعي</h3>
                <p className="text-white/90 max-w-xs text-base">
                  احصل على توصيات صحية فورية ومخصصة وتحدث مع مساعدنا بالذكاء الاصطناعي للحصول على إرشادات ودعم طبي على مدار الساعة.
                </p>
              </div>
            </div>
            <div 
              className="relative rounded-md aspect-square p-6 flex justify-between flex-col overflow-hidden group"
            >
              <Image
                src="https://images.pexels.com/photos/7089296/pexels-photo-7089296.jpeg"
                alt="جدولة مواعيد ذكية"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 transition-all"></div>
              <div className="relative z-10">
                <Calendar className="w-8 h-8 stroke-1 text-white" />
              </div>
              <div className="flex flex-col relative z-10">
                <h3 className="text-xl tracking-tight text-white">جدولة مواعيد ذكية</h3>
                <p className="text-white/90 max-w-xs text-base">
                  احجز المواعيد بسلاسة مع التوفر في الوقت الفعلي وتذكيرات تلقائية لتنسيق رعاية أفضل.
                </p>
              </div>
            </div>

            <div 
              className="relative rounded-md aspect-square p-6 flex justify-between flex-col overflow-hidden group"
            >
              <Image
                src="https://images.pexels.com/photos/7579833/pexels-photo-7579833.jpeg"
                alt="تتبع مؤشرات الصحة"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 transition-all"></div>
              <div className="relative z-10">
                <Activity className="w-8 h-8 stroke-1 text-white" />
              </div>
              <div className="flex flex-col relative z-10">
                <h3 className="text-xl tracking-tight text-white">تتبع مؤشرات الصحة</h3>
                <p className="text-white/90 max-w-xs text-base">
                  راقب علاماتك الحيوية وأنماط نومك وأهداف لياقتك البدنية مع أدوات تتبع الصحة الشاملة.
                </p>
              </div>
            </div>
            <div 
              className="relative rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col overflow-hidden group"
            >
              <Image
                src="https://images.pexels.com/photos/7221119/pexels-photo-7221119.jpeg"
                alt="توصيات يومية مخصصة"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 transition-all"></div>
              <div className="relative z-10">
                <Heart className="w-8 h-8 stroke-1 text-white" />
              </div>
              <div className="flex flex-col relative z-10">
                <h3 className="text-xl tracking-tight text-white">توصيات يومية مخصصة</h3>
                <p className="text-white/90 max-w-xs text-base">
                  احصل على رؤى صحية مخصصة بناءً على مقاييسك اليومية، مما يساعدك على اتخاذ قرارات مستنيرة حول رحلتك الصحية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </main>
       
    )
}
export default ServicesPage;