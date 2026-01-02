import React, { useState, useEffect } from "react";

interface BackgroundRemovalProps {
  signUrl: string;
  onProcessed: (url: string) => void;
}

const BackgroundRemoval: React.FC<BackgroundRemovalProps> = ({
  signUrl,
  onProcessed,
}) => {
  const [threshold, setThreshold] = useState(200);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const processImage = async () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const newData = ctx.createImageData(canvas.width, canvas.height).data;

        // Apply threshold-based background removal
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r + g + b) / 3;
          if (brightness > threshold) {
            newData[i] = 0;
            newData[i + 1] = 0;
            newData[i + 2] = 0;
            newData[i + 3] = 0; // Transparent
          } else {
            newData[i] = r;
            newData[i + 1] = g;
            newData[i + 2] = b;
            newData[i + 3] = 255; // Opaque
          }
        }

        ctx.putImageData(
          new ImageData(newData, canvas.width, canvas.height),
          0,
          0
        );
        const processedUrl = canvas.toDataURL("image/png");
        setPreviewUrl(processedUrl);
        onProcessed(processedUrl);
      };
      img.src = signUrl;
    };

    processImage();
  }, [signUrl, threshold, onProcessed]);

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold(Number(e.target.value));
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Processed preview"
          className="max-h-[150px] max-w-full object-contain"
        />
      )}
      <div className="mt-2">
        <label htmlFor="threshold" className="text-sm text-black">
          Threshold: {threshold}
        </label>
        <input
          type="range"
          id="threshold"
          min="0"
          max="255"
          value={threshold}
          onChange={handleThresholdChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default BackgroundRemoval;
