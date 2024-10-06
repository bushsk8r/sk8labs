const tracks = [
  {
    name: "forest ambient",
    duration: "2:50",
    source: "AUl38lNgwkmcFdpgkTAdhU7LihUnfWgmNI2WP3ZT5FU",
    file: "bird 103",
  },
  {
    name: "ocarina play",
    duration: "1:32",
    source: "DlumnCaiQ29E-3HMLt-YxcjGd1fG0azGpxSCFGKk-j4",
    file: "forest 76",
  },
  {
    name: "forest ambient",
    duration: "2:02",
    source: "bHM101GMLGwjZK9lWBAuOTE24lV0dkDlPyBzYhQ67Q0",
    file: "bird 104",
  },
  {
    name: "ocarina play",
    duration: "1:36",
    source: "1SHkj7O1NKD7Fs4LRioGB0EpsYg7ljl8MXzLqgr5W4Y",
    file: "forest 77",
  },
  {
    name: "forest ambient",
    duration: "1:26",
    source: "GMPZeKHg0cOOUbScsosTTTme_SA8UAhUQ1--K3GKFUI",
    file: "bird 105",
  },
  {
    name: "ocarina play",
    duration: "1:17",
    source: "gwgefJ08tH8jsBH4dfzCARSWB9fLtm0iBzKDqjsBSIM",
    file: "forest 78",
  },
];

const btns = document.getElementsByClassName("medBtn");
const display = document.getElementById("disp");
const selectors = document.getElementById("select");
const selectBtns = document.getElementsByClassName("medSltBtn");

function clearClicked(but) {
  for (let b of but) {
    b.classList.remove("clicked");
  }
}

//media type buttons
for (let b of btns) {
  b.addEventListener("click", () => {
    display.innerHTML = b.id;
    updateSelect(b.id);
    clearClicked(btns);
    b.classList.add("clicked");
  });
}

//remove al elements in media selector
function clearSelect() {
  while (selectors.hasChildNodes()) {
    selectors.removeChild(selectors.firstChild);
  }
}

//remove all elements in media display
function clearDisplay() {
  while (display.hasChildNodes()) {
    display.removeChild(display.firstChild);
  }
}

//add audio to display -> track id
function updateDisplay(id) {
  let audio = document.createElement("audio");
  audio.setAttribute("controls", "controls");
  audio.setAttribute("src", `https://arweave.net/${tracks[id].source}`);
  display.appendChild(audio);
}

//update media selector -> media type id
function updateSelect(id) {
  clearSelect();
  clearDisplay();

  if (id === "rec") {
    selectors.classList.add("recSelect");
    selectors.classList.remove("playSelect");

    display.innerHTML = "👇🏿select recording👇🏿";

    for (let i = 0; i < tracks.length; i++) {
      let medSltBtn = document.createElement("button");
      medSltBtn.setAttribute("id", i);
      medSltBtn.setAttribute("class", "medSltBtn");
      medSltBtn.innerHTML = `${tracks[i].name} <br> ${tracks[i].duration}`;

      medSltBtn.addEventListener("click", () => {
        clearDisplay();
        updateDisplay(i);
        clearClicked(selectBtns);
        medSltBtn.classList.add("clicked");
      });
      selectors.appendChild(medSltBtn);
    }
  } else {
    selectors.classList.add("playSelect");
    selectors.classList.remove("recSelect");

    display.innerHTML = "a suburban pirate radio station";

    let spotify = document.createElement("iframe");
    spotify.setAttribute(
      "src",
      "https://open.spotify.com/embed/playlist/713MEqdBoJ6odfWD8vhvR6?utm_source=generator",
    );
    spotify.setAttribute("width", "80%");
    spotify.setAttribute("height", "800");
    selectors.appendChild(spotify);
  }
}
