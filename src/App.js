import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar/TopBar";
import TrackTime from "./components/TrackTime/TrackTime";
import Assistant from "./components/Assistant/Assistant";
import CommandMenu from "./components/CommandMenu/CommandMenu";
import "./App.css";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f3f7fd;
  padding: 8px;
  gap: 8px;
`;
AppContainer.displayName = "AppContainer";

const RightSection = styled.div`
  flex: 1;
  display: flex;
  ${
    "" /* flex-direction: ${(props) => (props.trackTimeOpen ? "row" : "column")}; */
  }
  flex-direction: row;
  gap: 8px;
  overflow: hidden;
  ${"" /* transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); */}
`;
RightSection.displayName = "RightSection";

const TopBarWrapper = styled.div`
  ${"" /* background-color: #ffffff; */}
  border-radius: 8px;
  ${"" /* overflow: hidden; */}
  position: relative;
`;
TopBarWrapper.displayName = "TopBarWrapper";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
  overflow: hidden;
`;
Wrapper.displayName = "Wrapper";

const MainContent = styled.div`
  flex: 1;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${"" /* transition: all 3s cubic-bezier(0.4, 0, 0.2, 1); */}
  ${
    "" /* border: 1px solid #e4e7ec;
  box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05); */
  }
`;
MainContent.displayName = "MainContent";

const PlaceholderText = styled.h2`
  color: #667085;
  font-family: Inter, sans-serif;
  font-weight: 400;
`;
PlaceholderText.displayName = "PlaceholderText";

function App() {
  const [isTrackTimeOpen, setIsTrackTimeOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState("home");

  // Shared timer state
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerTime, setTimerTime] = useState(0); // in seconds
  const [showTimer, setShowTimer] = useState(false);
  const timerIntervalRef = useRef(null);

  // Format time helper function
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Timer control functions
  const handleTimerToggle = () => {
    if (isTimerActive) {
      // Stop timer, reset time, but keep timer display visible (change to play button)
      setIsTimerActive(false);
      setTimerTime(0); // Reset timer to 0:00:00
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    } else {
      // Start timer
      setIsTimerActive(true);
      timerIntervalRef.current = setInterval(() => {
        setTimerTime((prev) => prev + 1);
      }, 1000);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const handleTrackTimeToggle = () => {
    setIsTrackTimeOpen(!isTrackTimeOpen);
  };

  const handleTrackTimeClose = () => {
    setIsTrackTimeOpen(false);
  };

  const handleAssistantToggle = () => {
    setIsAssistantOpen(!isAssistantOpen);
  };

  const handleAssistantClose = () => {
    setIsAssistantOpen(false);
  };

  const handleCommandMenuToggle = () => {
    setIsCommandMenuOpen(!isCommandMenuOpen);
  };

  const handleCommandMenuClose = () => {
    setIsCommandMenuOpen(false);
  };

  const handleSidebarItemSelect = (itemId) => {
    setActiveSidebarItem(itemId);
    // Here you can add navigation logic or other actions based on the selected item
    console.log("Selected sidebar item:", itemId);
  };

  // Get dashboard title based on active sidebar item
  const getDashboardTitle = (itemId) => {
    const dashboardTitles = {
      home: "Home Dashboard",
      hr: "HR Dashboard",
      "project-management": "Project Management Dashboard",
      "task-management": "Task Management Dashboard",
      chats: "Chats Dashboard",
      "time-tracking": "Time Tracking Dashboard",
      files: "Files Dashboard",
      office: "Office Dashboard",
      subsidies: "Subsidies Dashboard",
      emails: "Emails Dashboard",
      customers: "Customers Dashboard",
      customization: "Customization Settings",
    };

    return dashboardTitles[itemId] || "Dashboard";
  };

  // Handle keyboard shortcuts for command menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandMenuOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AppContainer>
      <TopBarWrapper>
        <TopBar
          isTrackTimeOpen={isTrackTimeOpen}
          onTrackTimeToggle={handleTrackTimeToggle}
          isAssistantOpen={isAssistantOpen}
          onAssistantToggle={handleAssistantToggle}
          isTimerActive={isTimerActive}
          timerTime={timerTime}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
          onTimerToggle={handleTimerToggle}
          formatTime={formatTime}
          onSearchClick={handleCommandMenuToggle}
        />
      </TopBarWrapper>
      <Wrapper>
        <Sidebar
          activeSidebarItem={activeSidebarItem}
          onItemClick={handleSidebarItemSelect}
        />
        <RightSection trackTimeOpen={isTrackTimeOpen}>
          <MainContent>
            <PlaceholderText>
              {getDashboardTitle(activeSidebarItem)}
            </PlaceholderText>
          </MainContent>
          <TrackTime
            isOpen={isTrackTimeOpen}
            onClose={handleTrackTimeClose}
            isTimerActive={isTimerActive}
            timerTime={timerTime}
            showTimer={showTimer}
            onTimerToggle={handleTimerToggle}
            formatTime={formatTime}
          />
          <Assistant isOpen={isAssistantOpen} onClose={handleAssistantClose} />
        </RightSection>
      </Wrapper>
      <CommandMenu
        isOpen={isCommandMenuOpen}
        onClose={handleCommandMenuClose}
        onSidebarItemSelect={handleSidebarItemSelect}
      />
    </AppContainer>
  );
}

export default App;
