const StatsCard = ({ value, label, bgColor }: { value: string, label: string, bgColor: string }) => (
  <div className="rounded-xl p-4 bg-[#2B2B2B] flex-1">
    <div className="flex gap-4">
      <div className={`w-[55px] h-[55px] rounded-full ${bgColor}`}></div>
      <div>
        <div className="text-lg font-semibold">{value}</div>
        <div className="text-sm text-[#9d9d9d]">{label}</div>
      </div>
    </div>
  </div>
)

export default StatsCard