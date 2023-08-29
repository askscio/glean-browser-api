import { RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useEmbeddedSearchAuth from "../hooks/useEmbeddedSearchAuth";
import { mergeQueryParams } from "../utils/queryParams";

/**
 * Get available height to the end of the viewport
 */
 const useAvailableViewportHeight = (
  containerRef: RefObject<HTMLDivElement>,
  gutterSize = 10,
  minHeight = 600
) => {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    // Note: Should wrap with a debounce / throttle
    const refreshHeight = () => {
      if (!containerRef.current) return;

      // Find available height to the end of the viewport
      setHeight(
        Math.max(
          minHeight,
          window.innerHeight - containerRef.current.offsetTop - gutterSize
        )
      );
    };

    refreshHeight();

    window.addEventListener("resize", refreshHeight);
    return () => window.removeEventListener("resize", refreshHeight);
  }, [containerRef, gutterSize, minHeight]);

  return height;
};


const SearchResults = () => {
  const containerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { authToken, backend, refreshAuthToken } = useEmbeddedSearchAuth()
  const availableViewportHeight = useAvailableViewportHeight(containerRef)

  const query = searchParams.get("query") ?? "";
  const datasource = searchParams.get("ds") ?? "";

  /**
   * Updates query params with the updated `query`
   */
  const handleSearch = useCallback(
    (query: string) => setSearchParams(current => mergeQueryParams(current, { query })),
    [setSearchParams]
  );

  const handleDSChange = useCallback(
    (ds: string) => setSearchParams(current => mergeQueryParams(current, { ds })),
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
      hideDatasourceFilterSelector: true,
      loadingPattern: 'load-more',
    });
  }, [handleSearch, handleDSChange, query, authToken, backend, refreshAuthToken]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          height: 'auto',
          width: "100%",
          position: "relative",
        }}
      />
    </>
  );
};

export default SearchResults;
