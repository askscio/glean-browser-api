import { useContext, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { EmbedConfigContext, authOptionsKey, baseOptionsKey } from "../EmbedConfigContext";
import { EmbeddedSearchWidget } from "../types";
import useAuthProvider from "../useAuthProvider";
import { ThemeVariantOrAuto } from "@gleanwork/web-sdk/theme";

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
      onChat: (chatId?: string) => chatId && setSearchParams({ chatId }),
      onSearch: (query: string) => navigate({ pathname: '/search', search: new URLSearchParams({ query }).toString() }),
      ...chatCustomConfig,
      ...authParams,
      // Add overrides to the custom config here
      themeVariant: chatCustomConfig.themeVariant as ThemeVariantOrAuto,
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
