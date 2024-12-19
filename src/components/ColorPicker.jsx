import React, { useState } from "react";

const ColorPicker = ({ onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState("#FF6B6B");

  const colorPalette = [
    "#FF6B6B", // Pastel Red
    "#4ECDC4", // Turquoise
    "#45B7D1", // Sky Blue
    "#FDCB6E", // Soft Yellow
    "#6C5CE7", // Lavender
    "#FF9FF3", // Pink
    "#A8E6CF", // Mint Green
    "#5F27CD", // Deep Purple
  ];

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-4 text-gray-700">
        Choose Your Color! 🎨
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {colorPalette.map((color) => (
          <button
            key={color}
            onClick={() => handleColorChange(color)}
            className={`
              w-12 
              h-12 
              rounded-full 
              hover:scale-110 
              transition-all 
              border-4
              focus:outline-none
              focus:ring-2
              focus:ring-black
              ${
                selectedColor === color
                  ? "border-black ring-2 ring-offset-2"
                  : "border-transparent"
              }
            `}
            style={{
              backgroundColor: color,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
            aria-label={`Select ${color} color`}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="
            w-full 
            h-12 
            rounded-full 
            cursor-pointer 
            p-1
            focus:outline-none
            focus:ring-2
            focus:ring-blue-300
          "
          aria-label="Custom color picker"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
