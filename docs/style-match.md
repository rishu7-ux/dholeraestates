# Dholera Estates UI alignment

The frontend uses the section templates and global stylesheet from the local `dholera-estate-2` project. Global styles are copied without changes; `app/mobile.css` and `app/theme.css` are retained but no longer imported, so their conflicting overrides cannot change the reference typography.

## Visual system

- Page font: Arial, Helvetica, sans-serif (the reference's effective body font).
- White base: `#FFFFFF`; soft surfaces: `#F8FAFC`.
- Brand accents: `#FA7000`, `#F90032`, `#960AAA`, `#0082FA`.
- Heading weights, font sizes, responsive breakpoints, spacing, cards, header, footer, banners and forms follow the source components.
- The reference's mobile root font size is 14px below 640px.

## Content retained for this project

Brand: Dholera Estates. Location: Akru village, near—not inside—Dholera SIR. Approximately 176–235 sq. yd. plots and approximately 16 acres, subject to availability and verification. Existing client reviews, property photos, CMS blog feed and enquiry API routes remain specific to this project. Reference commercial/industrial offerings were replaced with this project's residential plots and buyer services.

The properties listing links to `/properties/dholera-estates` for the detailed project information and buyer-verification notes. The old `/properties#project-details` anchor still reaches the property listing.

## Hero asset

Saved asset: `public/images/dholera-estates-hero.png`.

Created using the built-in image-editing tool from `public/images/dholera-estate-2-slogan.png`, with this prompt:

> Use case: text-localization. Asset type: existing website hero background. Image 1 is the edit target. Change ONLY the gold sign at the lower left: remove the numeral 2 following ESTATES, so the two-line project name reads exactly "DHOLERA" and "ESTATES". Keep the tagline "ONE DHOLERA. SO MANY CITIES." unchanged. Preserve the exact original image framing, aspect ratio, buildings, road, cars, vegetation, sky, lighting, sign materials, gold typography, text size and all other details. Do not add any UI, headers, new text, objects or logos. Return the edited bitmap as a local saved asset for the project.

The edited image was inspected for the corrected project name. It is an illustrative marketing scene, not a site photograph. The about and property pages use the source's unbranded overview illustration to avoid displaying Estates 2 signage.

## Verification

- `npx next build --webpack`: passed, including TypeScript.
- Home, About, Properties, Property Detail, Blog and Contact routes: HTTP 200 on the local development server.
- Referenced static image paths: no missing files.
- `app/globals.css`: identical to the reference stylesheet.
- Browser-side screenshots and interactions could not be verified because no browser was connected. No real enquiry was submitted during testing.
