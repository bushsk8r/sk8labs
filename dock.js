import {
  addToTag,
  createBtn,
  createContainer,
  createElement,
  createLink,
  addChosen,
  setChosen,
} from "./helper.js";
import { footer } from "./script.js";
const nav = document.querySelector("nav");

const title = createElement("h2", "who are you?", ["centerText"]);

const who = [
  {
    title: "tourist",
    description: `here for the zoomed out picture`,
    access: "gallery",
  },
  {
    title: "purist",
    description: `here for the zoomed in picture`,
    access: "terrasse",
  },
];

let whoChosen = addChosen(who);

function showDetails(selected) {
  whoChosen = setChosen(selected, whoChosen);
  updateWho(true);
}

function displayWho() {
  const whoOptions = whoChosen.map((w) => {
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
          [createBtn(`${w.title}?`, [], showDetails, w.title)]
        );
  });
  return createContainer("ul", "", ["whoContainer"], [...whoOptions]);
}
function updateWho(refresh) {
  addToTag(nav, [title, displayWho()], refresh);
}

updateWho(false);

const foot = footer(document.querySelector("footer"));
foot(true);
