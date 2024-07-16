import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const containerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const chatId = searchParams.get("chatId") ?? "";
  const mode = searchParams.get("mode") ?? 'search'

  const handleChat = useCallback(
    (chatId: string) => setSearchParams({ chatId, mode: 'chat' }),
    [setSearchParams]
  );

  const handleSearch = useCallback(
    (query: string) => setSearchParams({ query, mode: 'search' }),
    [setSearchParams]
  );

  useEffect(() => {
    if (!window.GleanWebSDK) return;

    // Conditionally render either Chat or Search depending on mode
    switch (mode) {
      case 'search': {
        window.GleanWebSDK.renderSearchResults(containerRef.current, {
          query,
          onChat: handleChat,
          onSearch: handleSearch,
          showInlineSearchBox: false,
          supportedModes: ["chat"]
        });
        break;
      }
      case 'chat': {
        window.GleanWebSDK.renderChat(containerRef.current, {
          chatId,
          supportedModes: ["search_results"],
          onSearch: handleSearch,
          onChat: handleChat,
        });
        break;
      }
      default: {
      }
    }
  }, [
    chatId,
    handleSearch,
    handleChat,
    mode,
    query,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        paddingTop: mode === 'chat' ? 0 : 24
      }}
    />
  );
};

export default SearchResults;
