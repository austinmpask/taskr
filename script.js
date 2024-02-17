let clientData = {
  name: "Sample Client",
  1: [
    [true, 0, 1, 3, `test\ntest2`],
    [false, 1, 2, 0, "test for 1.2"],
    [true, 0, 1, 0, "test for 1.3"],
  ],

  2: [
    [true, 0, 1, 2, "test for 2.1"],
    [false, 1, 2, 0, "test for 2.2"],
  ],
};

let clients = [];

let currentClient = 0;

const colorCodes = {
  0: "#fff7f8", //White
  1: "#6effc0", //Green
  2: "#fffa56", //Yellow
  3: "#ff2516", //Red
  4: "#fff7f8", //Whitish
  5: "#464d77", //Dark blue
};

function clientBtnString(id) {
  return "clientbutton" + String(id);
}

// function updateSelection(id) {
//   currentClientButton = document.getElementById(clientBtnString(id));
//   currentClient = id;
// }

function prettyControl(sectionNumber, controlNumber) {
  let prettyNum = String(controlNumber);
  if (prettyNum.length === 1) {
    prettyNum = "0" + prettyNum;
  }
  return `${sectionNumber}.${prettyNum}`;
}

function createHeader(item, sectionNumber) {
  const container = document.createElement("div");
  container.classList.add("containerheader");
  const span = document.createElement("span");
  span.innerHTML = `S ${sectionNumber}`;
  container.appendChild(span);
  item.appendChild(container);
}

function createBox() {
  const box = document.createElement("div");
  box.classList.add("sectionbox");
  document.getElementById("content").appendChild(box);
  return box;
}

function spacer(object) {
  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  object.insertAdjacentElement("afterend", spacer);
}

function rotateCheckbox(checkbox, state) {
  if (state === 3) {
    state = -1;
  }

  switch (state) {
    case 0:
      checkbox.innerHTML = "✓";
      break;
    case 1:
      checkbox.innerHTML = "?";
      break;
    case 2:
      checkbox.innerHTML = "X";
      break;
    case -1:
      checkbox.innerHTML = "";
      break;
  }
  checkbox.style.background = colorCodes[state + 1];
  checkbox.setAttribute("data-state", state + 1);

  const key = checkbox.getAttribute("data-sec");
  const lineindex = checkbox.getAttribute("data-lineindex");
  const storageindex = checkbox.getAttribute("data-storageindex");
  clients[currentClient][key][lineindex][storageindex] = state + 1;
  // console.log(clients[currentClient]);
}

function rotateFollowup(object, state) {
  if (state === "false") {
    object.setAttribute("data-state", "true");
    object.innerHTML = "!";
    object.style.background = colorCodes[3];

    //saving
    const key = object.getAttribute("data-sec");
    const lineindex = object.getAttribute("data-lineindex");
    const storageindex = object.getAttribute("data-storageindex");
    clients[currentClient][key][lineindex][storageindex] = true;
    // console.log(clients[currentClient]);
  } else {
    object.setAttribute("data-state", "false");
    object.innerHTML = "";
    object.style.background = colorCodes[4];

    const key = object.getAttribute("data-sec");
    const lineindex = object.getAttribute("data-lineindex");
    const storageindex = object.getAttribute("data-storageindex");
    clients[currentClient][key][lineindex][storageindex] = false;
    // console.log(clients[currentClient]);
  }
}

function saveLocally() {
  localStorage.setItem("userData", JSON.stringify(clients));
  // localStorage.setItem("currentClient", JSON.stringify(currentClient));
}

function initializeStorage() {
  localStorage.setItem("userData", JSON.stringify(clients));
  console.log("Starting fresh!");
}

function loadData() {
  if (!localStorage.getItem("userData")) {
    initializeStorage();
  }
  clients = JSON.parse(localStorage.getItem("userData"));

  // if (!localStorage.getItem("currentClient")) {
  //   localStorage.setItem("currentClient", JSON.stringify(currentClient));
  // }
  // currentClient = JSON.parse(localStorage.getItem("currentClient"));
}

