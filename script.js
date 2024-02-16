let currentClient = 0;
let currentClientButton = "";

const colorCodes = {
    1: "#a9f0d1", //Green
    2: "#ffd25a", //Yellow
    3: "#ff7e6b", //Red
    4: "#fff7f8", //White
    5: "#464d77" //Dark blue
}

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
    const container = document.createElement("div")
    container.classList.add("containerheader")
    const span = document.createElement("span")
    span.innerHTML = `Section ${sectionNumber}`
    container.appendChild(span)
    item.appendChild(container)
}

function createBox() {
    const box = document.createElement("div")
    box.classList.add("sectionbox")
    document.getElementById("content").appendChild(box)
    return box
}

function spacer(object) {
    const spacer = document.createElement("div")
    spacer.classList.add("spacer")
    object.insertAdjacentElement("afterend", spacer)
}

function createLineItem(item, sectionNumber, controlNumber) {

    //Create sub elements
    const container = document.createElement("div");
    container.classList.add("container");

    const followupMarker = document.createElement("div")
    followupMarker.classList.add("followup-marker")
    followupMarker.innerHTML = "!"

    const sectionLabel = document.createElement("span")
    sectionLabel.classList.add("sectionlabel")
    sectionLabel.innerHTML = prettyControl(sectionNumber, controlNumber)

    const checkBox1 = document.createElement("div")
    const checkBox2 = document.createElement("div")
    const checkBox3 = document.createElement("div")

    const boxes = [checkBox1, checkBox2, checkBox3]
    
    boxes.forEach((box) => {
        box.innerHTML = "X"
        box.classList.add("checkbox")
        box.setAttribute("data-state", "0")
    })


    //Set up the element and push to dom
    container.appendChild(followupMarker)
    container.appendChild(sectionLabel)
    container.appendChild(checkBox1)
    container.appendChild(checkBox2)
    container.appendChild(checkBox3)


    
    item.appendChild(container);
    return container;
}


document.addEventListener("DOMContentLoaded", () => {
    updateSelection(currentClient);
    currentClientButton.style.color = "blue";



//SAMPLE CLIENT TEST
    let k = 3;
    
    for (let i = 1; i < 4; i++) {

        const box = createBox();
        createHeader(box, i)
        for (let j = 1; j <= k; j++) {
            createLineItem(box, i, j)
        }
        spacer(box)
        k++
    }



//HANDLE CLICKING CHECKBOXES
    document.querySelectorAll(".checkbox").forEach((checkbox) => {
        checkbox.addEventListener("click", (event) => {
            const state = Number(checkbox.getAttribute("data-state"))
            switch(state) {
                case 0:
                    checkbox.style.background = colorCodes[1];
                    checkbox.setAttribute("data-state", String(state + 1))
                    break;
            }
        })
    })
});