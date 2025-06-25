import React, { createContext, useContext, useState, useCallback } from "react";

const PageStackContext = createContext();

export const PageStackProvider = ({ children }) => {
  const [pageStack, setPageStack] = useState([]);

  const pushPage = useCallback((page) => {
    setPageStack((prev) => [...prev, page]);
  }, []);

  const popPage = useCallback(() => {
    setPageStack((prev) => prev.slice(0, -1));
  }, []);

  const currentPage = pageStack[pageStack.length - 1] || null;

  return (
    <PageStackContext.Provider value={{ pageStack, pushPage, popPage, currentPage }}>
      {children}
    </PageStackContext.Provider>
  );
};

export const usePageStack = () => useContext(PageStackContext);
