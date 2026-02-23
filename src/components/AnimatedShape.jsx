// src/components/AnimatedShape.jsx
import React from "react";

export default function AnimatedShape({
  size = 40,
  top = 0,
  left = 0,
  delay = 0,
  duration = 10,
  shape = "circle", // "circle", "blob", "triangle"
  color = "rgba(255, 255, 255, 0.1)",
}) {
  // Shape styles
  const shapeStyle = {
    position: "absolute",
    top: `${top}%`,
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: shape === "triangle" ? "transparent" : color,
    borderRadius: shape === "circle" ? "50%" : shape === "blob" ? "40% 60% 70% 30%" : 0,
    clipPath:
      shape === "triangle"
        ? "polygon(50% 0%, 0% 100%, 100% 100%)"
        : undefined,
    zIndex: 5,
    animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`,
  };

  return <div style={shapeStyle}></div>;
}
