import React from "react";

interface StoryMapEmbedProps {
  url: string;
  height?: string;
}

const StoryMapEmbed: React.FC<StoryMapEmbedProps> = ({
  url,
  height = "100vh",
}) => {
  return (
    <div style={{ width: "100%", height, border: "none", overflow: "hidden" }}>
      <iframe
        src={url}
        width="100%"
        height="100%"
        style={{
          border: "none",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        }}
        allowFullScreen
        loading="lazy"
        title="StoryMap"
      />
    </div>
  );
};

export default StoryMapEmbed;
