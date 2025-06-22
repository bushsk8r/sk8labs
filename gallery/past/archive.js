import {
  addToTag,
  createButtonContainer,
  createContainer,
  createElement,
  createMedia,
} from "../helper.js";
import { footer, header } from "../script.js";

const crate = {
  "idea factory": [
    {
      title: "youth",
      duration: "",
      description: "to be young and dumb",
      source: "OPn-ZSoC0niPGLX5UXQPbR3Bn0-7zz7NKjhdba-5FBI",
      type: "video",
    },
    {
      title: "daydream",
      duration: "",
      description: "opening to ideas",
      source: "9QbOpNh3kZ8mZW_c5ETvO3lyLOORDmNV2rT3fnc1xxk",
      type: "video",
    },
    {
      title: "fear",
      duration: "",
      description: "the opposite side of the anger coin",
      source: "E2Pesrxe_K5ebY4pXMuB9ezQwAgESQ0Nltp1tavVrW0",
      type: "video",
    },
    {
      title: "growth",
      duration: "",
      description: "character development",
      source: "BOGArivNqK0SjBl-HztcoFfFEXIX3joXM5nNfMLz5Jo",
      type: "video",
    },
    {
      title: "full factory",
      duration: "",
      description: "complete idea",
      source: "6DUxyflSM_8UEMGslYRLCJaQQXCuNks_iIOH1EOJ1Fk",
      type: "video",
    },
  ],
  "human in the loop": [
    {
      title: "intro",
      description: "hello, from the human",
      source: "B2nYw9URD4fYF_CSCLdMKWA5_CCjnRrDdC95cMogaUk",
      type: "audio",
    },
    {
      title: "recording 1",
      description: "",
      source: "WOXcBMl9wVA0a1NUeWvBKVUlhWhz410u3Kncn-j4cxc",
      type: "audio",
    },
    {
      title: "recording 2",
      description: "",
      source: "fwPsuZKkfyefZtMxkZ8FrfdQWJhcTFyk7Hp6hxIVBrE",
      type: "audio",
    },
    {
      title: "recording 3",
      description: "",
      source: "Y5t2fYzTbDZOHe1WmdT3ET5mhq-wwWn41vAxnMkVt18",
      type: "audio",
    },
    {
      title: "recording 4",
      description: "",
      source: "HkpVan2xQrpcikz0GouDkO8lnoO3ofZyrRLqQaneSp4",
      type: "audio",
    },
    {
      title: "recording 5",
      description: "",
      source: "LStr9j3icr9cka4mfHQHBbKe5-IBDAazCSf6zoNfN-U",
      type: "audio",
    },
    {
      title: "recording 6",
      description: "",
      source: "2IvMGSjScC1jYmV53H_nvHj8oGA007g8qE-zhOIcKKE",
      type: "audio",
    },
    {
      title: "recording 7",
      description: "",
      source: "NrxOATRqSTi52sT7GniSBRRTwJ7Jq8NoEsEaXQNmsu8",
      type: "audio",
    },
    {
      title: "recording 8",
      description: "",
      source: "AcENTCeXhEvHkS6xqWpbeSGoOp3ypHMarHOLLV9TIsA",
      type: "audio",
    },
  ],
  "echo chamber": [
    {
      title: "echo 0",
      description: "",
      source: "sGODBvlAnamWIdy-Op_hW14fKBTPWlZSZk4c3uibGos",
      type: "audio",
    },
    {
      title: "echo 1",
      description: "",
      source: "zPh_E6tv72MWOYhmPKHitWzTQ1oglNNqrPAoWo9YR98",
      type: "audio",
    },
    {
      title: "echo 2",
      description: "",
      source: "wiaAF-WKOcFoRIkFGAroDHOh30yFiaNQR8Ww95D3Tgg",
      type: "audio",
    },
    {
      title: "echo 3",
      description: "",
      source: "UkG1ehwEsfKFdyPqCWTO9BqyP5ezSKog_bdY1va8NGo",
      type: "audio",
    },
    {
      title: "echo 4",
      description: "",
      source: "RxFRhA_X10gfBbQYE2U18ZJEPCqkIXDvChMnhIdDcao",
      type: "audio",
    },
    {
      title: "echo 5",
      description: "",
      source: "cyL9PXWc4JgLKRfHgHTduBAJdRv0yB4465omez1bb9M",
      type: "audio",
    },
    {
      title: "echo 6",
      description: "",
      source: "lnGd-P8-VBC2J090JPeP-94t5JMTeGa-QZen_CzUd4k",
      type: "audio",
    },
    {
      title: "echo 7",
      description: "",
      source: "tLbsk2FoX8SXCRxWNyOmrz_007J4zsaI_fYaSLCpIlE",
      type: "audio",
    },
    {
      title: "echo 8",
      description: "",
      source: "EzDeMFbJe2QsRSoY0kLpW2qEsDdbLlZ7Q_hJ1r-rbwA",
      type: "audio",
    },
    {
      title: "echo 9",
      description: "",
      source: "YCPPlo-cvaEahS62NwJd_qCcbimvGKTDe___l5eEDmg",
      type: "audio",
    },
    {
      title: "echo 10",
      description: "",
      source: "Zfap3yM_RE67ocuFfnK0L5eZnBGG4F7h4gjeN5TmIog",
      type: "audio",
    },
    {
      title: "echo 11",
      description: "",
      source: "0pBgFbAFQvs8MZ3IkdTdSbAwTP7g9faUJw9iQnirwA8",
      type: "audio",
    },
    {
      title: "echo 12",
      description: "",
      source: "X6XDfLQ1oPgyAnRFGDueznQcKHCF7K_75rv-YOXcWWw",
      type: "audio",
    },
    {
      title: "echo graffiti",
      description: "live from graffiti heaven",
      source: "cKeqsgVTFHz8PGdX5fVSw4VHPxI5iIgqisyV-2MP5lc",
      type: "audio",
    },
  ],
  "playin with poly": [
    {
      title: "poly punk",
      description: "",
      source: "goE9lQYG-HwQPTi0nF8xZCku_TILhg_nwOvU1iROGvQ",
      type: "img",
    },
    {
      title: "crane",
      description: "",
      source: "SIti7uC5CQDDmLqK01V6NJc7l2n0qlFhAurEo_69T-k",
      type: "img",
    },
    {
      title: "rari",
      description: "white ferrari",
      source: "tNA3GmpeQ1k3tViU4yGx-hWim_SBpLFtNn-RXLMx5lY",
      type: "img",
    },
    {
      title: "issa dhow",
      description: "",
      source: "8Wi7rBrkBzCVa2jRe9x7GfxtvP7kv46vaVFvqk4RCAU",
      type: "img",
    },
    {
      title: "giraffe",
      description: "",
      source: "nxO1XJt0iNZYMOCW-4QR04CKTHANuAijEZwnIOvywRg",
      type: "img",
    },
    {
      title: "fingerprint",
      description: "",
      source: "kwkRlqk3LUeYBiBPDSkDaMzZRmGK2NeBPxIHaaWmUp0",
      type: "img",
    },
    {
      title: "eau rouge",
      description:
        "senna in an mp4/4 about to take a run up eau rouge Spa, Belgium",
      source: "f3IOD_unxm1jQDPpgNtR4XQQQhbhwtqe5289f6W7rSQ",
      type: "img",
    },
    {
      title: "race car",
      description: "",
      source: "weZZOn2p6hFdG9yHvYCZqtl2ZJrCxImh07X11Gx0urU",
      type: "img",
    },
  ],
};

function updateArtifact({ section, name, mediaType, source }) {
  const artifactMedia = createMedia(
    mediaType,
    "",
    [],
    `https://arweave.net/${source}`
  );
  addToTag(section, [artifactMedia], true);
}

function displayArchive() {
  const displayArea = createElement("section", "test", []);
  function display(item) {
    displayArea.innerHTML = "";
    const artifactSelector = crate[item].map((crateItem) => {
      const title = createElement("h3", crateItem.title, []);
      return createButtonContainer(
        ["pastBtn", "archiveItemBtn"],
        [title],
        updateArtifact,
        {
          section: displayArea,
          name: crateItem.title,
          mediaType: crateItem.type,
          source: crateItem.source,
        }
      );
    });
    return [
      createContainer("div", "", ["artifactSelectors"], artifactSelector),
      displayArea,
    ];
  }
  return display;
}
export default displayArchive;

const head = header(document.querySelector("header"));
head("past");

const foot = footer(document.querySelector("footer"));
foot(false);
