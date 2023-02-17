import React, { useState, useRef, useEffect } from "react";

const ResizableDiv = () => {
  const [firstDivWidth, setFirstDivWidth] = useState(200);
  const firstDivRef = useRef(null);
  const handleRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleRef.current.setPointerCapture(e.pointerId);
    document.addEventListener("pointermove", handleMouseMove(e));
    document.addEventListener("pointerup", handleMouseUp(e));
  };

  const handleMouseMove = (e) => {
    let newWidth = e.clientX - firstDivRef.current.offsetLeft;
    if (
      newWidth >= 0 &&
      newWidth <= firstDivRef.current.offsetParent.offsetWidth - newWidth - 20
    ) {
      setFirstDivWidth(newWidth);
    }
  };

  const handleMouseUp = (e) => {
    handleRef.current.releasePointerCapture(e.pointerId);
    document.removeEventListener("pointermove", handleMouseMove);
    document.removeEventListener("pointerup", handleMouseUp);
  };

  useEffect(() => {
    firstDivRef.current.style.width = firstDivWidth + "px";
  }, [firstDivWidth]);

  return (
    <div style={{ display: "flex" }}>
      <div
        ref={firstDivRef}
        style={{
          width: firstDivWidth + "px",
          height: "100%",
          backgroundColor: "lightblue",
        }}
      >
        First div content
      </div>
      <div
        style={{
          width: "20px",
          height: "100%",
          backgroundColor: "#333",
          cursor: "ew-resize",
        }}
      >
        <div
          ref={handleRef}
          style={{
            width: "20px",
            height: "100%",
            backgroundColor: "#333",
            position: "absolute",
            right: 0,
            cursor: "ew-resize",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onPointerDown={handleMouseDown}
        />
      </div>
      <div
        style={{ flexGrow: 1, height: "100%", backgroundColor: "lightgray" }}
      >
        Second div content
      </div>
    </div>
  );
};

export default ResizableDiv;
