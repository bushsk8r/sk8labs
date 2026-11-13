---
name: sk8 studio front door
description: a maker's notebook door into sk8 studio, drawn in natural dyes with a pixel skate ride on the front page.
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
  title-sticker:
    backgroundColor: "{colors.hemp-cream}"
    textColor: "{colors.madder-clay}"
    rounded: "{rounded.wobble}"
    padding: "0.5rem 1.1rem 0.7rem"
  door:
    backgroundColor: "{colors.hemp-cream}"
    textColor: "{colors.walnut-ink}"
    padding: "6.2rem 1.1rem 1.2rem"
  chip-selected:
    backgroundColor: "{colors.walnut-ink}"
    textColor: "{colors.hemp-cream}"
    rounded: "{rounded.wobble}"
    padding: "0.35rem 0.9rem"
  tag-building:
    backgroundColor: "{colors.dandelion-gold}"
    textColor: "{colors.walnut-ink}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.75rem 0.35rem"
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
  footer:
    backgroundColor: "{colors.walnut-ink}"
    textColor: "{colors.hemp-cream}"
    padding: "2.5rem 48px 3rem"
---

# Design System: sk8 studio front door

Scope: the front door only (the home page with its ride, the crate under `collections/`, the application form, the 404). The older pages (`archive/`, `gallery/`, `terrasse/`, `play/`, `forest/`, and the root `index.css`, `script.js`, `helper.js`) keep a legacy look and are out of scope. The studio and gallery design system in the repository root does not cover this site; the brand guide wins over the repo's old look.

## Overview

**Creative North Star: "The Dyer's Sketchbook"**

A maker's notebook, not an app. Every colour is a natural dye, every frame is drawn with a thick walnut-ink line, and nothing is quite straight: corners are wobbly cut paper, the title is a sticker stuck on askew, and the doors lean when you touch them. The front page is a toy first. A 16-pixel skater called bushsk8r rides a small canvas, and the page's job is to let a visitor play before it asks anything of them.

The system is flat and warm. Depth comes from line weight, overlap and dashed versus solid strokes, never from shadow. Type is hand lettering: a bubbly display face for titles, a handwritten body, and a pixel face for furniture and labels. The fonts are self-hosted placeholders until the handwriting font exists, so the pairing is provisional while the roles are not. Copy is lowercase and plain, in the voice of a note left on a studio door.

The one place the notebook goes dark is the night band, where the application form sits on indigo dusk. Everything else lives on hemp cream.

**Key Characteristics:**
- Thick walnut-ink line (3px) around every drawn thing, dashed (3px) as the section divider.
- Wobbly cut-paper corners from one two-radius recipe, mirrored for variety.
- Stickers and chips slightly askew: the title sticker is rotated -1.5deg, the hero logo 3deg.
- Natural-dye palette on hemp cream, ink never pure black.
- Hand, bubble and pixel lettering, all lowercase in voice.
- No shadows, no gradients; light is the clock inside the ride.

## Colors

A palette of eight natural dyes on warm hemp paper, with walnut ink for every line and word.

