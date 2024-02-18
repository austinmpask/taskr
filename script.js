//Example data for first time user
let clientData = {
  name: "Sample Project",
  1: [
    [
      false,
      0,
      0,
      0,
      `Welcome to taskr!\n\nA simple way to organize your SOC projects`,
    ],
    [
      false,
      0,
      0,
      0,
      `There are 3 columns available for every line item.\nEach column can represent anything. For example:\nPrepwork, Inquiry Notes, Inspection Notes`,
    ],
    [
      false,
      1,
      2,
      3,
      `Click on any of your columns to set various status markers to track your completion.\nTry it out!`,
    ],
  ],

  2: [
    [
      true,
      0,
      0,
      0,
      `You can click to the side of a line item number to flag it inorder to make it stand out.`,
    ],
    [
      false,
      0,
      0,
      0,
      `These text fields can be used for tracking open items!\nGet started by adding your own project by clicking the icon at the top right!`,
    ],
  ],
};

//SVGs for checkboxes and followup markers
const checkSVG = `<svg class="svg-icon" viewBox="0 0 20 20">
<path fill="none" d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
</svg>`;

const xSVG = `<svg class="svg-icon" viewBox="0 0 20 20">
<path fill="none" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
</svg>`;

const dotSVG = `<svg class="svg-icon" viewBox="0 0 20 20">
<path fill="none" d="M3.254,6.572c0.008,0.072,0.048,0.123,0.082,0.187c0.036,0.07,0.06,0.137,0.12,0.187C3.47,6.957,3.47,6.978,3.484,6.988c0.048,0.034,0.108,0.018,0.162,0.035c0.057,0.019,0.1,0.066,0.164,0.066c0.004,0,0.01,0,0.015,0l2.934-0.074c0.317-0.007,0.568-0.271,0.56-0.589C7.311,6.113,7.055,5.865,6.744,5.865c-0.005,0-0.01,0-0.015,0L5.074,5.907c2.146-2.118,5.604-2.634,7.971-1.007c2.775,1.912,3.48,5.726,1.57,8.501c-1.912,2.781-5.729,3.486-8.507,1.572c-0.259-0.18-0.618-0.119-0.799,0.146c-0.18,0.262-0.114,0.621,0.148,0.801c1.254,0.863,2.687,1.279,4.106,1.279c2.313,0,4.591-1.1,6.001-3.146c2.268-3.297,1.432-7.829-1.867-10.101c-2.781-1.913-6.816-1.36-9.351,1.058L4.309,3.567C4.303,3.252,4.036,3.069,3.72,3.007C3.402,3.015,3.151,3.279,3.16,3.597l0.075,2.932C3.234,6.547,3.251,6.556,3.254,6.572z"></path>
</svg>`;

const starSVG = `<svg class="svg-icon" viewBox="0 0 20 20">
<path fill="none" d="M16.85,7.275l-3.967-0.577l-1.773-3.593c-0.208-0.423-0.639-0.69-1.11-0.69s-0.902,0.267-1.11,0.69L7.116,6.699L3.148,7.275c-0.466,0.068-0.854,0.394-1,0.842c-0.145,0.448-0.023,0.941,0.314,1.27l2.871,2.799l-0.677,3.951c-0.08,0.464,0.112,0.934,0.493,1.211c0.217,0.156,0.472,0.236,0.728,0.236c0.197,0,0.396-0.048,0.577-0.143l3.547-1.864l3.548,1.864c0.18,0.095,0.381,0.143,0.576,0.143c0.256,0,0.512-0.08,0.729-0.236c0.381-0.277,0.572-0.747,0.492-1.211l-0.678-3.951l2.871-2.799c0.338-0.329,0.459-0.821,0.314-1.27C17.705,7.669,17.316,7.343,16.85,7.275z M13.336,11.754l0.787,4.591l-4.124-2.167l-4.124,2.167l0.788-4.591L3.326,8.5l4.612-0.67l2.062-4.177l2.062,4.177l4.613,0.67L13.336,11.754z"></path>
</svg>`;

const addLineHTML = `<div class="inputline" id="inputsections">
<input type="number" class="sectioninput" placeholder="Section #" />
<input type="number" class="numberinput" placeholder="# of Controls" />
</div>`;

//"clients" stores POJOs for all project info in an array. It is the data source of truth.
let clients = [];

