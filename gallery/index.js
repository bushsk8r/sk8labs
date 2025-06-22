import {
  createElement,
  addToTag,
  createContainer,
  createLink,
} from "./helper.js";
import { footer, header } from "./script.js";

const head = header(document.querySelector("header"));
head("home");

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
    createElement("h2", `this is where ideas are composted`, ["underline"])
  );
  return introduction;
}

addToTag(main, [
  title,
  createContainer("section", "", ["introContainer"], [...display()]),
]);

const foot = footer(document.querySelector("footer"));
foot(true);
