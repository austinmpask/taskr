import * as Main from "./script.js";
//Store the client array to local storage
export function saveLocally() {
  localStorage.setItem("userData", JSON.stringify(Main.clients));
}

//Store the premade dummy data to disk
export function initializeStorage() {
  localStorage.setItem("userData", JSON.stringify(Main.clients));
  console.log("Starting fresh!");
}

export function loadData() {
  if (!localStorage.getItem("userData")) {
    initializeStorage();
  }
  return JSON.parse(localStorage.getItem("userData")); //All data is stored locally under userData
}