function populateLineItem(object, data, lineNumber, sectionNumber) {
  if (data) {
    const followup = object.children[0];
    const check1 = object.children[2];
    const check2 = object.children[3];
    const check3 = object.children[4];
    const textbox = object.children[5];

    //sync states with data
    let family = [followup, check1, check2, check3, textbox];

    family.forEach((thing) => {
      thing.setAttribute("data-sec", sectionNumber);
      thing.setAttribute("data-lineindex", lineNumber);
    });

    followup.setAttribute("data-state", data[lineNumber][0]);
    followup.setAttribute("data-storageindex", 0);

    textbox.value = data[lineNumber][4];
    textbox.setAttribute("data-storageindex", 4);

    check1.setAttribute("data-state", data[lineNumber][1]);
    check1.setAttribute("data-storageindex", 1);
    check2.setAttribute("data-state", data[lineNumber][2]);
    check2.setAttribute("data-storageindex", 2);
    check3.setAttribute("data-state", data[lineNumber][3]);
    check3.setAttribute("data-storageindex", 3);
  }
}

function refreshElements(flag) {
  document.querySelectorAll(".followup-marker").forEach((element) => {
    if (element.getAttribute("data-state") === "true") {
      element.style.background = colorCodes[3];
      element.innerHTML = "!";
    }
  });

  document.querySelectorAll(".checkbox").forEach((element) => {
    const state = Number(element.getAttribute("data-state"));
    rotateCheckbox(element, state - 1);
  });
  refreshHeader(flag);

  document.querySelectorAll(".containerheader").forEach((header) => {
    const textbox = header.nextElementSibling.children[5];
    textbox.style.border = "none";
  });
}

function createLineItem(item, sectionNumber, controlNumber, clientId) {
  //Create sub elements
  const container = document.createElement("div");
  container.classList.add("container");

  const followupMarker = document.createElement("div");
  followupMarker.classList.add("followup-marker");

  followupMarker.setAttribute(
    "data-state",
    clients[clientId][sectionNumber][controlNumber - 1][0]
  );

  //   followupMarker.innerHTML = "";

  const sectionLabel = document.createElement("span");
  sectionLabel.classList.add("sectionlabel");
  sectionLabel.innerHTML = prettyControl(sectionNumber, controlNumber);

  const checkBox1 = document.createElement("div");
  const checkBox2 = document.createElement("div");
  const checkBox3 = document.createElement("div");

  const boxes = [checkBox1, checkBox2, checkBox3];

  boxes.forEach((box, index) => {
    // box.innerHTML = "X";
    box.classList.add("checkbox");
    box.setAttribute(
      "data-state",
      clients[clientId][sectionNumber][controlNumber - 1][index + 1]
    );
  });

  const textBox = document.createElement("textArea");
  textBox.spellcheck = false;
  textBox.classList.add("textbox");

  textBox.value = clients[clientId][sectionNumber][controlNumber - 1][4];

  const family = [followupMarker, checkBox1, checkBox2, checkBox3, textBox];

  family.forEach((thing) => {
    thing.setAttribute("data-sec", sectionNumber);
    thing.setAttribute("data-lineindex", controlNumber - 1);
  });
  //sync states with data
  // followupMarker.setAttribute("data-sec", sectionNumber);
  // followupMarker.setAttribute("data-lineindex", controlNumber - 1);
  followupMarker.setAttribute("data-storageindex", 0);
  checkBox1.setAttribute("data-storageindex", 1);
  checkBox2.setAttribute("data-storageindex", 2);
  checkBox3.setAttribute("data-storageindex", 3);

  textBox.setAttribute("data-storageindex", 4);

  //Set up the element and push to dom
  container.appendChild(followupMarker);
  container.appendChild(sectionLabel);
  container.appendChild(checkBox1);
  container.appendChild(checkBox2);
  container.appendChild(checkBox3);
  container.appendChild(textBox);

  item.appendChild(container);
  return container;
}

