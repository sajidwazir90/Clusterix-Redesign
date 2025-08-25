import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import InlineSvgIcon from "../Sidebar/InlineSvgIcon";

// Import icons
import searchIcon from "../../assets/icons/search-lg.svg";
import arrowUpIcon from "../../assets/icons/arrow-up.svg";
import arrowDownIcon from "../../assets/icons/arrow-down.svg";
import cornerDownLeftIcon from "../../assets/icons/arrow-turn-down-left.svg";
import settingsIcon from "../../assets/icons/gear-icon-regular.svg";
import circleCheck from "../../assets/icons/circle-check.svg";
import hashTag from "../../assets/icons/hashtag.svg";
import user from "../../assets/icons/user.svg";

// Existing icons
import homeIcon from "../../assets/icons/home-icon-regular.svg";
import rocketIcon from "../../assets/icons/rocket-icon-regular.svg";
import listTreeIcon from "../../assets/icons/list-tree-icon-regular.svg";
import messagesIcon from "../../assets/icons/messages-icon-regular.svg";
import stopwatchIcon from "../../assets/icons/stopwatch-icon-regular.svg";
import folderIcon from "../../assets/icons/folder-icon-regular.svg";
import fileIcon from "../../assets/icons/file-lines-icon-regular.svg";
import walletIcon from "../../assets/icons/wallet-icon-regular.svg";
import userGroupIcon from "../../assets/icons/user-group-icon-regular.svg";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: flex-start;
  padding-top: 10%;
`;

const CommandMenuContainer = styled.div`
  width: 640px;
  max-height: 80vh;
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 12px;
  box-shadow: 0px 3px 3px -1.5px rgba(10, 13, 18, 0.24),
    0px 8px 8px -4px rgba(10, 13, 18, 0.13),
    0px -4px 24px -4px rgba(10, 13, 18, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${(props) => (props.isOpen ? "fadeInUp" : "fadeOutDown")} 0.3s
    ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: calc(80vh - 120px); /* Subtract header and footer space */
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-bottom: 1px solid #e9eaeb;
`;

const InputField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  line-height: 1.5em;
  color: #535862;
  background: transparent;

  &::placeholder {
    color: #717680;
  }
`;

const ShortcutBadge = styled.div`
  display: flex;
  padding: 2px 4px;
  background-color: #fafafa;
  border: 1px solid #e9eaeb;
  border-radius: 4px;
`;

const ShortcutText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.428em;
  color: #535862;
`;

const CategoryBadges = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px 16px;
  border-bottom: 1px solid #e9eaeb;
`;

const CategoryBadge = styled.div`
  display: flex;
  ${"" /* align-items: baseline; */}
  justify-content: center;
  align-items: center;
  gap: 2px;
  padding: 2px 6px;
  background-color: #ffffff;
  border: 1px solid #d5d7da;
  border-radius: 6px;
  box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
`;

const CategoryIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`;

const CategoryText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5em;
  color: #414651;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0px;
  border-bottom: 1px solid #e9eaeb;

  &:last-child {
    border-bottom: none;
  }
`;

const SectionHeader = styled.div`
  padding: 0px 18px;
`;

const SectionTitle = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.21em;
  color: #717680;
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  margin: 2px 8px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isHighlighted ? "#fafafa" : "transparent"};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f2f6fa;
  }
`;

const MenuItemIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
`;

const MenuItemContent = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex: 1;
`;

const MenuItemText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.428em;
  color: #181d27;
`;

const MenuItemShortcut = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 18px;
  background-color: rgba(255, 255, 255, 0.8);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(16px);
`;

const FooterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavigationIcon = styled.div`
  display: flex;
  gap: 8px;
  padding: 6px;
  background-color: #ffffff;
  border: 1px solid #e9eaeb;
  border-radius: 8px;
`;

const FooterText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.428em;
  color: #717680;
`;

const EscKey = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px 6px;
  background-color: #ffffff;
  border: 1px solid #e9eaeb;
  border-radius: 8px;
`;

const EscText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.428em;
  color: #a4a7ae;
`;

const SettingsButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin-left: auto;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

