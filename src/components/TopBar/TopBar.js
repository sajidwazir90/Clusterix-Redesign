import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import InlineSvgIcon from "../Sidebar/InlineSvgIcon";
import NotificationsDropdown from "../NotificationsDropdown";

// Import FontAwesome icons
import calendarIconRegular from "../../assets/icons/calendar-icon-regular.svg";
import calendarIcon from "../../assets/icons/calendar-icon.svg";
import stopwatchIconRegular from "../../assets/icons/stopwatch-icon-regular.svg";
import stopwatchIcon from "../../assets/icons/stopwatch-icon.svg";
import bellIconRegular from "../../assets/icons/bell-icon-regular.svg";
import bellIcon from "../../assets/icons/bell-icon.svg";
import sparklesIcon from "../../assets/icons/sparkles-icon.svg";
import searchIcon from "../../assets/icons/search-icon.svg";
import mainLogo from "../../assets/icons/main-logo.svg";
import avatarImage from "../../assets/images/avatar.png";
import chevronIcon from "../../assets/icons/chevron-down.svg";
import circlePlaySolid from "../../assets/icons/circle-play-solid.svg";
import stopCircle from "../../assets/icons/stop-circle.svg";

const TopBarContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 6px;
  padding: 0px 8px 0px 0px;
  ${"" /* background-color: #ffffff; */}
  height: fit-content;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const CenterSection = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 0px 10px;
  width: 51px;
  height: fit-content;
  background-color: #f5f7f9;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  width: fit-content;
  height: fit-content;
`;

const CTASection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: fit-content;
  height: fit-content;
`;

const IconsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  height: fit-content;
`;

const HeaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 3px;
  width: 32px;
  height: 32px;
  background-color: ${(props) => (props.active ? "#D2EEFB" : "transparent")};
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${(props) => (props.active ? "#D2EEFB" : "#eaeaea")};
  }
  transition: background-color 0.3s ease-in-out;
`;

const NotificationContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  height: fit-content;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: url(${avatarImage}) center/cover;
  position: relative;
  outline-style: solid;
  outline-color: rgba(0, 0, 0, 0.08);
  outline-width: 1px;
  ${"" /* border: 0.5px solid rgba(0, 0, 0, 0.08); */}
`;

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  background-color: #17b26a;
  border: 1.5px solid #ffffff;
  border-radius: 50%;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: #e9eef6;
  border-radius: 8px;
  width: 320px;
  height: fit-content;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #dfe6f0;
  }
`;

const SearchContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: fit-content;
`;

const SearchText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.21em;
  color: #414651;
  width: 100%;
`;

const ShortcutWrapper = styled.div`
  display: flex;
  padding: 1px 4px;
  border: 1px solid #d5d7da;
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
`;

const ShortcutText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.21em;
  color: #414651;
`;

const TimerDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px 8px;
  background-color: ${(props) => (props.active ? "#D2EEFB" : "#D2EEFB")};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  ${
    "" /* &:hover {
    background-color: ${(props) => (props.active ? "#D2EEFB" : "#97CCE5")};
  } */
  }
`;

const TimerText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.21em;
  color: #414651;
`;

const TimerIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
`;

