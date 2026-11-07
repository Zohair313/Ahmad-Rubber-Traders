# Ahmad Rubber Traders — Image Production Guide & AI Prompts

> **CRITICAL POLICY NOTICE**
> - **AI Images are for CONTEXT AND MOOD ONLY.** They show environments (dairy sheds, parlor floors, rubber texture, warehouse staging) to help farmers visualize rubber flooring benefits.
> - **Product catalogue images MUST BE REAL PHOTOS** taken directly at Ahmad Rubber Traders (34 Jamia Street, Fleming Road, Lahore). Farmers inspect exact groove patterns, thickness profiles, drainage channels, and interlock edges. Never use AI images to represent products in stock.
> - **Real photos only**: The Fleming Road shop, owner, loading staff, delivery pickups, customer farms, and actual installed jobs.
> - **Zero AI Hallucination**: AI images must never be captioned as "our mats", "our shop", or "our delivery".

---

## 1. Photography Direction & Aesthetic Standards

To ensure zero AI "glossy ad render" slop, every generated image must follow these strict documentary photography parameters:

- **Style**: Authentic documentary agricultural and industrial photography. Looks like an unposed shot taken on a real farm or in a wholesale warehouse on a working weekday.
- **Lighting**: One single real light source with natural falloff (e.g., dawn light slanting through open barn ventilation slats, or ambient overcast daylight through warehouse skylights). No artificial studio rim lighting or HDR glow.
- **Texture & Imperfections**: Mandatory physical grit — subtle dust, moisture droplets from morning hose-down, faint scuff marks, concrete expansion joints, realistic rubber seam tolerances.
- **Composition**: Natural, slightly off-center human framing at eye level or waist height (35mm or 50mm prime lens perspective). No dramatic wide-angle warping or symmetrical 3D staging.
- **Color Grade**: Muted, natural Punjabi agricultural palette — matte carbon black rubber, cool damp concrete grey, galvanized zinc roof rafters, warm Punjab morning silt. No oversaturated greens or vibrant blues.
- **Physics**: Real reflections on wet surfaces matching ground slope and light angle. No impossible floating specular highlights.
- **People & Faces**: No visible human faces or hands to prevent AI facial distortion. If figures appear, they must be distant or seen from behind in working clothing.

---

## 2. Universal Negative Prompt

Include this exact negative prompt in every generation tool (Midjourney `--no`, Stable Diffusion negative box, FLUX negative prompt):

```text
illustration, 3D render, CGI, cartoon, anime, plastic, smooth surface, glossy advertisement, studio backdrop, dramatic volumetric godrays, HDR, oversaturated colors, symmetrical studio shot, floating objects, extra limbs, deformed anatomy, artificial reflections, text, typography, letters, watermarks, brand logos, manufacturer labels, pristine showroom look
```

---

## 3. Production Specifications

- **Format**: Downscaled and compressed to `.webp` with 82% quality for high Lighthouse performance.
- **Dimensions**:
  - Hero / Landscape Context: 1600 × 900 px (16:9)
  - Section Banners / Feature Context: 1200 × 800 px (3:2)
  - Detail / Texture Close-ups: 800 × 800 px (1:1)
  - Mobile variants: Responsive `srcset` with 640px and 960px widths.
- **Workflow**: Generate at least 4 variants per prompt, select the candidate with zero geometric flaws or melted edges, run through WebP compressor, and save into `/images/context/`.

---

## 4. Context Image Prompts (Ready-to-Paste)

### Image 1: Clean Dairy Shed with Rubber Flooring
- **File Name**: `images/context/cow-shed-natural.webp`
- **Aspect Ratio**: 16:9 (1600 × 900 px)
- **Where Used**: Hero section background / Shed measurement workbench backdrop
- **Alt Text (EN)**: Clean ventilated Pakistani dairy cattle shed with non-slip black rubber flooring in stalls and morning sunlight
- **Alt Text (UR)**: پنجاب کے ڈیری فارم کے ہوادار شیڈ میں گائے کے لیے بچھے پائیدار ربڑ میٹ
- **Prompt**:
  > **Prompt**: Documentary photo of an empty, exceptionally clean modern dairy cattle shed in rural Punjab, early morning. The individual animal resting stalls are lined with durable, heavy-duty matte black textured rubber mats. Concrete central alleyway is damp from recent cleaning. Soft, directional morning sunlight enters through open side steel rafters, casting realistic diagonal light beams with subtle dust motes in the air. Real galvanized steel stall dividers with minor weather patina. Shot on Canon EOS R6, RF 35mm f/1.8 lens at f/4.0, shutter 1/160s, ISO 400. Natural color grading, authentic farm dirt floor at the perimeter, true-to-life rubber surface texture with faint water marks and natural seams between mats. Off-center perspective looking down the stall row. No cows, no humans, no text, no logos.

---

