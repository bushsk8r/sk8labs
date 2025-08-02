import {
  addChosen,
  addToTag,
  createBtn,
  createButtonContainer,
  createContainer,
  createElement,
  createMedia,
  setChosen,
} from "../helper.js";

import crate from "./crate.js";

//get elements from page for display
const nav = document.querySelector("nav");
const main = document.querySelector("main");

//selector state
let yearChosen = addChosen(
  crate["range"].map((y) => {
    return { title: y };
  })
);

//container with year selectors
function displayYearSelectors() {
  const yearSelectors = yearChosen
    .filter((y) => !y.chosen)
    .map((y) => {
      return createBtn(
        y.title,
        ["yearSelector"],
        updateArtifactSection,
        y.title
      );
    });

  const selectedYear = yearChosen
    .filter((y) => y.chosen)
    .map((y) => {
      return createElement("h2", y.title, []);
    });

  return createContainer(
    "section",
    "",
    ["yearSelectorContainer"],
    [
      createContainer("section", "", ["yearSelectors"], [...yearSelectors]),
      ...selectedYear,
    ]
  );
}

//update nav section with year selectors
function updateYearSelectors(refresh) {
  addToTag(nav, [displayYearSelectors()], refresh);
}

//initialize selectors
updateYearSelectors();

//selected artifacts
let yearArtifacts;

//container with selected artifacts
function displayArtifacts(selected) {
  yearArtifacts = setChosen(selected, yearArtifacts);
  const showArtifacts = yearArtifacts.map((a) => {
    return a.chosen
      ? createContainer(
          "section",
          "",
          ["artifactSelected"],
          [
            createContainer(
              "section",
              "",
              [],
              [
                createElement("h2", a.title, []),
                createElement("p", a.description, []),
              ]
            ),
            a.source
              ? createMedia(a.type, "", [], `https://arweave.net/${a.source}`)
              : createElement("p", "private collection", []),
          ]
        )
      : createButtonContainer(
          ["artifact"],
          [createElement("h2", a.title, []), createElement("p", a.craft, [])],
          chosenArtifact,
          a.title
        );
  });
  return createContainer(
    "section",
    "",
    ["archiveArtifactContainer"],
    [...showArtifacts]
  );
}

//update selector state and initialise artifacts for selected year
function updateArtifactSection(year) {
  yearChosen = setChosen(year, yearChosen);
  updateYearSelectors(true);
  yearArtifacts = addChosen(crate[year]);
  chosenArtifact();
}

//update main with selected artifact
function chosenArtifact(chosen) {
  addToTag(main, [displayArtifacts(chosen)], true);
}
