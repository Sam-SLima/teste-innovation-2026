export const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-10">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="animate-pulse bg-white rounded-lg p-4 shadow">
          <div className="bg-gray-300 h-40 rounded mb-4" />
          <div className="bg-gray-300 h-4 rounded w-3/4 mb-2" />
          <div className="bg-gray-300 h-4 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
};