### Image 2: Wet-Clean Milking Parlor Floor
- **File Name**: `images/context/parlor-wet-floor.webp`
- **Aspect Ratio**: 16:9 (1600 × 900 px)
- **Where Used**: Parlor flooring product section & "Where Mats Go" parlor zone
- **Alt Text (EN)**: Wet-washed textured rubber flooring in a modern herringbone milking parlor with stainless steel wash lines
- **Alt Text (UR)**: مل کنگ پارلر کے دھلے ہوئے فرش پر پانی اور کیمیکل مزاحم اینٹی سلپ ربڑ میٹ
- **Prompt**:
  > **Prompt**: Documentary photo of the floor of an empty modern herringbone milking parlor right after a high-pressure washdown. Heavy-duty black vulcanized rubber safety mats cover the operator pit floor and cow standing platform, showing realistic water pooling, fine drainage grooves, and natural water droplets reflecting overhead diffuse daylight. Stainless steel milk pipework runs along the background slightly out of focus. Industrial concrete walls with faint lime wash and hose spray marks. Shot on Nikon Z7 II, Nikkor 50mm f/1.8 S lens at f/2.8, natural light falloff from high side windows. Genuine industrial rubber texture with non-slip diamond checker pattern, matte finish, slight scuffs from work boots. High tactile detail on water sheen, realistic wet drainage physics. No people, no cows, no brand names, no artificial shine.

---

### Image 3: Heavy-Duty Rubber Mat Texture Close-Up
- **File Name**: `images/context/rubber-texture-macro.webp`
- **Aspect Ratio**: 1:1 (800 × 800 px)
- **Where Used**: Material & durability specifications card
- **Alt Text (EN)**: Macro detail of industrial vulcanized cow mat surface with hammer-tone non-slip grip and morning water droplets
- **Alt Text (UR)**: وزنی ولکنائزڈ ربڑ میٹ کی کھردری اینٹی سلپ سطح اور پانی کی بوندوں کا قریبی منظر
- **Prompt**:
  > **Prompt**: Detailed documentary macro photograph of a dense vulcanized black rubber cow mat surface. Close-up on the tactile raised hammer-tone anti-slip grain pattern. A few stray fresh water droplets sit on the matte rubber, reflecting overcast daylight. Fine microscopic rubber molding seam lines, subtle vulcanization texture, minor surface dust particle near an edge. One natural side light source creating soft cast shadows that define the depth and thickness of the grip pattern. Shot on Sony A7 IV with 90mm f/2.8 Macro lens, 1/200s, ISO 200, f/5.6 for sharp depth of field across the diagonal plane. Authentic industrial rubber material, deep graphite charcoal color, zero glossy plastic sheen, no logos, no text.

---

### Image 4: High-Density Flooring Sheets in Warehouse Staging
- **File Name**: `images/context/sheets-warehouse-stack.webp`
- **Aspect Ratio**: 3:2 (1200 × 800 px)
- **Where Used**: EVA flooring sheets section & Wholesale packaging
- **Alt Text (EN)**: Stacked high-density rubber and EVA flooring sheets prepared on timber pallets inside a wholesale warehouse
- **Alt Text (UR)**: ہول سیل گودام میں پیلٹ پر رکھے گئے ای وی اے اور ربڑ کے فرش شیٹس کے بنڈل
- **Prompt**:
  > **Prompt**: Medium documentary photograph inside a busy wholesale flooring warehouse in South Asia. Neatly stacked bundles of thick high-density black and dark charcoal EVA flooring sheets resting on sturdy untreated wooden freight pallets. Clean edge profiles showing uniform thickness and dense cellular cut. Diffuse ambient light entering from corrugated sheet metal roof skylights, illuminating dust particles in the air. Stacks of bundled sheets in background slightly softened by natural depth of field. Bare concrete warehouse floor with forklift tire scuff marks and faint dust. Shot on Fujifilm X-T5, XF 33mm f/1.4 lens at f/3.2. Unpretentious B2B wholesale environment, muted natural tones, honest industrial atmosphere. No branding, no human workers, no text on packaging.

---

### Image 5: Shed Measurement Tape Laid Across Concrete Floor
- **File Name**: `images/context/floor-measure-tape.webp`
- **Aspect Ratio**: 3:2 (1200 × 800 px)
- **Where Used**: Bulk Inquiry Calculator section header
- **Alt Text (EN)**: Yellow heavy-duty contractor measuring tape extended along concrete dairy shed floor next to rubber mat
- **Alt Text (UR)**: گائے کے باڑے میں فرش کی درست پیمائش کے لیے بچھا ہوا میٹرک اور فیٹ کا پیمائشی فیتہ
- **Prompt**:
  > **Prompt**: Practical documentary photograph of a worn contractor steel measuring tape extended across a swept concrete dairy shed floor, running directly alongside the edge of a thick black textured rubber mat. The tape shows both feet and metric markings, slightly angled across the frame. Natural daylight streaming from an open barn doorway on the right. Subtle coarse sand particles and concrete broom finish visible on the floor. Shot on Canon EOS R5 with 50mm f/1.8 lens at f/3.5. Warm natural tones of agricultural concrete against the dark charcoal rubber mat edge. Practical, trade-focused, unglamorous working tool photograph. No human hands, no branded tool logos, no digital graphics.

