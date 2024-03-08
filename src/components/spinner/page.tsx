const Spinner = () => {
    return (
      <div className="space-y-4 w-full">
        {[...Array(5)].map((_, index) => ( // Example for 5 shimmer items
          <div key={index} className="animate-pulse flex flex-col space-y-3 p-4">
            <div className="h-36 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 dark:bg-gray-700"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Spinner;
  