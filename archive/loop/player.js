//audio tracks
const audioObj = [
    {
        name: "intro",
        location: "B2nYw9URD4fYF_CSCLdMKWA5_CCjnRrDdC95cMogaUk",
        description: "hello, from the human",
        length: "1:56"
    },
    {
        name: "recording 1",
        location: "WOXcBMl9wVA0a1NUeWvBKVUlhWhz410u3Kncn-j4cxc",
        description: "finding the ground",
        length: "2:30"
    },
    {
        name: "recording 2",
        location: "fwPsuZKkfyefZtMxkZ8FrfdQWJhcTFyk7Hp6hxIVBrE",
        description: "on the ground running",
        length: "0:28"
    },
    {
        name: "recording 3",
        location: "Y5t2fYzTbDZOHe1WmdT3ET5mhq-wwWn41vAxnMkVt18",
        description: "echo",
        length: "4:26"

    },
    {
        name: "recording 4",
        location: "HkpVan2xQrpcikz0GouDkO8lnoO3ofZyrRLqQaneSp4",
        description: "reset",
        length: "2:33"
    },
    {
        name: "recording 5",
        location: "LStr9j3icr9cka4mfHQHBbKe5-IBDAazCSf6zoNfN-U",
        description: "reverb, unlocked",
        length: "0:23"
    },
    {
        name: "recording 6",
        location: "2IvMGSjScC1jYmV53H_nvHj8oGA007g8qE-zhOIcKKE",
        description: "a breaking heart",
        length: "3:06"
    },
    {
        name: "recording 7",
        location: "NrxOATRqSTi52sT7GniSBRRTwJ7Jq8NoEsEaXQNmsu8",
        description: "hello from the loop",
        length: "1:24"
    },
    {
        name: "recording 8",
        location: "AcENTCeXhEvHkS6xqWpbeSGoOp3ypHMarHOLLV9TIsA",
        description: "the drums wanted to go home",
        length: "1:14"
    }]

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
    audioBtn.innerHTML = `${audioObj[i].name} (${audioObj[i].length})`;
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

































