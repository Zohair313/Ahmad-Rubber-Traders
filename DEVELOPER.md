# DEVELOPER.md: Ahmad Rubber Traders Technical Documentation

Comprehensive architectural, data schema, calculator algorithm, and deployment guide for the Ahmad Rubber Traders B2B bilingual web application.

---

## 1. Overview and Goal

**Ahmad Rubber Traders** is a real wholesale distributor of vulcanized rubber flooring, dairy cow mats, and EVA foam sheets located at 34 Jamia Street, Fleming Road / Wachowali Bazaar, Lahore, Pakistan.

The core goal of this application is to:
1. Provide dairy farm owners, livestock contractors, and milking parlor fabricators across Punjab with an instant, mobile-friendly **Bulk Requirement Calculator**.
2. Enable buyers to calculate pieces needed by **Shed Area** (feet or metres) or by **Cow/Stall Count** (with optional walking alleys and feeding areas).
3. Generate a clean, itemized WhatsApp inquiry requisition sent directly to the owner's WhatsApp trade desk (`+92 311 6103661`) with zero intermediary servers, databases, or user accounts.
4. Support full native bilingual presentation: **English (LTR default)** and **Urdu (RTL)** using CSS logical properties and decoupled JSON data stores.
5. Strictly adhere to the **No Invented Facts rule**: Zero fabricated certifications, customer counts, warranties, or fictitious reviews. Only the verified 4.9 Google rating (77 reviews) and client-approved data are displayed; all unconfirmed items are transparently tagged `[client to confirm]`.

---

## 2. Stack and Why

- **Architecture:** Zero-framework, lightweight static web architecture (Static HTML5, Modern CSS3 with CSS Logical Properties, and small Vanilla JavaScript ES6+).
- **Why no heavy framework?**
  - Most Punjab dairy farmers browse from Android smartphones on 3G/4G cellular connections in rural farm sheds.
  - Zero framework overhead guarantees instantaneous initial paint (< 800ms) and eliminates React/Vue hydration latency.
  - Complete operational independence: Can be hosted on any static web server, GitHub Pages, Cloudflare Pages, Netlify, or loaded directly off local disk.
- **Design Foundation:** Powered by the **Hallmark** design engine (`v2.0.0`) using the **Furrow** agricultural/records theme (`light/grotesk-sans/warm`) and the **Catalogue** macrostructure (`11-catalogue.md`).
- **Typography:**
  - Urdu: `Noto Naskh Arabic` (fluid, natural line height of 1.85+, zero unnatural letter-spacing).
  - English: `Red Hat Text` (clean, mechanical geometric sans).
  - Tabular Figures & Units: `Red Hat Mono` with `font-variant-numeric: tabular-nums`.

---

## 3. Project Structure

```text
E:\Ahmad Rubber Traders/
├── .agents/skills/            # Installed skills (hallmark, frontend-design, ui-taste)
├── .hallmark/                 # Hallmark engine records and run logs
│   └── log.json               # Hallmark build log and rotation audit trail
├── css/
│   ├── base.css               # Hallmark Floor base rules, reset, and container scales
│   ├── style.css              # Main application stylesheet using CSS logical properties
│   └── tokens.css             # Theme design tokens (colors, typography, radii, spacing)
├── data/
│   ├── en.json                # English translation string dictionary (LTR default)
│   ├── site-data.json         # Single source of truth for all business and product data
│   └── ur.json                # Urdu translation string dictionary (RTL switchable)
├── images/
│   ├── context/               # AI-generated realistic context and environment imagery
│   └── products/              # Real client-supplied photos of physical mats and sheets
├── js/
│   └── app.js                 # Vanilla JS state manager, calculator, and WhatsApp generator
├── DEVELOPER.md               # Complete developer technical handbook (this document)
├── IMAGE-PROMPTS.md           # Realistic AI image briefs (context only) and camera recipes
├── index.html                 # Semantic HTML5 entry page with JSON-LD metadata
├── OWNER-GUIDE.md             # Non-technical owner operating manual (English)
├── OWNER-GUIDE.ur.md          # Non-technical owner operating manual (Urdu)
├── package.json               # Build scripts and local static preview runner
└── skills-lock.json           # Installed skills dependency lockfile
```

---

## 4. Setup, Run, and Build

### Prerequisites
- Node.js version 18.0+ (Tested on Node v25.9.0).
- Any standard web browser (Chrome, Safari, Firefox, Edge).

### Local Development Server
To serve locally with live-reload:
```bash
# Run using the built-in Vite static server
npm run dev
# Server starts immediately on http://localhost:3000/
```

Or using any standard zero-dependency HTTP server:
```bash
npx serve .
# Or Python 3 built-in server:
python -m http.server 3000
```

