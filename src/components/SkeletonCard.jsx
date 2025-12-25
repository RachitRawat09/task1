const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow animate-pulse overflow-hidden">
      
      <div className="aspect-[2/3] bg-zinc-200 dark:bg-zinc-800" />

      <div className="p-3 space-y-2">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3" />

        <div className="flex gap-2 mt-2">
          <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-700 rounded" />
          <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
          <div className="h-5 w-10 bg-zinc-200 dark:bg-zinc-700 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;

