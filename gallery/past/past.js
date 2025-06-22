import {
  createElement,
  addToTag,
  createContainer,
  createMedia,
  createButtonContainer,
} from "../helper.js";
import displayArchive from "./archive.js";

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
    craft: "studio recording",
    description:
      "my first time in a professional modern recording studio, freestyle on drum and flute",
    tools:
      "recording studio on the unceded land of the Coast Salish, səl̓ilwətaɁɬ təməxʷ (Tsleil-Waututh), Skwxwú7mesh-ulh Temíx̱w (Squamish), S’ólh Téméxw (Stó:lō), Stz'uminus, and xʷməθkʷəy̓əm",
  },
  {
    title: "echo chamber",
    craft: "field recording",
    description: " skatepark 🤝 musical instrument",
    tools: "audio recorder",
  },
  {
    title: "playin with poly",
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
  const display = archiveChosen.map((item) => {
    const itemTitle = createElement("h2", item.title, []);
    const itemCraft = createElement("p", item.craft, []);
    const itemDesc = createElement("p", item.description, []);
    const itemCover = createMedia("img", "cover image", [], "#");
    const itemTools = createElement("p", `made using: ${item.tools}`, []);

    return item.chosen
      ? createContainer(
          "section",
          "",
          ["pastThing", "selected"],
          [itemTitle, itemDesc, itemTools]
        )
      : createButtonContainer(
          ["pastThing", "pastBtn"],
          [itemTitle, itemCraft],
          updateSelected,
          item.title
        );
  });

  return display;
}

//update main display container with changes to cards
function displayContainer() {
  return createContainer(
    "div",
    "",
    [selected ? "selectedArchive" : "archive"],
    [...displayCard()]
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
  addToTag(
    main,
    [
      title,
      displayContainer(),
      createContainer(
        "section",
        "",
        ["artifactContainer"],
        artifactDisplay(itemChosen),
        "artifactSection"
      ),
    ],
    true
  );
}

//inital setup of main element
addToTag(main, [title, displayContainer()]);
