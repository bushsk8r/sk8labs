import {
  addToTag,
  createContainer,
  createElement,
  createLink,
  createMedia,
  createLinkContainer,
} from "./helper.js";
import { setupGame } from "./footer/script.js";
function header(head) {
  const home = createMedia(
    "img",
    "msaga logo",
    [],
    "https://arweave.net/A40GVhPg7cWzuHf7gugzc1lh70iYMWAlQ-zAfwBHWsc"
  );
  const pages = [
    { link: "about", text: "about" },
    { link: "past", text: "past works" },
    { link: "present", text: "currently" },
  ];
  const nav = createElement("nav", "", []);
  const navList = createElement("ul", "", []);
  addToTag(nav, [navList]);
  function updateHead(pageSelected) {
    const links = pages.map((page) => {
      if (pageSelected === "home") {
        return createContainer(
          "li",
          "",
          [],
          [createLink(page.text, `./${page.link}`, [])]
        );
      } else {
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
    addToTag(navList, [...links]);
    if (pageSelected === "home") {
      addToTag(head, [home, nav]);
    } else {
      const contain = createLinkContainer([], [home], "", "../");
      addToTag(head, [contain, nav]);
    }
  }
  return updateHead;
}
function footer(foot) {
  const pallette = ["love", "self", "ego", "earth", "inspo", "home"];
  const startGame = createContainer(
    "section",
    "",
    ["startContainer"],
    pallette.map((p) => {
      return createElement("div", "", [p, "play"]);
    })
  );
  const playArea = createElement("section", "", ["playArea"]);

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