// Menu data structure
const menuItems = {
  sidebar: [
    { id: "home", icon: homeIcon, title: "Home", section: "navigation" },
    { id: "hr", icon: userGroupIcon, title: "HR", section: "navigation" },
    {
      id: "project-management",
      icon: rocketIcon,
      title: "Project Management",
      section: "navigation",
    },
    {
      id: "task-management",
      icon: listTreeIcon,
      title: "Task Management",
      section: "navigation",
    },
    { id: "chats", icon: messagesIcon, title: "Chats", section: "navigation" },
    {
      id: "time-tracking",
      icon: stopwatchIcon,
      title: "Time Tracking",
      section: "navigation",
    },
    { id: "files", icon: folderIcon, title: "Files", section: "navigation" },
    { id: "office", icon: fileIcon, title: "Office", section: "navigation" },
    {
      id: "subsidies",
      icon: walletIcon,
      title: "Subsidies",
      section: "navigation",
    },
    {
      id: "emails",
      icon: messagesIcon,
      title: "Emails",
      section: "navigation",
    },
    {
      id: "customers",
      icon: userGroupIcon,
      title: "Customers",
      section: "navigation",
    },
  ],
  recent: [
    {
      id: "marketing-redesign",
      icon: folderIcon,
      title: "Marketing site redesign",
    },
    {
      id: "create-document",
      icon: fileIcon,
      title: "Create new document",
      shortcut: "⌘N",
    },
    {
      id: "invite-colleagues",
      icon: userGroupIcon,
      title: "Invite colleagues",
      shortcut: "⌘I",
    },
  ],
  commands: [
    {
      id: "my-profile",
      icon: user,
      title: "My profile",
      shortcut: ["⌘K", "P"],
    },
    {
      id: "team-profile",
      icon: userGroupIcon,
      title: "Team profile",
      shortcut: ["⌘K", "T"],
    },
    {
      id: "invite-colleagues-cmd",
      icon: userGroupIcon,
      title: "Invite colleagues",
      shortcut: "⌘I",
    },
    {
      id: "create-project",
      icon: folderIcon,
      title: "Create new project",
      shortcut: "⌘N",
    },
    { id: "support", icon: settingsIcon, title: "Support", shortcut: "⌘H" },
    { id: "changelog", icon: fileIcon, title: "Changelog", shortcut: "⌘C" },
    {
      id: "shortcuts",
      icon: settingsIcon,
      title: "Keyboard shortcuts",
      shortcut: "⌘?",
    },
  ],
};

