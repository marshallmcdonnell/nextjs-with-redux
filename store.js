import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { jsonformsReducer } from "@jsonforms/core";
import {
  materialCells,
  materialRenderers
} from "@jsonforms/material-renderers";

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0
};

export const actionTypes = {
  TICK: "TICK",
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET"
};

// REDUCERS
export const countReducer = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return state + 1;
    case actionTypes.DECREMENT:
      return state - 1;
    case actionTypes.RESET:
      return (state = 0);
    default:
      return state;
  }
};

export const lightReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return (state = !!action.light);
    default:
      return state;
  }
};

export const updateReducer = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return (state = action.ts);
    default:
      return state;
  }
};

// ACTIONS
export const serverRenderClock = () => {
  return { type: actionTypes.TICK, light: false, ts: Date.now() };
};
export const startClock = () => {
  return { type: actionTypes.TICK, light: true, ts: Date.now() };
};

export const incrementCount = () => {
  return { type: actionTypes.INCREMENT };
};

export const decrementCount = () => {
  return { type: actionTypes.DECREMENT };
};

export const resetCount = () => {
  return { type: actionTypes.RESET };
};

export function initializeStore(initialState = exampleInitialState) {
  const initState = {
    jsonforms: {
      cells: materialCells,
      renderers: materialRenderers
    }
  };

  const combinedInitState = { ...initialState, ...initState };

  const combinedReducers = combineReducers({
    lastUpdate: updateReducer,
    light: lightReducer,
    count: countReducer,
    jsonforms: jsonformsReducer()
  });
  return createStore(
    combinedReducers,
    combinedInitState,
    composeWithDevTools(applyMiddleware())
  );
}
