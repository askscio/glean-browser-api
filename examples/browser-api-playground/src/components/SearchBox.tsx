import { useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EmbedConfigContext, baseOptionsKey, searchOptionsKey } from "../EmbedConfigContext";
import { EmbeddedSearchWidget } from "../types";
import useAuthProvider from "../useAuthProvider";

const SearchBox = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {config} = useContext(EmbedConfigContext)
  const authParams = useAuthProvider()

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
    if (!window.EmbeddedSearch) return;

    const searchBoxCustomConfig = {
      ...config[baseOptionsKey],
      ...config[searchOptionsKey],
      ...config[EmbeddedSearchWidget.SearchBox]
    }

    window.EmbeddedSearch.renderSearchBox(containerRef.current, {
      onSearch: handleSearch,
      onChat: handleChat,
      query,
      ...searchBoxCustomConfig,
      ...authParams,
      // Add overrides to the custom config here
    });
  }, [handleChat, handleSearch, query, config, authParams]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "48px",
        width: "100%",
        position: "relative", // This is required
        zIndex: 2, // Should be higher than other elements below
      }}
    />
  );
};

export default SearchBox;
