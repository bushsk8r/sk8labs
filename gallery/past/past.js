import {
  createElement,
  addToTag,
  createContainer,
  createMedia,
  createButtonContainer,
} from "../helper.js";

const archive = [
  {
    title: "idea factory (2017)",
    craft: "animation",
    description: "birth of bushsk8r",
    tools: "paint 3d, blender, caustic",
  },
  {
    title: "human in the loop (2020)",
    craft: "studio recording",
    description:
      "my first time in a professional modern recording studio, freestyle on drum and flute",
    tools: "recording studio",
  },
  {
    title: "echo chamber (2021)",
    craft: "field recording",
    description: " skatepark 🤝 musical instrument",
    tools: "audio recorder",
  },
  {
    title: "rock paper scissors (2024)",
    craft: "interface design",
    description: "text based game development",
    tools: "html,css,js",
  },
];

let archiveChosen = archive.map((item) => {
  return { ...item, chosen: false };
});

const main = document.querySelector("main");

const title = createElement("h1", "archive", []);

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

//update artifact
function artifact() {
  return createContainer(
    "section",
    "",
    ["artifactContainer"],
    [createElement("h2", `"display artifact here"`, [])]
  );
}

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
  addToTag(main, [title, displayContainer(), artifact()], true);
}

//inital setup of main element
addToTag(main, [title, displayContainer()]);
