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

const nav = document.querySelector("nav");

let yearChosen = addChosen(
  crate["range"].map((y) => {
    return { title: y };
  })
);

function displayYearSelectors() {
  const yearSelectors = yearChosen.map((y) => {
    return createBtn(
      y.title,
      [y.chosen ? "border" : null],
      updateArtifactSection,
      y.title
    );
  });

  return createContainer(
    "section",
    "",
    ["yearSelectorContainer"],
    [...yearSelectors]
  );
}

function updateYearSelectors(refresh) {
  addToTag(nav, [displayYearSelectors()], refresh);
}

updateYearSelectors();

const main = document.querySelector("main");

let yearArtifacts;

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

function updateArtifactSection(year) {
  yearChosen = setChosen(year, yearChosen);
  updateYearSelectors(true);
  yearArtifacts = addChosen(crate[year]);
  chosenArtifact();
}

function chosenArtifact(chosen) {
  addToTag(main, [displayArtifacts(chosen)], true);
}
