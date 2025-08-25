import React, { useState } from "react";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import CustomizationSidebarItem from "./CustomizationSidebarItem";

// Import solid icons
import homeIcon from "../../assets/icons/home-icon.svg";
import usersIcon from "../../assets/icons/users-icon.svg";
import rocketIcon from "../../assets/icons/rocket-icon.svg";
import listTreeIcon from "../../assets/icons/list-tree-icon.svg";
import messagesIcon from "../../assets/icons/messages-icon.svg";
import stopwatchIcon from "../../assets/icons/stopwatch-icon.svg";
import folderIcon from "../../assets/icons/folder-icon.svg";
import fileLinesIcon from "../../assets/icons/file-lines-icon.svg";
import walletIcon from "../../assets/icons/wallet-icon.svg";
import emailIcon from "../../assets/icons/email-icon.svg";
import userGroupIcon from "../../assets/icons/user-group-icon.svg";
import grid2PlusIcon from "../../assets/icons/grid-2-plus-icon.svg";

// Import regular icons
import homeIconRegular from "../../assets/icons/home-icon-regular.svg";
import usersIconRegular from "../../assets/icons/users-icon-regular.svg";
import rocketIconRegular from "../../assets/icons/rocket-icon-regular.svg";
import listTreeIconRegular from "../../assets/icons/list-tree-icon-regular.svg";
import messagesIconRegular from "../../assets/icons/messages-icon-regular.svg";
import stopwatchIconRegular from "../../assets/icons/stopwatch-icon-regular.svg";
import folderIconRegular from "../../assets/icons/folder-icon-regular.svg";
import fileLinesIconRegular from "../../assets/icons/file-lines-icon-regular.svg";
import walletIconRegular from "../../assets/icons/wallet-icon-regular.svg";
import emailIconRegular from "../../assets/icons/email-icon-regular.svg";
import userGroupIconRegular from "../../assets/icons/user-group-icon-regular.svg";
import grid2PlusIconRegular from "../../assets/icons/grid-2-plus-icon-regular.svg";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0px 10px;
  width: fit-content;
  height: 100%;
  ${"" /* box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05); */}
  ${"" /* border: 1px solid #e4e7ec; */}
`;
SidebarContainer.displayName = "SidebarContainer";

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 12px 0px 0px;
  width: fit-content;
`;
Navigation.displayName = "SidebarNavigation";

const menuItems = [
  {
    id: "home",
    label: "Home",
    icon: homeIcon,
    iconRegular: homeIconRegular,
    isActive: true,
    iconWidth: "20px",
    iconHeight: "18px",
  },
  {
    id: "hr",
    label: "HR",
    icon: usersIcon,
    iconRegular: usersIconRegular,
    isActive: false,
    iconWidth: "22px",
    iconHeight: "18px",
  },
  {
    id: "project-management",
    label: "Project Management",
    icon: rocketIcon,
    iconRegular: rocketIconRegular,
    isActive: false,
  },
  {
    id: "task-management",
    label: "Task Management",
    icon: listTreeIcon,
    iconRegular: listTreeIconRegular,
    isActive: false,
  },
  {
    id: "chats",
    label: "Chats",
    icon: messagesIcon,
    iconRegular: messagesIconRegular,
    isActive: false,
    iconWidth: "22px",
  },
  {
    id: "time-tracking",
    label: "Time Tracking",
    icon: stopwatchIcon,
    iconRegular: stopwatchIconRegular,
    isActive: false,
  },
  {
    id: "files",
    label: "Files",
    icon: folderIcon,
    iconRegular: folderIconRegular,
    isActive: false,
  },
  {
    id: "office",
    label: "Office",
    icon: fileLinesIcon,
    iconRegular: fileLinesIconRegular,
    isActive: false,
  },
  {
    id: "subsidies",
    label: "Subsidies",
    icon: walletIcon,
    iconRegular: walletIconRegular,
    isActive: false,
  },
  {
    id: "emails",
    label: "Emails",
    icon: emailIcon,
    iconRegular: emailIconRegular,
    isActive: false,
  },
  {
    id: "customers",
    label: "Customers",
    icon: userGroupIcon,
    iconRegular: userGroupIconRegular,
    isActive: false,
    iconWidth: "22px",
    iconHeight: "18px",
  },
];

const Sidebar = ({ activeSidebarItem = "home", onItemClick }) => {
  const [activeItem, setActiveItem] = useState(activeSidebarItem);
  const [pinnedItems, setPinnedItems] = useState({
    home: true,
    hr: true,
    "project-management": true,
    "task-management": true,
    chats: true,
    "time-tracking": true,
    files: true,
    office: true,
    subsidies: true,
    emails: true,
    customers: true,
  });

  // Update local state when prop changes
  React.useEffect(() => {
    setActiveItem(activeSidebarItem);
  }, [activeSidebarItem]);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  const handlePinToggle = (itemId) => {
    setPinnedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Filter items based on pinned status for display
  const visibleItems = menuItems.filter((item) => pinnedItems[item.id]);

  return (
    <SidebarContainer>
      <Navigation>
        {visibleItems.map((item) => (
          <SidebarItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            iconRegular={item.iconRegular}
            isActive={activeItem === item.id}
            onClick={() => handleItemClick(item.id)}
            iconWidth={item.iconWidth}
            iconHeight={item.iconHeight}
          />
        ))}

        {/* Customization Item */}
        <CustomizationSidebarItem
          id="customization"
          label="Customization"
          icon={grid2PlusIcon}
          iconRegular={grid2PlusIconRegular}
          isActive={activeItem === "customization"}
          onClick={() => handleItemClick("customization")}
          iconWidth="18px"
          iconHeight="18px"
          menuItems={menuItems}
          onPinToggle={handlePinToggle}
          pinnedItems={pinnedItems}
        />
      </Navigation>
    </SidebarContainer>
  );
};

export default Sidebar;
