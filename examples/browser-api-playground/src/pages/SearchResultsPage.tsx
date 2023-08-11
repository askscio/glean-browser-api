import { useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EmbedConfigContext, baseOptionsKey, searchOptionsKey } from "../EmbedConfigContext";
import { EmbeddedSearchWidget } from "../types";

const SearchResults = () => {
  const containerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const {config} = useContext(EmbedConfigContext)
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
    if (!window.EmbeddedSearch) return;

    const searchResultsCustomConfig = {
      ...config[baseOptionsKey],
      ...config[searchOptionsKey],
      ...config[EmbeddedSearchWidget.SearchResults],
    }
    window.EmbeddedSearch.renderSearchResults(containerRef.current, {
      query,
      onChat: handleChat,
      onSearch: handleSearch,
      ...searchResultsCustomConfig,
      // Add overrides to the custom config here
    });
  }, [query, handleSearch, handleChat, config]);

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
