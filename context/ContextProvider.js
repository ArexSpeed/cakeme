import React, { createContext, useReducer } from 'react';

export const GlobalContext = createContext();

export const ContextProvider = ({ reducer, initialState, children }) => (
  <GlobalContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </GlobalContext.Provider>
);
