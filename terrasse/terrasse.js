import {
  addChosen,
  addToTag,
  createBtn,
  createContainer,
  createElement,
  setChosen,
} from "../helper.js";
import { footer } from "../script.js";

//get elements from page where displaying will happen
const nav = document.querySelector("nav");
const main = document.querySelector("main");

//page title
const title = createElement("h2", "where to from here?", ["centerText"]);

//page selector details
const where = [
  {
    title: "shelf",
    description: `a space to store your zines`,
    access: "zine shelf",
  },
  {
    title: "play",
    description: `a sandbox`,
    access: "playpen",
  },
];

//selector state
let whereChosen = addChosen(where);

//display selectors
function displayWhere() {
  const whereOptions = whereChosen.map((w) => {
    return w.chosen
      ? createContainer(
          "li",
          "",
          ["who"],
          [
            createElement("p", `${w.title} - ${w.description}`, []),
            createBtn(`to the ${w.access}`, ["goTo"], whereSelected, w.access),
          ]
        )
      : createContainer(
          "li",
          "",
          ["who"],
          [createBtn(`${w.title}`, [], showDetails, w.title)]
        );
  });
  return createContainer("ul", "", ["whoContainer"], [...whereOptions]);
}

//update selectors after state change
function updateWhere(refresh) {
  addToTag(nav, [title, displayWhere()], refresh);
}

//show details for open selector and update selector state
function showDetails(selected) {
  whereChosen = setChosen(selected, whereChosen);
  updateWhere(true);
}

//initialize selectors
updateWhere();

//display message based on selected selector
function whereSelected(selectedWhere) {
  addToTag(
    main,
    [createElement("p", `${selectedWhere} soon come`, ["centerText"])],
    true
  );
}

//display footer with rps
const foot = footer(document.querySelector("footer"));
foot(true);
