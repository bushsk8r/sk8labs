import {
  createElement,
  addToTag,
  createContainer,
  createLink,
} from "../helper.js";
import { footer, header } from "../script.js";

//data to be displayed
const studies = [
  {
    title: "minesweeper",
    description: [
      "mobile app development",
      "game development with react native",
    ],
  },
  {
    title: "hypermedia zine",
    description: [
      "editorial media",
      "full stack web development using htmx and rust",
    ],
  },
];

//document main section
const main = document.querySelector("main");

//page title element
const title = createElement("h1", "Present Curiosities", []);

//map data into item cards
const displayCard = studies.map((study) => {
  //item title element
  const studyTitle = createElement("h2", study.title, []);

  //map item details into elements array
  const studyDetails = study.description.map((desc) => {
    return createElement("li", `a study of ${desc}`, []);
  });

  //container with title and item details
  return createContainer(
    "section",
    "",
    [],
    [studyTitle, createContainer("ul", "", [], [...studyDetails])]
  );
});

//add page title and data cards to document main section
addToTag(main, [title, ...displayCard]);

const head = header(document.querySelector("header"));
head("present");

const foot = footer(document.querySelector("footer"));
foot(false);
