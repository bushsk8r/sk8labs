//audio tracks
const audioObj = [
    {
        name: "by08OmJlCMkvmUqGLssEA2JkyNzniKDqlbwr0zq9IN4",
        description: "may field recording 1"
    },
    {
        name: "YAyZuianviXMTYAL1yYB6_atw98if5HpaSTBcnLAqHE",
        description: "may wind recording 1"
    },
    {
        name: "_bCBWWceJmt4xJQdITwteR4qLGkVfkkDnX1i-abGE-w",
        description: "may field recording 2"
    },
    {
        name: "cpDk4O3n46NbJoKdhVWcJc-gb92Y9R8s8LbYnLjuQAo",
        description: "may field recording 3"
    },
    {
        name: "JmQQ01WASIzr8jt9K-_CusOB6MV1ImhNNCMDoubUDkQ",
        description: "may wind recording 2"
    },
    {
        name: "NfjOq1YRDbCd60kpNml_sZFSnCAsyV40VTYm4X6xn1I",
        description: "may field recording 4"
    },
    {
        name: "_s_wmH0id0PK5kyGpdxj3PNxO5s5Et2BKV_cqG3Cx9o",
        description: "may wind recording 3"
    }
]

//page audio and description elements
const player = document.querySelector("audio");
const desc = document.getElementById("desc")

//update audio source and file desctiption
function updatePlayer(fileNum) {
    player.src = `http://arweave.net/${audioObj[fileNum].name}`;
    desc.textContent = audioObj[fileNum].description;
}

//add update player event listener to buttons
const buttons = document.querySelectorAll("button");
for (let b of buttons) {
    b.addEventListener("click", () => {
        updatePlayer(b.getAttribute("name"))
    });
}



