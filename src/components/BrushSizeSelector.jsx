import React, { useState } from "react";

const BrushSizeSelector = ({ onBrushSizeChange }) => {
  const [brushSize, setBrushSize] = useState(5);

  const brushSizes = [
    { size: 2, emoji: "✏️" },
    { size: 5, emoji: "🖌️" },
    { size: 10, emoji: "🖍️" },
    { size: 15, emoji: "🖋️" },
  ];

  const handleSizeChange = (newSize) => {
    setBrushSize(newSize);
    onBrushSizeChange(newSize);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-4 text-gray-700">
        Brush Size: {brushSize}
      </h3>
      <div className="flex justify-center space-x-4 mb-4">
        {brushSizes.map(({ size, emoji }) => (
          <button
            key={size}
            onClick={() => handleSizeChange(size)}
            className={`
              w-16 
              h-16 
              rounded-full 
              flex 
              items-center 
              justify-center 
              text-3xl 
              transition-all 
              hover:scale-110
              focus:outline-none
              focus:ring-2
              focus:ring-blue-300
              ${
                brushSize === size
                  ? "bg-yellow-300 scale-110 ring-2 ring-black"
                  : "bg-blue-100 hover:bg-blue-200"
              }
            `}
            aria-label={`Select brush size ${size}`}
          >
            {emoji}
          </button>
        ))}
      </div>
      <input
        type="range"
        min="1"
        max="20"
        value={brushSize}
        onChange={(e) => handleSizeChange(Number(e.target.value))}
        className="
          w-full 
          h-2 
          bg-blue-200 
          rounded-full 
          appearance-none 
          cursor-pointer
          focus:outline-none
          focus:ring-2
          focus:ring-blue-300
        "
        aria-label="Brush size slider"
      />
    </div>
  );
};

export default BrushSizeSelector;
