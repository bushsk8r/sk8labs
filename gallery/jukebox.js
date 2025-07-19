import {
  addToTag,
  createBtn,
  createContainer,
  createElement,
  createMedia,
  addChosen,
  setChosen,
} from "./helper.js";

//display areas
let trackSelectorArea = "";
let mediaDisplay = "";

//selected track holders
let trackSelectors = "";
let chosenTrackSelectors = "";

//show selected track in media display area
function selectTrack({ description, source, type, title }) {
  //update selected track selector style
  chosenTrackSelectors = setChosen(title, chosenTrackSelectors);

  //update selected track selector
  addToTag(trackSelectorArea, trackSelectors(), true);

  //set selected track
  const track = {
    player: createMedia(type, "", [], `https://arweave.net/${source}`),
    desc: createElement("p", description, []),
  };

  //update display area with track and descriction
  addToTag(
    mediaDisplay,
    [createContainer("section", "", [], [track.player, track.desc])],
    true
  );
}

//update selected selector styling -> return function to display selector button elements
function updateTrackSelectors(tracks) {
  //add chosen option to selector
  chosenTrackSelectors = addChosen(tracks);

  //show track selectors and update styling if selected
  function displayTrackSelectors() {
    //create selector buttons
    const selectors = chosenTrackSelectors.map((track) => {
      return createBtn(
        track.title,
        [track.chosen ? "selectedTrack" : "trackSelector"],
        selectTrack,
        {
          title: track.title,
          description: track.description,
          source: track.source,
          type: track.type,
        }
      );
    });
    return selectors;
  }
  return displayTrackSelectors;
}

//display track selectors
function displayTrack(tracks) {
  //set selectors
  trackSelectors = updateTrackSelectors(tracks);

  //add selectors to page
  addToTag(trackSelectorArea, trackSelectors(), true);
}

//initialize jukebox with page sections -> return play function
function startJukeBox(playArea, displayArea, crate) {
  //page sections to display selectors and track
  trackSelectorArea = playArea;
  mediaDisplay = displayArea;

  //play function to display track selectors
  function playJuke(item) {
    //display selectors based on selected crate item
    displayTrack(crate[item]);

    //clear previous selected track
    mediaDisplay.innerHTML = "";
  }
  return playJuke;
}

export default startJukeBox;
