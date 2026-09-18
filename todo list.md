# sk8labs integration — todo list

**Goal:** public collections on `sk8.studio` — worked samples of *curation as craft*, showing others what applying the thesis (*compost → analyse → edit → produce*) looks like as a creative practice.

**Shape:** a collection gets a **make public** option in the studio. Once public, sk8labs reads it with a plain `fetch()` to `api.sk8.studio` and renders the JSON in hand-written vanilla JS. No framework, no build step, no keyword.

**What goes public is the curation layer:** the order, the glosses, the arrangement, external sources, and the titles/types of material that isn't public yet. A member's *content* shows only once it has been published the existing way: a note through a published blog, an artifact through a published, ungated zine.

**Status (2026-09-18):** §1 API and §2 studio are built and checked end to end against the test database: migration 0027, 64 API tests, the studio typechecks. Still open: the production `CORS_ORIGIN`, the sk8labs pages (§3), deploying (§4) and docs (§5).

Work top to bottom. The API ships first, then the studio, then sk8labs, because each one depends on the one before it.

---

## 0. Decisions (made 2026-09-18)

| # | Question | Decision |
|---|---|---|
| D1 | Is making a collection public a way of publishing its members? | **Yes — a narrow third publication path.** The docs' "no third path" rule gets rewritten to name it. Because of D2 it publishes the curation layer, not member content |
| D2 | Notes | **Full content only if the note is on a published, undeleted blog.** Every other note shows title + type + verb set only |
| D2 | Artifacts (and internal sources, which show their artifact) | **Full content only when reachable through a published, ungated zine** — `reachableArtifacts()` with no pass. Otherwise title + type + "not yet published" |
| D2 | External sources | Title, medium, `url`, `content` — always (a source is the maker's own record of outside material) |
| D2 | Deleted material | Items whose source/artifact is deleted, or whose canvas is deleted, are dropped — never struck through |
| D3 | Curation text | **Glosses + arrangement `text`. Never `left_out`** — what was refused stays private |
| D4 | No keyword on sk8.studio vs the studio pass on gallery blogs | **Accepted.** A note on a published blog can be read on sk8.studio without the studio pass, because the maker chose to show it |
| D5 | Live or snapshot | **Live.** Every read reflects the board now; no snapshot column. The page shows "public since" and "last changed" |
| D6 | Reversible | **Yes, both ways.** Make private → `public_at` cleared → public URL 404s |
| D7 | Editable while public | **Everything:** title, description, items, order, glosses, arrangement |
| D8 | Make-public checks | **All three:** not empty; has an arrangement; at least one *visible member* (an item whose content shows under D2). The arrangement check is a deliberate exception to "an arrangement is never a publish gate" — on sk8.studio it *is* the thesis |
| D8a | When the checks run | **Auto-private when broken.** Any change that makes a public collection fail a check clears `public_at` and records why |
| D9 | Whose collections | **Every purist's**, newest first, curator named via `curatorNames()` |
| D10 | Canvas names | **Shown** as plain text (no link) when the canvas isn't deleted |

**Details chosen by default — change them here if they're wrong:**
- Draft notes show as title + type placeholders, the same as any other unpublished note, rather than being omitted. (Omitting them is safer if draft titles are ever sensitive.)
- A note on a published blog is shown in full even if the blog is only reachable in the gallery with the studio pass (that's D4).

---

## 1. API — `atelier`

### Schema
- [x] Take a JSON dump into `.db-backups/` first.
- [x] In [schema.ts](../atelier/src/db/schema.ts) (`collections`, ~line 226), add:
  - `public_at` (`timestamp`, nullable) — set while public
  - `public_lost` (`text`, nullable) — why auto-private last fired (e.g. `"the arrangement was deleted"`). Cleared on the next make-public.
  - Rewrite the column comment that says a collection never publishes.
  - Don't reuse the name `published_at`, which 0024 dropped. `public_at` keeps collections clearly separate from the zine → blog → newsletter publishing chain.
- [x] `npm run db:generate`, then `npm run db:migrate` — a pure addition. **Never `db:push`.** The next free migration number is `0027`.

### One resolver, one check — `src/utils/publicCollections.ts`
The public read and the D8 checks must agree on what "visible" means, so both go through the same code:
- [x] `readPublicView(collectionId)` (planned as `resolvePublicItems`): items in `position` order, each resolved per D2/D10:
  - notes via `blog_notes` → a published, undeleted blog, using `galleryNoteColumns`
  - artifacts and internal sources via `reachableArtifacts(ids)` with no pass
  - external sources in full
  - deleted items and items on deleted canvases dropped
  - each item gets a `visible: boolean`
- [x] `publicRules(view)` / `failingRules(view)` over the three D8 rules, using the resolver (built as pure functions over the view, not a second query).
- [x] `enforcePublic(collection)` (+ `enforcePublicById`): if the collection is public and a rule fails → clear `public_at`, set `public_lost` to the first failure. (`updatedAt` is left alone: it means "last changed by the maker".)
- [x] **Make `reachableArtifacts()` take an optional pass** in [contentController.ts](../atelier/src/controllers/contentController.ts) and export it. With no pass, only **ungated** published zines count. Don't write a second copy of the rule.

### When auto-private runs
- [x] **Eagerly**, right after the collection's own changes: remove item ([collectionController.ts](../atelier/src/controllers/collectionController.ts) `removeCollectionItem`), and arrangement delete for `holderKind = "collection"` ([arrangementController.ts](../atelier/src/controllers/arrangementController.ts) `deleteArrangement`).
- [x] **Lazily, as the backstop**, for causes outside the collection, which would otherwise mean touching six controllers:
  - zine unpublish or lock
  - fire (agent delete of an artifact)
  - source soft-delete
  - canvas soft-delete
  - a note delete cascading its item
  - a blog member removed

  Run `enforcePublic` at the top of `GET /public/collections/:id`, `GET /collections/:id` and `GET /collections/` (only for rows with `public_at` set). For the public list, run it per public collection before listing.
  - Known cost: the list read does a check per public collection. That's fine at this scale; revisit alongside pagination.

### Studio side (session auth, `studio`/`full`)
- [x] `POST /collections/:collectionId/public`:
  - run the rules → 400 with the failures joined (`"write an arrangement first; add something that's already published"`)
  - otherwise set `public_at = now()` and clear `public_lost`
- [x] `POST /collections/:collectionId/private`: clear `public_at`.
- [x] `GET /collections/` and `GET /collections/:id` return `publicAt`, `publicLost`; the detail read adds `publicRules` and a `publicVisible` flag per item — so the studio can explain a disabled button and preview each item.
- [x] Log both changes through `logContentOp`, never as agent ops. They're curation.

### Public read (no auth) — `src/routes/publicRoutes.ts`, mounted at `/public` in [server.ts](../atelier/src/server.ts)
- [x] `GET /public/collections`: public collections, newest `public_at` first. Fields: `id, title, description, publicAt, updatedAt, curator`, item counts by kind, visible count, a count per verb set.
- [x] `GET /public/collections/:collectionId`:
  - the collection
  - its arrangement's **`title` and `text` only** — explicit columns, so `left_out` can't leak
  - `readPublicView()`
  - A private, unknown, malformed or auto-privated id → **404** `{ error: "not public" }`, so the response never confirms that a private collection exists.
- [x] **Explicit column lists only.** Never return `curatorId`, `authorId`, emails, `keywordHash`, `public_lost` or note `status`.
- [x] Return `set` and `half` per note (compost/analyse · edit/produce), so sk8labs doesn't need a fourth copy of `NOTE_SETS`. The mapping lives in the API next to `NOTE_TYPES`; the docs' "set membership lives only in the clients" line changes to say so.
- [x] Add a `publicLimiter` in [rateLimiter.ts](../atelier/src/middleware/rateLimiter.ts): generous, reads only, keyed on `clientKey()`. There's no gallery server in between, so it falls back to the socket address.
- [x] `Cache-Control: public, max-age=60`. It's live, but a minute of staleness is fine.

### CORS
- [ ] Add `https://sk8.studio` to `CORS_ORIGIN` in production (comma-separated system env), and `http://localhost:5500` locally (see §3). Not done — it's deploy config, not code.
- [x] sk8labs fetches **without** credentials, so no cookie ever rides along, even though the global `cors()` allows them.

### Tests (`atelier/tests/`, no database)
- [x] `publicRoutes`: mounted without auth (prove it by the controller's own message, not by the absence of a 401); a malformed id → 404.
- [x] `collectionRoutes`: `/public` and `/private` sit behind the studio guard.
- [x] Unit-test `publicCheck`'s three rules and the D2 note/artifact visibility with a stubbed resolver input.

---

## 2. Studio — `studio_client`

- [x] Add `publicAt`, `publicLost` and `publicCheck` to the collection types in `src/lib/types.ts`.
- [x] Add `makeCollectionPublic` / `makeCollectionPrivate` server actions in [collections.ts](../studio_client/src/lib/actions/collections.ts). Catch errors and return the API's message inline.
- [x] On [collections/[collectionId]/page.tsx](../studio_client/src/app/(studio)/studio/collections/[collectionId]/page.tsx), a **make public** panel:
  - if `publicCheck.ok` is false: the button is disabled and the failures are listed as a checklist (not empty ✓, arrangement ✗, visible member ✗)
  - `ConfirmSubmit` step: what readers will see in full vs as placeholders, item by item, and a reminder that `left_out` stays private
  - once public: a "view on sk8.studio" link and a **make private** button
  - if `publicLost` is set: a banner saying *"went private: <reason>"* with a make-public-again button
- [x] In the `ArrangementEditor` on a public collection, deleting the arrangement warns that it will make the collection private.
- [x] A `public` marker on [CollectionSearchGrid](../studio_client/src/components/collections/CollectionSearchGrid.tsx) cards, and a `went private` marker when `publicLost` is set.
- [ ] Later: a preview of the public page. Skip it for v1.

---

## 3. sk8labs — vanilla JS

### Plumbing
- [ ] `api.js`, one `fetch` wrapper:
  ```js
  const API = location.hostname === "localhost" ? "http://localhost:3001" : "https://api.sk8.studio";
  export async function getJSON(path) {
    const res = await fetch(`${API}${path}`); // no credentials
    if (!res.ok) throw Object.assign(new Error(res.statusText), { status: res.status });
    return res.json();
  }
  ```
- [ ] **Ports:** locally the API is on `3001` and the studio on `3000` (`npx serve`'s default). Run sk8labs with `npx serve . -l 5500`, add `http://localhost:5500` to `atelier/.env`'s `CORS_ORIGIN`, and set `NEXT_PUBLIC_SK8_URL=http://localhost:5500` in the studio so its "view on sk8.studio" link opens the local copy.
- [ ] URLs: `collections/view.html?id=<uuid>`. For prettier URLs, add a Netlify `_redirects` line: `/collections/:id  /collections/view.html  200`, and read the id from `location.pathname`.

### What the API returns (as built)
- `GET /public/collections` → `{ collections: [{ id, title, description, publicAt, updatedAt, curator, hasArrangement, counts: { sources, notes, artifacts }, visibleCount, sets: { compost, analyse, edit, produce } }] }`
- `GET /public/collections/:id` → `{ collection: { id, title, description, publicAt, updatedAt, curator }, arrangement: { title, text }, items: [...] }`, or 404 `{ error: "this collection isn't public" }`
- Each item: `{ id, kind, position, gloss, visible, canvas: { title } | null, note | artifact | source }`
  - `note`: `{ title, type, set, half }`, plus `content` and `createdAt` when visible
  - `artifact`: `{ title, artifactType }`, plus `content`, `metadata` and `zineTitle` when visible
  - `source`: `{ title, kind, medium, url, content, artifact }`. An external source always has its https `url` and `content`; an internal one carries `artifact` only when that artifact is visible.
- `curator` is `null` for a purist with no profile. Show "anonymous purist", the way the studio does.

### Pages
- [ ] `collections/index.html` + `collections.js`: every public collection. Show title, description, curator, "public since", and a verb-set mix bar with counts printed, so colour is never the only signal.
- [ ] `collections/view.html` + `view.js`:
  - header: title, description, curator, public since / last changed
  - **the arrangement** up top: why these, in this order
  - items in order, each with its **gloss**, kind, canvas title (D10), and note type coloured by verb set and half
  - visible notes: full text; visible artifacts: text / image / audio / video via `createMedia()`; external sources: title, medium, content, and a link (`https` only, `target="_blank"`, `rel="noopener noreferrer"`)
  - placeholders, which make the reader see there's more work in progress: *"note · reading · not yet published"*, *"artifact · image · not yet published"*
- [ ] States: loading, empty list, 404 (*"this collection isn't public"* — also what an auto-privated link shows), network error.
- [ ] A short "what is curation as craft" block linking the four verbs to what's on the page.

### Rendering rules
- [ ] **Markdown** (note text, descriptions, arrangement, source content). Either:
  - (a) plain paragraphs for v1, which is fully vanilla, or
  - (b) `markdown-it` as an ES module from a CDN with `html: false`, the same setting the gallery uses.

  **Never** put raw API strings into `innerHTML`. Glosses and titles always go through `textContent`, which `createElement()` already does.
- [ ] New pages get `<meta charset>`, `viewport`, a real `<title>` and a favicon.

### Front door
- [ ] Point home's **tourist** at `https://gallery.sk8.studio` and **purist** at `https://atelier.sk8.studio` in [dock.js](dock.js).
- [ ] Add **collections** to the home page as the third door, the one that needs no keyword or account.
- [ ] Decide the fate of the local prototypes `gallery/` and `terrasse/`: retire them, or move them under `archive/` as 2024 works.
- [ ] Don't mention the studio pass or either keyword anywhere on sk8.studio.

---

## 4. Deploy order

- [ ] API: migration applied → deploy → `CORS_ORIGIN` includes `https://sk8.studio` → `GET https://api.sk8.studio/public/collections` from a console on sk8.studio returns `[]`.
- [ ] Studio: deploy → build a test collection:
  - check the button refuses it empty, without an arrangement, and with only unpublished members
  - then make it public
- [ ] sk8labs: push → check the list and view at phone width and throttled.
- [ ] Auto-private: delete the test collection's arrangement → the public URL 404s and the studio shows "went private: …". Then make it private and clean the test data up the same session.

---

## 5. Docs (run `/update-docs` once it's built)

- [ ] `CLAUDE.md`:
  - the collections rule: public with the D1–D10 limits
  - the reachability paragraph: the third path, and `reachableArtifacts()` with no pass
  - "set membership lives only in the clients" → now also in the API for public reads
  - arrangements: a gate for collections only
  - migrations, `/public` routes, the sk8labs section
- [ ] `architecture.md`: move "Collections on `sk8labs`" from Open Decisions to Resolved Decisions (this table, condensed); add routes, schema, `publicCollections.ts`.
- [ ] `sk8labs/README.md`: the collections pages, `api.js`, the dev port, the Direction section → current state.
- [ ] Decide whether the public collection API gets its own `llms.txt` on sk8.studio, separate from the gallery's.

---

## 6. Existing sk8labs issues (any time)

From the Known issues table in [README.md](README.md):
- [ ] `netlify/functions/play.js` 500s on `fire`, `water` or a missing element.
- [ ] `forest/`: a missing `may_field_1.wav`, and `http://arweave.net` should be https.
- [ ] Orphaned pages (`forest/`, `play/`, `archive/loop/`, `archive/recording/`): link them from somewhere, or retire them.
- [ ] `bakery/vol_1` issue links are empty; the vol 0 jukebox section is empty.
- [ ] Three copies of `helper.js`: consolidate before the collections pages add a fourth consumer.
