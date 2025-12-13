function StatCard({ type, count, label, icon }: { type: string, count: number, label: string, icon: React.ReactNode }) {
    return (
      
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="p-4 space-y-2">
                <div className="flex items-center space-x-2">
                    {icon}
                    <h3 className="text-gray-900 text-2xl font-bold">{count}</h3>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-gray-600">العدد الإجمالي ل {label}</p>
                </div>
            </div>
        </div>
    )
}

export default StatCard;