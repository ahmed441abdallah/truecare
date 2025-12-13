"use client"

import { useState } from "react"
import { Appointment } from "@/types/appwrite.types"
import AppointmentActionsModal from "./AppointmentActionsModal"
import PatientInfoModal from "./PatientInfoModal"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
  } from "@tanstack/react-table"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@/components/ui/input"

function PatientNameCell({ userName, userId, patientId }: { userName: string; userId: string; patientId?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (userName === 'N/A' || userName === 'غير متاح' || !userId) {
    return <p className="text-sm font-medium">غير متاح</p>
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
      >
        {userName}
      </button>
      <PatientInfoModal
        userId={userId}
        patientId={patientId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export const columns: ColumnDef<Appointment>[] = [
    {
        header:"تسلسل",
        cell:({row})=>{
            return <p className="text-sm font-medium">{row.index+1}</p>
        }   
    },
    {
        accessorKey:"user",
        header:"اسم المريض",
        cell:({row})=>{
            const appointment = row.original as any;
            const user = appointment.user;
            const userName = typeof user === 'object' && user !== null && 'name' in user
                ? user.name
                : 'غير متاح';
            const userId = appointment.userId;
            const patientId = appointment.patient;
            
            return <PatientNameCell userName={userName} userId={userId} patientId={patientId} />
        }   
    },
    {
        accessorKey:"status",
        header:"الحالة",
        cell:({row})=>{
            const status = row.original.status || 'غير متاح';
            const statusColors: Record<string, string> = {
                scheduled: 'text-green-600 bg-green-100',
                pending: 'text-yellow-600 bg-yellow-100',
                cancelled: 'text-red-600 bg-red-100'
            };
            const statusTranslations: Record<string, string> = {
                scheduled: 'مجدول',
                pending: 'معلق',
                cancelled: 'ملغى'
            };
            const colorClass = statusColors[status] || 'text-gray-600 bg-gray-100';
            const translatedStatus = statusTranslations[status] || status;
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                    {translatedStatus}
                </span>
            );
        }   
    },
    {
        accessorKey:"primaryPhysician",
        header:"اسم الطبيب",
        cell:({row})=>{
            const doctorName = row.original.primaryPhysician || 'غير متاح';
            return <p className="text-sm font-medium">{doctorName}</p>
        }   
    },
    {
        accessorKey:"schedule",
        header:"التاريخ",
        cell:({row})=>{
            const schedule = row.original.schedule;
            if (!schedule) return <p className="text-sm font-medium">غير متاح</p>;
            
            const date = new Date(schedule);
            const formattedDate = date.toLocaleDateString('ar-SA', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            return <p className="text-sm font-medium">{formattedDate}</p>
        }   
    },
    {
        id: "actions",
        header: "الإجراءات",
        cell: ({ row }) => {
            const appointment = row.original;
            
            const handleUpdate = () => {
                window.location.reload();
            };
            
            return (
                <AppointmentActionsModal 
                    appointment={appointment as Appointment & { $id: string }}
                    onUpdate={handleUpdate}
                />
            );
        }
    }
   
]