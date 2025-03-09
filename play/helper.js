//inputs(element type, text context, css styles to add, element id)
function createElem(type, text, styles, name) {
  const elem = document.createElement(type);
  elem.textContent = text;
  if (name) {
    elem.setAttribute("id", name);
  }
  for (let s of styles) {
    elem.classList.add(s);
  }

  return elem;
}

//make a container
function createDiv(addToDiv) {
  const elem = document.createElement("div");
  addToTag(elem, addToDiv, false);

  return elem;
}

//create button
function createBtn(text, styles, name, handle, cmd) {
  const btn = document.createElement("button");
  btn.textContent = text;
  if (name) {
    btn.setAttribute("id", name);
  }
  for (let s of styles) {
    btn.classList.add(s);
  }
  btn.addEventListener("click", () => {
    handle(cmd);
  });

  return btn;
}

//mode button true = 1p, false = 2p
function modeBtn(text, name, mode, state, ball) {
  const btn = createBtn(text, [], name, state, "rules");
  btn.addEventListener("click", () => {
    //set game mode
    ball.play(mode);
  });

  return btn;
}

// element select
function elementBtn(elem, name, handle, ball) {
  const btn = createElem("button", elem, [], name);
  btn.addEventListener("click", () => {
    //set elem in game for player
    ball.roundState(elem);
    if (ball.mode) {
      //if mode is 1p use agent select for p2 then continue to score
      ball.roundState("");
      handle("end");
    } else if (ball.round) {
      //end of round 2, continue to end
      handle("end");
    } else {
      //continue to round 2
      handle("round");
    }
  });
  return btn;
}

//add children to html element, if clear is true remove all elements in tag
function addToTag(tag, comps, clear) {
  if (clear) {
    tag.innerHTML = "";
  }
  for (let c of comps) {
    tag.appendChild(c);
  }
}

export { createElem, createBtn, addToTag, modeBtn, elementBtn, createDiv };
