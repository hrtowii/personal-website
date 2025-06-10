import React, { useState, useEffect, useRef } from "react";

const DraggableGallery = ({ albums }) => {
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (!albums || albums.length === 0) return;

    const generateImages = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const imageWidth = 180;
      const imageHeight = 120;

      // Calculate how many images can fit based on viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let numImages;
      if (viewportWidth < 576) {
        numImages = Math.min(4, albums.length);
      } else if (viewportWidth < 1024) {
        numImages = Math.min(6, albums.length);
      } else {
        numImages = Math.min(8, albums.length);
      }

      // Shuffle albums and take the number we need
      const shuffledAlbums = [...albums]
        .sort(() => 0.5 - Math.random())
        .slice(0, numImages);

      // Create a grid-based distribution system
      const cols = Math.ceil(
        Math.sqrt(numImages * (containerRect.width / containerRect.height))
      );
      const rows = Math.ceil(numImages / cols);

      const cellWidth = containerRect.width / cols;
      const cellHeight = containerRect.height / rows;

      // Create shuffled grid positions
      const gridPositions = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (gridPositions.length < numImages) {
            gridPositions.push({ row, col });
          }
        }
      }
      // Shuffle grid positions for randomness
      gridPositions.sort(() => 0.5 - Math.random());

      const newImages = shuffledAlbums.map((album, index) => {
        const gridPos = gridPositions[index];

        // Calculate base position from grid
        const baseCellX = gridPos.col * cellWidth;
        const baseCellY = gridPos.row * cellHeight;

        // Add some randomness within the cell (but ensure image stays in bounds)
        const maxOffsetX = Math.max(0, cellWidth - imageWidth);
        const maxOffsetY = Math.max(0, cellHeight - imageHeight);

        const randomOffsetX = Math.random() * maxOffsetX;
        const randomOffsetY = Math.random() * maxOffsetY;

        const x = Math.min(
          baseCellX + randomOffsetX,
          containerRect.width - imageWidth
        );
        const y = Math.min(
          baseCellY + randomOffsetY,
          containerRect.height - imageHeight
        );

        const rotation = (Math.random() - 0.5) * 30; // -15 to +15 degrees
        const scale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2 scale

        return {
          id: album.id,
          src: album.data.cover.src,
          alt: album.data.title,
          x,
          y,
          rotation,
          scale,
          zIndex: index + 1,
        };
      });

      setImages(newImages);
    };

    generateImages();

    const handleResize = () => {
      generateImages();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [albums]);

  const handleMouseDown = (e, imageId) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragging(imageId);
    setDragOffset({ x: offsetX, y: offsetY });

    // Bring to front
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? { ...img, zIndex: Math.max(...prev.map((i) => i.zIndex)) + 1 }
          : img
      )
    );
  };

  const handleTouchStart = (e, imageId) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;

    setDragging(imageId);
    setDragOffset({ x: offsetX, y: offsetY });

    // Bring to front
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? { ...img, zIndex: Math.max(...prev.map((i) => i.zIndex)) + 1 }
          : img
      )
    );
  };

  const handleMouseMove = (e) => {
    if (!dragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;

    // Constrain to container bounds
    const imageWidth = 180;
    const imageHeight = 120;
    const constrainedX = Math.max(
      0,
      Math.min(newX, containerRect.width - imageWidth)
    );
    const constrainedY = Math.max(
      0,
      Math.min(newY, containerRect.height - imageHeight)
    );

    setImages((prev) =>
      prev.map((img) =>
        img.id === dragging ? { ...img, x: constrainedX, y: constrainedY } : img
      )
    );
  };

  const handleTouchMove = (e) => {
    if (!dragging || !containerRef.current) return;

    const touch = e.touches[0];
    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = touch.clientX - containerRect.left - dragOffset.x;
    const newY = touch.clientY - containerRect.top - dragOffset.y;

    // Constrain to container bounds
    const imageWidth = 180;
    const imageHeight = 120;
    const constrainedX = Math.max(
      0,
      Math.min(newX, containerRect.width - imageWidth)
    );
    const constrainedY = Math.max(
      0,
      Math.min(newY, containerRect.height - imageHeight)
    );

    setImages((prev) =>
      prev.map((img) =>
        img.id === dragging ? { ...img, x: constrainedX, y: constrainedY } : img
      )
    );
  };

  const handleMouseUp = () => {
    setDragging(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchEnd = () => {
    setDragging(null);
    setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [dragging, dragOffset]);

  return (
    <div
      ref={containerRef}
      className="draggable-gallery"
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
        border: "1px dashed rgba(255, 255, 255, 0.2)",
        borderRadius: "8px",
        userSelect: "none",
      }}
    >
      {images.map((image) => (
        <div
          key={image.id}
          className="draggable-image"
          style={{
            position: "absolute",
            left: `${image.x}px`,
            top: `${image.y}px`,
            width: "180px",
            height: "120px",
            transform: `rotate(${image.rotation}deg) scale(${image.scale})`,
            zIndex: image.zIndex,
            cursor: dragging === image.id ? "grabbing" : "grab",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            transition: dragging === image.id ? "none" : "transform 0.2s ease",
          }}
          onMouseDown={(e) => handleMouseDown(e, image.id)}
          onTouchStart={(e) => handleTouchStart(e, image.id)}
        >
          {/* <a href={`/rices/${image.id}`} style={{ display: 'block', width: '100%', height: '100%' }}> */}
          <img
            src={image.src}
            alt={image.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              pointerEvents: "none",
            }}
            draggable={false}
          />
          {/* </a> */}
        </div>
      ))}

      {images.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "14px",
          }}
        >
          Loading images...
        </div>
      )}
    </div>
  );
};

export default DraggableGallery;
