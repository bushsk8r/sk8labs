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

const main = document.querySelector("main");

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

let whereChosen = addChosen(where);

function showDetails(selected) {
  whereChosen = setChosen(selected, whereChosen);
  updateWhere(true);
}

function whereSelected(selectedWhere) {
  addToTag(
    main,
    [createElement("p", `${selectedWhere} soon come`, ["centerText"])],
    true
  );
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

function updateWhere(refresh) {
  addToTag(nav, [title, displayWhere()], refresh);
}

updateWhere(false);

const foot = footer(document.querySelector("footer"));
foot(false);
