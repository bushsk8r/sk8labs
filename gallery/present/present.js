import {
  createElement,
  addToTag,
  createContainer,
  createLink,
  createButtonContainer,
} from "../helper.js";
import { footer, header } from "../script.js";
import startBlog from "./blog.js";

//data to be displayed
const blog = [
  {
    title: "experiments",
    description: "reporting live from the idea factory",
    option: ["wind", "field"],
  },
  {
    title: "recordings",
    description:
      "curating soundscapes with birds then creating noise with woodwinds",
  },
  {
    title: "playlist*",
    description: "an introverts version of a dj set",
  },
];

let blogChosen = blog.map((item) => {
  return { ...item, chosen: false };
});

//add header with nav
const head = header(document.querySelector("header"));
head("present");

//document main section
const main = document.querySelector("main");

//page title element
const title = createElement("h1", "Present Curiosities", []);

//map data into item cards
function selectors() {
  const cards = blogChosen.map((item) => {
    const card = {
      title: createElement("h2", item.title, [
        item.chosen ? "underline" : null,
      ]),
      description: createElement("p", item.description, []),
    };

    return item.chosen
      ? createContainer(
          "section",
          "",
          ["presentThing", "presentSelected"],
          [card.title, card.description]
        )
      : createButtonContainer(
          ["presentThing", "presentBtn"],
          [card.title],
          updateSelected,
          item.title
        );
  });
  return createContainer("section", "", ["blogSelector"], [...cards]);
}

const blogDisplay = startBlog();

function updateSelected(itemChosen) {
  blogChosen = blogChosen.map((item) => {
    if (item.title === itemChosen) {
      item.chosen = true;
    } else {
      item.chosen = false;
    }
    return item;
  });
  addToTag(main, [title, selectors(), blogDisplay(itemChosen)], true);
}

//add page title and data cards to document main section
addToTag(main, [title, selectors()]);

//add footer with palette
const foot = footer(document.querySelector("footer"));
foot(false);
