import React, { useState } from "react";
import styled from "styled-components";
import InlineSvgIcon from "../Sidebar/InlineSvgIcon";

// Import icons (we'll reuse some from TrackTime and add new ones)
import xmark from "../../assets/icons/xmark.svg";
import clockRotateLeft from "../../assets/icons/clock-rotate-left.svg";
import penToSquareIcon from "../../assets/icons/pen-to-square.svg";
import arrowsMaximize from "../../assets/icons/arrows-maximize.svg";
import plus from "../../assets/icons/plus.svg";
import sliders from "../../assets/icons/sliders.svg";
import circleArrowUp from "../../assets/icons/circle-arrow-up.svg";
import aiAvatar from "../../assets/icons/ai-icon.svg";
import user from "../../assets/icons/user.svg";
import squarePollVertical from "../../assets/icons/square-poll-vertical.svg";
import sparklesIcon from "../../assets/icons/sparkles-icon.svg";
import fileLines from "../../assets/icons/file-lines-icon.svg";
import gear from "../../assets/icons/gear-icon-regular.svg";

const AssistantWrapper = styled.div`
  width: ${(props) => (props.isOpen ? "400px" : "0px")};
  height: 100%;
  overflow: hidden;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const AssistantContainer = styled.div`
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

const HeaderIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  height: fit-content;
`;

const HeaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 28px;
  height: 28px;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const Heading = styled.div`
  display: flex;
  flex: 0 0 auto;
  gap: 6px;
  width: fit-content;
  height: fit-content;
`;

const HeadingText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.21em;
  color: #101828;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: stretch;
  gap: 12px;
  padding: 12px;
  flex: 1;
  background-color: #fff;
`;

const MessageAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  background-color: #fafafa;
  border: 1px solid #e9eaeb;
  border-radius: 12px;
  width: 100%;
  height: fit-content;
`;

const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 6px;
  ${"" /* height: 72px; */}
  width: 100%;
`;

const InputWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 6px;
  flex: 1;
  width: 100%;
`;

const TextareaInput = styled.input`
  display: flex;
  justify-content: stretch;
  align-items: flex-start;
  align-self: stretch;
  padding: 12px 12px 20px 12px;
  background-color: #ffffff;
  border: 1px solid #d5d7da;
  border-radius: 12px;
  flex: 1;
  width: 100%;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.71em;
  color: #181d27;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &::placeholder {
    color: #717680;
  }

  &:focus {
    border-color: #05799d;
    box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05),
      0px 0px 0px 3px rgba(5, 121, 157, 0.1);
  }
`;

const ActionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 12px;
  padding: 8px 12px;
  width: 100%;
  height: fit-content;
`;

const LeftActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
  height: fit-content;
`;

const RightActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
  height: fit-content;
`;

const ActionIcon = styled.div`
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

const SendButton = styled.div`
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

const WelcomeMessage = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 394px;
  height: fit-content;
`;

const WelcomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 8px;
  width: 100%;
  height: fit-content;
`;

const AITitle = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.56em;
  text-align: center;
  color: #717680;
`;

const WelcomeText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43em;
  text-align: center;
  color: #535862;
`;

const AIAvatarIcon = styled(InlineSvgIcon)`
  svg {
    overflow: visible !important;
  }
`;

const AISubtitle = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  fontsize: 18px;
  line-height: 1.56em;
  text-align: center;
  color: #181d27;
`;

const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  width: 352px;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px 4px 8px;
  background-color: #ffffff;
  border: 1px solid #d5d7da;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43em;
  text-align: center;
  color: #414651;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #b8bcc8;
  }
`;

const Assistant = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <AssistantWrapper isOpen={isOpen}>
      <AssistantContainer isOpen={isOpen}>
        <SubHeader>
          <HeaderIconWrapper>
            <HeaderIcon>
              <InlineSvgIcon
                src={clockRotateLeft}
                width="16px"
                height="16px"
                color="#667085"
              />
            </HeaderIcon>
            <HeaderIcon>
              <InlineSvgIcon
                src={penToSquareIcon}
                width="16px"
                height="16px"
                color="#667085"
              />
            </HeaderIcon>
          </HeaderIconWrapper>

          <Heading>
            <HeadingText>Assistant</HeadingText>
          </Heading>

          <HeaderIconWrapper>
            <HeaderIcon>
              <InlineSvgIcon
                src={arrowsMaximize}
                width="16px"
                height="16px"
                color="#667085"
              />
            </HeaderIcon>
            <HeaderIcon onClick={onClose}>
              <InlineSvgIcon
                src={xmark}
                width="20px"
                height="20px"
                color="#667085"
              />
            </HeaderIcon>
          </HeaderIconWrapper>
        </SubHeader>

        <MainContent>
          <WelcomeMessage>
            <AIAvatarIcon src={aiAvatar} width="56px" height="56px" />

            <WelcomeContent>
              <AITitle>Hi Olivia,</AITitle>
              <AISubtitle>Welcome back! How can I help?</AISubtitle>
              <WelcomeText>
                I'm here to help tackle your tasks. Choose from the prompts
                below or tell me what you need!
              </WelcomeText>
            </WelcomeContent>

            <BadgesContainer>
              <Badge color="success">
                <InlineSvgIcon
                  src={user}
                  width="12px"
                  height="12px"
                  color="#079455"
                />
                Create task
              </Badge>
              <Badge color="blue">
                <InlineSvgIcon
                  src={squarePollVertical}
                  width="12px"
                  height="12px"
                  color="#2E90FA"
                />
                Analyze data
              </Badge>
              <Badge color="purple">
                <InlineSvgIcon
                  src={sparklesIcon}
                  width="12px"
                  height="12px"
                  color="#7A5AF8"
                />
                Make a plan
              </Badge>
              <Badge color="pink">
                <InlineSvgIcon
                  src={fileLines}
                  width="12px"
                  height="12px"
                  color="#EE46BC"
                />
                Summarize text
              </Badge>
              <Badge color="orange">
                <InlineSvgIcon
                  src={penToSquareIcon}
                  width="12px"
                  height="12px"
                  color="#EF6820"
                />
                Help me write
              </Badge>
              <Badge color="gray">
                <InlineSvgIcon
                  src={gear}
                  width="12px"
                  height="12px"
                  color="#717680"
                />
                More
              </Badge>
            </BadgesContainer>
          </WelcomeMessage>
          <MessageAction>
            <TextareaWrapper>
              <InputWithLabel>
                <TextareaInput
                  type="text"
                  placeholder="Ask, create, search, @ to mention"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </InputWithLabel>
            </TextareaWrapper>

            <ActionContent>
              <LeftActionGroup>
                <ActionIcon>
                  <InlineSvgIcon
                    src={plus}
                    width="24px"
                    height="24px"
                    color="#667085"
                  />
                </ActionIcon>
                <ActionIcon>
                  <InlineSvgIcon
                    src={sliders}
                    width="20px"
                    height="19px"
                    color="#667085"
                  />
                </ActionIcon>
              </LeftActionGroup>

              <RightActionGroup>
                <SendButton>
                  <InlineSvgIcon
                    src={circleArrowUp}
                    width="24px"
                    height="24px"
                    color={inputValue.trim() ? "#05799d" : "#AEAEAE"}
                  />
                </SendButton>
              </RightActionGroup>
            </ActionContent>
          </MessageAction>
        </MainContent>
      </AssistantContainer>
    </AssistantWrapper>
  );
};

export default Assistant;
