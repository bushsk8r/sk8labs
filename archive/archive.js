class archiveItem {
  constructor(item) {
    //year of creation
    this.creation = item[0];

    //item title
    this.curation = item[1];

    //medium
    this.craft = item[2];

    //item location
    this.source = `https://arweave.net/${item[3]}`;

    //source file type
    this.fType = item[4];
  }
}

// key = year
// value = [curation, craft, source, file type]

const crate = {
  //[start year, end year]
  range: [2013, 2024],
  2024: [
    ["cul de sac vibes", "pirate radio", ""],
    ["war ready", "playlist", ""],
    ["deerverse", "metaverse"],
  ],
  2023: [["echo chamber 2.0", "instrumentation / audio recording"]],
  2022: [["home bakers music club", "radio"]],
  2021: [
    [
      "echo chamber 1.0",
      "field recording",
      "sGODBvlAnamWIdy-Op_hW14fKBTPWlZSZk4c3uibGos",
      "audio",
    ],
    [
      "playin with poly",
      "low poly graphics",
      "nxO1XJt0iNZYMOCW-4QR04CKTHANuAijEZwnIOvywRg",
      "img",
    ],
  ],
  2020: [
    ["study", "playlist"],
    [
      "human in the loop",
      "studio recording",
      "B2nYw9URD4fYF_CSCLdMKWA5_CCjnRrDdC95cMogaUk",
      "audio",
    ],
  ],
  2019: [
    ["vibes", "playlist"],
    ["how to sk8 and not die", "album"],
  ],
  2018: [
    [
      "jade",
      "character design",
      "6PqtBb2Aa-CpWLEGvt6ODIq4zG8PMmdNDjpL-mk6sd0",
      "video",
    ],
    [
      "life = true",
      "animation",
      "RTRXhvNqhvm4jRf_Q6V1wtorg9nYs9c4zW_euxL_kRk",
      "video",
    ],
    [
      "head in the cloud",
      "animation",
      "8_jxOoiyBImgCLmXNBDtsdP_mwO1A0_PNqm8tjIedvM",
      "video",
    ],
    [
      "collected",
      "animation",
      "EV4Ks4PYNbT_03vfYjsJGnClKqDFxSlXcS7nrsfObPI",
      "video",
    ],
    ["ego death", "playlist"],
    ["summer", "playlist"],
    ["crawl", "playlist"],
    ["up on a tuesday", "playlist"],
    [
      "baked chronicles",
      "playlist / zine",
      "S2kjRTpqYE27CwsjhBFE3HbqjVVP0kJ5VOuEuIRz8pU",
      "img",
    ],
    ["african orchestra", "playlist"],
    ["throwback thursday", "playlist"],
    ["frank mondays", "playlist"],
    ["the forest", "metaverse / radio"],
  ],
  2017: [
    ["ms_ga", "playlist / character design"],
    [
      "let there be light",
      "mixtape",
      "BOGArivNqK0SjBl-HztcoFfFEXIX3joXM5nNfMLz5Jo",
      "video",
    ],
    ["low end theory", "playlist"],
  ],
  2016: [
    [
      "soundcloud",
      "audio recording / instrumentation ",
      "kwFFYuwlSXiLt-XF2_GOLqOUSatYnL9wDQrkVz6FmSI",
      "audio",
    ],
    ["soundtrack to the week", "playlist"],
    ["elevate", "playlist"],
    ["snowflakes", "writing"],
    ["same person, different prespsctive", "writing"],
    [
      "poly punk",
      "low poly graphics",
      "goE9lQYG-HwQPTi0nF8xZCku_TILhg_nwOvU1iROGvQ",
      "img",
    ],
    [
      "welcome",
      "algorithmic composition",
      "goE9lQYG-HwQPTi0nF8xZCku_TILhg_nwOvU1iROGvQ",
      "video",
    ],
  ],
  2013: [
    [
      "bushsk8r",
      "character design",
      "4GJuqrg_zxEnSISGc-djC40eN3li_OoZFUtv2xlLr9Y",
      "img",
    ],
  ],
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
