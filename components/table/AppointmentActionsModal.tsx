"use client"

import { useState } from "react"
import { updateAppointmentStatus } from "@/lib/actions/appointment.actions"
import { X, CheckCircle, Clock, MoreVertical } from "lucide-react"
import { Appointment } from "@/types/appwrite.types"

interface AppointmentActionsModalProps {
  appointment: Appointment & { $id: string }
  onUpdate: () => void
}

export default function AppointmentActionsModal({ appointment, onUpdate }: AppointmentActionsModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusUpdate = async (newStatus: "scheduled" | "pending" | "cancelled") => {
    setIsLoading(true)
    try {
      const result = await updateAppointmentStatus((appointment as any).$id, newStatus)
      if (result) {
        setIsOpen(false)
        onUpdate()
      }
    } catch (error) {
      console.error("Error updating appointment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const currentStatus = appointment.status

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
        title="الإجراءات"
      >
        <MoreVertical className="w-4 h-4" />
        الإجراءات
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">إجراءات الموعد</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">الحالة الحالية:</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                currentStatus === "scheduled" ? "bg-green-100 text-green-700" :
                currentStatus === "pending" ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
              }`}>
                {currentStatus === "scheduled" ? "مجدول" :
                 currentStatus === "pending" ? "معلق" :
                 currentStatus === "cancelled" ? "ملغى" : currentStatus}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-3">تغيير الحالة إلى:</p>
              
              {currentStatus !== "cancelled" && (
                <button
                  onClick={() => handleStatusUpdate("cancelled")}
                  disabled={isLoading}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-4 h-4" />
                  إلغاء الموعد
                </button>
              )}
              
              {currentStatus !== "scheduled" && (
                <button
                  onClick={() => handleStatusUpdate("scheduled")}
                  disabled={isLoading}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-4 h-4" />
                  جدولة الموعد
                </button>
              )}
              
              {currentStatus !== "pending" && (
                <button
                  onClick={() => handleStatusUpdate("pending")}
                  disabled={isLoading}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-yellow-600 bg-yellow-50 rounded-md hover:bg-yellow-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Clock className="w-4 h-4" />
                  تعيين كقيد الانتظار
                </button>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

