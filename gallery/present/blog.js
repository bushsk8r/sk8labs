import {
  addToTag,
  createBtn,
  createContainer,
  createElement,
  addChosen,
  setChosen,
} from "../helper.js";
import startJukeBox from "../jukebox.js";

//----------display playlist----------

//playlist data to display
const curation = {
  title: "low end theory 9: 3 step 101",
  description: 'low end theory - a study of the bottom end of the frequency spectrum',
  links: {
    tidal: "",
    spotify: "",
  },
};

//display function
function displayCuration() {
  audioLog.area.innerHTML = "";
  resetJukeOptions();
  const play = createElement("section", "", []);
  play.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/1l6qQTsWOpOOMEr1XyVkxS??utm_source=generator" width="100%" height="500" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
  const curationCard = createContainer(
    "section",
    "",
    ["playlist"],
    [
      createElement("h3", curation.title, []),
      createElement("p", curation.description, []),
      play,
    ]
  );
  return curationCard;
}

//----------display experiments----------

//expermiment data to display
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

//display function
function displayStudies() {
  audioLog.area.innerHTML = "";
  resetJukeOptions();
  const studyCard = studies.map((study) => {
    const descs = study.description.map((desc) => {
      return createElement("li", desc, []);
    });

    return createContainer(
      "section",
      "",
      ["blogStudyContainer"],
      [
        createElement("h3", study.title, []),
        createContainer("ul", "", [], [...descs]),
      ]
    );
  });

  return studyCard;
}

//----------display recordings----------

//recording data to display
const recordings = {
  field: [
    {
      title: "field 1",
      duration: "",
      description: "live from the motherland",
      source: "yz9Qg9UnvzqrkULHCrAOrsU4YhO-tsApKAr4kp-SSxg",
      type: "audio",
    },
    {
      title: "field 2",
      duration: "",
      description: "",
      source: "",
      type: "audio",
    },
    {
      title: "field 3",
      duration: "",
      description: "",
      source: "",
      type: "audio",
    },
  ],
  wind: [
    {
      title: "wind 1",
      duration: "",
      description: "",
      source: "",
      type: "audio",
    },
  ],
};

const audioLog = {
  area: createElement("section", "", ["jukeContainer"]),
  play: createElement("section", "", ["jukeSelectors"]),
  display: createElement("section", "", []),
};

const juke = startJukeBox(audioLog.play, audioLog.display, recordings);
const jukeSelect = updateJukeSelector();

let jukeSelectOptions = [
  {
    title: "field",
    chosen: false,
  },
  {
    title: "wind",
    chosen: false,
  },
];

const logSelectors = createContainer(
  "section",
  "",
  ["jukeSelectors"],
  jukeSelect()
);

function resetJukeOptions() {
  jukeSelectOptions = addChosen(jukeSelectOptions);
  addToTag(logSelectors, jukeSelect(), true);
}

function displayJukebox(type) {
  jukeSelectOptions = setChosen(type, jukeSelectOptions);
  juke(type);
  addToTag(logSelectors, jukeSelect(), true);
  addToTag(audioLog.area, [audioLog.play, audioLog.display], true);
}

function updateJukeSelector() {
  function displayJukeSelectors() {
    const jukeSelectors = jukeSelectOptions.map((option) => {
      return createBtn(
        option.title,
        [option.chosen ? "selectedJukeSelector" : "jukeSelector"],
        displayJukebox,
        option.title
      );
    });
    return jukeSelectors;
  }
  return displayJukeSelectors;
}

function displayAudioLog() {
  return createContainer(
    "section",
    "",
    ["jukeContainer"],
    [logSelectors, audioLog.area]
  );
}

//initialize blog and update blog section to display
function startBlog() {
  function updateBlogDisplay(blogSection) {
    if (blogSection === "experiments") {
      return createContainer(
        "section",
        "",
        ["studiesContainer"],
        [...displayStudies()]
      );
    } else if (blogSection === "playlist*") {
      return createContainer(
        "section",
        "",
        ["blogDisplay"],
        [displayCuration()]
      );
    } else {
      return createContainer(
        "section",
        "",
        ["blogDisplay"],
        [displayAudioLog()]
      );
    }
  }
  return updateBlogDisplay;
}

export default startBlog;
