// src/components/FloatingCircle.jsx
export default function FloatingCircle({ size, color, top, left, animate = "animate-bounce" }) {
  return (
    <div
      className={`absolute rounded-full opacity-30 ${animate}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top: top,
        left: left,
      }}
    />
  );
}
