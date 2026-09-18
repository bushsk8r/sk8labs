# sk8labs

an open studio where playtime is never over — [sk8.studio](https://sk8.studio)

The public front door of **sk8 studio**, and the fourth repo of the atelier project. Anyone curious about the studio lands here first. It holds the maker's own archive and experiments today and is where **collections** will become visible (see [Direction](#direction)).

| Host | Repo | What it is |
|---|---|---|
| `sk8.studio` | **`sk8labs`** (this repo) | Public base site — the front door, archive, experiments |
| `gallery.sk8.studio` | `gallery_client` | Tourist UI — published zines, newsletters, blogs, behind a keyword |
| `atelier.sk8.studio` | `studio_client` | Purist UI — the protected studio |
| `api.sk8.studio` | `atelier` (`atelier_archive`) | JSON API — the only thing touching the database |

This repo shares nothing with the other three at runtime: it doesn't call the API and has no auth. Cross-repo context lives in the workspace root's `CLAUDE.md` and `architecture.md`.

## who am "i"

a human mastering the art of war, war between my egos. "the tourist" vs "the purist". all creations are the result of a battle...you decide the winner...I am too biased to pick.

The tourist/purist split, the rock-paper-scissors-fire-water elements that name the API's agents, the *terrasse*, and the bushsk8r character on the gallery's house cover all started here.

---

## Running it

A static site: hand-written HTML, CSS and vanilla ES modules. **No `package.json`, no build step, no dependencies, no tests.**

```bash
npx serve .
```

Any static server works. Opening `index.html` from disk doesn't: the pages load `type="module"` scripts, which browsers refuse over `file://`.

**Hosting: Netlify** (inferred — `netlify/functions/` sits at Netlify's default functions path, and there's no `netlify.toml`, so publish directory and function path are Netlify's defaults; presumably `main` auto-deploys). Most of the history is edits made through the GitHub web UI.

**Media lives on Arweave.** Every image, audio and video file is `https://arweave.net/<tx id>`, hard-coded in the page scripts. Nothing is served from the repo except the React bundle in `archive/recording/`.

---

## Structure

```
sk8labs/
├── index.html · index.css · dock.js   # home: "who are you?", tourist vs purist, rps footer
├── script.js                          # header()/footer() — footer mounts the gallery/footer rps game
├── helper.js                          # DOM builders (createElement, createBtn, createLink, createMedia,
│                                      #   createContainer, createButtonContainer, createLinkContainer,
│                                      #   addToTag) + addChosen/setChosen selector state
├── styles.css                         # compiled Tailwind v3.4.1 — used by forest/ and archive/loop/
├── terrasse/                          # the purist's destination (placeholder)
├── gallery/                           # the tourist's destination — a 2024 prototype, NOT gallery_client
│   ├── about/ · past/ · present/      # bio cards · archive by work · "present curiosities" blog
│   ├── footer/                        # rock-paper-scissors-fire-water (class-based); also a standalone page
│   ├── jukebox.js                     # track selector + Arweave media player
│   └── helper.js · script.js          # forked copies of the root files
├── play/                              # standalone rps game ("experiments in game design")
├── archive/                           # the crate: works by year
│   ├── crate.js                       # 2013–2025 data (title, craft, description, source, artifacts, type)
│   ├── loop/                          # "human in the loop" player (2020)
│   └── recording/                     # prebuilt React bundle (Vite) of the audio player
├── forest/                            # "sounds of the deerverse" — may field/wind recordings
├── bakery/                            # "the baked chronicles" zine
│   ├── vol_0/                         # proof of concept — issues 1–5 (complete)
│   └── vol_1/                         # sweat the technique — the croissant (issues not written)
└── netlify/functions/
    ├── hello.js                       # { message: "hello from sk8 studio" }
    └── play.js                        # server-side rps agent: ?element=
```

---

## Pages

| Path | What's there |
|---|---|
| `/` | "welcome to sk8 studio". **who are you?** — *tourist* ("here for the zoomed out picture") links to `gallery/`, *purist* ("zoomed in") to `terrasse/`. A **tourist vs purist** toggle reveals crafter/child vs curator/adult. The footer's six palette swatches (love, self, ego, earth, inspo, home) start the rps game. An `archive` link sits below the footer |
| `/terrasse/` | "your terrasse — where to from here?": **shelf** ("a space to store your zines" → prints *soon come*) and **play** ("a sandbox" → prints *click the boxes*, pointing at the footer game). `shelf.js` and `play.js` are empty files |
| `/gallery/` | "welcome to the gallery — aka the artifact archive, aka the prototype graveyard", marked `[this is a prototype]`. Nav: **about** (programmer / baking enthusiast / recorder of sounds, linking GitHub, the bakery and a `#` jukebox), **past works** (idea factory 2017, human in the loop 2020, echo chamber 2021, playin with poly 2021 — each opens its Arweave media), **currently** (experiments: minesweeper, hypermedia zine · recordings jukebox · a Spotify playlist embed) |
| `/gallery/footer/` | The rps game as its own page, with a marquee header |
| `/play/` | "experiments in game design": one/two player, rules, five elements, a random agent. Links to the [rock-paper-scissors source](https://github.com/justinmsaga/rock-paper-scissors) |
| `/archive/` | Year selector over `crate.js` (2013–2025); a year lists its works (craft), and a chosen work plays its Arweave media or reads "private collection" when there's no `source` |
| `/archive/loop/` · `/archive/recording/` | The "human in the loop" tracks — a vanilla player and a React build of the same material ([audio_player source](https://github.com/justinmsaga/audio_player)) |
| `/forest/` | Seven may field/wind recordings with a track selector |
| `/bakery/` | "the baked chronicles — a study of data sonification": an audio protocol for documenting recipes. Vol 0 (cookies, banana bread, cake, ube, retrospective) · vol 1 (the croissant, in progress) · vol 2 (the cronut, not started) |

**Only `/`, `/gallery/`, `/terrasse/` and `/archive/` are linked from the home page.** `/forest/`, `/play/`, `/archive/loop/` and `/archive/recording/` are reachable by URL only; `/bakery/` is linked from gallery/about.

### The rps game

Five elements: 🌊 > 🔥, 🔥 > [🪨🧻✂️], [🪨🧻✂️] > 🌊, and 🪨 > ✂️ > 🧻 > 🪨. The agent is weighted — fire 33%, rock/paper/scissors 11% each, water 34%. It exists three times: `gallery/footer/` (class-based, emoji elements; the one every footer mounts), `play/play.js` (a state-machine rewrite), and `netlify/functions/play.js` (server-side, three-element mode only).

These are the elements the atelier API's agents are named after: paper writes, rock reads, water updates, fire deletes, scissors replaces.

### Netlify functions

| Function | Call | Returns |
|---|---|---|
| `hello` | `GET /.netlify/functions/hello` | `{ message: "hello from sk8 studio" }` |
| `play` | `GET /.netlify/functions/play?element=rock` | `{ message: "result: …" }` against a random classic-rps agent |

`play.js` carries a fire/water mode and an `elementEmoji()` map that the handler never uses (it always passes mode `0`). No page calls either function yet.

---

## Conventions

- **DOM from JS.** Pages ship a near-empty `<header>/<nav>/<main>/<footer>` and a module that fills them through `helper.js`. `addToTag(tag, children, clear)` is the one render call; `clear` wipes the tag first. Selector state is a copy of the data with a `chosen` flag (`addChosen`/`setChosen`), re-rendered whole on every click.
- **Lowercase voice**, emoji as punctuation, no framework. `forest/` and `archive/loop/` are the older pages: Tailwind utility classes against the compiled `styles.css`.
- **Three copies of the helpers.** `play/helper.js` is identical to the root one; `gallery/helper.js` and `gallery/script.js` have drifted. Edit the one the page imports.

---

## Direction

sk8labs is the public place where anyone interested in the studio arrives. It is the **planned home for collections**: today, collections are the maker's private curation board in the studio (`/collections`, never published, no gallery read). Making them visible here needs a publication path the API doesn't have yet — see Open Decisions in `architecture.md`.

---

## Known issues

| Where | Problem | Fix direction |
|---|---|---|
| home → tourist / purist | The two doors lead to this repo's 2024 prototypes (`gallery/`, `terrasse/`), not to `gallery.sk8.studio` and `atelier.sk8.studio` | Point them at the live clients, or decide what the local pages become |
| `netlify/functions/play.js` | `?element=fire`, `water`, or a missing/unknown element → `result[player]` is `undefined` → the handler throws → 500 | Validate `element` (400), or wire up mode 1 |
| `forest/index.html` | `<audio src="may_field_1.wav">` names a file that isn't in the repo (404 on load); `player.js` builds `http://arweave.net/…` URLs, mixed content on an https page | Start with an empty `src`; use `https://` |
| `terrasse/` | Shelf is "soon come"; play prints a hint instead of linking `/play/`; `shelf.js`/`play.js` are empty | Build the shelf, or drop the files |
| `bakery/vol_1/` | Five empty `<a>` issue links; vol 0's "the jukebox" section is an empty heading | Write the issues |
| `gallery/present/` | Recordings with an empty `source` load `https://arweave.net/`; the page says "*updated Nov 5" | Hide sourceless tracks |
| `gallery/about/` | The jukebox link is `#` | Link `/forest/` |
| `gallery/footer/game.js` | Player two is constructed with the name `"p1"` | Cosmetic |
| root `index.html` | No `<meta charset>` or viewport tag (emoji and mobile scaling depend on server headers); title is "sandbox"; no favicon | Add the head tags |
| helpers | Three copies of `helper.js`, two of `script.js`, three rps implementations | Consolidate once the site's shape settles |

---

all creations: [CC0 vibes](https://creativecommons.org/public-domain/cc0/) — please feel free to add/remix/make fun of these.
