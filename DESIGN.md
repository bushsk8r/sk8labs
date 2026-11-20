---
name: sk8 studio cover
description: a maker's sketchbook cover for sk8 studio, drawn in natural dyes with a pixel skate ride on the front page.
colors:
  hemp-cream: "#ede4d0"
  walnut-ink: "#2a221d"
  madder-clay: "#a4472f"
  onion-ember: "#c46a2c"
  dandelion-gold: "#d8a93f"
  avocado-blush: "#dda7a0"
  yarrow-moss: "#6f7843"
  indigo-dusk: "#2f4a6b"
typography:
  display:
    fontFamily: "Rubik Bubbles, Patrick Hand, cursive"
    fontSize: "clamp(3.4rem, 13vw, 8rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Rubik Bubbles, Patrick Hand, cursive"
    fontSize: "clamp(2.4rem, 7vw, 4rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  title:
    fontFamily: "Patrick Hand, Comic Sans MS, cursive"
    fontSize: "1.5em"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "normal"
  body:
    fontFamily: "Patrick Hand, Comic Sans MS, cursive"
    fontSize: "clamp(1.2rem, 1.05rem + 0.5vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Silkscreen, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  wobble: "255px 18px 225px 18px / 18px 225px 18px 255px"
  wobble-2: "18px 225px 18px 255px / 255px 18px 225px 18px"
  rink: "14px 22px 12px 26px / 24px 12px 22px 14px"
  field: "10px 14px 9px 15px / 14px 9px 15px 10px"
  pill: "999px"
  focus: "6px"
spacing:
  xs: "0.4rem"
  sm: "0.6rem"
  md: "1rem"
  lg: "1.5rem"
  edge: "clamp(16px, 5vw, 48px)"
  wide: "1080px"
components:
  button-primary:
    backgroundColor: "{colors.walnut-ink}"
    textColor: "{colors.hemp-cream}"
    rounded: "{rounded.wobble}"
    padding: "0.5rem 1.4rem 0.6rem"
  button-primary-hover:
    textColor: "{colors.dandelion-gold}"
  button-light:
    backgroundColor: "{colors.dandelion-gold}"
    textColor: "{colors.walnut-ink}"
    rounded: "{rounded.wobble}"
    padding: "0.5rem 1.4rem 0.6rem"
  button-light-hover:
    backgroundColor: "{colors.hemp-cream}"
    textColor: "{colors.walnut-ink}"
  plaque:
    backgroundColor: "{colors.walnut-ink}"
    textColor: "{colors.hemp-cream}"
    rounded: "{rounded.wobble}"
    padding: "1.5rem 0.9rem 0.9rem"
  bookmark:
    backgroundColor: "{colors.hemp-cream}"
    textColor: "{colors.walnut-ink}"
    padding: "4.3rem 1.1rem 3.8rem"
  chip-selected:
    backgroundColor: "{colors.walnut-ink}"
    textColor: "{colors.hemp-cream}"
    rounded: "{rounded.wobble}"
    padding: "0.35rem 0.9rem"
  dial-step:
    backgroundColor: "{colors.dandelion-gold}"
    textColor: "{colors.walnut-ink}"
    rounded: "50%"
    size: "44px"
  channel-card:
    backgroundColor: "{colors.hemp-cream}"
    textColor: "{colors.walnut-ink}"
    rounded: "{rounded.rink}"
    padding: "1.3rem 1.4rem 1.5rem"
  board-number:
    backgroundColor: "{colors.dandelion-gold}"
    textColor: "{colors.walnut-ink}"
    rounded: "50%"
    size: "3.2rem"
  why-note:
    backgroundColor: "{colors.walnut-ink}"
    textColor: "{colors.hemp-cream}"
    rounded: "{rounded.wobble}"
    padding: "1rem 1.2rem 1.2rem"
  note-text:
    backgroundColor: "{colors.avocado-blush}"
    textColor: "{colors.walnut-ink}"
    rounded: "{rounded.wobble}"
    padding: "0.7rem 1rem 0.8rem"
  field-input:
    backgroundColor: "{colors.hemp-cream}"
    textColor: "{colors.walnut-ink}"
    rounded: "{rounded.field}"
    padding: "0.7rem 1rem"
    height: "52px"
  night-band:
    backgroundColor: "{colors.indigo-dusk}"
    textColor: "{colors.hemp-cream}"
  nav-bar-phone:
    backgroundColor: "{colors.walnut-ink}"
    textColor: "{colors.hemp-cream}"
---