---

### Image 6: Small Commercial Pickup Bed Loaded with Stacked Mats
- **File Name**: `images/context/pickup-loaded-mats.webp`
- **Aspect Ratio**: 16:9 (1600 × 900 px)
- **Where Used**: Delivery & Wholesale Logistics section
- **Alt Text (EN)**: Stacked heavy rubber cow mats tied securely in the bed of a commercial delivery pickup ready for Punjab farm dispatch
- **Alt Text (UR)**: پنجاب کے ڈیری فارمز کی ترسیل کے لیے پک اپ پر لوڈ کیے گئے ربڑ میٹس کے بنڈل
- **Prompt**:
  > **Prompt**: Documentary photo of the open cargo bed of an unbranded local flatbed commercial pickup truck, parked in a wholesale market loading lane in Punjab. The bed is loaded with a neat, heavy stack of black vulcanized rubber cow mats, secured with industrial orange ratchet tie-down straps. Authentic metal truck bed showing chipped paint and road patina. Background shows a blurred wholesale trading lane with muted brick walls and daylight. Shot on Sony A7 III with 35mm f/2.0 lens at f/4.0. Natural overcast midday lighting, deep rubber charcoal tones, real tension wrinkles on the securing straps. No visible license plates, no company logos, no human figures.

---

### Image 7: Cows in Resting Stalls Seen from Distance
- **File Name**: `images/context/cows-resting-stalls.webp`
- **Aspect Ratio**: 16:9 (1600 × 900 px)
- **Where Used**: Livestock comfort & lameness prevention section
- **Alt Text (EN)**: Dairy cows resting comfortably on cushioned rubber mats in a well-ventilated farm shed, seen from distance
- **Alt Text (UR)**: ربڑ کے نرم فرش پر آرام کرتی ہوئی ڈیری گائے، جانوروں کے جوڑوں اور کھروں کی حفاظت
- **Prompt**:
  > **Prompt**: Wide-angle documentary photograph taken from a respectful distance down a dairy shed central passage. Sahiwal and Holstein dairy cows resting naturally inside their designated cubicle stalls on thick black rubber mats. The cows are lying down calmly with their legs tucked or chewing cud peacefully, seen from behind or three-quarters rear view. Natural open-sided barn ventilation with daylight illuminating the herd. Authentic dairy farm atmosphere: clean bedding lime powder near edges, galvanized iron pipe stall dividers, feed alleyway. Shot on Nikon Z6 II with 70-200mm f/2.8 at 85mm, f/4.0. True biological anatomy, no distorted animal limbs, zero glossy retouching. Pure unposed agricultural documentation.

---

## 5. Real Product Photos Required From Client (Placeholder Specifications)

The following catalogue items **must NEVER use AI images**. In the website code, these use dedicated high-contrast SVG / styled placeholder containers with `[client to provide real photo]` badges until Ahmad Rubber Traders supplies their camera files:

| Catalogue Product | Required Real Photo Description | Target File Path |
|---|---|---|
| **Heavy-Duty Cow Mat** | Flat-lay top surface showing groove/hammer pattern, plus corner lift showing underside drainage channels and thickness profile. | `images/products/cow-mat.webp` |
| **High-Density EVA Sheet** | Close-up of cut cross-section showing foam density and surface texture; full sheet laid flat. | `images/products/eva-sheet.webp` |
| **Milking Parlor Mat** | Non-slip diamond/drainage interlock mat as installed on wet concrete. | `images/products/parlor-mat.webp` |
| **Shop Front & Warehouse** | Real exterior and counter photo at 34 Jamia Street, Fleming Road / Wachowali Bazaar, Lahore. | `images/products/shop-fleming-road.webp` |
| **Installed Farm References** | Photos taken by Punjab dairy farmers showing Ahmad Rubber Traders mats in use. | `images/products/installed-farm-1.webp` |

---

## 6. Verification Checklist Before Image Release

1. **AI Check**: Did any AI image display deformed animals, extra hooves, melted mat edges, or fake English/Urdu text? *(Reject immediately if found).*
2. **Branding Check**: Are there any visible logos, fake brand stamps, or registration numbers? *(Must be pure unbranded trade photography).*
3. **Lighting Consistency**: Do all context images share the same muted, overcast/morning daylight palette with realistic falloff?
4. **Performance Check**: Are all files converted to `.webp`, under 150 KB for hero and under 80 KB for cards?
5. **Alt Text Check**: Do all images have bilingual alt text properly describing content without marketing buzzwords?
