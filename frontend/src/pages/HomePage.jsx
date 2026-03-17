import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { act, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useStreamChat } from "../hooks/useStreamChat.js";
import PageLoader from "../components/PageLoader.jsx";
import "../styles/stream-chat-theme.css";
import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { PlusIcon } from "lucide-react";
import CreateChannelModal from "../components/CreateChannelModal.jsx";
const HomePage = () => {
  const [activeChannel, setActiveChannel] = useState(null);
  const [searchParams] = useSearchParams();
  const { chatClient, error, isLoading } = useStreamChat();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (chatClient) {
      const channelId = searchParams.get("channel");

      if (channelId) {
        const channel = chatClient.channel("messaging", channelId);
        setActiveChannel(channel);
      }
    }
  }, [chatClient, searchParams]);

  if (error) return <p>Something went wrong</p>;
  if (isLoading || !chatClient) return <PageLoader />;

  return (
    <div className="chat-wrapper">
      <Chat client={chatClient}>
        <div className="chat-container">
          <div className="str-chat__channel-list">
            <div className="team-channel-list">
              <div className="team-channel-list__header gap-4">
                <div className="brand-container">
                  <img src="..\logo-re.png" alt="" className="brand-logo"/>
                  <span className="brand-name">Rewired</span>
                </div>
                <div className="user-button-wrapper">
                  <UserButton />
                </div>
                <div className="team-channel-list"></div>
              </div>
              <div className="team-channel-list__content">
                <div className="create-channel-section">
                  <button onClick={()=>{setIsCreateModalOpen(true)}} className="create-channel-btn">
                    <span>Create Channel</span><PlusIcon className="size-4"/>
                  </button>
                </div>
                {/* channel list over here */}
              </div>
            </div>
          </div>
          {/* right container */}
          <div className="chat-main">
            <Channel channel={activeChannel}>
              <Window>
                {/* <CustomChannelHeader /> */}
                <MessageList/>
                <MessageInput/>
              </Window>
              <Thread/>
            </Channel>
          </div>
        </div>
        {isCreateModalOpen && (
          <CreateChannelModal 
          isOpen={isCreateModalOpen}
          onClose={()=>setIsCreateModalOpen(false)}
          />
        )}
      </Chat>
    </div>
  );
};

export default HomePage;