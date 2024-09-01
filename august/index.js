const tracks = [
  {
    name: "forest ambient",
    duration: "2:13",
    source: "9uk7uYExv9qjSwID2pUAnM_gon-1kVuzxwKnGgs5Z18",
    file: "bird 98",
  },
  {
    name: "ocarina play",
    duration: "1:20",
    source: "eR8ziObRyMQlRYRDPEknRTPuBKExKG4HQKL0j9jtl3U",
    file: "forest 71",
  },
  {
    name: "forest ambient",
    duration: "1:28",
    source: "4PKmJZhKHwrpQ4aCHeqzKv38qdJ2ZeSp8O20umxV4UU",
    file: "bird 99",
  },
  {
    name: "ocarina play",
    duration: "2:07",
    source: "a0thvwr6SwSOnlx-w1DnmsZdWOY4-ozccsE7VSmE-DY",
    file: "forest 72",
  },
  {
    name: "forest ambient",
    duration: "5:57",
    source: "6NZL-sfjhD6CwRFhlweGYG2L34gAzPakFSTriomDT2g",
    file: "bird 100",
  },
  {
    name: "ocarina play",
    duration: "2:26",
    source: "yyKof0SJb80zhhtKHot7M7GSQHUZblu5NcYtCnyPNG8",
    file: "forest 73",
  },
  {
    name: "forest ambient",
    duration: "3:48",
    source: "jM97E4hQ84y9KI5EHVQ9IlkMYKILLzTrPp8Fw5JaDvc",
    file: "bird 101",
  },
  {
    name: "ocarina play",
    duration: "1:41",
    source: "XnhkY7eAYZJ43RwCFVXHUPym__3sMr0Z1vB8NOkkSag",
    file: "forest 74",
  },
  {
    name: "forest ambient",
    duration: "19:03",
    source: "KVahwacmbAkJhUhUFL-hZlgT_w3lHHnBdOoFMWo6aMA",
    file: "bird 102",
  },
  {
    name: "ocarina play",
    duration: "10:42",
    source: "yhwcQbJgMbZGqMEe3l2OUL_7F0Yg_qbr6Vs5-QrjC_E",
    file: "forest 75",
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
