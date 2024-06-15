//audio tracks
const audioObj = [
    {
        name: "field 1",
        location: "by08OmJlCMkvmUqGLssEA2JkyNzniKDqlbwr0zq9IN4",
        description: "may field recording 1"
    },
    {
        name: "wind 1",
        location: "YAyZuianviXMTYAL1yYB6_atw98if5HpaSTBcnLAqHE",
        description: "may wind recording 1"
    },
    {
        name: "field 2",
        location: "_bCBWWceJmt4xJQdITwteR4qLGkVfkkDnX1i-abGE-w",
        description: "may field recording 2"
    },
    {
        name: "field 3",
        location: "cpDk4O3n46NbJoKdhVWcJc-gb92Y9R8s8LbYnLjuQAo",
        description: "may field recording 3"
    },
    {
        name: "wind 2",
        location: "JmQQ01WASIzr8jt9K-_CusOB6MV1ImhNNCMDoubUDkQ",
        description: "may wind recording 2"
    },
    {
        name: "field 4",
        location: "NfjOq1YRDbCd60kpNml_sZFSnCAsyV40VTYm4X6xn1I",
        description: "may field recording 4"
    },
    {
        name: "wind 3",
        location: "_s_wmH0id0PK5kyGpdxj3PNxO5s5Et2BKV_cqG3Cx9o",
        description: "may wind recording 3"
    }
]

//page audio, description and track list elements
const player = document.querySelector("audio");
const desc = document.getElementById("desc")
const trackList = document.getElementById("selectAudio");

//update audio source and file desctiption
function updatePlayer(fileNum) {
    player.src = `http://arweave.net/${audioObj[fileNum].location}`;
    desc.textContent = audioObj[fileNum].description;
}

//add buttons to page from audio objects
for (let i = 0; i < audioObj.length; i++) {
    let audioBtn = document.createElement("button");
    audioBtn.innerHTML = audioObj[i].name;
    audioBtn.setAttribute("name", i);
    trackList.appendChild(audioBtn);
}

//add update player event listener to buttons
const buttons = document.querySelectorAll("button");
for (let b of buttons) {
    b.addEventListener("click", () => {
        removeClick();
        updatePlayer(b.getAttribute("name"));
        b.classList.add("clicked");
    });
}

//remove clicked styling from buttons
function removeClick() {
    for (let b of buttons) {
        b.classList.remove("clicked");
    }
}


