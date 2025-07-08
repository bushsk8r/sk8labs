import {
  addToTag,
  createContainer,
  createElement,
  createLink,
  createMedia,
  createLinkContainer,
} from "./helper.js";
import { setupGame } from "./footer/script.js";

//initialise page header
function header(head) {
  //nav data to display
  const navigation = {
    logo: createMedia(
      "img",
      "msaga logo",
      [],
      "https://arweave.net/A40GVhPg7cWzuHf7gugzc1lh70iYMWAlQ-zAfwBHWsc"
    ),
    sitePages: [
      { link: "about", text: "about" },
      { link: "past", text: "past works" },
      { link: "present", text: "currently" },
    ],
    navArea: createElement("nav", "", []),
    navOptions: createElement("ul", "", []),
  };

  //display nav area
  addToTag(navigation.navArea, [navigation.navOptions]);
  //set headers based on page selected
  function updateHead(pageSelected) {
    //list item elements for nav links
    const links = navigation.sitePages.map((page) => {
      if (pageSelected === "home") {
        //default links if page selected is home page
        return createContainer(
          "li",
          "",
          [],
          [createLink(page.text, `./${page.link}`, [])]
        );
      } else {
        //underline link if it matches selected page
        return pageSelected != page.link
          ? createContainer(
              "li",
              "",
              [],
              [createLink(page.text, `../${page.link}`, [])]
            )
          : createElement("li", page.text, ["underline"]);
      }
    });

    //add links into nav list
    addToTag(navigation.navOptions, [...links]);

    //add home page link if page is not home
    if (pageSelected === "home") {
      addToTag(head, [navigation.logo, navigation.navArea]);
    } else {
      const contain = createLinkContainer([], [navigation.logo], "", "../");
      addToTag(head, [contain, navigation.navArea]);
    }
  }
  return updateHead;
}

//initialise page footer with game
function footer(foot) {
  //colour pallete options
  const pallette = ["love", "self", "ego", "earth", "inspo", "home"];

  //start game button from colour
  const startGame = createContainer(
    "section",
    "",
    ["startContainer"],
    pallette.map((p) => {
      return createElement("div", "", [p, "play"]);
    })
  );

  //game section
  const playArea = createElement("section", "", ["playArea"]);

  //setup game if game option is true
  function updateFoot(game) {
    if (game) {
      addToTag(foot, [startGame, playArea]);
      setupGame(startGame, playArea);
    } else {
      addToTag(foot, [startGame]);
    }
  }
  return updateFoot;
}

export { footer, header };
