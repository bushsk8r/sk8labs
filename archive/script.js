import curator from "./archive.js";

//display element from doc
const displayArea = document.getElementById("dataList");

function displayCuration(year) {
  let items = curator(year);
  displayArea.innerHTML = "";

  //add archive items to display area data list
  for (let arcItem of items) {
    const arcCuration = createElem("dt", arcItem.curation);
    const div = createElem("div", "", true, arcItem.curation);
    const arcCraft = createElem("dd", arcItem.craft);
    const yearOfCreation = createElem("dd", arcItem.creation);
    addToTag(div, [arcCraft, yearOfCreation]);
    addToTag(displayArea, [arcCuration, div]);
  }

  //add event handlers to archive item titles
  const titles = document.getElementsByTagName("dt");
  for (let t of titles) {
    //display selected descriptors
    t.addEventListener("click", () => {
      clickedTitle(t);
    });
  }
}

//create html element
//inputs(element type, text context, hidden if true, element name)
function createElem(type, text, hide, name) {
  const elem = document.createElement(type);
  elem.textContent = text;
  if (name) {
    elem.setAttribute("id", name);
    elem.classList.add("desc");
  }
  if (hide) {
    elem.classList.add("hidden");
  }
  return elem;
}

//add children to html element
function addToTag(tag, comps) {
  for (let c of comps) {
    tag.appendChild(c);
  }
}

//click handler for display item to display description
function clicked() {
  //variables to stored previous selected in closure
  let selected = "";
  let selectedDesc = "";

  function updatedClicked(id) {
    //selected is the same as previous
    if (selected === id) {
      selectedDesc.classList.add("hidden");
      id.classList.remove("selected");
      selected = "";
      selectedDesc = "";
    } else {
      //remove selected styling from previous selected
      if (selected) {
        selected.classList.remove("selected");
        selectedDesc.classList.add("hidden");
      }
      //update selected to current
      selected = id;
      id.classList.add("selected");
      selectedDesc = document.getElementById(id.textContent);
      selectedDesc.classList.remove("hidden");
    }
  }
  return updatedClicked;
}

let clickedTitle = clicked();

const selectYear = document.getElementsByTagName("button");
for (let b of selectYear) {
  b.addEventListener("click", () => {
    displayCuration(b.textContent);
  });
}
