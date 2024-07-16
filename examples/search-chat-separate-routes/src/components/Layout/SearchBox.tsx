import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBox = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  /**
   * Navigates to chat page with initial chat context
   */
  const handleChat = useCallback(
    (chatId: string) =>
      navigate({
        pathname: "/chat",
        search: new URLSearchParams({ chatId }).toString(),
      }),
    [navigate]
  );

  /**
   * Navigates to search page with the search query
   */
  const handleSearch = useCallback(
    (query: string) =>
      navigate({
        pathname: "/search",
        search: new URLSearchParams({ query }).toString(),
      }),
    [navigate]
  );

  useEffect(() => {
    if (!window.GleanWebSDK) return;

    window.GleanWebSDK.renderSearchBox(containerRef.current, {
      onSearch: handleSearch,
      onChat: handleChat,
      query,
      searchBoxCustomizations: {
        borderRadius: 24,
        boxShadow: "none",
        placeholderText: "Search for anything...",
      },
    });
  }, [handleChat, handleSearch, query]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "48px",
        width: "600px",
        position: "relative", // This is required
        zIndex: 2, // Should be higher than other elements below
      }}
    />
  );
};

export default SearchBox;
