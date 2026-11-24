---
name: Nilton City
description: A playable dusk city with clear, quiet portfolio controls.
colors:
  sunset-pink: "#ffabc7"
  sunset-pink-hover: "#ffc5d4"
  activity-lilac: "#bc8ae7"
  warm-ink: "#fff3ed"
  dusk-muted: "#dfbfd8"
  deep-plum: "#21132d"
  panel-plum: "#2d1b38"
  plum-line: "#6c4669"
  focus-gold: "#ffe1ad"
typography:
  display:
    fontFamily: "Barlow, Arial Narrow, sans-serif"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow, Arial Narrow, sans-serif"
    fontSize: "clamp(2.3rem, 5vw, 3.3rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "BarlowBody, Arial, sans-serif"
    fontSize: "16px"
  label:
    fontFamily: "BarlowBody, Arial, sans-serif"
    fontSize: "14px"
rounded:
  marker: "4px"
  control: "6px"
  touch: "8px"
  callout: "10px"
  dialog: "14px"
spacing:
  tight: "8px"
  compact: "12px"
  inset: "16px"
  mobile-edge: "24px"
  desktop-edge: "44px"
components:
  button-primary:
    backgroundColor: "{colors.sunset-pink}"
    textColor: "#2c1530"
    rounded: "{rounded.control}"
    padding: "15px 21px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.sunset-pink-hover}"
  dialog:
    backgroundColor: "{colors.panel-plum}"
    textColor: "{colors.warm-ink}"
    rounded: "{rounded.dialog}"
    padding: "32px 38px"
    width: "min(760px, calc(100% - 36px))"
---

# Design System: Nilton City

## Overview

**Creative North Star: "A City at Dusk"**

The built identity joins a low-poly waterfront city with a calm, readable interface. Plum is the resting ground, coral-pink is the action color, and pale lilac identifies the contribution district. The scene supplies spectacle; interface surfaces supply orientation.

Condensed display lettering gives the work its city-signage voice. The body face is the regular Barlow family, kept distinct from the condensed headings. Dark-backed navigation and instructions stay legible when pale geometry or the sun pass beneath them.

**Key Characteristics:**
- Original geometric city, warm horizon and palm-lined streets.
- Large condensed lettering with a pink second line.
- Dark plum controls over a brighter dimensional world.
- Direct project access alongside exploration.

## Colors

The palette is warm pink and lilac against a deep plum ground; the frontmatter contains the reusable values.

### Primary
- **Sunset Pink** supplies the main action, identity emphasis and selected accents. The lighter hover color is a response to interaction, not a separate content category.

### Secondary
- **Activity Lilac** belongs to the activity towers. Individual project destinations have their own accents from the project catalog, including mint, sand, blue and pink; those accents do not encode contribution volume.

### Neutral
- **Deep Plum** grounds the page and opaque control backing.
- **Panel Plum** is the modal reading surface.
- **Warm Ink** carries headings and primary text; **Dusk Muted** carries supporting copy.
- **Plum Line** separates activity and project rows. **Focus Gold** marks keyboard focus.

**The Backed Overlay Rule.** Navigation, driving instructions and scene captions keep controlled dark backing; they do not rely on the scene remaining dark.

## Typography

**Display Font:** self-hosted Barlow Condensed ExtraBold, registered as `Barlow`.
**Body Font:** self-hosted Barlow Regular, registered as `BarlowBody`, with Arial and sans-serif fallbacks.

The condensed face is reserved for the identity, dialog titles and nearby project names. Body text uses the regular family. Headings are left aligned; the short identity block uses a tight display line height, while reading text opens to a comfortable line height.

- **Display:** heavy condensed identity lettering. The current hero has a surface-specific responsive scale; it is not a universal size for future screens.
- **Headline:** condensed dialog titles use the frontmatter headline role.
- **Body:** introductory and dialog copy is normally 16px; dialog copy uses a 1.65–1.7 line height. Mobile dialog lead text becomes 15px.
- **Label:** navigation, project metadata and common action text use 14px. Marker labels are 12px and stay short.

**The Two Voices Rule.** Use condensed lettering to name the place or destination, and regular Barlow to explain or operate it.

## Layout

The current experience fills the viewport. The scene is fixed beneath navigation, an introduction and edge-anchored controls. The desktop shell uses generous edge insets, with a top navigation row and bottom activity/keyboard strip. The introduction occupies a restrained left-hand region; project markers are withheld from that region.

At the 760px breakpoint, the logo caption and nonessential keyboard hints disappear. Edge padding tightens, the city is framed lower, and a stronger upper scrim separates it from the introduction. Driving instructions stack above touch controls rather than shrinking into a miniature desktop HUD.

Dialogs are centered reading surfaces with an internal scrollbar, a viewport-relative maximum height and a maximum reading width. Their project directory is a vertical list with full-width rows, not a grid of repeated cards. At narrow widths dialog insets reduce to the mobile edge spacing.

## Elevation & Depth

The scene creates most of the dimensional depth. Interface depth is restrained: modal backdrops darken the world, nearby project prompts float above it, and primary buttons use a low offset shadow. Landmark labels use a defined edge rather than an additional shadow. Navigation and instruction panels gain contrast from dark fill, not glowing text.

**The Scene Carries Depth Rule.** Keep UI elevation subordinate to the rendered city; use a reading surface where text needs protection rather than decorating every control with glow.

## Shapes

Controls have compact, gently rounded corners. Small map markers are tighter than buttons; touch controls and nearby prompts are slightly softer. Dialogs use the broadest radius in the interface. None of the main actions use pill-shaped containers. Thin dividers structure the directory without enclosing each project in its own card.

## Components

### Buttons
Primary buttons are pink with dark text, modest rounding and a minimum touch-friendly height. Hover lightens the fill. Keyboard focus uses a distinct gold outline with visible separation from the control. Disabled primary actions reduce opacity during loading. Secondary actions are either underlined text or compact dark-backed driving buttons.

### Navigation
The brand and short navigation labels sit on dark plum backing that remains consistent over bright scenery. Hover changes text to pink. The mobile navigation preserves project, about and GitHub access while removing the small brand caption.

### Dialogs and project rows
Dialogs use the panel ground, warm text, a large condensed title and a compact close control. Categories follow detail titles. Project rows contain a short colored swatch, name, factual metadata and a small plus icon. Thin separators and restrained hover fill communicate the rows as actions.

### Landmark labels
Project labels are small, dark-backed rectangular markers with a project-colored outline and stem. Hover fills them with their accent and switches to dark text. Their color refers to the destination, not a numeric metric.

### Driving controls
The driving instruction group has its own dark backing. Direction controls are square-ish touch targets with consistent stroked SVG chevrons. A nearby-project prompt pairs a condensed destination name with a pink visit action. The camera-motion button exposes its pressed state; reduced motion disables automatic movement initially.

## Do's and Don'ts

### Do:
- **Do** preserve dark backing under text that crosses the moving scene.
- **Do** use pink for primary action and regular Barlow for explanations.
- **Do** keep project access available without driving.
- **Do** preserve the distinction between contribution towers, project destinations and decorative scenery.

### Don't:
- **Don't** turn project rows into a grid of generic cards.
- **Don't** place category labels above dialog titles.
- **Don't** make automatic camera movement mandatory.
- **Don't** use decorative geometry as evidence of contribution activity.
