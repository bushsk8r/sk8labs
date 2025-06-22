//inputs(element type, text context, css styles to add, element id)
function createElement(type, text, styles, name) {
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

//create button
function createBtn(text, styles, handle, cmd, name) {
  const btn = createElement("button", text, styles, name);
  btn.addEventListener("click", () => {
    handle(cmd);
  });

  return btn;
}
// create link
function createLink(text, linkTo, styles, name) {
  const link = createElement("a", text, styles, name);
  link.setAttribute("href", linkTo);

  return link;
}

//create media
function createMedia(type, alt, styles, source, name) {
  const media = createElement(type, "", styles, name);
  media.setAttribute("src", source);
  media.setAttribute("alt", alt);
  media.setAttribute("controls", "controls");

  return media;
}

//make element container
function createContainer(type, text, styles, comps, name) {
  const elem = createElement(type, text, styles, name);
  addToTag(elem, comps, false);

  return elem;
}

//button with elements inside
function createButtonContainer(styles, comps, handle, cmd, name) {
  const btn = createBtn("", styles, handle, cmd, name);
  addToTag(btn, comps);

  return btn;
}

function createLinkContainer(styles, comps, text, linkTo, name) {
  const link = createLink(text, linkTo, styles, name);
  addToTag(link, comps, false);

  return link;
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

export {
  createElement,
  createBtn,
  createLink,
  createMedia,
  addToTag,
  createContainer,
  createButtonContainer,
  createLinkContainer,
};
