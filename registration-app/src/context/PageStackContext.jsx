import React, { createContext, useContext, useState } from "react";

const PageStackContext = createContext();

export const PageStackProvider = ({ children }) => {
  const [pageStack, setPageStack] = useState([]);

  const pushPage = (page) => {
    setPageStack((prev) => [...prev, page]);
  };

  const popPage = () => {
    setPageStack((prev) => prev.slice(0, -1));
  };

  const currentPage = pageStack[pageStack.length - 1] || null;

  return (
    <PageStackContext.Provider value={{ pageStack, pushPage, popPage, currentPage }}>
      {children}
    </PageStackContext.Provider>
  );
};

export const usePageStack = () => useContext(PageStackContext);