function createNewClient() {
  const name = document.querySelector(".nameinput").value;
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

  const client = {
    name: name,
  };

  for (let i = 0; i < sections.length; i++) {
    let section = [];
    for (let j = 0; j < controls[i]; j++) {
      section.push([false, 0, 0, 0, ""]);
    }
    client[sections[i]] = section;
  }
  return client;
}

function refreshHeader(flag) {
  if (flag) {
    document.querySelectorAll(".clientbutton").forEach((button) => {
      button.remove();
    });
  }
  clients.forEach((client, index) => {
    const headerItem = document.createElement("div");
    headerItem.classList.add("clientbutton");
    headerItem.setAttribute("data-clientId", index);
    headerItem.innerHTML = client.name;
    document
      .getElementById("addClient")
      .insertAdjacentElement("beforebegin", headerItem);
  });

  document.querySelectorAll(".clientbutton").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-clientId");
      currentClient = id;
      loadClient(id);
      refreshElements(true);
    });
  });
}

function saveText(object) {
  const key = object.getAttribute("data-sec");
  const lineindex = object.getAttribute("data-lineindex");
  const storageindex = object.getAttribute("data-storageindex");

  clients[currentClient][key][lineindex][storageindex] = object.value;
  // console.log(clients[currentClient]);
}

function loadClient(clientId) {
  document.querySelectorAll(".sectionbox").forEach((box) => {
    box.remove();
  });

  document.querySelectorAll(".spacer").forEach((spacer) => {
    spacer.remove();
  });

  const clientKeys = Object.keys(clients[clientId]);
  const clientValues = Object.values(clients[clientId]);

  const numSections = clientKeys.length - 1;
  for (let i = 0; i < numSections; i++) {
    const box = createBox();
    createHeader(box, clientKeys[i]);
    for (let j = 1; j <= clients[clientId][clientKeys[i]].length; j++) {
      const lineItem = createLineItem(box, clientKeys[i], j, clientId);
      populateLineItem(
        lineItem,
        clients[clientId][i + 1],
        j - 1,
        clientKeys[i]
      );
    }
    spacer(box);
  }

  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      let state = Number(checkbox.getAttribute("data-state"));
      rotateCheckbox(checkbox, state);
      saveLocally();
    });
  });

  document.querySelectorAll(".followup-marker").forEach((marker) => {
    marker.addEventListener("click", () => {
      let state = marker.getAttribute("data-state");
      rotateFollowup(marker, state);
      saveLocally();
    });
  });

  document.querySelectorAll(".textbox").forEach((textbox) => {
    textbox.addEventListener("input", () => {
      saveText(textbox);
      saveLocally();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  clients.push(clientData);
  loadData();
  loadClient(0);
  refreshElements(false);
  saveLocally();
  console.log(clients);

  //Add new client
  document.getElementById("addClient").addEventListener("click", () => {
    const popupWindow = document.getElementById("popup");
    popupWindow.style.display === "none" || popupWindow.style.display === ""
      ? (popupWindow.style.display = "flex")
      : (popupWindow.style.display = "none");
  });

  document.getElementById("deletebutton").addEventListener("click", () => {
    if (clients.length > 1) {
      clients.splice(currentClient, 1);
      saveLocally();
      currentClient = 0;
      console.log(clients[currentClient]);
      refreshElements(true);
      loadClient(0);
    }
  });

  document.getElementById("submitbutton").addEventListener("click", () => {
    const popupWindow = document.getElementById("popup");
    clients.push(createNewClient());
    console.log(clients);
    loadClient(clients.length - 1);
    currentClient = clients.length - 1;
    refreshElements(true);

    //cleanup
    document.querySelectorAll(".sectioninput").forEach((sectioninput) => {
      sectioninput.value = "";
    });

    document.querySelectorAll(".numberinput").forEach((numberinput) => {
      numberinput.value = "";
    });

    document.querySelector(".nameinput").value = "";

    saveLocally();

    popupWindow.style.display = "none";
  });
});
