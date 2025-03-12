const LoadingState = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse text-center">
        <div className="h-8 w-48 bg-gray-200 rounded mb-4 mx-auto"></div>
        <p className="text-gray-500">Loading workspace...</p>
      </div>
    </div>
  );
  
  export default LoadingState;