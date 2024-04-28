
//list of ids which are set to be displayed
let onDisplay = [];

//turns display on and off
function toggleDisplay(sectionName) {

    //item is set to display
    if (onDisplay.includes(sectionName)) {
        //remove from display list
        onDisplay = onDisplay.filter((sect) => sect != sectionName)

        // update element style to remove from document
        let section = document.getElementById(sectionName);
        section.style.display = `none`;
    } 
    //item not set to display
    else {
        //add to display list
        onDisplay.push(sectionName);

        // update style to display in document
        let section = document.getElementById(sectionName);
        section.style.display = `block`;
    }
}