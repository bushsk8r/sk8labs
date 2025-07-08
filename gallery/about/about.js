import {
  createElement,
  addToTag,
  createContainer,
  createLink,
} from "../helper.js";
import { footer, header } from "../script.js";

//data to be displayed
const things = [
  {
    title: "programmer",
    things: [
      { name: "web designer", description: "maker of digital spaces" },
      { name: "software developer", description: "maker of .txt files" },
    ],
    link: {
      text: "github",
      url: "https://github.com/justinmsaga",
    },
  },
  {
    title: "baking enthusiast",
    things: [{ name: "home baker", description: "maker of edible treats" }],
    link: {
      text: "baking zine",
      url: "https://sk8.studio/bakery",
    },
  },
  {
    title: "recorder of sounds",
    things: [
      { name: "field recording", description: "maker of .wav files" },
      { name: "wind recordings", description: "maker of noise" },
    ],
    link: {
      text: "jukebox",
      url: "#",
    },
  },
];

//header with links
const head = header(document.querySelector("header"));
head("about");

//document main section
const main = document.querySelector("main");

//page title element
const title = createElement(
  "h1",
  "Hi, my name is bushsk8r✌🏿 . I like to make things",
  []
);

//map data into item cards
const displayCard = things.map((thing) => {
  //item title element
  const thingTitle = createElement("h2", thing.title, []);

  //map item details into elements array
  const thingsDetails = thing.things.map((desc) => {
    return createElement("li", `${desc.name} - ${desc.description}`, []);
  });

  //item link element
  const link = createLink(thing.link.text, thing.link.url, []);

  //container for item details
  const detailsContainer = createContainer(
    "ul",
    "",
    [],
    [...thingsDetails, link]
  );

  //container with title and item details
  return createContainer("li", "", [], [thingTitle, detailsContainer]);
});

//item cards container
const thingsContainer = createContainer(
  "ul",
  "",
  ["madeContainer"],
  [...displayCard]
);

//add page title and items container to document main section
addToTag(main, [title, thingsContainer]);

//footer without game
const foot = footer(document.querySelector("footer"));
foot(false);