const CommandMenu = ({ isOpen, onClose, onSidebarItemSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef(null);

  const handleItemSelect = useCallback(
    (item) => {
      if (item.section === "navigation" && onSidebarItemSelect) {
        onSidebarItemSelect(item.id);
      }
      onClose();
      setSearchQuery("");
    },
    [onSidebarItemSelect, onClose]
  );

  // Filter items based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredItems([]);
      setHighlightedIndex(0);
      return;
    }

    const query = searchQuery.toLowerCase();
    let filtered = [];

    // Search sidebar items first for "H" query
    if (query === "h" || query.startsWith("h")) {
      filtered = menuItems.sidebar.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
    } else {
      // Search all items
      const allItems = [
        ...menuItems.sidebar,
        ...menuItems.recent,
        ...menuItems.commands,
      ];
      filtered = allItems.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
    }

    setFilteredItems(filtered);
    setHighlightedIndex(0);
  }, [searchQuery]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            filteredItems.length > 0 ? (prev + 1) % filteredItems.length : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            filteredItems.length > 0
              ? (prev - 1 + filteredItems.length) % filteredItems.length
              : 0
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredItems.length > 0 && filteredItems[highlightedIndex]) {
            handleItemSelect(filteredItems[highlightedIndex]);
          }
          break;
        default:
          // No default action needed
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, highlightedIndex, onClose, handleItemSelect]);

  // Focus input when menu opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <CommandMenuContainer
        isOpen={isOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <SearchInput>
          <InlineSvgIcon
            src={searchIcon}
            width="20px"
            height="20px"
            color="none"
          />
          <InputField
            ref={inputRef}
            type="text"
            placeholder="Search, run a command, or ask a question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ShortcutBadge>
            <ShortcutText>⌘/</ShortcutText>
          </ShortcutBadge>
        </SearchInput>

        <ScrollableContent>
          {!searchQuery.trim() && (
            <>
              <CategoryBadges>
                <CategoryBadge>
                  <CategoryIcon>
                    <InlineSvgIcon
                      src={circleCheck}
                      width="12px"
                      height="12px"
                      color="#667085"
                    />
                  </CategoryIcon>
                  <CategoryText>Tasks</CategoryText>
                </CategoryBadge>
                <CategoryBadge>
                  <CategoryIcon>
                    <InlineSvgIcon
                      src={fileIcon}
                      width="12px"
                      height="12px"
                      color="#667085"
                    />
                  </CategoryIcon>
                  <CategoryText>Docs</CategoryText>
                </CategoryBadge>
                <CategoryBadge>
                  <CategoryIcon>
                    <InlineSvgIcon
                      src={hashTag}
                      width="12px"
                      height="12px"
                      color="#667085"
                    />
                  </CategoryIcon>
                  <CategoryText>Channels</CategoryText>
                </CategoryBadge>
                <CategoryBadge>
                  <CategoryIcon>
                    <InlineSvgIcon
                      src={messagesIcon}
                      width="12px"
                      height="12px"
                      color="#667085"
                    />
                  </CategoryIcon>
                  <CategoryText>Messages</CategoryText>
                </CategoryBadge>
              </CategoryBadges>

              <MenuSection>
                <SectionHeader>
                  <SectionTitle>Recent</SectionTitle>
                </SectionHeader>
                <MenuItems>
                  {menuItems.recent.map((item, index) => (
                    <MenuItem
                      key={item.id}
                      isHighlighted={false}
                      onClick={() => handleItemSelect(item)}
                    >
                      <MenuItemIcon>
                        <InlineSvgIcon
                          src={item.icon}
                          width="16px"
                          height="16px"
                          color="#a4a7ae"
                        />
                      </MenuItemIcon>
                      <MenuItemContent>
                        <MenuItemText>{item.title}</MenuItemText>
                      </MenuItemContent>
                      {item.shortcut && (
                        <MenuItemShortcut>
                          <ShortcutBadge>
                            <ShortcutText>{item.shortcut}</ShortcutText>
                          </ShortcutBadge>
                        </MenuItemShortcut>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </MenuSection>

              <MenuSection>
                <SectionHeader>
                  <SectionTitle>Commands</SectionTitle>
                </SectionHeader>
                <MenuItems>
                  {menuItems.commands.map((item, index) => (
                    <MenuItem
                      key={item.id}
                      isHighlighted={false}
                      onClick={() => handleItemSelect(item)}
                    >
                      <MenuItemIcon>
                        <InlineSvgIcon
                          src={item.icon}
                          width="16px"
                          height="16px"
                          color="#a4a7ae"
                        />
                      </MenuItemIcon>
                      <MenuItemContent>
                        <MenuItemText>{item.title}</MenuItemText>
                      </MenuItemContent>
                      {item.shortcut && (
                        <MenuItemShortcut>
                          {Array.isArray(item.shortcut) ? (
                            item.shortcut.map((key, idx) => (
                              <React.Fragment key={idx}>
                                <ShortcutBadge>
                                  <ShortcutText>{key}</ShortcutText>
                                </ShortcutBadge>
                                {idx < item.shortcut.length - 1 && (
                                  <InlineSvgIcon
                                    src={arrowDownIcon}
                                    width="16px"
                                    height="16px"
                                    color="#a4a7ae"
                                  />
                                )}
                              </React.Fragment>
                            ))
                          ) : (
                            <ShortcutBadge>
                              <ShortcutText>{item.shortcut}</ShortcutText>
                            </ShortcutBadge>
                          )}
                        </MenuItemShortcut>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </MenuSection>
            </>
          )}

          {searchQuery.trim() && filteredItems.length > 0 && (
            <MenuSection>
              <SectionHeader>
                <SectionTitle>Search Results</SectionTitle>
              </SectionHeader>
              <MenuItems>
                {filteredItems.map((item, index) => (
                  <MenuItem
                    key={item.id}
                    isHighlighted={index === highlightedIndex}
                    onClick={() => handleItemSelect(item)}
                  >
                    <MenuItemIcon>
                      <InlineSvgIcon
                        src={item.icon}
                        width="16px"
                        height="16px"
                        color="#a4a7ae"
                      />
                    </MenuItemIcon>
                    <MenuItemContent>
                      <MenuItemText>{item.title}</MenuItemText>
                    </MenuItemContent>
                    {item.shortcut && (
                      <MenuItemShortcut>
                        <ShortcutBadge>
                          <ShortcutText>{item.shortcut}</ShortcutText>
                        </ShortcutBadge>
                      </MenuItemShortcut>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </MenuSection>
          )}

          {searchQuery.trim() && filteredItems.length === 0 && (
            <MenuSection>
              <SectionHeader>
                <SectionTitle>No results found</SectionTitle>
              </SectionHeader>
            </MenuSection>
          )}
        </ScrollableContent>

        <Footer>
          <FooterSection>
            <NavigationIcon>
              <InlineSvgIcon
                src={arrowUpIcon}
                width="16px"
                height="16px"
                color="#a4a7ae"
              />
              <InlineSvgIcon
                src={arrowDownIcon}
                width="16px"
                height="16px"
                color="#a4a7ae"
              />
            </NavigationIcon>
            <FooterText>to navigate</FooterText>
          </FooterSection>

          <FooterSection>
            <NavigationIcon>
              <InlineSvgIcon
                src={cornerDownLeftIcon}
                width="16px"
                height="16px"
                color="#a4a7ae"
              />
            </NavigationIcon>
            <FooterText>to select</FooterText>
          </FooterSection>

          <FooterSection>
            <EscKey>
              <EscText>esc</EscText>
            </EscKey>
            <FooterText>to close</FooterText>
          </FooterSection>

          <SettingsButton>
            <InlineSvgIcon
              src={settingsIcon}
              width="16px"
              height="16px"
              color="#a4a7ae"
            />
          </SettingsButton>
        </Footer>
      </CommandMenuContainer>
    </Overlay>
  );
};

export default CommandMenu;
