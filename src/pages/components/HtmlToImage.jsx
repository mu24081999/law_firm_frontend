import React, { useRef } from "react";
import { toPng } from "html-to-image";
import PropTypes from "prop-types";
const HtmlToImage = ({ htmlString }) => {
  console.log("🚀 ~ HtmlToImage ~ htmlString:", htmlString);
  const htmlRef = useRef(null);

  const generateImage = async () => {
    if (!htmlRef.current) return;
    try {
      const dataUrl = await toPng(htmlRef.current);
      const img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img); // or set it in state to preview
    } catch (err) {
      console.error("Error generating image", err);
    }
  };

  return (
    <div>
      {/* Render HTML string inside this div */}
      <div ref={htmlRef} dangerouslySetInnerHTML={{ __html: htmlString }} />
      <button onClick={generateImage}>Generate Image</button>
    </div>
  );
};
HtmlToImage.propTypes = {
  htmlString: PropTypes.string.isRequired,
};
export default HtmlToImage;
