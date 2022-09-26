import { useEffect, useState, useRef } from "react";

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#2E2E3B");
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = document.getElementById("canvas").offsetWidth;
    canvas.height = document.getElementById("canvas").offsetHeight;
  }, []);

  // Desktop
  const handleMouseUp = (e) => {
    setIsDrawing(false)
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // reset the current path
    ctx.beginPath();
    ctx.moveTo(x, y);
    // Draw a dot
    ctx.lineTo(x, y);
    // make the line smoother
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
    // set the color and width of the line
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    // reset the current path
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.lineTo(x, y);
      // make the line smoother
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.stroke();
      // set the color and width of the line
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    }
  };

  // Mobile
  const handleTouchUp = (e) => {
    setIsDrawing(false)
  };

  const handleTouchDown = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    // reset the current path
    ctx.beginPath();
    ctx.moveTo(x, y);
    // Draw a dot
    ctx.lineTo(x, y);
    // make the line smoother
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
    // set the color and width of the line
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    // reset the current path
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleTouchMove = (e) => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      ctx.lineTo(x, y);
      // make the line smoother
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.stroke();
      // set the color and width of the line
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <main>
      <div className="container">
        <div className="canvas-wrapper">
          <div className="controls">
            <div className="width-picker">
              <input type="number"
                value={lineWidth}
                onClick={(e) => e.target.select()}
                onChange={(e) => {
                  if(e.target.value < 0) {
                    setLineWidth(0);
                  } else if(e.target.value > 100) {
                    setLineWidth(100);
                  } else {
                    setLineWidth(e.target.value);
                  }
                }
              }
              />
            </div>
            <div className="color-picker">
              <input type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <button className="btn"
              onClick={clear}
            >Clear</button>
          </div>
          <div id="canvas">
            <canvas ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              // For mobile
              onTouchStart={handleTouchDown}
              onTouchEnd={handleTouchUp}
              onTouchMove={handleTouchMove}
            ></canvas>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
