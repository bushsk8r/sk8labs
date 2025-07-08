import { createElement, addToTag, createContainer } from "./helper.js";
import { footer, header } from "./script.js";

//header with nav
const head = header(document.querySelector("header"));
head("home");

//data to be displayed
const indexData = {
  title: "Welcome to the gallery",
  alternate: [`aka: the artifact archive`, `aka: the prototype graveyard`],
  description: "this is where ideas are composted",
};

//main container
const main = document.querySelector("main");

//display title and intro -> returns container element with intro items
function display() {
  //alternate title elements
  let aka = indexData.alternate.map((line) => {
    return createElement("p", line, []);
  });

  //intro elements
  const intro = {
    title: createElement("h1", indexData.title, []),
    aka: createContainer("section", "", ["aka"], [...aka]),
    description: createElement("h2", indexData.description, ["underline"]),
  };

  //intro container
  return createContainer(
    "section",
    "",
    ["introContainer"],
    [intro.title, intro.aka, intro.description]
  );
}

//add elements to main container
addToTag(main, [display()]);

//footer with game
const foot = footer(document.querySelector("footer"));
foot(true);
