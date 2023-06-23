import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const ChatPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!window.EmbeddedSearch) return;

    window.EmbeddedSearch.renderChat(containerRef.current, {
      chatId: searchParams.get("chatId") ?? "",
      onChat: (chatId: string) => setSearchParams({ chatId }),
    });
  }, [searchParams, setSearchParams]);

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
