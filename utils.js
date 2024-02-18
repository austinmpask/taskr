import * as Main from "./script.js";
import * as Var from "./var.js";

//Formatting for table readouts
export function prettyControl(sectionNumber, controlNumber) {
  let prettyNum = String(controlNumber);
  if (prettyNum.length === 1) {
    prettyNum = "0" + prettyNum;
  }
  return `${sectionNumber}.${prettyNum}`;
}

//Create a parent box to encapsulate each section
export function createBox() {
  const box = document.createElement("div");
  box.classList.add("sectionbox");
  document.getElementById("content").appendChild(box);
  return box;
}

//Create label for each section
export function createHeader(item, sectionNumber) {
  const container = document.createElement("div");
  container.classList.add("containerheader");
  const span = document.createElement("span");
  span.innerHTML = `S ${sectionNumber}`;
  container.appendChild(span);
  item.appendChild(container);
}

//DOM element to visually divide sections
export function spacer(object) {
  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  object.insertAdjacentElement("afterend", spacer);
}

export function createLineItem(
  item,
  sectionNumber,
  controlNumber,
  clientId,
  clients
) {
  //Parent container
  const container = document.createElement("div");
  container.classList.add("container");

  //Followup flag/marker
  const followupMarker = document.createElement("div");
  followupMarker.classList.add("followup-marker");

  //Set data state to reflect stored data
  followupMarker.setAttribute(
    "data-state",
    clients[clientId][sectionNumber][controlNumber - 1][0]
  );

  //Line item label
  const sectionLabel = document.createElement("span");
  sectionLabel.classList.add("sectionlabel");
  sectionLabel.innerHTML = prettyControl(sectionNumber, controlNumber);

  //Progress tracking checkboxes
  const checkBox1 = document.createElement("div");
  const checkBox2 = document.createElement("div");
  const checkBox3 = document.createElement("div");

  const boxes = [checkBox1, checkBox2, checkBox3];

  //Set data states to reflect stored data
  boxes.forEach((box, index) => {
    box.classList.add("checkbox");
    box.setAttribute(
      "data-state",
      clients[clientId][sectionNumber][controlNumber - 1][index + 1]
    );
  });

  //Free input note section
  const textBox = document.createElement("textArea");
  textBox.spellcheck = false;
  textBox.classList.add("textbox");

  //Repopulate contents based on saved data
  textBox.value = clients[clientId][sectionNumber][controlNumber - 1][4];

  const family = [followupMarker, checkBox1, checkBox2, checkBox3, textBox];

  //Add indexing to be able to tie back to local data
  family.forEach((thing) => {
    thing.setAttribute("data-sec", sectionNumber);
    thing.setAttribute("data-lineindex", controlNumber - 1);
  });

  //Indicators for data array indexes which relate to DOM contents
  followupMarker.setAttribute("data-storageindex", 0);
  checkBox1.setAttribute("data-storageindex", 1);
  checkBox2.setAttribute("data-storageindex", 2);
  checkBox3.setAttribute("data-storageindex", 3);
  textBox.setAttribute("data-storageindex", 4);

  //Add all to parent element and push to DOM
  container.appendChild(followupMarker);
  container.appendChild(sectionLabel);
  container.appendChild(checkBox1);
  container.appendChild(checkBox2);
  container.appendChild(checkBox3);
  container.appendChild(textBox);

  item.appendChild(container);
  return container;
}

//Toggle the new project window
export function togWindow() {
  const popupWindow = document.getElementById("popup");
  const content = document.getElementById("content");
  const deleteButton = document.getElementById("deletebutton");
  if (
    popupWindow.style.display === "none" ||
    popupWindow.style.display === ""
  ) {
    content.style.filter = "blur(4px)";
    popupWindow.style.display = "flex";
    deleteButton.style.display = "none";
  } else {
    popupWindow.style.display = "none";
    content.style.filter = "";
    deleteButton.style.display = "flex";
  }
}

export function rotateFollowup(object, state) {
  if (state === "false") {
    //Update elements state
    object.setAttribute("data-state", "true");
    object.innerHTML = Var.starSVG;
    object.style.background = Var.colorCodes[3];

    //Write new state to storage array
    const key = object.getAttribute("data-sec");
    const lineindex = object.getAttribute("data-lineindex");
    const storageindex = object.getAttribute("data-storageindex");
    Main.clients[Main.currentClient][key][lineindex][storageindex] = true;
  } else {
    //Update elements state
    object.setAttribute("data-state", "false");
    object.innerHTML = "";
    object.style.background = "transparent";

    //Write new state to storage array
    const key = object.getAttribute("data-sec");
    const lineindex = object.getAttribute("data-lineindex");
    const storageindex = object.getAttribute("data-storageindex");
    Main.clients[Main.currentClient][key][lineindex][storageindex] = false;
  }
}

//Reflect appropriate icon for the button state
export function rotateCheckbox(checkbox, state) {
  if (state === 3) {
    state = -1;
  }

  switch (state) {
    case 0:
      checkbox.innerHTML = Var.checkSVG;
      break;
    case 1:
      checkbox.innerHTML = Var.dotSVG;
      break;
    case 2:
      checkbox.innerHTML = Var.xSVG;
      break;
    case -1:
      checkbox.innerHTML = "";
      break;
  }
  //Update the background, update the element's state
  checkbox.style.background = Var.colorCodes[state + 1];
  checkbox.setAttribute("data-state", state + 1);

  //Write new state to storage array
  const key = checkbox.getAttribute("data-sec");
  const lineindex = checkbox.getAttribute("data-lineindex");
  const storageindex = checkbox.getAttribute("data-storageindex");
  Main.clients[Main.currentClient][key][lineindex][storageindex] = state + 1;
}

//Validate input data (No missed fields, no duplicate sections)
export function dataCheck() {
  const name = document.querySelector(".nameinput").value;

  //Input sections -> array
  const sections = [...document.querySelectorAll(".sectioninput")].map(
    (input) => {
      return input.value;
    }
  );

  //Input controls -> array
  const controls = [...document.querySelectorAll(".numberinput")].map(
    (input) => {
      return input.value;
    }
  );

  //Verify that there were no duplicate sections inputted
  const uniqueValues = new Set(sections).size !== sections.length;

  //Blank section check
  const sectionCheck = sections.some((element) => {
    return element === "";
  });

  //Blank control check
  const controlCheck = controls.some((element) => {
    return element === "";
  });

  //Generic response for any failure
  if (name === "" || sectionCheck || controlCheck || uniqueValues) {
    return false;
  }
  return true;
}