let currentClient = 0;

const colorCodes = {
  0: "#fff7f8", //White
  1: "#6effc0", //Green
  2: "#fffa56", //Yellow
  3: "#ff2516", //Red
  4: "#fff7f8", //Whitish
  5: "#464d77", //Dark blue
  6: "#a9a9a9", //Light grey
};

//Tool to make DOM query easier
function clientBtnString(id) {
  return "clientbutton" + String(id);
}

//Formatting for table readouts
function prettyControl(sectionNumber, controlNumber) {
  let prettyNum = String(controlNumber);
  if (prettyNum.length === 1) {
    prettyNum = "0" + prettyNum;
  }
  return `${sectionNumber}.${prettyNum}`;
}

//Create label for each section
function createHeader(item, sectionNumber) {
  const container = document.createElement("div");
  container.classList.add("containerheader");
  const span = document.createElement("span");
  span.innerHTML = `S ${sectionNumber}`;
  container.appendChild(span);
  item.appendChild(container);
}

//Create a parent box to encapsulate each section
function createBox() {
  const box = document.createElement("div");
  box.classList.add("sectionbox");
  document.getElementById("content").appendChild(box);
  return box;
}

//DOM element to visually divide sections
function spacer(object) {
  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  object.insertAdjacentElement("afterend", spacer);
}

//Reflect appropriate icon for the button state
function rotateCheckbox(checkbox, state) {
  if (state === 3) {
    state = -1;
  }

  switch (state) {
    case 0:
      checkbox.innerHTML = checkSVG;
      break;
    case 1:
      checkbox.innerHTML = dotSVG;
      break;
    case 2:
      checkbox.innerHTML = xSVG;
      break;
    case -1:
      checkbox.innerHTML = "";
      break;
  }
  //Update the background, update the element's state
  checkbox.style.background = colorCodes[state + 1];
  checkbox.setAttribute("data-state", state + 1);

  //Write new state to storage array
  const key = checkbox.getAttribute("data-sec");
  const lineindex = checkbox.getAttribute("data-lineindex");
  const storageindex = checkbox.getAttribute("data-storageindex");
  clients[currentClient][key][lineindex][storageindex] = state + 1;
}

function rotateFollowup(object, state) {
  if (state === "false") {
    //Update elements state
    object.setAttribute("data-state", "true");
    object.innerHTML = starSVG;
    object.style.background = colorCodes[3];

    //Write new state to storage array
    const key = object.getAttribute("data-sec");
    const lineindex = object.getAttribute("data-lineindex");
    const storageindex = object.getAttribute("data-storageindex");
    clients[currentClient][key][lineindex][storageindex] = true;
  } else {
    //Update elements state
    object.setAttribute("data-state", "false");
    object.innerHTML = "";
    object.style.background = "transparent";

    //Write new state to storage array
    const key = object.getAttribute("data-sec");
    const lineindex = object.getAttribute("data-lineindex");
    const storageindex = object.getAttribute("data-storageindex");
    clients[currentClient][key][lineindex][storageindex] = false;
  }
}

//Store the client array to local storage
function saveLocally() {
  localStorage.setItem("userData", JSON.stringify(clients));
}

//Store the premade dummy data to disk
function initializeStorage() {
  localStorage.setItem("userData", JSON.stringify(clients));
  console.log("Starting fresh!");
}

function loadData() {
  if (!localStorage.getItem("userData")) {
    initializeStorage();
  }
  clients = JSON.parse(localStorage.getItem("userData")); //All data is stored locally under userData
}

function refreshElements(flag) {
  //Repopulate background colors based on states

  //Flags
  document.querySelectorAll(".followup-marker").forEach((element) => {
    if (element.getAttribute("data-state") === "true") {
      element.style.background = colorCodes[3];
      element.innerHTML = starSVG;
    }
  });

  //Checkboxes
  document.querySelectorAll(".checkbox").forEach((element) => {
    const state = Number(element.getAttribute("data-state"));
    rotateCheckbox(element, state - 1);
  });

  //Color the full line item green if all checkboxes are green
  document.querySelectorAll(".container").forEach((object) => {
    updateRowBg(object);
  });

  //Update header elements to reflect data
  refreshHeader(flag);

  //Remove the first line item's top border so there are no double borders
  document.querySelectorAll(".containerheader").forEach((header) => {
    const textbox = header.nextElementSibling.children[5];
    textbox.style.border = "none";
  });
}

