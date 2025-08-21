import React, { useState } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import InlineSvgIcon from "./InlineSvgIcon";

const SidebarItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  border-radius: 4px;
  width: fit-content;
  position: relative;

  &:hover {
    ${"" /* opacity: 0.8; */}
  }
`;
SidebarItemContainer.displayName = "SidebarItemContainer";

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) => {
    if (props.isHovered && props.isActive) return "#A4DDF8";
    if (props.isActive) return "#D2EEFB";
    if (props.isHovered) return "#F2F2F2";

    return "transparent";
  }};
  transition: background-color 0.3s ease-in-out;

  width: 32px;
  height: 32px;
  ${
    "" /* width: fit-content;
  height: fit-content; */
  }
`;
IconWrapper.displayName = "SidebarIconWrapper";

const Icon = styled(InlineSvgIcon)`
  flex-shrink: 0;
`;
Icon.displayName = "SidebarIcon";

// const Label = styled.span`
//   font-family: "Inter", sans-serif;
//   font-weight: 400;
//   font-size: 12px;
//   line-height: 1.2;
//   text-align: center;
//   color: ${(props) => (props.isActive ? "#05799D" : "#667085")};
//   white-space: nowrap;
//   max-width: 80px;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;
// Label.displayName = "SidebarLabel";

const SidebarItem = ({
  id,
  label,
  icon,
  iconRegular,
  isActive,
  onClick,
  iconWidth,
  iconHeight,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SidebarItemContainer
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconWrapper isActive={isActive} isHovered={isHovered}>
        <Icon
          src={isActive ? icon : iconRegular}
          width={iconWidth || "18px"}
          height={iconHeight || "18px"}
          color={isActive ? "#05799D" : "#667085"}
          alt={label}
        />
      </IconWrapper>
      <Tooltip text={label} visible={isHovered} />
    </SidebarItemContainer>
  );
};

export default SidebarItem;
