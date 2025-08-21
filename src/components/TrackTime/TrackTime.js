import React, { useState } from "react";
import styled from "styled-components";
import InlineSvgIcon from "../Sidebar/InlineSvgIcon";

// Import icons
import stopwatchIcon from "../../assets/icons/stopwatch-icon-regular.svg";
import alarmClockIcon from "../../assets/icons/alarm-clock.svg";
import squarePollIcon from "../../assets/icons/square-poll-vertical.svg";
import xmark from "../../assets/icons/xmark.svg";
import circlePlayIcon from "../../assets/icons/circle-play.svg";
import circlePlaySolid from "../../assets/icons/circle-play-solid.svg";
import penToSquareIcon from "../../assets/icons/pen-to-square.svg";
import diagramSubtaskIcon from "../../assets/icons/diagram-subtask.svg";
import timerIcon from "../../assets/icons/timer.svg";
import stopCircle from "../../assets/icons/stop-circle.svg";

const TrackTimeWrapper = styled.div`
  width: ${(props) => (props.isOpen ? "400px" : "0px")};
  height: 100%;
  overflow: hidden;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const TrackTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  width: 400px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 6px;
  padding: 8px 12px;
  background-color: #ffffff;
  border-bottom: 1px solid #e4e7ec;
`;

const Heading = styled.div`
  display: flex;
  flex: 0 0 auto;
  gap: 6px;
  width: fit-content;
  height: fit-content;
`;

const HeaderCrossIconWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const HeaderCrossIcon = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const HeadingText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.21em;
  color: #101828;
`;

const ProgressWrapper = styled.div`
  flex: 1;
`;

const ProgressIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 2px 4px;
  background-color: #f2f2f2;
  border-radius: 2px;
  width: fit-content;
  height: fit-content;
  overflow: hidden;
`;

const ProgressText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.21em;
  color: #475467;
`;

const ElapsedTime = styled.span`
  font-weight: 600;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 24px;
  padding: 12px 0px 0px;
  flex: 1;
  background-color: #fff;
`;

const TimerOption = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 12px;
  padding: 0px 12px;
  width: 100%;
  height: fit-content;
`;

const ModeSelection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: stretch;
  gap: 8px;
  width: 100%;
  height: fit-content;
`;

const ModeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  width: 100%;
  height: fit-content;
  position: relative;
  min-height: 120px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  align-self: stretch;
  background-color: #f2f2f2;
  border-radius: 8px;
  width: 100%;
  height: fit-content;
`;

const ToggleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: ${(props) => (props.active ? "8px 16px" : "8px 16px")};
  flex: 1;
  ${"" /* height: fit-content; */}
  background-color: ${(props) => (props.active ? "#ffffff" : "transparent")};
  border-radius: 6px;
  margin: ${(props) => (props.active ? "3px" : "3px")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? "#ffffff" : "rgba(255, 255, 255, 0.5)"};
  }
`;

const ToggleIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
`;

const ToggleText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: ${(props) => (props.active ? "600" : "500")};
  font-size: 14px;
  line-height: 1.21em;
  color: ${(props) => (props.active ? "#475467" : "#717680")};
`;

const TimerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: -1px;
  background-color: #ffffff;
  border: 1px solid #d5d7da;
  box-shadow: 0px 1px 2px -1px rgba(10, 13, 18, 0.1),
    0px 1px 3px 0px rgba(10, 13, 18, 0.1);
  border-radius: 8px;
  width: 100%;
  height: fit-content;
  opacity: 0;
  animation: fadeInUp 0.3s ease-out forwards;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      ${"" /* transform: translateY(0); */}
    }
    to {
      opacity: 1;
      ${"" /* transform: translateY(0); */}
    }
  }
`;

const TaskSelection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 8px;
  padding: 8px 6px;
  border-bottom: 1px solid #e4e7ec;
  width: 100%;
  height: fit-content;
`;

const TaskInput = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  padding: 10px 4px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  height: fit-content;

  &:hover {
    background-color: #f9fafb;
  }
`;

const TaskIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
`;

const TaskText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  color: #717680;
  flex: 1;
`;

const TimerDisplay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  gap: 8px;
  padding: 14px 0px;
  height: 60px;
  width: 100%;
`;

const TimerControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  padding: 0px 12px;
  width: 100%;
  height: fit-content;
`;

const PlaySection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  height: fit-content;
`;

const PlayButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
`;

const TimeText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.21em;
  color: #475467;
