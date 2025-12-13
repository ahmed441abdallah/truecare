import { DataTable } from "@/components/table/Datatable";
import StatCard from "@/components/statCard";
import { getRecentAppointments } from "@/lib/actions/appointment.actions";
import { CalendarCheck2, CalendarIcon, ClipboardClock, TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { columns } from "@/components/table/coulmns";
 async function AdminPage() {     
    const appointments = await getRecentAppointments();
    console.log(appointments);
    return (
        <div className="sm:mx-auto p-2 sm:p-6 lg:p-8 max-w-7xl flex-col space-y-14 bg-white h-screen">
            <header className="flex items-center border-b border-gray-200 justify-between py-4">
                <Link href="/" className="cursor-pointer">
                    <Image src="/logo.png" alt="logo" width={100} height={100} />
                </Link>
                <div className="flex items-center space-x-4">    
                    لوحة تحكم المدير
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full space-y-4">
                    <h1 className="text-2xl font-bold">مرحباً بك في لوحة تحكم المدير👋</h1>
                    <p className="text-gray-600">إدارة نظام الرعاية الصحية بسهولة.</p>
                    

                </section>
                <section className="grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard  
                    type="appointments"
                    count={appointments?.scheduledCount}
                    label="المواعيد المجدولة"
                    icon={<CalendarCheck2 className="w-6 h-6 text-green-500" />}
                    />
                    <StatCard  
                    type="pending " 
                    count={appointments?.pendingCount}
                    label="المواعيد المعلقة"  
                    icon={
                        <ClipboardClock className="w-6 h-6 text-yellow-500" />
                    }
                    />
                    <StatCard  
                    type="cancelled "
                    count={appointments?.cancelledCount}
                    label="المواعيد الملغاة"
                    icon={<TriangleAlert className="w-6 h-6 text-red-500" />}
                     />
                </section>
                <div className="container mx-auto py-10">
                <DataTable columns={columns} data={appointments?.documents || []} />

                    </div>
            </main>
        </div>
    )
}

export default AdminPage;