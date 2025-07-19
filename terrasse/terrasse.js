import {
  addChosen,
  addToTag,
  createBtn,
  createContainer,
  createElement,
  createLink,
  setChosen,
} from "../helper.js";
import { footer } from "../script.js";
const nav = document.querySelector("nav");

const title = createElement("h2", "where to from here?", ["centerText"]);

const where = [
  {
    title: "shelf",
    description: `a space to store your zines`,
    access: "shelf",
  },
  {
    title: "playpen",
    description: `a sandbox`,
    access: "play",
  },
];

let whereChosen = addChosen(where);

function showDetails(selected) {
  whereChosen = setChosen(selected, whereChosen);
  updateWhere(true);
}

function displayWhere() {
  const whereOptions = whereChosen.map((w) => {
    return w.chosen
      ? createContainer(
          "li",
          "",
          ["who"],
          [
            createElement("p", `${w.title} - ${w.description}`, []),
            createLink(`to the ${w.access}`, `${w.access}`, ["goTo"]),
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

function updateWhere(refresh) {
  addToTag(nav, [title, displayWhere()], refresh);
}

updateWhere(false);

const foot = footer(document.querySelector("footer"));
foot(false);
