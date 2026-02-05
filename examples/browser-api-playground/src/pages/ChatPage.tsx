import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { EmbedConfigContext, authOptionsKey, baseOptionsKey } from "../EmbedConfigContext";
import { EmbeddedSearchWidget } from "../types";
import useAuthProvider from "../useAuthProvider";
import { type ThemeVariant } from "@gleanwork/web-sdk";

interface ChatLocation {
  type: 'chat' | 'agent';
  id: string | undefined;
}

const ChatPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const {config} = useContext(EmbedConfigContext)
  const authParams = useAuthProvider(config[authOptionsKey], config[baseOptionsKey].backend)
  const navigate = useNavigate()
  const [ currentChatLocation, setCurrentChatLocation ] = useState<ChatLocation | undefined>(undefined);

  useEffect(() => {
    if (!window.GleanWebSDK) return;

    const chatCustomConfig = {
      ...config[baseOptionsKey],
      ...config[EmbeddedSearchWidget.Chat]
    }

    const handler = containerRef.current && window.GleanWebSDK.renderChat(containerRef.current, {
      chatId: searchParams.get("chatId") ?? "",
      ...chatCustomConfig,
      ...authParams,
      // Add overrides to the custom config here
      themeVariant: chatCustomConfig.themeVariant as ThemeVariant,
    });

    handler?.on('chat:location_update', ({name, type, id}) => {
      setCurrentChatLocation({
        type,
        id,
      });
    });
  }, [searchParams, setSearchParams, navigate, config, authParams]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <span className="text-sm rounded-md p-1 my-2 inline-block">Current {currentChatLocation?.type}: {String(currentChatLocation?.id)}</span>
    </div>
  );
};

export default ChatPage;
