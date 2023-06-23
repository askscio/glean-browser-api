import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "./components/Layout/PageLayout";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";

import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
