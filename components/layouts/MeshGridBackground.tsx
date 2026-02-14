import React from "react";

interface MeshGridBackgroundProps {
  className?: string;
}

const MeshGridBackground: React.FC<MeshGridBackgroundProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        zIndex: -1,
      }}
    />
  );
};

export default MeshGridBackground;
