import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers/rootReducer";

const middleware = applyMiddleware(promise(), thunk, createLogger());

export default (initialState = {}) =>
  createStore(rootReducer, initialState, middleware);
