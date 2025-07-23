import {
  addToTag,
  createBtn,
  createContainer,
  createElement,
  createLink,
  addChosen,
  setChosen,
  createButtonContainer,
} from "./helper.js";
import { footer } from "./script.js";

//get elements from page where displaying will happen
const nav = document.querySelector("nav");
const vs = document.querySelector(".vs");

//page title
const title = createElement("h2", "who are you?", ["centerText"]);

//page selectors details
const who = [
  {
    title: "tourist",
    description: `here for the zoomed out picture`,
    access: "gallery",
  },
  {
    title: "purist",
    description: `here for the zoomed in picture`,
    access: "terrasse",
  },
];

//selector state
let whoChosen = addChosen(who);

//selector explained options
const verses = {
  tourist: ["crafter", "child"],
  purist: ["curator", "adult"],
};

//display selectors
function displayWho() {
  const whoOptions = whoChosen.map((w) => {
    return w.chosen
      ? createContainer(
          "li",
          "",
          ["who"],
          [
            createElement("p", `${w.title} - ${w.description}`, []),
            createLink(`to the ${w.access}`, `${w.access}`, ["goTo"]),
          ]
        )
      : createContainer(
          "li",
          "",
          ["who"],
          [createBtn(`${w.title}?`, [], showDetails, w.title)]
        );
  });
  return createContainer("ul", "", ["whoContainer"], [...whoOptions]);
}

//update selectors after state change
function updateWho(refresh) {
  addToTag(nav, [title, displayWho()], refresh);
}

//show details for open selector and update selector state
function showDetails(selected) {
  whoChosen = setChosen(selected, whoChosen);
  updateWho(true);
}

//initialize selectors
updateWho();

//vs section title based on open state
function vsTitle(open) {
  return createButtonContainer(
    ["vsSelector"],
    [
      createElement(
        "h2",
        `${open ? "🫀" : "👉"} tourist vs purist ${open ? "🔥" : "👈"}`,
        []
      ),
    ],
    open ? resetVS : showCharacter,
    open
  );
}

//set vs section based of reset state
function resetVS(full) {
  addToTag(vs, [vsTitle(false)], full);
}

//initialize vs section
resetVS();

//display selector explained options
function showCharacter() {
  const tourist = verses["tourist"].map((t) => {
    return createElement("li", t, []);
  });

  const purist = verses["purist"].map((p) => {
    return createElement("li", p, []);
  });

  addToTag(
    vs,
    [
      vsTitle(true),
      createContainer(
        "section",
        "",
        ["characters"],
        [
          createContainer("ul", "", [], [...tourist]),
          createContainer("ul", "", [], [...purist]),
        ]
      ),
    ],
    true
  );
}

//display fotter with rps
const foot = footer(document.querySelector("footer"));
foot(true);
