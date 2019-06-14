import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return {
      ...state,
      loggedIn: true,
      username: action.username,
      email: action.email,
      firstName: action.firstName,
      lastName: action.lastName,
      age: action.age
    };
  }
  if (action.type === "get-threads") {
    return { ...state, threads: action.threads };
  }
  if (action.type === "logout") {
    return { ...state, loggedIn: false };
  }
  if (action.type === "set-newThread") {
    console.log("new thread in store.js : ", action.newThread);
    return { ...state, newThread: [] };
  }
  if (action.type === "show-form") {
    return { ...state, showAddThread: action.showAddThread };
  }
  if (action.type === "location-change") {
    return { ...state, location: action.value };
  }
  if (action.type === "show-form2") {
    return { ...state, showAddReply: action.showAddReply };
  }
  if (action.type === "show-sell") {
    return { ...state, showSellItem: action.showSellItem };
  }
  if (action.type === "set-items") {
    return { ...state, sellItem: [] };
  }
  // if (action.type === "set-newReply") {
  //   let threads = state.threads.map(thread => {
  //     if (threadId === this.state.threadId) return;
  //   });

  return state;
};
const store = createStore(
  reducer,
  {
    username: "",
    firstName: "",
    lastName: "",
    loggedIn: false,
    threadCategories: [
      "soccer",
      "basketball",
      "tennis",
      "misc",
      "rockclimbing",
      "hockey"
    ],
    sellCategories: [
      "sellBasketball",
      "sellHockey",
      "sellTennis",
      "sellSoccer",
      "sellRockClimbing",
      "sellMisc"
    ],
    location: undefined,
    threads: [],
    newThread: [],
    showAddThread: false,
    showAddReply: false,
    showSellItem: false,
    sellItem: []
  },

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
