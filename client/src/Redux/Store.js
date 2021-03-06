import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const middleware = applyMiddleware(thunk);

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    // eslint-disable-next-line no-undef
    middleware
  )
);

export default store;
