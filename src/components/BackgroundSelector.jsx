import React from "react";

const BackgroundSelector = ({ onSelectBackground, isOpen, onClose }) => {
  // Update the paths to match your public folder structure
  const backgroundImages = [
    // Assuming images are in public/backgrounds/
    "/backgrounds/Birds.png",
    "/backgrounds/cat.png",
    "/backgrounds/flower.png",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-4 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select Background</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close"
          >
            ✖️
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                console.log("Selected background:", image); // Debug log
                onSelectBackground(image);
                onClose();
              }}
              className="cursor-pointer aspect-video relative rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all transform hover:scale-105"
            >
              <img
                src={image}
                alt={`Background ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Image failed to load:", image);
                  e.target.src = "/placeholder.png"; // Optional: provide a fallback image
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundSelector;