### Static Build
Because the site is authoritatively written in standard HTML, CSS, and vanilla JS, no compilation step is mandatory. To verify production bundling:
```bash
npm run build
```

---

## 5. Content and Data (`site-data.json` Schema)

All commercial details live in `data/site-data.json`. Non-technical staff can modify this single file to update business coordinates, prices, sizes, or delivery regions without editing HTML.

### Schema Fields Explained

```json
{
  "client": {
    "name": "Ahmad Rubber Traders",
    "nameUrdu": "احمد ربڑ ٹریڈرز",
    "address": "34 Jamia Street, Fleming Road / Wachowali Bazaar, Lahore, Pakistan",
    "phone": "+92 311 6103661",
    "whatsappNumber": "923116103661",     // Clean international format without '+' or spaces
    "hours": "Operating hours string",
    "rating": 4.9,                        // Verified Google rating
    "reviewCount": 77                     // Verified Google review count
  },
  "defaults": {
    "defaultWastagePercent": 5,           // Default trimming margin in calculator
    "unit": "ft"                          // Default unit of measurement
  },
  "products": [
    {
      "id": "cow-mat",                    // Unique identifier
      "title": "Product Title",
      "titleUrdu": "اردو عنوان",
      "category": "dairy",
      "surfaceType": "Top & bottom texture profile",
      "sizes": [
        {
          "name": "4ft x 6ft",
          "lengthFt": 6.0,                // Decimal length in feet
          "widthFt": 4.0,                 // Decimal width in feet
          "lengthM": 1.83,                // Decimal length in metres
          "widthM": 1.22,                 // Decimal width in metres
          "areaSqFt": 24.0,               // Precomputed area in square feet
          "areaSqM": 2.23                 // Precomputed area in square metres
        }
      ],
      "thicknessOptions": ["18mm", "20mm", "24mm"],
      "priceNote": "Price on request note"
    }
  ],
  "calculatorSettings": {
    "typicalStallSizes": [
      {
        "id": "stall-std",
        "name": "Standard Stall",
        "matsPerStall": 1.0               // Pieces of mat consumed per stall
      }
    ],
    "addons": [
      {
        "id": "alley",
        "name": "Include Walking Alley",
        "multiplier": 0.20                // Adds +20% extra mats
      }
    ]
  }
}
```

### How to Add or Edit Content:
- **Add a new product size:** Append an object to the product's `"sizes"` array with `lengthFt`, `widthFt`, `lengthM`, `widthM`, and precomputed `areaSqFt` and `areaSqM`.
- **Change the WhatsApp Number:** Edit `"client"."whatsappNumber"` (e.g. `"923116103661"`). All generated inquiry links will immediately route to the new phone.
- **Update Translation Strings:** Edit `data/ur.json` for Urdu and `data/en.json` for English using identical key structures.

---

## 6. Design System (`tokens.css`, Type Scale, Macrostructure)

### Hallmark Furrow Theme Tokens
The UI is styled using Hallmark's **Furrow** design system, evoking a working agricultural records voice:
- `--color-paper`: `oklch(96% 0.011 85)` — warm manila paper tone.
- `--color-ink`: `oklch(18% 0.006 60)` — near-black vulcanized carbon ink.
- `--color-accent`: `oklch(70% 0.19 40)` — functional ear-tag tangerine for the single primary action.
- `--color-green`: `oklch(48% 0.11 150)` — agricultural grass green for confirmed status.
- `--color-rule`: `oklch(88% 0.013 85)` — hairline ledger dividers.

### Why Macrostructure 11 (Catalogue)?
Unlike generic landing pages with alternating full-width promotional fluff, Catalogue (`11-catalogue.md`) treats products as inventory items on an unadorned ledger grid. This matches how wholesale buyers buy: by dimensional variant, thickness, and quantity.

---

## 7. Calculator and Inquiry List Formulas

### Mode 1: By Area
1. User provides:
   - Floor Length $L$ and Floor Width $W$ (in feet or metres).
   - Trimming Wastage Allowance $w\%$ (default 5%).
   - Selected mat unit area $A_{mat}$ (e.g. $4 \times 6 = 24\text{ sq ft}$ or $2.23\text{ sq m}$).
2. Raw Area:
   $$A_{raw} = L \times W$$
3. Area with Wastage Allowance:
   $$A_{total} = A_{raw} \times \left(1 + \frac{w}{100}\right)$$
4. Final Pieces Required (always rounded UP to the nearest whole piece):
   $$N_{pieces} = \left\lceil \frac{A_{total}}{A_{mat}} \right\rceil$$

### Mode 2: By Stalls
1. User provides:
   - Cow or Stall Count $C$.
   - Stall specification factor $f_{stall}$ (Standard $= 1.0$, Large $= 1.15$).
   - Optional zone add-ons: Walking Alley ($+20\%$, $m_{alley} = 0.20$), Feeding Area ($+15\%$, $m_{feed} = 0.15$).
