const clientData = {
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

const clients = [];

const colorCodes = {
  0: "#fff7f8", //White
  1: "#a9f0d1", //Green
  2: "#ffd25a", //Yellow
  3: "#ff7e6b", //Red
  4: "#fff7f8", //Whitish
  5: "#464d77", //Dark blue
};

function clientBtnString(id) {
  return "clientbutton" + String(id);
}

function updateSelection(id) {
  currentClientButton = document.getElementById(clientBtnString(id));
  currentClient = id;
}

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
  span.innerHTML = `Section ${sectionNumber}`;
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
      checkbox.innerHTML = "✔️";
      break;
    case 1:
      checkbox.innerHTML = "•••";
      break;
    case 2:
      checkbox.innerHTML = "✖";
      break;
    case -1:
      checkbox.innerHTML = "";
      break;
  }
  checkbox.style.background = colorCodes[state + 1];
  checkbox.setAttribute("data-state", state + 1);
}

function rotateFollowup(object, state) {
  if (state === "false") {
    object.setAttribute("data-state", "true");
    object.innerHTML = "!";
    object.style.background = colorCodes[3];
  } else {
    object.setAttribute("data-state", "false");
    object.innerHTML = "";
    object.style.background = colorCodes[4];
  }
}

function populateLineItem(object, data, lineNumber) {
  if (data) {
    const followup = object.children[0];
    const check1 = object.children[2];
    const check2 = object.children[3];
    const check3 = object.children[4];
    const textbox = object.children[5];

    followup.setAttribute("data-state", data[lineNumber][0]);
    check1.setAttribute("data-state", data[lineNumber][1]);
    check2.setAttribute("data-state", data[lineNumber][2]);
    check3.setAttribute("data-state", data[lineNumber][3]);
    textbox.value = data[lineNumber][4];
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

function createLineItem(item, sectionNumber, controlNumber) {
  //Create sub elements
  const container = document.createElement("div");
  container.classList.add("container");

  const followupMarker = document.createElement("div");
  followupMarker.classList.add("followup-marker");

  followupMarker.setAttribute("data-state", "false");
  //   followupMarker.innerHTML = "";

  const sectionLabel = document.createElement("span");
  sectionLabel.classList.add("sectionlabel");
  sectionLabel.innerHTML = prettyControl(sectionNumber, controlNumber);

  const checkBox1 = document.createElement("div");
  const checkBox2 = document.createElement("div");
  const checkBox3 = document.createElement("div");

  const boxes = [checkBox1, checkBox2, checkBox3];

  boxes.forEach((box) => {
    // box.innerHTML = "X";
    box.classList.add("checkbox");
    box.setAttribute("data-state", "0");
  });

  const textBox = document.createElement("textArea");
  textBox.spellcheck = false;
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
      loadClient(id);
      refreshElements(true);
    });
  });
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
      const lineItem = createLineItem(box, i + 1, j);
      console.log("test");
      populateLineItem(lineItem, clients[clientId][i + 1], j - 1);
    }
    spacer(box);
  }

  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      let state = Number(checkbox.getAttribute("data-state"));
      rotateCheckbox(checkbox, state);
    });
  });

  document.querySelectorAll(".followup-marker").forEach((marker) => {
    marker.addEventListener("click", () => {
      let state = marker.getAttribute("data-state");
      rotateFollowup(marker, state);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  clients.push(clientData);

  loadClient(0);

  refreshElements(false);

  //Add new client
  document.getElementById("addClient").addEventListener("click", () => {
    const popupWindow = document.getElementById("popup");
    popupWindow.style.display === "none" || popupWindow.style.display === ""
      ? (popupWindow.style.display = "flex")
      : (popupWindow.style.display = "none");
  });

  document.getElementById("submitbutton").addEventListener("click", () => {
    const popupWindow = document.getElementById("popup");
    clients.push(createNewClient());
    console.log(clients);
    loadClient(clients.length - 1);
    refreshElements(true);

    popupWindow.style.display = "none";
  });
});
