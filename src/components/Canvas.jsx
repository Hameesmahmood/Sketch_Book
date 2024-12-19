import React, { useRef, useState, useEffect, forwardRef } from "react";

const Canvas = forwardRef(
  (
    {
      color = "#FF6B6B",
      brushSize = 5,
      mode = "draw",
      className = "",
      backgroundImage = null,
    },
    ref
  ) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

    const resizeCanvas = React.useCallback(() => {
      const container = containerRef.current;
      const canvas = canvasRef.current;

      if (!container || !canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Fill canvas with white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw background image if available
      if (backgroundImage) {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => {
          const containerWidth = rect.width;
          const containerHeight = rect.height;
          const imageAspect = img.width / img.height;
          const containerAspect = containerWidth / containerHeight;

          let drawWidth, drawHeight, offsetX, offsetY;

          if (containerAspect > imageAspect) {
            drawHeight = containerHeight;
            drawWidth = containerHeight * imageAspect;
            offsetX = (containerWidth - drawWidth) / 2;
            offsetY = 0;
          } else {
            drawWidth = containerWidth;
            drawHeight = containerWidth / imageAspect;
            offsetX = 0;
            offsetY = (containerHeight - drawHeight) / 2;
          }

          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, containerWidth, containerHeight);
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };
      }
    }, [backgroundImage]);

    useEffect(() => {
      const handleResize = () => resizeCanvas();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [resizeCanvas]);

    useEffect(() => {
      resizeCanvas();
    }, [backgroundImage, resizeCanvas]);

    const getCanvasPosition = (e) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const startDrawing = (e) => {
      const { x, y } = getCanvasPosition(e);
      const ctx = canvasRef.current.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(x, y);
      setLastPosition({ x, y });
      setIsDrawing(true);
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const ctx = canvasRef.current.getContext("2d");
      const { x, y } = getCanvasPosition(e);

      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(x, y);

      ctx.strokeStyle = mode === "erase" ? "white" : color;
      ctx.lineWidth = mode === "erase" ? brushSize * 2 : brushSize;
      ctx.stroke();
      setLastPosition({ x, y });
    };

    const stopDrawing = () => setIsDrawing(false);

    const clearCanvas = React.useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Redraw the white background (but not the background image)
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, rect.width, rect.height);
      }
    }, []);

    const saveCanvasImage = () => {
      const canvas = canvasRef.current;
      const link = document.createElement("a");
      link.download = `creative_drawing_${new Date()
        .toISOString()
        .slice(0, 10)}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };

    React.useImperativeHandle(ref, () => ({
      clearCanvas,
      saveCanvasImage,
    }));

    return (
      <div
        ref={containerRef}
        className={`canvas-container relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl shadow-lg ${className}`}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          className="relative z-20 w-full h-full bg-transparent cursor-crosshair touch-none"
        />
      </div>
    );
  }
);

Canvas.displayName = "Canvas";
export default Canvas;
