function Loading() {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-700 animate-spin absolute top-4 left-4"></div>
        <div className="h-8 w-8 rounded-full border-t-4 border-b-4 border-blue-900 animate-spin absolute top-8 left-8"></div>
      </div>
      <p className="mt-6 text-gray-600 font-medium">Loading data...</p>
    </div>
  );
}

export default Loading;
