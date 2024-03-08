import React from 'react';

const ShimmerEffect = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => ( // Assuming you want to display 5 placeholder shimmers
        <div key={index} className="animate-pulse flex flex-col space-y-3">
          <div className="h-36 bg-gray-300 rounded-md"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerEffect;
