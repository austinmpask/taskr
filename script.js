import * as Var from "./var.js";
import * as Save from "./save.js";
import * as Utils from "./utils.js";

//"clients" stores POJOs for all project info in an array. It is the data source of truth.
export let clients = [];

export let currentClient = 0;

function refreshElements(flag) {
  //Repopulate background colors based on states

  //Flags
  document.querySelectorAll(".followup-marker").forEach((element) => {
    if (element.getAttribute("data-state") === "true") {
      element.style.background = Var.colorCodes[3];
      element.innerHTML = Var.starSVG;
    }
  });

  //Checkboxes
  document.querySelectorAll(".checkbox").forEach((element) => {
    const state = Number(element.getAttribute("data-state"));
    Utils.rotateCheckbox(element, state - 1);
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
    object.style.backgroundColor = Var.colorCodes[1];
    noteBox.style.backgroundColor = Var.colorCodes[1];
    noteBox.style.color = Var.colorCodes[6];
  } else {
    object.style.backgroundColor = Var.colorCodes[0];
    noteBox.style.backgroundColor = Var.colorCodes[0];
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
    const box = Utils.createBox();
    Utils.createHeader(box, clientKeys[i]); //Section label
    for (let j = 1; j <= clients[clientId][clientKeys[i]].length; j++) {
      const lineItem = Utils.createLineItem(
        box,
        clientKeys[i],
        j,
        clientId,
        clients
      ); //Create dom elements and inject stored data
    }
    Utils.spacer(box);
  }

  //Checkbox click handler
  function checkboxClickHandler(event) {
    const checkbox = event.currentTarget;
    let state = Number(checkbox.getAttribute("data-state"));
    Utils.rotateCheckbox(checkbox, state);
    Save.saveLocally();
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
    Utils.rotateFollowup(marker, state);
    Save.saveLocally(clients);
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
    Save.saveLocally(clients);
  }

  //Add listeners to inputboxes
  document.querySelectorAll(".textbox").forEach((textbox) => {
    textbox.addEventListener("input", textboxInputHandler);
  });
}

//Add additional sections handler
function addInputLineHandler() {
  document
    .getElementById("inputsections")
    .insertAdjacentHTML("afterend", Var.addLineHTML);
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
  if (Utils.dataCheck()) {
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

    Save.saveLocally(clients);
    Utils.togWindow();
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
      Save.saveLocally(clients);
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
    clients.push(Var.clientData); //Initialize dummy data in the event localStorage need be initialized
    clients = Save.loadData();
    currentClient = clients.length - 1;
    loadClient(currentClient); //Draw interface from the data loaded from the endpoint
    refreshElements(false);
    Save.saveLocally(clients);
    console.log(clients);

    //Toggle the add client/project window
    document.getElementById("addClient").addEventListener("click", () => {
      Utils.togWindow();
    });
    document.getElementById("closebutton").addEventListener("click", () => {
      Utils.togWindow();
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
