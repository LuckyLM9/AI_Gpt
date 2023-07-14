import React, { useState } from "react";
import Navbar from '../components/Navbar';
import "../Pages/ImgAI.css"

const ImageFilter = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filteredImage, setFilteredImage] = useState(null);
  const [filterValue, setFilterValue] = useState("none");
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [filterIntensity, setFilterIntensity] = useState(50);

  const handleImageUpload = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    applyFilter(event.target.value, filterIntensity);
  };

  const handleIntensityChange = (event) => {
    setFilterIntensity(event.target.value);
    applyFilter(filterValue, event.target.value);
  };

  const applyFilter = (filter, intensity) => {
    let newFilter;
    if (filter.includes('100%')) {
      newFilter = filter.replace('100%', `${intensity}%`);
    } else if (filter.includes('5px')) {
      newFilter = filter.replace('5px', `${intensity}px`);
    } else {
      newFilter = filter;
    }
    const canvas = document.createElement("canvas");
    const image = document.createElement("img");
    image.src = selectedImage;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx.filter = newFilter;
      ctx.drawImage(image, 0, 0);
      setFilteredImage(canvas.toDataURL());
    };
  };
   const handleClearImage = () => {
    setSelectedImage(null);
    setFilteredImage(null);
  };
   const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = filteredImage;
    link.download = "filtered_image.png";
    link.click();
  };
   const handleZoomIn = () => {
    setZoom(zoom + 10);
  };
   const handleZoomOut = () => {
    setZoom(zoom - 10);
  };
   const handleRotateLeft = () => {
    setRotation(rotation - 90);
  };
   const handleRotateRight = () => {
    setRotation(rotation + 90);
  };
   return (
    <>
      <Navbar />
      <div className="image-filter-container">
        <h1 className="image-filter-title">IMG Filter</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <select value={filterValue} onChange={handleFilterChange}>
          <option value="none">No Filter</option>
          <option value="grayscale(100%)">Grayscale</option>
          <option value="sepia(100%)">Sepia</option>
          <option value="blur(5px)">Blur</option>
          <option value="brightness(150%)">Brightness</option>
          <option value="contrast(200%)">Contrast</option>
          <option value="hue-rotate(90deg)">Hue Rotate</option>
          <option value="invert(100%)">Invert</option>
          <option value="opacity(50%)">Opacity</option>
          <option value="saturate(200%)">Saturate</option>
          <option value="drop-shadow(5px 5px 5px black)">Drop Shadow</option>
          <option value="grayscale(50%) sepia(50%)">Grayscale & Sepia</option>
          <option value="blur(10px) brightness(200%)">Blur & Brightness</option>
          <option value="sepia(100%) contrast(150%)">Sepia & Contrast</option>
          <option value="hue-rotate(180deg) invert(100%)">Hue Rotate & Invert</option>
          <option value="opacity(75%) saturate(150%)">Opacity & Saturate</option>
          <option value="drop-shadow(10px 10px 10px black)">Drop Shadow (Large)</option>
          <option value="grayscale(100%) blur(5px) opacity(50%)">Grayscale, Blur & Opacity</option>
          <option value="sepia(100%) saturate(200%) contrast(200%)">Sepia, Saturate & Contrast</option>
          <option value="hue-rotate(90deg) invert(100%) drop-shadow(5px 5px 5px black)">Hue Rotate, Invert & Drop Shadow</option>
        </select>
        <input
          type="range"
          min="0"
          max="100"
          value={filterIntensity}
          onChange={handleIntensityChange}
        />
        {filteredImage && (
          <div
            className="image-wrapper"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <img
              src={filteredImage}
              alt="Filtered"
              style={{
                zoom: `${zoom}%`,
                transform: `rotate(${rotation}deg)`,
              }}
            />
          </div>
        )}
        {selectedImage && (
          <button onClick={handleClearImage}>Clear</button>
        )}
        {filteredImage && (
          <button onClick={handleDownloadImage}>Download</button>
        )}
        {selectedImage && (
          <button onClick={handleZoomIn}>Zoom In</button>
        )}
        {selectedImage && (
          <button onClick={handleZoomOut}>Zoom Out</button>
        )}
        {selectedImage && (
          <button onClick={handleRotateLeft}>Rotate Left</button>
        )}
        {selectedImage && (
          <button onClick={handleRotateRight}>Rotate Right</button>
        )}
      </div>
    </>
  );
};
 export default ImageFilter;