import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useEmbeddedSearchAuth from "../hooks/useEmbeddedSearchAuth";

const SearchResults = () => {
  const containerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { authToken, backend, refreshAuthToken } = useEmbeddedSearchAuth()

  const query = searchParams.get("query") ?? "";

  /**
   * Updates query params with the updated `query`
   */
  const handleSearch = useCallback(
    (query: string) => setSearchParams({ query }),
    [setSearchParams]
  );

  useEffect(() => {
    if (!window.EmbeddedSearch || !authToken) return;

    // Render search results with any additional options / customisations applied
    // Documentation: https://dev.glean.com/meta/browser_api/interfaces/TabbedSearchOptions.html
    window.EmbeddedSearch.renderSearchResults(containerRef.current, {
      authToken,
      backend,
      query,
      onAuthTokenRequired: refreshAuthToken,
      onSearch: handleSearch,
    });
  }, [handleSearch, query, authToken, backend, refreshAuthToken]);

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
