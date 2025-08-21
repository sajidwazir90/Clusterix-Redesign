import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SvgContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || "18px"};
  height: ${(props) => props.height || "18px"};

  svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.color || "currentColor"};
  }
`;

const InlineSvgIcon = ({ src, width, height, color, alt, ...props }) => {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(src);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    if (src) {
      loadSvg();
    }
  }, [src]);

  return (
    <SvgContainer
      width={width}
      height={height}
      color={color}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...props}
    />
  );
};

export default InlineSvgIcon;
