import React from "react";
import styled from "styled-components";

// Import assets
import pdfIcon from "../../assets/images/pdf-icon.png";
import docxIcon from "../../assets/images/docx-icon.png";
import avatarUser1 from "../../assets/images/avatar-user1.png";
import avatarUser2 from "../../assets/images/avatar-user2.png";
import avatarUser3 from "../../assets/images/avatar-user3.png";
import avatarUser4 from "../../assets/images/avatar-user4.png";
import avatarUser5 from "../../assets/images/avatar-user5.png";
import avatarUser6 from "../../assets/images/avatar-user6.png";

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${"" /* gap: 24px; */}
  width: 100%;
`;
FeedContainer.displayName = "FeedContainer";

const FeedItem = styled.div`
  display: flex;
  align-self: stretch;
  gap: 12px;
  padding: 12px 12px;

  width: 100%;
  position: relative;

  &:hover {
    background-color: #f2f6fa;
  }

  transition: background-color 0.3s ease-in-out;
`;
FeedItem.displayName = "FeedItem";

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.bgColor || "#f0f0f0"}; /* Dynamic or fallback background */
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  outline-style: solid;
  outline-color: #00000014;
  outline-width: 1px;
  flex-shrink: 0;
  position: relative;
`;
Avatar.displayName = "NotificationAvatar";

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background-color: ${(props) => (props.online ? "#17B26A" : "#D5D7DA")};
  border: 1.5px solid #ffffff;
  border-radius: 50%;
`;
OnlineIndicator.displayName = "OnlineIndicator";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  ${"" /* gap: 12px; */}
  flex: 1;
`;
Content.displayName = "NotificationContent";

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
TextContent.displayName = "TextContent";

const NameTimeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${"" /* margin-bottom: 4px; */}
`;
NameTimeRow.displayName = "NameTimeRow";

const ActivityTime = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
ActivityTime.displayName = "ActivityTime";

const PersonName = styled.span`
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #414651;
`;
PersonName.displayName = "PersonName";

const ActionText = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  color: #535862;
  margin-bottom: ${(props) => (props.hasFile ? "12px" : "0")};
`;
ActionText.displayName = "ActionText";

const HighlightedText = styled.span`
  color: #05799d;
  font-weight: 500;
`;
HighlightedText.displayName = "HighlightedText";

const FileContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
FileContent.displayName = "FileContent";

const FileIcon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;
FileIcon.displayName = "FileIcon";

const FileName = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #414651;
`;
FileName.displayName = "FileName";

const FileDetails = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 450;
  font-size: 12px;
  line-height: 1.5;
  color: #667085;
`;
FileDetails.displayName = "FileDetails";

const TimeStamp = styled.div`
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5;
  color: #667085;
`;
TimeStamp.displayName = "TimeStamp";

const UnreadDot = styled.div`
  ${"" /* position: absolute; */}
  right: 0;
  top: 0;
  width: 8px;
  height: 8px;
  background-color: #17b26a;
  border-radius: 50%;
  margin: 1px;
`;
UnreadDot.displayName = "UnreadDot";

// Sample notification data
const notifications = [
  {
    id: 1,
    type: "file",
    avatar: avatarUser1,
    name: "Phoenix Baker",
    action: (
      <>
        Added a file to{" "}
        <HighlightedText>Marketing site redesign</HighlightedText>
      </>
    ),
    file: {
      name: "Brand Guidelines.pdf",
      size: "2.4 MB",
      icon: pdfIcon,
    },
    time: "2m ago",
    bgColor: "#D6CFB7",
    isUnread: true,
    isOnline: true,
  },
  {
    id: 2,
    type: "team",
    avatar: avatarUser2,
    name: "Lana Steiner",
    action: (
      <>
        Invited <HighlightedText>Alisa Hester</HighlightedText> to the team
      </>
    ),
    time: "5m ago",
    bgColor: "#D7E3E8",
    isUnread: true,
    isOnline: false,
  },
  {
    id: 3,
    type: "team",
    avatar: avatarUser3,
    name: "Demi Wikinson",
    action: (
      <>
        Completed task <HighlightedText>Review homepage design</HighlightedText>
      </>
    ),
    time: "12m ago",
    bgColor: "#DADCD6",
    isUnread: true,
    isOnline: true,
  },
  {
    id: 4,
    type: "file",
    avatar: avatarUser4,
    name: "Candice Wu",
    action: "Updated project documentation",
    file: {
      name: "Project Specs.docx",
      size: "1.8 MB",
      icon: docxIcon,
    },
    time: "1h ago",
    bgColor: "#D9D0E6",
    isUnread: true,
    isOnline: true,
  },
  {
    id: 5,
    type: "team",
    avatar: avatarUser5,
    name: "Orlando Diggs",
    action: (
      <>
        Created 7 tasks in{" "}
        <HighlightedText>Marketing site redesign</HighlightedText>
      </>
    ),
    time: "2h ago",
    bgColor: "#E5DDCE",
    isUnread: false,
    isOnline: true,
  },
  {
    id: 6,
    type: "file",
    avatar: avatarUser6,
    name: "Drew Cano",
    action: "Shared wireframes for mobile app",
    action: (
      <>
        Added a file to <HighlightedText>Marketing site redesign</HighlightedText>
      </>
    ),
    file: {
      name: "Mobile Wireframes.pdf",
      size: "3.2 MB",
      icon: pdfIcon,
    },
    time: "3h ago",
    bgColor: "#D9E5CC",
    isUnread: false,
    isOnline: false,
  },
];

const ActivityFeed = ({ filter = "all" }) => {
  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((notif) => notif.isUnread)
      : notifications;

  return (
    <FeedContainer>
      {filteredNotifications.map((notification) => (
        <FeedItem key={notification.id}>
          <Avatar src={notification.avatar} bgColor={notification.bgColor}>
            <OnlineIndicator online={notification.isOnline} />
          </Avatar>

          <Content>
            <TextContent>
              <NameTimeRow>
                <PersonName>{notification.name}</PersonName>
                <ActivityTime>
                  <TimeStamp>{notification.time}</TimeStamp>
                  {notification.isUnread && <UnreadDot />}
                </ActivityTime>
              </NameTimeRow>
              <ActionText hasFile={notification.type === "file"}>
                {notification.action}
              </ActionText>

              {notification.type === "file" && notification.file && (
                <FileContent>
                  <FileIcon src={notification.file.icon} alt="File icon" />
                  <div>
                    <FileName>{notification.file.name}</FileName>
                    <FileDetails>{notification.file.size}</FileDetails>
                  </div>
                </FileContent>
              )}
            </TextContent>
          </Content>
        </FeedItem>
      ))}
    </FeedContainer>
  );
};

export default ActivityFeed;