2. Base Pieces:
   $$N_{base} = \left\lceil C \times f_{stall} \right\rceil$$
3. Add-on Multiplier:
   $$M = 1.0 + \sum m_{selected}$$
4. Final Pieces Required:
   $$N_{pieces} = \left\lceil N_{base} \times M \right\rceil$$

### WhatsApp Message Generation
When the buyer submits the inquiry form:
1. Validates presence of Name and Phone.
2. Formats an itemized plaintext message in the visitor's active language.
3. Encodes via `encodeURIComponent` and opens:
   `https://wa.me/923116103661?text=<encoded_message>`

---

## 8. i18n and RTL Architecture

- **Default Language:** English (`en`), rendered Left-to-Right (`dir="ltr"`), with full instant toggle to Urdu (`ur`, `dir="rtl"`).
- **CSS Logical Properties:**
  All spacing and structural positioning uses logical properties:
  - `margin-inline-start` / `margin-inline-end` instead of `left`/`right`.
  - `padding-inline`, `border-inline-start`, `inset-inline-start`.
  - `text-align: start` instead of `left` or `right`.
- **Numeric Inputs in RTL:**
  Numerical fields use `font-variant-numeric: tabular-nums` and standard Western Arabic numerals (`0-9`) with `inputmode="numeric"` or `inputmode="decimal"` to ensure immediate numeric keyboard activation on Android and iPhone devices without script confusion.

---

## 9. Imagery Guidelines (Real vs. AI)

- **AI Context Images Only:** Placed in `/images/context/`. Strictly used for ambient shed mood, water droplets, and warehouse pallets. Generated per [IMAGE-PROMPTS.md](file:///E:/Ahmad%20Rubber%20Traders/IMAGE-PROMPTS.md).
- **Real Photos Required for Products:** Placed in `/images/products/`. Dairy buyers inspect exact rubber lug thickness, drainage channel depth, and interlock cuts. AI images must never stand in for physical product inventory.

---

## 10. Responsive Behavior and Devices Tested

The site was tested and validated with zero horizontal overflow across:
1. **360px** (Galaxy S8 / Entry Android phones common in rural Punjab).
2. **390px** (iPhone 12/13/14/15/16).
3. **412px** (Google Pixel / Samsung Galaxy A-series).
4. **768px** (iPad Mini / Portrait Tablets).
5. **1024px** (Landscape Tablets / Compact Laptops).
6. **1440px** (Desktop widescreen monitors).

**Key Mobile Optimizations:**
- Minimum 48px touch targets on all interactive buttons, inputs, and toggles.
- Safe-area bottom padding (`env(safe-area-inset-bottom)`) on notched phones.
- 76px bottom padding on `body` ensuring the sticky mobile bar never covers content.
- 100% usable one-handed with native numeric keypads.

---

## 11. SEO and Performance Checklist

- [x] Distinct meta title and description in both Urdu and English.
- [x] Open Graph social card tags (`og:title`, `og:description`, `og:locale`).
- [x] Canonical `LocalBusiness` JSON-LD schema with authentic 4.9 rating and 77 review count.
- [x] Google Fonts loaded asynchronously via `preconnect`.
- [x] Lightweight static payload (< 40 KB HTML/CSS/JS gzipped).
- [x] Zero external heavy JavaScript libraries.

---

## 12. Accessibility Checklist

- [x] All interactive controls feature `:focus-visible` with a distinct outline ring.
- [x] Contrast ratio exceeds WCAG 2.1 AA (4.5:1 for body copy; 3:1 for large display heads).
- [x] Semantic HTML5 landmark tags (`<header>`, `<main>`, `<section>`, `<footer>`, `<aside>`).
- [x] Form inputs possess explicit `<label for="...">` associations.
- [x] Respects `prefers-reduced-motion: reduce` by zeroing transition durations.

---

## 13. Deployment (Static Hosting & Custom Domain)

1. **Deploy to Cloudflare Pages or Netlify:**
   - Link repository.
   - Build command: *(leave blank or `npm run build`)*.
   - Output directory: `.` (or `dist`).
2. **Custom Domain:**
   - Add CNAME record pointing `ahmadrubber.pk` or `ahmadrubber.com` to host.
   - Enable automatic SSL/TLS certificate (HTTPS mandatory for WhatsApp API link security).

---

## 14. Known Limitations and Next Steps

- **No Online Payment Gateway:** Intentional by design. B2B farm orders in Punjab are invoiced custom depending on freight tonnage and city carrier booking.
- **Future Milestone 1:** Allow the owner to upload an Excel/CSV sheet of daily per-mat wholesale prices directly from their phone.
- **Future Milestone 2:** Automated PDF quotation invoice generation for dairy cooperatives and government livestock tenders.

