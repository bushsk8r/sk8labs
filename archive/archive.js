class archiveItem {
  constructor(item) {
    //year of creation
    this.creation = item[0];

    //item title
    this.curation = item[1];

    //medium
    this.craft = item[2];

    //item location
    this.source = item[3];
  }
}

// key = year
// value = [curation, craft, source]

const crate = {
  //[start year, end year]
  range: [2013, 2024],
  2024: [
    ["cul de sac vibes", "pirate radio", ""],
    ["war ready", "playlist", ""],
  ],
  2023: [["echo chamber 2.0", "instrumentation / audio recording"]],
  2022: [["home bakers music club", "radio"]],
  2021: [
    ["echo chamber 1.0", "instrumentation / audio recording"],
    ["playin with poly", "low poly graphics"],
  ],
  2020: [
    ["study", "playlist"],
    ["human in the loop (vol 1)", "audio recording"],
  ],
  2019: [
    ["vibes", "playlist"],
    ["how to sk8 and not die", "album"],
  ],
  2018: [
    ["marisol", "character design"],
    ["life = true", "animation"],
    ["crawl", "playlist"],
    ["up on a tuesday", "playlist"],
    ["baked chronicles", "playlist / zine"],
    ["african orchestra", "playlist"],
    ["throwback thursday", "playlist"],
    ["frank mondays", "playlist"],
    ["the forest", "metaverse / radio"],
  ],
  2017: [
    ["ms_ga", "playlist / character design"],
    ["let there be light", "mixtape"],
  ],
  2016: [
    ["soundtrack to the week", "playlist"],
    ["poly punk", "low poly graphics"],
    ["welcome", "algorithmic composition"],
  ],
  2013: [["bushsk8r", "character design"]],
  getFromYear(year) {
    //return items from year
    return this[year];
  },
  getFull: function () {
    //return full crate
  },
};

function curate() {
  let year = "";
  const box = crate;
  function getCurated(curationYear) {
    year = curationYear;
    return box
      .getFromYear(year)
      .map((c) => [`${year}`, ...c])
      .map((c) => new archiveItem(c));
  }
  return getCurated;
}

const curator = curate();

export default curator;
