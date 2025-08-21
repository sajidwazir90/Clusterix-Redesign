import React, { useState } from "react";
import styled from "styled-components";
import InlineSvgIcon from "../Sidebar/InlineSvgIcon";
import ActivityFeed from "./ActivityFeed";

// Import the icons we need
import inboxIconRegular from "../../assets/icons/inbox-icon-regular.svg";
import gearIconRegular from "../../assets/icons/gear-icon-regular.svg";

const DropdownContainer = styled.div`
  position: absolute;
  ${
    "" /* top: 100%;
  right: 0; */
  }
  top: 147%;
  right: -94px;
  overflow: hidden;
  width: 443px;
  height: 668px;
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  box-shadow: 0px 3px 3px -1.5px rgba(10, 13, 18, 0.04),
    0px 8px 8px -4px rgba(10, 13, 18, 0.03),
    0px 20px 24px -4px rgba(10, 13, 18, 0.08);
  z-index: 9999;
  display: flex;
  flex-direction: column;

  /* Transition properties */
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: ${(props) => (props.isOpen ? "translateY(0)" : "translateY(0)")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform-origin: top center;

  /* Animation for opening only */
  animation: ${(props) => (props.isOpen ? "slideDown 0.3s ease-out" : "none")};

  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
DropdownContainer.displayName = "NotificationsDropdownContainer";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 12px;
  border-bottom: 1px solid #e4e7ec;
  background: #ffffff;
`;
Header.displayName = "NotificationsHeader";

const HeaderLeft = styled.div`
  display: flex;
  ${"" /* align-items: baseline; */}
  gap: 6px;
`;
HeaderLeft.displayName = "HeaderLeft";

const HeaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`;
HeaderIcon.displayName = "HeaderIcon";

const HeaderTitle = styled.h3`
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.21;
  color: #101828;
  margin: 0;
`;
HeaderTitle.displayName = "HeaderTitle";

const HeaderRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
HeaderRight.displayName = "HeaderRight";

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px;
  border-bottom: 1px solid #e4e7ec;
  background: #ffffff;
`;
FilterSection.displayName = "FilterSection";

const FilterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
FilterLeft.displayName = "FilterLeft";

const FilterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? "#f2f2f2" : "transparent")};
  font-family: Inter, sans-serif;
  font-weight: ${(props) => (props.active ? "500" : "400")};
  font-size: 14px;
  line-height: 1.21;
  color: ${(props) => (props.active ? "#414651" : "#717680")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f2f2f2;
  }
`;
FilterButton.displayName = "FilterButton";

const MarkAllRead = styled.button`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.21;
  color: #05799d;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;
MarkAllRead.displayName = "MarkAllRead";

const ContentArea = styled.div`
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
ContentArea.displayName = "ContentArea";

const FeedWrapper = styled.div`
  flex: 1;
  ${"" /* padding: 12px 0; */}
`;

const NotificationsDropdown = ({ isOpen, onClose }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleMarkAllAsRead = () => {
    // TODO: Implement mark all as read functionality
    console.log("Mark all as read");
  };

  // Get unread count from ActivityFeed
  const unreadCount = 5; // This should be calculated from the actual data

  return (
    <DropdownContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
      <Header>
        <HeaderLeft>
          <HeaderIcon>
            <InlineSvgIcon
              src={inboxIconRegular}
              width="16px"
              height="16px"
              color="#667085"
              alt="Inbox"
            />
          </HeaderIcon>
          <HeaderTitle>Activity</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <InlineSvgIcon
            src={gearIconRegular}
            width="16px"
            height="16px"
            color="#667085"
            alt="Settings"
          />
        </HeaderRight>
      </Header>

      <FilterSection>
        <FilterLeft>
          <FilterButton
            active={activeFilter === "all"}
            onClick={() => handleFilterChange("all")}
          >
            All
          </FilterButton>
          <FilterButton
            active={activeFilter === "unread"}
            onClick={() => handleFilterChange("unread")}
          >
            Unread ({unreadCount})
          </FilterButton>
        </FilterLeft>
        <MarkAllRead onClick={handleMarkAllAsRead}>
          Mark all as read
        </MarkAllRead>
      </FilterSection>

      <ContentArea>
        <FeedWrapper>
          <ActivityFeed filter={activeFilter} />
        </FeedWrapper>
      </ContentArea>
    </DropdownContainer>
  );
};

export default NotificationsDropdown;
