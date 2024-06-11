import React, { useRef } from "react";
import { createRoot } from "react-dom/client";
import { Divider, Input, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import type { EmbeddedSearch } from "@gleanwork/web-sdk";

import "./styles.css";

declare global {
  interface Window {
    EmbeddedSearch?: EmbeddedSearch;
  }
}

function App() {
  const containerRef = useRef(null);
  const [isGleanReady, setIsGleanReady] = useState(false);

  // initialize glean
  useEffect(() => {
    if (!isGleanReady || !window.EmbeddedSearch || !containerRef.current)
      return;

    window.EmbeddedSearch.attach(containerRef.current, {
      onSearch(query) {
        console.log(query);
      },
    });
  }, [isGleanReady]);

  // load glean script and wait for glean to be ready
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.glean.com/embedded-search-latest.min.js";
    script.onload = () => {
      setIsGleanReady(true);
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <Typography.Paragraph>
        Basic Glean Search Widget Setup
      </Typography.Paragraph>
      <input
        ref={containerRef}
        className="border-solid border-4 rounded-2xl"
        placeholder="Search"
        style={{
          padding: 15,
          height: 40,
          width: 220,
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
