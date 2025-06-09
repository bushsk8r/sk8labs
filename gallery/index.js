import {
  createElement,
  addToTag,
  createContainer,
  createLink,
} from "./helper.js";
const intro = [`aka: the artifact archive`, `aka: the prototype graveyard`];
const main = document.querySelector("main");

const title = createElement("h1", "Welcome to the gallery", []);

function display() {
  let introduction = [];
  let aka = intro.map((line) => {
    return createElement("p", line, []);
  });

  introduction.push(createContainer("section", "", ["aka"], [...aka]));

  introduction.push(
    createElement("p", `this is where ideas are composted`, ["underline"])
  );
  return introduction;
}

addToTag(main, [
  title,
  createContainer("section", "", ["introContainer"], [...display()]),
]);
