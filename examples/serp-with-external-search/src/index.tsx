import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from "./components/Layout/PageLayout";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";

import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <App />
);