# Design System: sk8 studio cover

Scope: the cover only (the home page with its long road, the crate under `collections/`, the application form, the play page under `play/`, the radio under `radio/`, the 404). The older pages (`archive/`, `gallery/`, `terrasse/`, `forest/`, and the root `index.css`, `script.js`, `helper.js`) keep a legacy look and are out of scope. The studio and gallery design system in the repository root does not cover this site; the brand guide wins over the repo's old look.

## Overview

**Creative North Star: "The Dyer's Sketchbook"**

A maker's notebook, not an app. Every colour is a natural dye, every frame is drawn with a thick walnut-ink line, and nothing is quite straight: corners are wobbly cut paper, and plaques, bookmarks and buttons lean when you touch them. The front page is a toy first. A 16-pixel skater called bushsk8r rides a long road through the four stages of the loop (compost, analyse, edit, open source) to the studio's door, and the page's job is to let a visitor play before it asks anything of them: only at the end of the road do the two ways in appear.

The system is flat and warm. Depth comes from line weight, overlap and dashed versus solid strokes, never from shadow. Type is hand lettering: a bubbly display face for titles, a handwritten body, and a pixel face for furniture and labels. The fonts are self-hosted placeholders until the handwriting font exists, so the pairing is provisional while the roles are not. Copy is lowercase and plain, in the voice of a note tucked into a sketchbook.

The one place the notebook goes dark is the night band, where the application form sits on indigo dusk. Everything else lives on hemp cream.

**Key Characteristics:**
- Thick walnut-ink line (3px) around every drawn thing, dashed (3px) as the section divider.
- Wobbly cut-paper corners from one two-radius recipe, mirrored for variety.
- Things lean, never lift: plaques rotate -1deg on hover, buttons -2deg, a bookmark skews -2deg.
- Natural-dye palette on hemp cream, ink never pure black.
- Hand, bubble and pixel lettering, all lowercase in voice.
- No shadows, no gradients; light is the clock inside the ride.

## Colors

A palette of eight natural dyes on warm hemp paper, with walnut ink for every line and word.

