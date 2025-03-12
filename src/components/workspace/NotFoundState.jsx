const NotFoundState = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-8 bg-red-50 rounded-lg shadow-sm">
        <p className="text-red-500 font-medium text-lg">Workspace not found</p>
        <p className="text-gray-500 mt-2">The workspace you're looking for doesn't exist or has been deleted.</p>
      </div>
    </div>
  );
  
  export default NotFoundState;