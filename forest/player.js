//audio tracks
const audioObj = [
    {
        name: "may_field_1.wav",
        description: "may field recording 1"
    },
    {
        name: "may_wind_1.wav",
        description: "may wind recording 1"
    },
    {
        name: "may_field_2.wav",
        description: "may field recording 2"
    },
    {
        name: "may_field_3.wav",
        description: "may field recording 3"
    },
    {
        name: "may_wind_2.wav",
        description: "may wind recording 2"
    },
    {
        name: "may_field_4.wav",
        description: "may field recording 4"
    },
    {
        name: "may_wind_3.wav",
        description: "may wind recording 3"
    }
]

//page audio and description elements
const player = document.querySelector("audio");
const desc = document.getElementById("desc")

//update audio source and file desctiption
function updatePlayer(fileNum) {
    player.src = audioObj[fileNum].name;
    desc.textContent = audioObj[fileNum].description;
}

//add update player event listener to buttons
const buttons = document.querySelectorAll("button");
for (let b of buttons) {
    b.addEventListener("click", () => {
        updatePlayer(b.getAttribute("name"))
    });
}



