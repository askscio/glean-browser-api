import { useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import { EmbedConfigContext, authOptionsKey, baseOptionsKey, searchOptionsKey } from "../EmbedConfigContext";
import { EmbeddedSearchWidget } from "../types";
import useAuthProvider from "../useAuthProvider";

const SearchResults = () => {
  const containerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const {config} = useContext(EmbedConfigContext)
  const authParams = useAuthProvider(config[authOptionsKey], config[baseOptionsKey].backend)
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
      ...authParams,
      // Add overrides to the custom config here
    });
  }, [query, handleSearch, handleChat, config, authParams]);

  return (
    <div className="h-full">
      <div className="pt-8 max-w-screen-xl m-auto">
        <SearchBox />
      </div>
      <div
        ref={containerRef}
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          paddingTop: "24px",
        }}
      />
    </div>
  );
};

export default SearchResults;