### Primary
- **Madder Clay** (#a4472f): headlines, the wordmark, links on hover, board titles, glosses, door and key accents. The one voice that speaks in colour on cream.

### Secondary
- **Dandelion Gold** (#d8a93f): patches and level-up moments: the board number disc, the "building" tag, the light button, the ride's flowing trail and dandelions, and heading accents on dark grounds (night band, why-note, footer).
- **Indigo Dusk** (#2f4a6b): night. The application band and the ride's night sky; also the indigo door's window.

### Tertiary
- **Onion Ember** (#c46a2c): shapes only: wheels, the dusk sky, one door window. Never small text.
- **Yarrow Moss** (#6f7843): shapes only: trees, grass, shoes, dandelion stems, one door window. Never small text.
- **Avocado Blush** (#dda7a0): soft fills: the sunrise sky, the note text patch, invalid-field and status dashes on night.

### Neutral
- **Hemp Cream** (#ede4d0): the page, stickers, doors, fields, midday sky, text on ink and dusk.
- **Walnut Ink** (#2a221d): all body text, every line, the footer, the primary button, the why-note, the ride's line colour by day.

The dyes are listed in tonal ramps in the sidecar; the frontmatter is normative for values.

### Named Rules
**The Never-Black Rule.** Ink is walnut (#2a221d), never pure black, for lines and text alike.

**The Shapes-Only Rule.** Ember and moss are shapes, never small text. They have no job as words.

**The Patch Rule.** Gold is for patches and level-up moments, not for general decoration. Its rarity is what makes a flowing trail or a board number feel earned.

**The Night Rule.** Dusk is night. It is used for the application band and the ride's night sky, and for nothing that is meant to be daytime.

## Typography

**Display Font:** Rubik Bubbles (with Patrick Hand, cursive)
**Body Font:** Patrick Hand (with Comic Sans MS, cursive)
**Label/Mono Font:** Silkscreen (with ui-monospace, monospace)

**Character:** Hand lettering in three registers: bubbly for titles, handwritten for talking, pixel for the furniture of the ride and the boards. All three are self-hosted and are placeholders until the handwriting font exists; swap the family, keep the roles.

### Hierarchy
- **Display** (400, clamp(3.4rem, 13vw, 8rem), 1): the page h1 in madder clay; inside the title sticker it is clamp(2.6rem, 8vw, 5.5rem), and on the crate pages clamp(2.8rem, 10vw, 6rem).
- **Headline** (400, clamp(2.4rem, 7vw, 4rem), 1): section h2 in madder clay, gold on the night band. Balanced wrapping.
- **Title** (400, 1.5em, 1.15): h3 and door names (1.6em); big door names go back to bubble at clamp(2rem, 6vw, 3rem). Board titles are 1.6em in clay.
- **Body** (400, clamp(1.2rem, 1.05rem + 0.5vw, 1.4rem), 1.5): everything else; lead paragraphs are 1.25em at 1.35. Paragraphs max 62ch with pretty wrapping.
- **Label** (400, 0.875rem, 0.02em, lowercase): Silkscreen on ride readouts, dress-up legends, board numbers (1rem), item counters, eyebrows and the door-jump chip. The ride's help line returns to Patrick Hand at 1rem.

### Named Rules
**The Lowercase Voice Rule.** Copy is lowercase, short and plain: "this is a space where you are free to play." Labels are never uppercased.

**The Pixel Furniture Rule.** Silkscreen carries instruments and labels only (clock, counts, legends, numbers), never paragraphs.

## Layout

A single centred column, max 1080px (`--wide`), with a fluid side gutter of clamp(16px, 5vw, 48px) (`--edge`). Sections pad clamp(2.5rem, 8vw, 5rem) vertically and are separated by a 3px dashed ink rule, except around the ride, the doors and the night band. The night band runs full width with its content held to the same 1080px.

The home page is the ride first (title sticker overlapping the rink's top edge), then two doors side by side as a "street" with a 3px pavement line under them, then the footer. The doors are a two-column grid, a single column from 700px down; smaller streets auto-fill at 210px. The hero is a 1.3fr / 1fr grid that stacks below 700px. The top bar is sticky, 3px ink underline, with nav links at least 44px tall; below 480px the wide nav link is dropped. Route any new sticky offset through the 5rem scroll padding already set.

Touch targets are at least 44px (chips, nav links, summary, door-jump chip, fields 52px). Spacing is rem-based and tight: 0.4, 0.6, 1, 1.5rem gaps do most of the work.

## Elevation & Depth

Flat, no shadows, no gradients. Depth is drawn: a 3px ink line, an overlap (the title sticker sits across the rink's top edge), and the contrast of solid versus dashed borders (a dashed door or dashed item means "still in the studio, not open yet"). State is conveyed by movement, not lift: buttons rotate -2deg on hover, a door skews -2deg from its bottom-left corner. Menus and popovers do not exist here.

### Named Rules
**The Drawn-Not-Lit Rule.** Separation comes from ink lines, overlap and dash patterns. Do not add box-shadow, blur or glow.

## Shapes

Hand-cut paper. The signature corner is the wobble: opposing long and short elliptical radii (255px 18px 225px 18px / 18px 225px 18px 255px) with a mirrored second form (`wobble-2`) so neighbours do not match. The rink and boards use a gentler four-value wobble (14px 22px 12px 26px / 24px 12px 22px 14px) and form fields a small one (10px 14px 9px 15px / 14px 9px 15px 10px). Tags are full pills, board numbers are circles, and doors are arches (48% 52% 0 0 / 5.5rem 5.2rem 0 0) with a half-round window above and a round knob. Lines are 3px solid ink for containers, 2px for chips, items and media, 3px dashed for section dividers and unseen things. Focus is a 3px ink outline offset 4px (cream on the footer and night band, gold on form fields).

### Named Rules
**The Never-Square Rule.** Containers, buttons and chips carry a wobble, pill, circle or arch. Nothing hand-drawn has a plain 90-degree corner.

## Components

Hand-cut and tactile: thick walnut-ink lines, wobbly cut-paper corners, stickers a little askew.

### Buttons
- **Shape:** wobble corners (`--wobble`).
- **Primary:** walnut ink fill, hemp cream text, 1.2em, padding 0.5rem 1.4rem 0.6rem.
- **Hover / Focus:** text turns dandelion gold and the button rotates -2deg (0.15s ease-out); focus is the 3px ink outline.
- **Light (on the night band):** dandelion gold fill, ink text; hover flips to cream fill with ink text. Used for "send it in".
- **Text button:** no fill, underlined, in pixel type ("wash the path clean", "try again").

### Chips
- **Style:** 2px ink border, wobble corners, min 44px tall, radio-driven.
- **State:** selected is ink fill with cream text; a focus ring shows on the hidden radio's chip. Used for board and hair choices in "dress up".
- **Tags:** pills with a 2px ink border; "open" is ink on cream, "building" is gold.

### Cards / Containers
- **Doors:** arched, cream, 3px ink line with no bottom border (they stand on the pavement line), a coloured window (clay, indigo, moss, gold, ember, ink or blush), a knob. A real link door is solid and a not-yet-open one is dashed. The home page uses two big doors (tourist in clay, purist in indigo).
- **Boards (the crate):** 3px ink line with the rink-style wobble, a gold numbered disc, a clay title in 1.6em, a pixel meta line, and an "open" cue appended in CSS.
- **Why-note:** ink fill, cream text, gold headings, wobble corners; it states why a board's items belong together.
- **Items:** 2px ink line, mirrored wobble, a pixel counter on the left; unseen items are dashed. A note's text sits on an avocado-blush patch.
- **Title sticker:** cream, 3px line, wobble, rotated -1.5deg, overlapping the rink; the hero logo is rotated 3deg.
- **Shadow Strategy:** none; see Elevation & Depth.

### Inputs / Fields
- **Style:** cream fill, 3px cream border so the field reads as a cream slab on the dusk band, field wobble, min 52px, hint text 0.85em, placeholder darkened to ~70% ink for contrast.
- **Focus:** 3px gold outline offset 3px.
- **Error:** the border turns blush and dashed, with a wavy blush-underlined cream message that starts with "↑". A status box uses a 2px dashed blush border; success uses a 2px dashed gold border.
- **Honeypot:** a field off-screen, out of tab order and hidden from assistive tech.

### Navigation
Sticky top bar: cream, 3px ink underline, logo (30x40) and "sk8 studio" in bubble type in clay on the left, links on the right in 1.05rem Patrick Hand. No nav on the home page; the crate has "the boards", "become a purist" and an external "purist" link. Hover is a 2px wavy underline. A skip link slides in from the top.

### The Ride (signature component)
A tiny skate game on a 128 x 40 canvas, scaled to the column width with `image-rendering: pixelated` (crisp-edges as the fallback) inside a button with a 3px ink line and the rink wobble. It is a copy of the same markup on the home page, the crate's non-public board and the 404; change all three together.
- **Sprite:** bushsk8r is a 16 x 16 pixel figure drawn from text frames (ride A/B and three kick frames). Line is ink by day and cream at night; shoes are moss and flash gold on a steady kick; wheels are ember. Hair is a separate layer (afro, or none), and the board can be a skateboard, a banana (gold) or a loaf (clay). Dress-up chips and the ride's progress are remembered locally.
- **Light is the clock:** the sky follows how far you have ridden (900px per day): sunrise on avocado blush (to 20%), midday on hemp cream (to 60%), dusk on onion ember (to 80%), night on indigo dusk with a cream line. A 4px sun (gold at midday, clay otherwise) or a cream moon crosses the sky. Time moves only when you ride, and the current phase is printed in pixel type beside "time".
- **Dandelion traces:** ride in steady rhythm and flow reaches 0.6; dandelions (moss stem, gold head, ember at midday) are left on the path, kept at least 6px apart, off the bridge, and stored locally so they are there next lap and next visit. "wash the path clean" removes them with 8 seconds to "bring them back".
- **Flow trail:** a trail behind the skater lengthens with flow, dotted in clay (cream at night) and turning solid, two rows deep and gold at flow 0.6. Mashing stumbles; bridge posts over the creek pulse gold on the beat you keep.
- **Reduced motion:** with `prefers-reduced-motion` the sprite steps at five pictures a second instead of ten, the creek shimmer stops, a stumble recolours the line to ember instead of shaking, and smooth scroll and hover transitions turn off.
- **Access:** the canvas is hidden from screen readers; the button reads "kick bushsk8r", and polite status lines announce light changes and dandelions in words. Space and Enter kick.

## Do's and Don'ts

### Do:
- **Do** draw every container with the 3px walnut-ink line (`--line`) and a wobble corner (`--wobble`).
- **Do** keep ink at walnut (#2a221d) and cream at hemp (#ede4d0).
- **Do** use onion ember and yarrow moss for shapes (windows, wheels, trees, stems) only.
- **Do** reserve dandelion gold for patches and level-up moments, and for accents on ink or dusk grounds.
- **Do** use indigo dusk for night: the application band and the ride's night sky.
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
