// the application form: POST /public/applications (plan phase 4).
// the API answers 201 { ok: true } for every valid body, so "sent" never means
// "we know you" — and a failure never clears what was typed.
import { postJSON } from "../api.js";

const form = document.getElementById("applyForm");
const send = document.getElementById("applySend");
const status = document.getElementById("applyStatus");
const done = document.getElementById("applyDone");

const FIELDS = {
  name: "apName",
  email: "apEmail",
  make: "apMake",
  link: "apLink",
};

function showError(input, message) {
  const error = document.getElementById(`${input.id}Err`);
  if (message) error.textContent = message;
  error.hidden = false;
  input.setAttribute("aria-invalid", "true");
}

function clearError(input) {
  const error = document.getElementById(`${input.id}Err`);
  if (error) error.hidden = true;
  input.removeAttribute("aria-invalid");
}

// the same four checks the API makes, so most mistakes never leave the page.
function check(input) {
  const value = input.value.trim();
  let ok = true;
  if (input.name === "link") {
    ok = value === "" || /^https:\/\/\S+$/i.test(value);
  } else if (input.name === "email") {
    ok = input.validity.valid && value !== "";
  } else {
    ok = value !== "";
  }
  if (ok) clearError(input);
  else showError(input);
  return ok;
}

function say(text) {
  status.textContent = text;
  status.hidden = !text;
}

function setSending(sending) {
  send.disabled = sending;
  send.textContent = sending ? "sending…" : "send it in";
  form.setAttribute("aria-busy", String(sending));
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (send.disabled) return;
  say("");

  const inputs = Object.values(FIELDS).map((id) => document.getElementById(id));
  const bad = inputs.filter((input) => !check(input));
  if (bad.length) {
    bad[0].focus();
    return;
  }

  // `link` only when filled: the API refuses a null.
  const payload = {
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    make: form.elements.make.value.trim(),
  };
  const link = form.elements.link.value.trim();
  if (link) payload.link = link;
  const trap = form.elements.company.value;
  if (trap) payload.company = trap;

  setSending(true);
  try {
    await postJSON("/public/applications", payload);
  } catch (err) {
    setSending(false);
    if (err.status === 400) {
      // the API's own message, under the field it names.
      const fieldErrors = err.body?.issues?.fieldErrors ?? {};
      let first = null;
      for (const [key, id] of Object.entries(FIELDS)) {
        const message = fieldErrors[key]?.[0];
        if (!message) continue;
        const input = document.getElementById(id);
        showError(input, `${message}.`);
        first ??= input;
      }
      if (first) first.focus();
      else say("something about that wasn't quite right, and your answers are still here. have a look and try again.");
    } else if (err.status === 429) {
      say("that's a lot of applications from this connection. your answers are still here: try again a little later.");
    } else {
      say("it didn't send. your answers are still here: try again in a moment.");
    }
    return;
  }

  // sent: say what happens next, and don't leave the fields to be re-sent.
  const name = form.elements.name.value.trim();
  for (const el of form.querySelectorAll(".field, button, .trap")) el.hidden = true;
  setSending(false);
  say("");
  done.textContent = `thanks, ${name}. your note is in. someone from the studio will read it and write back by email. we can't say how soon.`;
  done.hidden = false;
  done.setAttribute("tabindex", "-1");
  done.focus();
});

// clear an error as soon as its field is fixed
form.addEventListener("input", (event) => {
  if (event.target.getAttribute?.("aria-invalid")) check(event.target);
});
