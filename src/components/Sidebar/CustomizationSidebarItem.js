import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import InlineSvgIcon from "./InlineSvgIcon";
import CustomizationMenu from "./CustomizationMenu";

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
`;
IconWrapper.displayName = "SidebarIconWrapper";

const Icon = styled(InlineSvgIcon)`
  flex-shrink: 0;
`;
Icon.displayName = "SidebarIcon";

const CustomizationSidebarItem = ({
  id,
  label,
  icon,
  iconRegular,
  isActive,
  onClick,
  iconWidth,
  iconHeight,
  menuItems,
  onPinToggle,
  pinnedItems,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleClick = () => {
    setShowMenu(!showMenu);
    if (onClick) {
      onClick();
    }
  };

  return (
    <SidebarItemContainer
      ref={itemRef}
      onClick={handleClick}
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
      <Tooltip text={label} visible={isHovered && !showMenu} />
      <CustomizationMenu
        visible={showMenu}
        items={menuItems}
        onPinToggle={onPinToggle}
        pinnedItems={pinnedItems}
      />
    </SidebarItemContainer>
  );
};

export default CustomizationSidebarItem;
