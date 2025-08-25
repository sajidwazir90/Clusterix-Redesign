import React from "react";
import styled from "styled-components";
import InlineSvgIcon from "./InlineSvgIcon";
import pinIcon from "../../assets/icons/pin-icon.svg";
import pinIconFilled from "../../assets/icons/pin-icon-filled.svg";

const CustomizationMenuContainer = styled.div`
  position: absolute;
  left: calc(100% + 8px);
  top: 0;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  box-shadow: 0px 2px 2px -1px rgba(10, 13, 18, 0.04),
    0px 4px 6px -2px rgba(10, 13, 18, 0.03),
    0px 12px 16px -4px rgba(10, 13, 18, 0.08);
  width: 234px;
  z-index: 1000;
  ${(props) => !props.visible && "display: none;"}
`;

const MenuItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 16px 16px;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px 6px;
  cursor: pointer;
`;

const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f9fafb;
  }
`;

const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const MenuItemIcon = styled(InlineSvgIcon)`
  flex-shrink: 0;
`;

const MenuItemText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  line-height: 1.21;
  color: #414651;
`;

const PinIcon = styled(InlineSvgIcon)`
  flex-shrink: 0;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #05799d;
  }
`;

const CustomizationMenu = ({
  items,
  visible,
  onPinToggle,
  pinnedItems = {},
}) => {
  const handlePinClick = (e, itemId) => {
    e.stopPropagation(); // Prevent the menu item click
    onPinToggle(itemId);
  };

  return (
    <CustomizationMenuContainer visible={visible}>
      <MenuItemsWrapper>
        {items.map((item) => (
          <MenuItem key={item.id}>
            <MenuItemContent onClick={() => onPinToggle(item.id)}>
              <IconAndText>
                <MenuItemIcon
                  src={item.iconRegular}
                  width="14px"
                  height="14px"
                  color="#667085"
                  alt={item.label}
                />
                <MenuItemText>{item.label}</MenuItemText>
              </IconAndText>
              <PinIcon
                src={pinnedItems[item.id] ? pinIconFilled : pinIcon}
                width="16px"
                height="16px"
                color={pinnedItems[item.id] ? "#05799D" : "#ffffff"}
                alt="Pin"
                onClick={(e) => handlePinClick(e, item.id)}
              />
            </MenuItemContent>
          </MenuItem>
        ))}
      </MenuItemsWrapper>
    </CustomizationMenuContainer>
  );
};

export default CustomizationMenu;