function createLineItem(item, sectionNumber, controlNumber, clientId) {
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

//Validate input data (No missed fields, no duplicate sections)
function dataCheck() {
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
function createNewClient() {
  const name = document.querySelector(".nameinput").value;

  //Gather all inputted sections & controls. .length will match
  const sections = [...document.querySelectorAll(".sectioninput")].map(
    (input) => {
      return input.value;
    }
  );
  const controls = [...document.querySelectorAll(".numberinput")].map(
    (input) => {
      return input.value;
    }
  );

  //Initialize the POJO for the new project/client
  const client = {
    name: name,
  };

  //Create an array for each section, fill it with appropriate # of template control data
  for (let i = 0; i < sections.length; i++) {
    let section = [];
    for (let j = 0; j < controls[i]; j++) {
      section.push([false, 0, 0, 0, ""]);
    }
    //Add to client POJO
    client[sections[i]] = section;
  }
  return client;
}

function refreshHeader(flag) {
  //Flag used to indicate if the contents of the header need to be redrawn (when adding a new project)
  if (flag) {
    document.querySelectorAll(".clientbutton").forEach((button) => {
      //Remove event listeners to prevent memory leak
      button.removeEventListener("click", handleClientClick);
      button.remove();
    });
  }

  //Draw all projects to header
  clients.forEach((client, index) => {
    const headerItem = document.createElement("div");
    headerItem.classList.add("clientbutton");
    headerItem.setAttribute("data-clientId", index);
    if (index === Number(currentClient)) {
      headerItem.classList.add("selectedclient");
    }
    headerItem.innerHTML = client.name;
    document
      .getElementById("addClient")
      .insertAdjacentElement("beforebegin", headerItem);
  });

  //Handler for header client buttons
  function handleClientClick(event) {
    const button = event.currentTarget;
    const id = button.getAttribute("data-clientId");
    currentClient = id;
    loadClient(id);
    refreshElements(true);
  }

  //Add event listeners to all buttons
  document.querySelectorAll(".clientbutton").forEach((button) => {
    button.addEventListener("click", handleClientClick);
  });
}

//Locally save textarea contents
function saveText(object) {
  const key = object.getAttribute("data-sec");
  const lineindex = object.getAttribute("data-lineindex");
  const storageindex = object.getAttribute("data-storageindex");

  clients[currentClient][key][lineindex][storageindex] = object.value;
}

//Update the lineitem to be completely green if all 3 columns are marked green
function updateRowBg(object) {
  const checkbox1 = Number(object.children[2].getAttribute("data-state"));
  const checkbox2 = Number(object.children[3].getAttribute("data-state"));
  const checkbox3 = Number(object.children[4].getAttribute("data-state"));
  const noteBox = object.children[5];

  if (checkbox1 === checkbox2 && checkbox2 === checkbox3 && checkbox1 === 1) {
    object.style.backgroundColor = colorCodes[1];
    noteBox.style.backgroundColor = colorCodes[1];
    noteBox.style.color = colorCodes[6];
  } else {
    object.style.backgroundColor = colorCodes[0];
    noteBox.style.backgroundColor = colorCodes[0];
    noteBox.style.color = "black";
  }
}

function loadClient(clientId) {
  //Remove event listeners from checkboxes
  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.removeEventListener("click", checkboxClickHandler);
  });

  //Remove event listeners from followups
  document.querySelectorAll(".followup-marker").forEach((followupMarker) => {
    followupMarker.removeEventListener("click", followupClickHandler);
  });

  //Remove event listeners from textboxes
  document.querySelectorAll(".textbox").forEach((textbox) => {
    textbox.removeEventListener("click", textboxInputHandler);
  });
  //Remove all dynamic content from page
  document.querySelectorAll(".sectionbox").forEach((box) => {
    box.remove();
  });

  document.querySelectorAll(".spacer").forEach((spacer) => {
    spacer.remove();
  });

  //Repopulate the page with the selected project/client's data

  //Get all of the keys from the selected client, as they each represent a section
  const clientKeys = Object.keys(clients[clientId]);

  const numSections = clientKeys.length - 1;
  for (let i = 0; i < numSections; i++) {
    //Encapsulate in a parent box for global CSS inheritance, and place the section into the DOM
    const box = createBox();
    createHeader(box, clientKeys[i]); //Section label
    for (let j = 1; j <= clients[clientId][clientKeys[i]].length; j++) {
      const lineItem = createLineItem(box, clientKeys[i], j, clientId); //Create dom elements and inject stored data
    }
    spacer(box);
  }

  //Checkbox click handler
  function checkboxClickHandler(event) {
    const checkbox = event.currentTarget;
    let state = Number(checkbox.getAttribute("data-state"));
    rotateCheckbox(checkbox, state);
    saveLocally();
    const object = checkbox.parentElement;
    updateRowBg(object);
  }

  //Add listeners to checkboxess
  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.addEventListener("click", checkboxClickHandler);
  });

  //Followup click handler
  function followupClickHandler(event) {
    const marker = event.currentTarget;
    let state = marker.getAttribute("data-state");
    rotateFollowup(marker, state);
    saveLocally();
    const object = marker.parentElement;
    updateRowBg(object);
  }

  //Add listeners to followup markers
  document.querySelectorAll(".followup-marker").forEach((marker) => {
    marker.addEventListener("click", followupClickHandler);
  });

  //Text input event handler
  function textboxInputHandler(event) {
    const textbox = event.currentTarget;
    saveText(textbox);
    saveLocally();
  }

  //Add listeners to inputboxes
  document.querySelectorAll(".textbox").forEach((textbox) => {
    textbox.addEventListener("input", textboxInputHandler);
  });
}

