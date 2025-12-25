/**
 * Loading Spinner Component
 */
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-t-4 border-cyan-500 glow-cyan"></div>
        <div className="absolute top-0 left-0 animate-spin rounded-full h-20 w-20 border-r-4 border-l-4 border-purple-500 glow-purple" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
      </div>
      <p className="mt-6 text-gray-400 font-bold text-lg">Loading amazing content...</p>
    </div>
  );
};

export default LoadingSpinner;
