import {
  createElement,
  addToTag,
  createContainer,
  createMedia,
  createButtonContainer,
} from "../helper.js";
import displayArchive from "./archive.js";
import { footer, header } from "../script.js";

//archived artifacts
const archive = [
  {
    title: "idea factory",
    year: 2017,
    craft: "animation",
    description: "birth of bushsk8r",
    tools: "paint 3d, blender, caustic",
  },
  {
    title: "human in the loop",
    year: 2020,
    craft: "studio recording",
    description:
      "my first time in a professional modern recording studio, freestyle on drum and flute",
    tools:
      "recording studio on the unceded land of the Coast Salish, səl̓ilwətaɁɬ təməxʷ (Tsleil-Waututh), Skwxwú7mesh-ulh Temíx̱w (Squamish), S’ólh Téméxw (Stó:lō), Stz'uminus, and xʷməθkʷəy̓əm",
  },
  {
    title: "echo chamber",
    year: 2021,
    craft: "field recording",
    description: " skatepark 🤝 musical instrument",
    tools: "audio recorder",
  },
  {
    title: "playin with poly",
    year: 2021,
    craft: "graphics design",
    description:
      "using straight lines and colour to recreate the essentials of a scene",
    tools: "inkscape",
  },
];

let archiveChosen = archive.map((item) => {
  return { ...item, chosen: false };
});

const main = document.querySelector("main");

const title = createElement("h1", "Archive", []);

let selected = false;

//update item display cards
function displayCard() {
  //create selector card from archive list
  const display = archiveChosen.map((item) => {
    const card = {
      title: createElement("h2", item.title, []),
      titleYear: createElement("h2", `${item.title} [${item.year}]`, []),
      craft: createElement("p", item.craft, []),
      description: createElement("p", item.description, []),
      //const itemCover = createMedia("img", "cover image", [], "#");
      tools: createElement("p", `made using: ${item.tools}`, []),
    };

    //if chosen display full card if not show condensed
    return item.chosen
      ? createContainer(
          "section",
          "",
          ["pastThing", "selected"],
          [card.titleYear, card.description, card.tools]
        )
      : createButtonContainer(
          ["pastThing", "pastBtn"],
          [card.title, card.craft],
          updateSelected,
          item.title
        );
  });

  //update main display container with changes to cards
  return createContainer(
    "section",
    "",
    [selected ? "selectedArchive" : "archive"],
    [...display]
  );
}

// initialize archive display
const artifactDisplay = displayArchive();

//update selected item
function updateSelected(itemChosen) {
  //update chosen field in archive item
  archiveChosen = archiveChosen.map((item) => {
    if (item.title === itemChosen) {
      item.chosen = true;
      selected = item;
    } else {
      item.chosen = false;
    }
    return item;
  });

  //update main element to show selected item
  addToTag(main, [title, displayCard(), artifactDisplay(itemChosen)], true);
}

//inital setup of main element
addToTag(main, [title, displayCard()]);

const head = header(document.querySelector("header"));
head("past");

const foot = footer(document.querySelector("footer"));
foot(false);
