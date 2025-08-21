import React from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  z-index: 1000;
  pointer-events: none;
`;

const TooltipArrow = styled.div`
  width: 6px;
  height: 16px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid #0a0d12;
  }
`;

const TooltipContent = styled.div`
  background-color: #0a0d12;
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.5em;
  text-align: center;
  padding: 6px 8px;
  border-radius: 8px;
  white-space: nowrap;
`;

const Tooltip = ({ text, visible }) => {
  return (
    <TooltipContainer visible={visible}>
      <TooltipArrow />
      <TooltipContent>{text}</TooltipContent>
    </TooltipContainer>
  );
};

export default Tooltip;
