import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const containerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query") ?? "";

  /**
   * Redirects to chat screen with the corresponding chat state
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
   * Updates query params with the updated `query`
   */
  const handleSearch = useCallback(
    (query: string) => setSearchParams({ query }),
    [setSearchParams]
  );

  useEffect(() => {
    if (!window.GleanWebSDK) return;

    window.GleanWebSDK.renderSearchResults(containerRef.current, {
      query,
      onChat: handleChat,
      onSearch: handleSearch,
    });
  }, [query, handleSearch, handleChat]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        paddingTop: "24px",
      }}
    />
  );
};

export default SearchResults;