`;

// Manual mode components
const ManualSection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: -1px;
  background-color: #ffffff;
  border: 1px solid #d5d7da;
  box-shadow: 0px 1px 2px -1px rgba(10, 13, 18, 0.1),
    0px 1px 3px 0px rgba(10, 13, 18, 0.1);
  border-radius: 8px;
  width: 100%;
  height: fit-content;
  overflow: hidden;
  opacity: 0;
  animation: fadeInUp 0.3s ease-out forwards;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      ${"" /* transform: translateY(10px); */}
    }
    to {
      opacity: 1;
      ${"" /* transform: translateY(0); */}
    }
  }
`;

const DayTimeSelection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 8px;
  padding: 10px 0px;
  border-bottom: 1px solid #e4e7ec;
  width: 100%;
  height: fit-content;
`;

const DaySelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding: 8px 12px;
  border-radius: 8px;
  width: 100%;
  height: fit-content;
`;

const DayInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  height: fit-content;
`;

const DayIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
`;

const DayText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.21em;
  color: #667085;
`;

const TimeRange = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  height: fit-content;
`;

const TimeInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background-color: #f5f7f9;
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
`;

const TimeInputText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  color: #717680;
`;

const TimeSeparator = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  color: #717680;
`;

const ManualActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  padding: 12px;
  background-color: #f5f7f9;
  border-bottom: 1px solid #e4e7ec;
  width: 100%;
  height: fit-content;
`;

const ActionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  flex: 1;
  height: fit-content;
  background-color: ${(props) => (props.primary ? "#05799D" : "#ffffff")};
  border: 1px solid ${(props) => (props.primary ? "#05799D" : "#d5d7da")};
  box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? "#046a87" : "#f8f9fa")};
    border-color: ${(props) => (props.primary ? "#046a87" : "#c1c4cd")};
  }
`;

const ActionButtonText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.43em;
  color: ${(props) => (props.primary ? "#ffffff" : "#414651")};
`;

const TrackedTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  gap: 12px;
  padding: 0px 12px;
  flex: 1;
`;

const NoTimeNotice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  gap: 24px;
  width: 100%;
  height: fit-content;
`;

const NoticeIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 10px;
  width: 48px;
  height: 46px;
  background: linear-gradient(
    181deg,
    rgba(245, 245, 245, 1) 0%,
    rgba(255, 255, 255, 0.5) 44%,
    rgba(233, 234, 235, 1) 100%
  );
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

const NoticeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 8px;
  width: 100%;
  height: fit-content;
`;

const NoticeTitle = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.21em;
  text-align: center;
  color: #535862;
`;

const NoticeDescription = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.21em;
  text-align: center;
  color: #717680;
`;

const CTASection = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  align-self: stretch;
  gap: 16px;
  padding: 12px;
  height: fit-content;
  background-color: #fff;
  border-top: 1px solid #e4e7ec;
`;

const CTAButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  flex: 1;
  height: fit-content;
  background-color: #ffffff;
  border: 1px solid #d5d7da;
  box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
    border-color: #c1c4cd;
  }
`;

const CTAIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
`;

const CTATextPadding = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 2px;
  width: fit-content;
  height: fit-content;
`;

const CTAText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.43em;
  color: #414651;
`;

