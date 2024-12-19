import React, { useRef, useState } from "react";
import Canvas from "./components/Canvas";
import ColorPicker from "./components/ColorPicker";
import BrushSizeSelector from "./components/BrushSizeSelector";
import ToolBar from "./components/ToolBar";
import BackgroundSelector from "./components/BackgroundSelector";
import "./App.css";

function App() {
  const [color, setColor] = useState("#FF6B6B");
  const [brushSize, setBrushSize] = useState(5);
  const [activeTool, setActiveTool] = useState("pencil");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const canvasRef = useRef(null);

  // Unified tool selection handler
  const handleToolSelect = (tool) => {
    setActiveTool(tool);
    if (tool === "backgrounds") {
      setShowBackgroundSelector(true);
    }
    setIsMenuOpen(false);
  };

  const handleBackgroundSelect = (backgroundPath) => {
    setSelectedBackground(backgroundPath);
    setShowBackgroundSelector(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const clearCanvas = () => {
    canvasRef.current?.clearCanvas();
    setIsMenuOpen(false);
  };

  const saveCanvas = () => {
    canvasRef.current?.saveCanvasImage();
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      {/* Mobile View */}
      <div className="mobile-view md:hidden">
        <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center">
          <div className="flex space-x-2 bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={clearCanvas}
              className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors"
              title="Clear Canvas"
            >
              🧽
            </button>
            <button
              onClick={toggleMenu}
              className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            >
              {isMenuOpen ? "✖️" : "🎨"}
            </button>
            <button
              onClick={saveCanvas}
              className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
              title="Save Drawing"
            >
              💾
            </button>
          </div>
        </div>

        <div
          className={`
            mobile-menu 
            fixed 
            bottom-0 
            left-0 
            right-0 
            bg-white 
            rounded-t-3xl 
            shadow-2xl 
            transform 
            transition-transform 
            duration-300 
            ease-in-out 
            ${isMenuOpen ? "translate-y-0" : "translate-y-full"}
            z-40 
            p-4
          `}
        >
          <div className="space-y-4">
            <ToolBar
              onSelectPencil={() => handleToolSelect("pencil")}
              onSelectEraser={() => handleToolSelect("eraser")}
              onAddBackground={() => handleToolSelect("backgrounds")}
              className="flex justify-center space-x-4 mb-4"
            />
            <div className="flex flex-col space-y-4">
              <ColorPicker onColorChange={setColor} />
              <BrushSizeSelector onBrushSizeChange={setBrushSize} />
            </div>
          </div>
        </div>

        <div className="w-full h-screen flex flex-col">
          <h1 className="text-3xl font-bold text-center py-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Creative Playground 🎨
          </h1>
          <Canvas
            ref={canvasRef}
            color={color}
            brushSize={brushSize}
            mode={activeTool === "eraser" ? "erase" : "draw"}
            backgroundImage={selectedBackground}
            className="flex-grow"
          />
        </div>

        <BackgroundSelector
          isOpen={showBackgroundSelector}
          onClose={() => setShowBackgroundSelector(false)}
          onSelectBackground={handleBackgroundSelect}
        />
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex bg-white rounded-3xl shadow-2xl w-full max-w-7xl flex-col items-stretch desktop-layout">
        <h1 className="text-4xl md:text-5xl font-bold text-center py-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Creative Playground 🎨
        </h1>

        <div className="flex flex-col md:flex-row items-stretch relative">
          {/* Left Sidebar for Tool Bar */}
          <div className="md:w-24 flex flex-col md:items-center md:justify-center p-2 bg-white rounded-l-3xl shadow-lg">
            <ToolBar
              onSelectPencil={() => handleToolSelect("pencil")}
              onSelectEraser={() => handleToolSelect("eraser")}
              onAddBackground={() => handleToolSelect("backgrounds")}
              className="flex-col items-center space-y-4"
            />
          </div>

          {/* Main Canvas Area */}
          <div className="flex-grow flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl">
              <Canvas
                ref={canvasRef}
                color={color}
                brushSize={brushSize}
                mode={activeTool === "eraser" ? "erase" : "draw"}
                backgroundImage={selectedBackground}
                className="w-full aspect-video bg-white rounded-3xl shadow-lg"
              />

              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={clearCanvas}
                  className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                  title="Clear Canvas"
                >
                  🧽
                </button>
                <button
                  onClick={saveCanvas}
                  className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
                  title="Save Drawing"
                >
                  💾
                </button>
              </div>
            </div>
          </div>

          {/* Background Selector */}
          <BackgroundSelector
            isOpen={showBackgroundSelector}
            onClose={() => setShowBackgroundSelector(false)}
            onSelectBackground={handleBackgroundSelect}
          />

          {/* Right Sidebar for Color and Brush Controls */}
          <div className="md:w-56 flex flex-col space-y-4 p-4 bg-white rounded-r-3xl shadow-lg">
            <ColorPicker onColorChange={setColor} />
            <BrushSizeSelector onBrushSizeChange={setBrushSize} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
