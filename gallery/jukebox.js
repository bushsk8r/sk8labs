import {
  addToTag,
  createBtn,
  createContainer,
  createElement,
  createMedia,
} from "./helper.js";

let trackSelectorArea = "";
let mediaDisplay = "";
let mediaBox = "";

function startJukeBox(playArea, displayArea, crate) {
  trackSelectorArea = playArea;
  mediaBox = crate;
  mediaDisplay = displayArea;

  function playJuke(item) {
    displayTrack(crate[item]);
    mediaDisplay.innerHTML = "";
  }
  return playJuke;
}

function displayTrack(tracks) {
  console.log(tracks);
  const trackSelectors = tracks.map((track) => {
    return createBtn(track.title, [], selectTrack, {
      description: track.description,
      source: track.source,
      type: track.type,
    });
  });
  addToTag(trackSelectorArea, [...trackSelectors], true);
}

function selectTrack({ description, source, type }) {
  const player = createMedia(type, "", [], `https://arweave.net/${source}`);
  const desc = createElement("p", description, []);
  addToTag(
    mediaDisplay,
    [createContainer("section", "", [], [player, desc])],
    true
  );
}

export default startJukeBox;
