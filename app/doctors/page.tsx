"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Filter, Stethoscope, Award, Calendar, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");

  // Get all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    doctorsData.forEach((doctor) => {
      doctor.categories.forEach((cat) => categories.add(cat));
    });
    return ["الكل", ...Array.from(categories).sort()];
  }, []);

  // Filter doctors based on search and category
  const filteredDoctors = useMemo(() => {
    return doctorsData.filter((doctor: Doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "الكل" ||
        doctor.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">فريقنا الطبي</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            الأطباء المتخصصون
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            فريق من الأطباء الخبراء والمتخصصين لتقديم أفضل رعاية صحية
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن طبيب بالاسم أو التخصص..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pr-12 pl-4 text-right border-2 border-gray-200 focus:border-blue-500 rounded-xl"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">التخصص:</span>
            {allCategories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            تم العثور على <span className="font-bold text-blue-600">{filteredDoctors.length}</span> طبيب
          </p>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredDoctors.map((doctor: Doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
              >
                {/* Doctor Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs font-medium text-white bg-blue-600 px-2 py-1 rounded-full">
                        {doctor.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 text-right">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium text-right">
                      {doctor.specialization}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{doctor.experience} خبرة</span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed text-right line-clamp-2">
                    {doctor.description}
                  </p>

                  {/* Categories Tags */}
                  <div className="flex flex-wrap gap-2">
                    {doctor.categories.slice(0, 2).map((cat, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <Link href={`/getstart`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      احجز موعد
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              لم يتم العثور على أطباء
            </h3>
            <p className="text-gray-600">
              جرب البحث بكلمات مختلفة أو اختر تخصصاً آخر
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

