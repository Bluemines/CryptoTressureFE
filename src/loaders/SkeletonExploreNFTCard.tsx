const SkeletonExploreNFTCard = ({ isHero = false }: { isHero?: boolean }) => {
  return (
    <div
      className={`overflow-hidden bg-[rgba(32,32,36,0.5)] border border-gray-800 backdrop-blur-sm rounded-lg shadow-sm animate-pulse ${
        isHero ? "lg:flex gap-8 w-full" : ""
      }`}
    >
      <div className={`p-6 ${isHero ? "lg:w-1/2" : ""}`}>
        <div className={`mb-4 ${isHero ? "" : "hidden"}`}>
          <div className="h-6 bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-5 bg-purple-700 rounded w-1/3"></div>
        </div>

        <div className={`${isHero ? "" : "mb-4"}`}>
          {!isHero && (
            <>
              <div className="h-5 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-5 bg-purple-700 rounded w-1/3"></div>
            </>
          )}
        </div>

        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between text-gray-400">
              <div className="h-4 w-1/3 bg-gray-700 rounded"></div>
              <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>

        <div className="mt-6 h-10 bg-purple-700 rounded w-full" />
      </div>

      <div className={`relative ${isHero ? "lg:w-1/2" : "w-full"}`}>
        <div
          className={`w-full bg-gray-700 ${
            isHero ? "h-[400px] lg:h-full" : "h-48"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default SkeletonExploreNFTCard