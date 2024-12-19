import React, { useState } from "react";

const ToolBar = ({
  onSelectPencil,
  onSelectEraser,
  onAddBackground,
  className = "",
}) => {
  const [activeTools, setActiveTools] = useState({
    pencil: true,
    eraser: false,
    backgrounds: false,
  });

  const handleToolSelect = (tool) => {
    const newActiveTools = {
      pencil: false,
      eraser: false,
      backgrounds: false,
    };
    newActiveTools[tool] = true;
    setActiveTools(newActiveTools);

    switch (tool) {
      case "pencil":
        onSelectPencil();
        break;
      case "eraser":
        onSelectEraser();
        break;
      case "backgrounds":
        onAddBackground();
        break;
    }
  };

  const tools = [
    {
      name: "pencil",
      icon: "✏️",
      color: "bg-blue-400",
      label: "Draw",
    },
    {
      name: "eraser",
      icon: "🧽",
      color: "bg-red-400",
      label: "Erase",
    },
    {
      name: "backgrounds",
      icon: "🌈",
      color: "bg-purple-400",
      label: "Backgrounds",
    },
  ];

  return (
    <div
      className={`
        flex 
        ${className}
        space-y-4
      `}
      role="toolbar"
    >
      {tools.map(({ name, icon, color, label }) => (
        <button
          key={name}
          onClick={() => handleToolSelect(name)}
          className={`
            w-16 
            h-16 
            rounded-full 
            text-3xl 
            flex 
            items-center 
            justify-center 
            transform 
            transition-all 
            hover:scale-110
            focus:outline-none
            focus:ring-2
            focus:ring-black
            ${
              activeTools[name]
                ? `${color} scale-110 border-4 border-black`
                : "bg-gray-200 hover:bg-gray-300"
            }
          `}
          aria-label={label}
          aria-pressed={activeTools[name]}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default ToolBar;
