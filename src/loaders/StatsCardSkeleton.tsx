const StatsCardSkeleton = () => (
  <div className="rounded-xl p-4 bg-[#2B2B2B] flex-1 animate-pulse">
    <div className="flex gap-4">
      <div className="w-[55px] h-[55px] rounded-full bg-[#444]" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-5 w-24 bg-[#444] rounded" />
        <div className="h-4 w-16 bg-[#444] rounded" />
      </div>
    </div>
  </div>
);

export default StatsCardSkeleton