const TopBar = ({
  isTrackTimeOpen,
  onTrackTimeToggle,
  isAssistantOpen,
  onAssistantToggle,
  isTimerActive,
  timerTime,
  showTimer,
  setShowTimer,
  onTimerToggle,
  formatTime,
  onSearchClick,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const topBarRef = useRef(null);
  const notificationsRef = useRef(null);

  // Icon data with regular and solid versions
  const iconData = [
    {
      id: "calendar",
      regular: calendarIconRegular,
      solid: calendarIcon,
      isActive: false,
    },
    {
      id: "stopwatch",
      regular: stopwatchIconRegular,
      solid: stopwatchIcon,
      isActive: isTrackTimeOpen,
    },
    {
      id: "bell",
      regular: bellIconRegular,
      solid: bellIcon,
      isActive: false,
    },
    {
      id: "sparkles",
      regular: sparklesIcon, // sparkles only has solid version
      solid: sparklesIcon,
      isActive: isAssistantOpen,
    },
  ];

  const handleStopwatchClick = () => {
    if (!showTimer) {
      // First click - open sidebar immediately, show timer display after delay
      onTrackTimeToggle();
      setTimeout(() => {
        setShowTimer(true);
      }, 100); // Match sidebar transition duration
    } else {
      // Timer is displayed
      if (!isTimerActive && timerTime === 0) {
        // Timer is paused at 0:00:00 - hide timer display immediately, toggle sidebar
        setShowTimer(false);
      }
      // Always toggle the sidebar when timer display is clicked
      onTrackTimeToggle();
    }
  };

  const handleNotificationClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleCloseNotifications = () => {
    setIsNotificationsOpen(false);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    if (isNotificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationsOpen]);

  return (
    <TopBarContainer ref={topBarRef}>
      <LeftSection>
        <LogoSection>
          <LogoContainer>
            <InlineSvgIcon src={mainLogo} width="25px" height="25px" />
          </LogoContainer>
        </LogoSection>
      </LeftSection>

      <CenterSection>
        <SearchContainer onClick={onSearchClick}>
          <SearchContent>
            <InlineSvgIcon
              src={searchIcon}
              width="16px"
              height="16px"
              color="#414651"
            />
            <SearchText>Search</SearchText>
          </SearchContent>
          <ShortcutWrapper>
            <ShortcutText>⌘K</ShortcutText>
          </ShortcutWrapper>
        </SearchContainer>
      </CenterSection>

      <RightSection>
        <CTASection>
          <IconsGroup>
            {iconData.map((icon) =>
              icon.id === "bell" ? (
                <NotificationContainer key={icon.id} ref={notificationsRef}>
                  <HeaderIcon
                    active={isNotificationsOpen}
                    onClick={handleNotificationClick}
                  >
                    <InlineSvgIcon
                      src={isNotificationsOpen ? icon.solid : icon.regular}
                      width="20px"
                      height="20px"
                      color={isNotificationsOpen ? "#1C3A47" : "#667085"}
                    />
                  </HeaderIcon>
                  <NotificationsDropdown
                    isOpen={isNotificationsOpen}
                    onClose={handleCloseNotifications}
                  />
                </NotificationContainer>
              ) : icon.id === "stopwatch" ? (
                showTimer ? (
                  <TimerDisplay
                    key={icon.id}
                    active={isTimerActive}
                    onClick={handleStopwatchClick}
                  >
                    <TimerText>{formatTime(timerTime)}</TimerText>
                    <TimerIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        onTimerToggle();
                      }}
                    >
                      <InlineSvgIcon
                        src={isTimerActive ? stopCircle : circlePlaySolid}
                        width="16px"
                        height="16px"
                        color={isTimerActive ? "#D92D20" : "#1C3A47"}
                      />
                    </TimerIcon>
                  </TimerDisplay>
                ) : (
                  <HeaderIcon
                    key={icon.id}
                    active={icon.isActive}
                    onClick={handleStopwatchClick}
                  >
                    <InlineSvgIcon
                      src={icon.isActive ? icon.solid : icon.regular}
                      width="20px"
                      height="20px"
                      color={icon.isActive ? "#1C3A47" : "#667085"}
                    />
                  </HeaderIcon>
                )
              ) : icon.id === "sparkles" ? (
                <HeaderIcon
                  key={icon.id}
                  active={icon.isActive}
                  onClick={onAssistantToggle}
                >
                  <InlineSvgIcon
                    src={icon.isActive ? icon.solid : icon.regular}
                    width="20px"
                    height="20px"
                    color={icon.isActive ? "#1C3A47" : "#667085"}
                  />
                </HeaderIcon>
              ) : (
                <HeaderIcon key={icon.id} active={icon.isActive}>
                  <InlineSvgIcon
                    src={icon.isActive ? icon.solid : icon.regular}
                    width="20px"
                    height="20px"
                    color={icon.isActive ? "#1C3A47" : "#667085"}
                  />
                </HeaderIcon>
              )
            )}
          </IconsGroup>

          <AvatarSection>
            <Avatar>
              <OnlineIndicator />
            </Avatar>
            <InlineSvgIcon
              src={chevronIcon}
              width="12px"
              height="12px"
              color="#717680"
            />
          </AvatarSection>
        </CTASection>
      </RightSection>
    </TopBarContainer>
  );
};

export default TopBar;