//Toggle the new project window
function togWindow() {
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

//Add additional sections handler
function addInputLineHandler() {
  document
    .getElementById("inputsections")
    .insertAdjacentHTML("afterend", addLineHTML);
}

//Subtract sections handler
function subInputLineHandler() {
  if (document.querySelectorAll(".inputline").length > 1) {
    const lineitem = document
      .querySelectorAll(".inputline")
      .item(document.querySelectorAll(".inputline").length - 1);
    lineitem.remove();
  }
}

//Create new project/client
function submitNewProject() {
  if (dataCheck()) {
    clients.push(createNewClient());
    console.log(clients);
    loadClient(clients.length - 1);
    currentClient = clients.length - 1;
    refreshElements(true);

    //Restore window to original state
    const inputs = document.querySelectorAll(".sectioninput");
    const numinputs = document.querySelectorAll(".numberinput");

    //Leave only one blank input
    for (let i = inputs.length - 1; i >= 0; i--) {
      i > 0 ? inputs[i].remove() : (inputs[i].value = "");
      i > 0 ? numinputs[i].remove() : (numinputs[i].value = "");
    }

    document.querySelector(".nameinput").value = "";

    saveLocally();
    togWindow();
  } else {
    alert("Please fill out all fields, and do not duplicate section numbers!");
  }
}

//Delete current project/client
function deleteHandler() {
  if (clients.length > 1) {
    if (
      confirm(`Are you sure you want to delete ${clients[currentClient].name}?`)
    ) {
      clients.splice(currentClient, 1);
      saveLocally();
      location.reload(true);
    }
  } else {
    alert("You must have atleast one current project!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  //Check if user is using Chrome
  if (
    /Chrome/.test(navigator.userAgent) &&
    /Google Inc/.test(navigator.vendor)
  ) {
    //Chrome user
    clients.push(clientData); //Initialize dummy data in the event localStorage need be initialized
    loadData();
    currentClient = clients.length - 1;
    loadClient(currentClient); //Draw interface from the data loaded from the endpoint
    refreshElements(false);
    saveLocally();
    console.log(clients);

    //Toggle the add client/project window
    document.getElementById("addClient").addEventListener("click", () => {
      togWindow();
    });
    document.getElementById("closebutton").addEventListener("click", () => {
      togWindow();
    });

    //Delete the current client/project
    document
      .getElementById("deletebutton")
      .addEventListener("click", deleteHandler);

    //Support adding and subtracting additional sections
    document
      .getElementById("addline")
      .addEventListener("click", addInputLineHandler);
    document
      .getElementById("subline")
      .addEventListener("click", subInputLineHandler);

    //Create new client
    document
      .getElementById("submitbutton")
      .addEventListener("click", submitNewProject);
  } else {
    //Not chrome user
    alert("taskr currently only supports Google Chrome :(");
  }
});