### Primary
- **Madder Clay** (#a4472f): headlines, the wordmark, links on hover, board and channel titles, glosses, the tourist plaque's band, the studio's roof and the radio mast. The one voice that speaks in colour on cream.

### Secondary
- **Dandelion Gold** (#d8a93f): patches and level-up moments: the board number disc, the distance ribbon's fill, the light button and dial steps, the on-air nav pill and tower waves, the ride's flowing trail and dandelions, and accents on dark grounds (plaque names, night band, why-note).
- **Indigo Dusk** (#2f4a6b): night. The application band and the ride's night sky; also the indigo bookmark's band.

### Tertiary
- **Onion Ember** (#c46a2c): shapes only: wheels, the dusk sky, one bookmark band, the on-air lamp and the dial's current tick. Never small text.
- **Yarrow Moss** (#6f7843): shapes only: trees, grass, shoes, dandelion stems, one bookmark band. Never small text.
- **Avocado Blush** (#dda7a0): soft fills: the sunrise sky, the note text patch, invalid-field and status dashes on night.

### Neutral
- **Hemp Cream** (#ede4d0): the page, stickers, bookmarks, fields, midday sky, text on ink and dusk.
- **Walnut Ink** (#2a221d): all body text, every line, the phone nav bar, the plaques, the why-note, the dial strip, the ride's line colour by day.

The dyes are listed in tonal ramps in the sidecar; the frontmatter is normative for values.

### Named Rules
**The Never-Black Rule.** Ink is walnut (#2a221d), never pure black, for lines and text alike.

**The Shapes-Only Rule.** Ember and moss are shapes, never small text. They have no job as words.

**The Patch Rule.** Gold is for patches and level-up moments, not for general decoration. Its rarity is what makes a flowing trail or a board number feel earned.

**The Night Rule.** Dusk is night. It is used for the application band, the ride's night sky and the purist plaque's band (the gallery's door), and for nothing that is meant to be daytime.

## Typography

**Display Font:** Rubik Bubbles (with Patrick Hand, cursive)
**Body Font:** Patrick Hand (with Comic Sans MS, cursive)
**Label/Mono Font:** Silkscreen (with ui-monospace, monospace)

**Character:** Hand lettering in three registers: bubbly for titles, handwritten for talking, pixel for the furniture of the ride and the boards. All three are self-hosted and are placeholders until the handwriting font exists; swap the family, keep the roles.

### Hierarchy
- **Display** (400, clamp(3.4rem, 13vw, 8rem), 1): the page h1 in madder clay; on the crate and radio pages clamp(2.8rem, 10vw, 6rem), and on the home page's title row a smaller clamp(2.2rem, 9vw, 3.6rem) so the ride stays the hero.
- **Headline** (400, clamp(2.4rem, 7vw, 4rem), 1): section h2 in madder clay, gold on the night band. Balanced wrapping.
- **Title** (400, 1.5em, 1.15): h3 and bookmark names (1.6em). Plaque names go back to bubble, in gold, at clamp(1.7rem, 6vw, 2.4rem). Board titles are 1.6em in clay; channel names clamp(1.8rem, 5vw, 2.6rem) in clay.
- **Body** (400, clamp(1.2rem, 1.05rem + 0.5vw, 1.4rem), 1.5): everything else; lead paragraphs are 1.25em at 1.35. Paragraphs max 62ch with pretty wrapping.
- **Label** (400, 0.875rem, 0.02em, lowercase): Silkscreen on ride readouts, the ribbon's stops (0.68rem), "two ways in" (0.8rem), dress-up legends, board numbers (1rem), item counters, the on-air line, the dial's station line, eyebrows and the bookmark-jump chip. The ride's help line returns to Patrick Hand at 1rem.

### Named Rules
**The Lowercase Voice Rule.** Copy is lowercase, short and plain: "a space where you are free to play." Labels are never uppercased.

**The Pixel Furniture Rule.** Silkscreen carries instruments and labels only (clock, counts, legends, numbers), never paragraphs.

## Layout

A single centred column, max 1080px (`--wide`), with a fluid side gutter of clamp(16px, 5vw, 48px) (`--edge`). Sections pad clamp(2.5rem, 8vw, 5rem) vertically and are separated by a 3px dashed ink rule, except around the ride, the bookmarks and the night band. The night band runs full width with its content held to the same 1080px.

The home page is its own narrower column: 880px, widening to 1400px from 900px up, with the title and lead on one baseline row. Below them, the distance ribbon, the rink and its help bar all take the rink's exact width (a whole-number multiple of the canvas, centred), so no pixel column is ever stretched unevenly. When the road ends, the ride bar gives way to "two ways in": two plaques side by side (a two-column grid at every width, 12px gap), each hung from the doorway on a 3px ink string, then the "your road in" strip and "ride again". There is no footer. The play page's game bookmarks are a two-column grid, a single column from 700px down. Two breakpoints: 700px (the nav moves to the bottom bar, grids stack) and 520px (the ride's world grows from 60 to 90 pixels tall, plaques tighten). The top bar is sticky, 3px ink underline, with nav links at least 44px tall; below 700px the nav becomes a bar fixed to the screen bottom. Route any new sticky offset through the 5rem scroll padding already set.

Touch targets are at least 44px (chips, nav links, summary, bookmark-jump chip, fields 52px). Spacing is rem-based and tight: 0.4, 0.6, 1, 1.5rem gaps do most of the work.

## Elevation & Depth

Flat, no shadows, no gradients. Depth is drawn: a 3px ink line, a hang (the plaques hang on 3px ink strings from the doorways above them), and the contrast of solid versus dashed borders (a broken-line bookmark or dashed item means "still in the studio, not open yet"). State is conveyed by movement, not lift: buttons rotate -2deg on hover, a plaque -1deg, a bookmark skews -2deg from its top-left corner. The doors rise 8px into place once (0.35s), and not at all with reduced motion. Menus and popovers do not exist here.

### Named Rules
**The Drawn-Not-Lit Rule.** Separation comes from ink lines, overlap and dash patterns. Do not add box-shadow, blur or glow.

## Shapes

Hand-cut paper. The signature corner is the wobble: opposing long and short elliptical radii (255px 18px 225px 18px / 18px 225px 18px 255px) with a mirrored second form (`wobble-2`) so neighbours do not match. The rink and boards use a gentler four-value wobble (14px 22px 12px 26px / 24px 12px 22px 14px) and form fields a small one (10px 14px 9px 15px / 14px 9px 15px 10px). The on-air nav link is a full pill, board numbers and dial steps are circles, and bookmarks are ribbons: straight sides, a dyed band across the top and a swallowtail notch cut into the foot. Lines are 3px solid ink for containers, 2px for chips, items and media, 3px dashed for section dividers and unseen things. Focus is a 3px ink outline offset 4px (cream on the phone nav bar and night band, gold on form fields).

### Named Rules
**The Never-Square Rule.** Containers, buttons and chips carry a wobble, pill, circle or arch. Nothing hand-drawn has a plain 90-degree corner.

## Components

Hand-cut and tactile: thick walnut-ink lines, wobbly cut-paper corners, stickers a little askew.

### Buttons
- **Shape:** wobble corners (`--wobble`).
- **Primary:** walnut ink fill, hemp cream text, 1.2em, padding 0.5rem 1.4rem 0.6rem. The base recipe; no cover page shows it bare today.
- **Hover / Focus:** text turns dandelion gold and the button rotates -2deg (0.15s ease-out); focus is the 3px ink outline.
- **Light (on the night band):** dandelion gold fill, ink text; hover flips to cream fill with ink text. Used for "send it in".
- **Quiet button:** no fill, underlined, 1rem hand type at 80% ink, clay on hover, 44px tall ("skip the ride", "ride again").
- **Text button:** no fill, underlined, in pixel type ("wash the path clean", "try again").
- **Dial steps:** gold circles with a 3px ink line, 44px, ◀ ▶; dimmed to half when there is nowhere to turn.

### Chips
- **Style:** 2px ink border, wobble corners, min 44px tall, radio-driven.
- **State:** selected is ink fill with cream text; a focus ring shows on the hidden radio's chip. Used in "gear up": the board alone on the home page (bushsk8r always wears the afro there), board and hair on the small rides.

### Cards / Containers
- **Plaques (the two ways in):** the home page's doors. Ink cards, 3px ink line, wobble corners, at least 12rem tall: a dyed band across the top (clay for tourist, dusk for purist) over a thin cream stripe, both hard stops; the name in gold bubble type, a cream line of what is behind the door, and a gold wavy-underlined way in at the foot. A ride that carried scraps pins them along the tourist plaque's foot in their own colours.
- **Bookmarks:** ribbons, cream, a 3px ink line all round, a dyed band across the top (clay, indigo, moss, gold, ember, ink or blush) and a swallowtail notch at the foot. The band is a hard-stop fill, never a blend. A real link bookmark is solid and a not-yet-open one has a broken line. The play page uses two, one per game.
- **Boards (the crate):** each a link: 3px ink line with the rink-style wobble, a gold numbered disc, a clay title in 1.6em (wavy-underlined on hover), a pixel meta line, and an "open →" cue appended in CSS.
- **Channel card (the radio):** 3px ink line with the rink wobble; a pixel "on air" with an ember lamp (a 12px circle, 2px ink line), the name in clay, a pixel "curated by", the links table (pixel headers, rows ruled in 2px dashed ink, wavy-underlined links at least 44px tall with a ↗), then the why-note: the arrangement, each act under a 1.1rem pixel "act N: <name>" heading, any table in it ruled on every row and column (2px solid, the text colour) and scrolling sideways when wide.
- **Why-note:** ink fill, cream text, gold headings, wobble corners; it states why a board's items belong together.
- **Items:** 2px ink line, mirrored wobble, a pixel counter on the left; unseen items are dashed. A note's text sits on an avocado-blush patch.
- **Shadow Strategy:** none; see Elevation & Depth.

### Inputs / Fields
- **Style:** cream fill, 3px cream border so the field reads as a cream slab on the dusk band, field wobble, min 52px, hint text 0.85em, placeholder darkened to ~70% ink for contrast.
- **Focus:** 3px gold outline offset 3px.
- **Error:** the border turns blush and dashed, with a wavy blush-underlined cream message that starts with "↑". A status box uses a 2px dashed blush border; success uses a 2px dashed gold border.
- **Honeypot:** a field off-screen, out of tab order and hidden from assistive tech.

### Navigation
Sticky top bar: cream, 3px ink underline, logo (30x40) and "sk8 studio" in bubble type in clay on the left, links on the right in 1.05rem Patrick Hand. Every page has the same three links, "play", "radio", "crate"; the current page's link wears the wavy underline. On the home page, while a channel is on air and the ride shows the studio, the *radio* link blinks a gold pill (1.2s, stepped); with reduced motion it holds the gold still. Below 700px the links leave the bar for an ink bar fixed to the screen bottom (cream links, spread evenly). Hover is a 2px wavy underline. A skip link slides in from the top.

### The Radio Dial
On `/radio/`: the two dial steps either side of an ink wobble strip holding one cream tick per on-air channel; the current one is a taller ember tick. A pixel line under it names the station. The arrow keys turn it too. The channel card sits below. The dial only appears with two or more channels.

### The Ride (signature component)
Two rides share one sprite and one set of rules. Both draw at whole pixels with `image-rendering: pixelated` (crisp-edges as the fallback) inside a button with a 3px ink line and the rink wobble.
- **The long road (home, `entrance.js`):** a 160 x 60 world (160 x 90 below 520px), drawn at the largest whole-number scale that fits the column. The road runs through the four stages, each with its props (compost heaps and loose scraps; scraps pinned to posts and marked; washing lines of pages being cut down; signposts saying "almost", then "there"). A **distance ribbon** above it fills in gold behind ink stop lines, the current stage wavy-underlined in pixel type. Light follows distance: blush sunrise, cream midday, ember dusk, dusk night with stars. At the end stands the studio: a clay roof strip lettered "sk8 studio" in a 3x5 pixel alphabet, an ink wall with gold windows, the two doorways (tourist with an open crate of zines, gallery with a clay door) and four lamps that light one by one. A **radio tower** stands on the roof: a clay A-frame mast; while a channel is on air its tip blinks gold and ember and three gold rings ripple out from it. Ride in rhythm and a deer and a coyote come to meet you; scraps that lifted into your tail fly into the crate. The road strip under the doors repeats the whole road with a gold dot per dandelion.
- **The small ride (the 404, a crate board, play's forest):** a 128 x 40 endless circuit scaled to the column width.
- **Sprite:** bushsk8r is a 16 x 16 pixel figure drawn from text frames (ride A/B and three kick frames). Line is ink by day and cream at night; shoes are moss and flash gold on a steady kick; wheels are ember. Hair is a separate layer (afro, or none), and the board can be a skateboard, a banana (gold) or a loaf (clay). Dress-up chips and the ride's progress are remembered locally.
- **Light is the clock** (small ride): the sky follows how far you have ridden (900px per day): sunrise on avocado blush (to 20%), midday on hemp cream (to 60%), dusk on onion ember (to 80%), night on indigo dusk with a cream line. A 4px sun (gold at midday, clay otherwise) or a cream moon crosses the sky. Time moves only when you ride, and the current phase is printed in pixel type beside "time".
- **Dandelion traces:** ride in steady rhythm and flow reaches 0.6; dandelions (moss stem, gold head, ember at midday) are left on the path, kept at least 6px apart, off the bridge, and stored locally so they are there next lap and next visit. "wash the path clean" removes them with 8 seconds to "bring them back".
- **Flow trail:** a trail behind the skater lengthens with flow, dotted in clay (cream at night) and turning solid, two rows deep and gold at flow 0.6. Mashing stumbles; bridge posts over the creek pulse gold on the beat you keep.
- **Reduced motion:** with `prefers-reduced-motion` the sprite steps at five pictures a second instead of ten, the creek shimmer stops, a stumble recolours the line to ember instead of shaking, and smooth scroll and hover transitions turn off. On the long road the arrival cuts straight to the settled scene (lamps lit, guests in place), the tower's waves hold still, and the nav's on-air link holds its gold.
- **Access:** the canvas is hidden from screen readers; the button reads "kick bushsk8r", and polite status lines announce stages, light changes and dandelions in words. Space and Enter kick; "skip the ride" goes straight to the doors.

## Do's and Don'ts

### Do:
- **Do** draw every container with the 3px walnut-ink line (`--line`) and a wobble corner (`--wobble`).
- **Do** keep ink at walnut (#2a221d) and cream at hemp (#ede4d0).
- **Do** use onion ember and yarrow moss for shapes (windows, wheels, trees, stems) only.
- **Do** reserve dandelion gold for patches and level-up moments, and for accents on ink or dusk grounds.
- **Do** use indigo dusk for night: the application band, the ride's night sky and the purist plaque's band.
- **Do** write copy in lowercase, short and plain.
- **Do** keep touch targets at 44px or more and give dark grounds a cream focus ring.
- **Do** show "not open yet" as a dashed border and "open" as solid.
- **Do** honour reduced motion: slower sprite frames, still water, colour instead of shake.

### Don't:
- **Don't** use pure black (#000) anywhere; ink is never pure black.
- **Don't** set small text in onion ember or yarrow moss.
- **Don't** add box-shadows, gradients or glows; depth here is drawn.
- **Don't** use square 90-degree corners on hand-drawn elements.
- **Don't** use the pixel face for paragraphs or the bubble face for body text.
- **Don't** carry this look onto the older pages, or the studio and gallery palette onto this site; they are separate systems.
