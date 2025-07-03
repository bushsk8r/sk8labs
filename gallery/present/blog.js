import {
  addToTag,
  createBtn,
  createContainer,
  createElement,
  createMedia,
} from "../helper.js";
import startJukeBox from "../jukebox.js";

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

const recordings = {
  field: [
    {
      title: "field 1",
      duration: "",
      description: "field 1 desc",
      source: "",
      type: "audio",
    },
    {
      title: "field 2",
      duration: "",
      description: "",
      source: "",
      type: "",
    },
    {
      title: "field 3",
      duration: "",
      description: "",
      source: "",
      type: "",
    },
  ],
  wind: [
    {
      title: "wind 1",
      duration: "",
      description: "",
      source: "",
      type: "",
    },
  ],
};

const curation = {
  title: "cul de sac vibes",
  description: 'a suburban "pirate" radio station',
  links: {
    tidal: "",
    spotify: "",
  },
};

function displayCuration() {
  audioLog.area.innerHTML = "";
  const play = createElement("section", "", []);
  play.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4YEAlpkdjhLhknQZY0tWbo?utm_source=generator" width="100%" height="500" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
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

function displayStudies() {
  audioLog.area.innerHTML = "";
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

const audioLog = {
  area: createElement("section", "", ["jukeContainer"]),
  play: createElement("section", "", ["jukeSelectors"]),
  display: createElement("section", "", []),
};

const juke = startJukeBox(audioLog.play, audioLog.display, recordings);

function displayJukebox(type) {
  juke(type);
  addToTag(audioLog.area, [audioLog.play, audioLog.display], true);
}

function displayAudioLog() {
  const logSelectors = createContainer(
    "section",
    "",
    ["jukeSelectors"],
    [
      createBtn("field", [], displayJukebox, "field"),
      createBtn("wind", [], displayJukebox, "wind"),
    ]
  );
  return createContainer(
    "section",
    "",
    ["jukeContainer"],
    [logSelectors, audioLog.area]
  );
}

function startBlog() {
  function updateBlogDisplay(blogSection) {
    if (blogSection === "experiments") {
      return createContainer(
        "section",
        "",
        ["studiesContainer"],
        [...displayStudies()]
      );
    } else if (blogSection === "playlist") {
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
        [displayAudioLog(true)]
      );
    }
  }
  return updateBlogDisplay;
}

export default startBlog;