const TrackTime = ({
  isOpen,
  onClose,
  isTimerActive,
  timerTime,
  showTimer,
  onTimerToggle,
  formatTime,
}) => {
  const [activeMode, setActiveMode] = useState("timer"); // 'timer' or 'manual'

  return (
    <TrackTimeWrapper isOpen={isOpen}>
      <TrackTimeContainer isOpen={isOpen}>
        <SubHeader>
          <ProgressWrapper>
            <ProgressIndicator>
              <ProgressText>
                <ElapsedTime>0h</ElapsedTime> / 8h
              </ProgressText>
            </ProgressIndicator>
          </ProgressWrapper>
          <Heading>
            <HeadingText>Track Time</HeadingText>
          </Heading>
          <HeaderCrossIconWrapper>
            <HeaderCrossIcon onClick={onClose}>
              <InlineSvgIcon
                src={xmark}
                width="16px"
                height="20px"
                color="#667085"
              />
            </HeaderCrossIcon>
          </HeaderCrossIconWrapper>
        </SubHeader>

        <MainContent>
          <TimerOption>
            <ModeSelection>
              <ButtonGroup>
                <ToggleButton
                  active={activeMode === "timer"}
                  onClick={() => setActiveMode("timer")}
                >
                  <ToggleIcon>
                    <InlineSvgIcon
                      src={circlePlayIcon}
                      width="16px"
                      height="16px"
                      color="#667085"
                    />
                  </ToggleIcon>
                  <ToggleText active={activeMode === "timer"}>Timer</ToggleText>
                </ToggleButton>

                <ToggleButton
                  active={activeMode === "manual"}
                  onClick={() => setActiveMode("manual")}
                >
                  <ToggleIcon>
                    <InlineSvgIcon
                      src={penToSquareIcon}
                      width="16px"
                      height="16px"
                      color="#667085"
                    />
                  </ToggleIcon>
                  <ToggleText active={activeMode === "manual"}>
                    Manual
                  </ToggleText>
                </ToggleButton>
              </ButtonGroup>
            </ModeSelection>

            <ModeContentContainer>
              {activeMode === "timer" && (
                <TimerSection key="timer">
                  <TaskSelection>
                    <TaskInput>
                      <TaskIcon>
                        <InlineSvgIcon
                          src={diagramSubtaskIcon}
                          width="16px"
                          height="16px"
                          color="#667085"
                        />
                      </TaskIcon>
                      <TaskText>Select task</TaskText>
                    </TaskInput>
                  </TaskSelection>

                  <TimerDisplay>
                    <TimerControls>
                      <PlaySection>
                        <PlayButton onClick={onTimerToggle}>
                          <InlineSvgIcon
                            src={isTimerActive ? stopCircle : circlePlaySolid}
                            width="16px"
                            height="16px"
                            color={isTimerActive ? "#D92D20" : "#05799D"}
                          />
                        </PlayButton>
                        <TimeText>
                          {formatTime ? formatTime(timerTime) : "0:00:00"}
                        </TimeText>
                      </PlaySection>
                    </TimerControls>
                  </TimerDisplay>
                </TimerSection>
              )}

              {activeMode === "manual" && (
                <ManualSection key="manual">
                  <TaskSelection>
                    <TaskInput>
                      <TaskIcon>
                        <InlineSvgIcon
                          src={diagramSubtaskIcon}
                          width="16px"
                          height="16px"
                          color="#667085"
                        />
                      </TaskIcon>
                      <TaskText>Select task</TaskText>
                    </TaskInput>
                  </TaskSelection>

                  <DayTimeSelection>
                    <DaySelector>
                      <DayInfo>
                        <DayIcon>
                          <InlineSvgIcon
                            src={timerIcon}
                            width="16px"
                            height="16px"
                            color="#667085"
                          />
                        </DayIcon>
                        <DayText>Sun, Aug 17</DayText>
                      </DayInfo>

                      <TimeRange>
                        <TimeInput>
                          <TimeInputText>5:07 am</TimeInputText>
                        </TimeInput>
                        <TimeSeparator>-</TimeSeparator>
                        <TimeInput>
                          <TimeInputText>5:07 am</TimeInputText>
                        </TimeInput>
                      </TimeRange>
                    </DaySelector>
                  </DayTimeSelection>

                  <ManualActions>
                    <ActionButton>
                      <ActionButtonText>Cancel</ActionButtonText>
                    </ActionButton>
                    <ActionButton primary>
                      <ActionButtonText primary>Save</ActionButtonText>
                    </ActionButton>
                  </ManualActions>
                </ManualSection>
              )}
            </ModeContentContainer>
          </TimerOption>

          <TrackedTime>
            <NoTimeNotice>
              <NoticeIcon>
                <InlineSvgIcon
                  src={alarmClockIcon}
                  width="24px"
                  height="24px"
                  color="#A4A7AE"
                />
              </NoticeIcon>
              <NoticeContent>
                <NoticeTitle>You haven't tracked any time yet!</NoticeTitle>
                <NoticeDescription>
                  Start making the most of your time by starting a timer or
                  entering your time manually
                </NoticeDescription>
              </NoticeContent>
            </NoTimeNotice>
          </TrackedTime>

          <CTASection>
            <CTAButton>
              <CTAIconWrapper>
                <InlineSvgIcon
                  src={stopwatchIcon}
                  width="16px"
                  height="16px"
                  color="#717680"
                />
              </CTAIconWrapper>
              <CTATextPadding>
                <CTAText>My Timesheet</CTAText>
              </CTATextPadding>
            </CTAButton>

            <CTAButton>
              <CTAIconWrapper>
                <InlineSvgIcon
                  src={squarePollIcon}
                  width="16px"
                  height="16px"
                  color="#717680"
                />
              </CTAIconWrapper>
              <CTATextPadding>
                <CTAText>Dashboard</CTAText>
              </CTATextPadding>
            </CTAButton>
          </CTASection>
        </MainContent>
      </TrackTimeContainer>
    </TrackTimeWrapper>
  );
};

export default TrackTime;
