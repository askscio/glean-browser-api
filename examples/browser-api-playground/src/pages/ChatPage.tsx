import { useContext, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { EmbedConfigContext, authOptionsKey, baseOptionsKey } from "../EmbedConfigContext";
import { EmbeddedSearchWidget } from "../types";
import useAuthProvider from "../useAuthProvider";
import { ThemeVariant } from "@gleanwork/web-sdk";

const ChatPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const {config} = useContext(EmbedConfigContext)
  const authParams = useAuthProvider(config[authOptionsKey], config[baseOptionsKey].backend)
  const navigate = useNavigate()

  useEffect(() => {
    if (!window.GleanWebSDK) return;

    const chatCustomConfig = {
      ...config[baseOptionsKey],
      ...config[EmbeddedSearchWidget.Chat]
    }
    containerRef.current && window.GleanWebSDK.renderChat(containerRef.current, {
      chatId: searchParams.get("chatId") ?? "",
      ...chatCustomConfig,
      ...authParams,
      // Add overrides to the custom config here
      themeVariant: chatCustomConfig.themeVariant as ThemeVariant,
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
    />
  );
};

export default ChatPage;
