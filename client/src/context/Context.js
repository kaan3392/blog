import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  darkMode: JSON.parse(localStorage.getItem("mode")) || false
};

export const Context = createContext(INITIAL_STATE);


export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("mode",JSON.stringify(state.darkMode));
  }, [state.user, state.darkMode]);

  return (
    <Context.Provider value={{
      user: state.user,
      isFetching: state.isFetching,
      error: state.error,
      darkMode: state.darkMode,
      dispatch
    }}>
      {children}
    </Context.Provider>
  );
};