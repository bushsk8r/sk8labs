// one way to read the atelier API from sk8.studio.
// no credentials, ever: nothing here is signed in, and no cookie rides along.

const LOCAL = ["localhost", "127.0.0.1", "[::1]"];
export const API = LOCAL.includes(location.hostname)
  ? "http://localhost:3001"
  : "https://api.sk8.studio";

// resolves to the parsed JSON, or throws an Error with `.status`
// (0 = the network never answered).
export async function getJSON(path) {
  let res;
  try {
    res = await fetch(`${API}${path}`, { credentials: "omit" });
  } catch {
    throw Object.assign(new Error("network"), { status: 0 });
  }
  if (!res.ok) {
    throw Object.assign(new Error(res.statusText || "request failed"), {
      status: res.status,
    });
  }
  return res.json();
}

// resolves to the parsed JSON, or throws an Error with `.status` and, when the
// API sent one, `.body` ({ error, code, issues }). status 0 = no answer.
export async function postJSON(path, data) {
  let res;
  try {
    res = await fetch(`${API}${path}`, {
      method: "POST",
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw Object.assign(new Error("network"), { status: 0 });
  }
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw Object.assign(new Error(res.statusText || "request failed"), {
      status: res.status,
      body,
    });
  }
  return body;
}

// small DOM helpers: text always goes through textContent, never innerHTML,
// because every string from the API is somebody else's input.
export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

// paragraphs from plain text: blank lines split, single newlines stay.
export function paragraphs(text, className) {
  return String(text ?? "")
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const p = el("p", className, chunk);
      p.style.whiteSpace = "pre-line";
      return p;
    });
}

// only an absolute https address becomes a link or a media source.
export function httpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export function externalLink(href, text, className) {
  const a = el("a", className, text);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
}

export const curatorName = (curator) =>
  curator ? curator : "an anonymous purist";

export const things = (n) => `${n} ${n === 1 ? "thing" : "things"}`;

export function plainDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}
