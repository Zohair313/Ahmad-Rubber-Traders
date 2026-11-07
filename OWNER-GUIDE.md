# Owner's Guide: Ahmad Rubber Traders Website

A simple, jargon-free guide for the shop owner of Ahmad Rubber Traders (Fleming Road / Wachowali Bazaar, Lahore).

---

## 1. What This Website Does for Your Business

Until now, your customers found you mainly through Google Maps, word of mouth, or direct WhatsApp calls.

This website acts as your **online wholesale counter**:
- It shows dairy farm owners across Punjab the rubber cow mats, EVA flooring sheets, and milking parlor mats you have in stock.
- It includes a **smart calculator** where a farmer can enter their cattle shed length and width, or the number of cows they have, and instantly see how many mats they need.
- With one tap, the farmer can send you an **itemized inquiry on WhatsApp** with their name, phone number, city, and exact mat count.
- You receive a clean, organized WhatsApp message so you can reply with your current wholesale rate and delivery options immediately.
- There are no customer logins, no complicated passwords, and no online credit card payments to worry about. Everything leads directly to a conversation with you on WhatsApp or a phone call.

---

## 2. What Each Part of the Page Is For (In Order)

1. **Top Bar & Menu:** Shows your shop name, phone number, and a language button to switch between English and Urdu. The default language is English, and visitors can tap the "اردو" button to switch to Urdu instantly.
2. **Main Headline (Hero):** Clearly states that you sell heavy dairy cow mats and flooring sheets from Lahore, welcoming wholesale bulk farm orders. Shows your real 4.9-star rating from 77 Google reviews.
3. **Product Catalog:** Displays your three main product lines:
   - Dairy Cow Mats (for cattle resting stalls)
   - High-Density EVA Flooring Sheets (for calf pens and multipurpose farm use)
   - Milking Parlor Mats (for wet washdown platforms)
   Each card lists available standard sizes, thicknesses, and an "Add to inquiry" button.
4. **Bulk Inquiry Calculator (Centerpiece):** The main tool. Lets farmers calculate pieces by shed dimensions (length × width) or by stall count.
5. **Inquiry Requisition List:** Where the buyer reviews their chosen items, types their name, phone number, and city, and taps the green WhatsApp button.
6. **Where Mats Go Guide:** A practical guide explaining which mat is best suited for resting stalls, walking alleys, milking parlors, and calf sheds.
7. **How a Bulk Order Works:** Plain 3-step explanation: 1) Send inquiry, 2) Get quote, 3) Confirm & deliver.
8. **Delivery & Terms:** Explains dispatch across Punjab via cargo goods transport (bilty), shop counter pickup, and payment terms.
9. **Customer Reviews:** Honestly displays your 4.9 rating and 77 reviews from Google Maps.
10. **Frequently Asked Questions (FAQ):** Answers common customer questions about mat thickness, washing, non-slip grip, and delivery.
11. **Visit Our Lahore Shop:** Displays an interactive Google Map pointing to Fleming Road, your full address, operating hours, and a direct button to open driving directions on their phone.
12. **Mobile Bottom Bar:** On smartphones, a handy bar stays pinned to the bottom of the screen with quick buttons for Call, WhatsApp, and the Inquiry list.

---

## 3. How the Calculator Works in Plain Words

### What the Farmer Does:
- **Option A (By Shed Area):** The farmer enters their shed length and width (for example: 24 feet long by 12 feet wide). They pick their mat size (e.g. 4ft × 6ft). The calculator automatically adds 5% for edge cuts and tells them: *"You need 13 pieces"*.
- **Option B (By Number of Cows):** The farmer types in their cow count (for example: 20 cows). If they check the box to include walking alleys, it adds 20% extra mats. The calculator tells them: *"You need 24 pieces"*.
- The farmer taps **"Add to Inquiry List"**, types their city and phone, and taps **"Request Quote via WhatsApp"**.

### What You See on Your WhatsApp:
Your phone will ring with a WhatsApp message that looks like this:

```text
*احمد ربڑ ٹریڈرز - کوٹیشن اور ریٹ کی درخواست*
----------------------------------------
*خریدار کا نام:* چوہدری طارق
*موبائل / فون:* 0300 1234567
*شہر / ضلع:* اوکاڑہ
*فراہمی کا طریقہ:* بلٹی کارگو ڈلیوری

*مطلوبہ میٹس کی تفصیل:*
1. ڈیری کاؤ میٹ (4 فٹ × 6 فٹ) — تعداد: 24 پیس

*اضافی نوٹ:* براہ کرم 24 ملی میٹر موٹائی کا ریٹ بتائیں۔
----------------------------------------
برائے مہربانی موجودہ ہول سیل ریٹ اور ڈلیوری کا وقت مطلع فرمائیں۔
```

### How to Reply:
Simply reply with your price per mat (for example: *"Tariq sahib, rate is Rs. [amount] per piece, loading tomorrow via goods transport to Okara"*).

---

## 4. What You Can Change Yourself (Step by Step)

All your shop information lives in **one single, easy-to-edit file** called `site-data.json` inside the `data` folder. You or someone who helps with your computer can open it in Notepad:

1. **To change your phone or WhatsApp number:**
   - Look for `"phone"` and `"whatsappNumber"`.
   - Update the numbers, save the file, and all links across the website will immediately call your new phone.
2. **To change your opening hours:**
   - Update the text next to `"hours"` and `"hoursUrdu"`.
3. **To add or update product prices:**
   - Look for `"priceNote"` or `"priceNoteUrdu"` under each product. You can write your exact rate, such as `"Rs. 4,500 per piece"` or keep it as `"Price on request"`.
4. **To change delivery cities or cargo details:**
   - Update the text under `"deliveryAndTerms"`.

> *If you ever feel unsure, you can simply message your web developer with your changes, and they can update this file in two minutes.*

---

## 5. About the Pictures (Computer-Made vs. Your Real Photos)

- **Shed & Farm Background Pictures:** We have placed clean, realistic farm photos showing clean shed floors and rubber textures so the website looks complete.
- **Product Photos MUST Be Your Real Ones:**
  - Farmers want to see the exact mats you sell in your Lahore shop.
  - Please take clear photos on your smartphone in good daylight of:
    1. Your actual Cow Mat (showing the top grip pattern and bottom drainage grooves).
    2. Your EVA Flooring Sheets.
    3. Your Milking Parlor Mat.
    4. Your shopfront on Fleming Road / Wachowali Bazaar.
- **How to Send Photos:**
  Send original, uncompressed photos on WhatsApp to your developer, and they will place them directly into the website's image folders.

---

## 6. Works on Phones and Computers

Over 80% of your buyers will visit this website from their mobile phones while standing in a cattle shed or farm office.
- The website is specially designed so numbers, buttons, and text are large and easy to tap with one thumb.
- The sticky bar at the bottom gives farmers instant one-tap access to call you or open WhatsApp.

---

## 7. What We Need from You to Make It 100% Complete

Please check these items and confirm:
1. **Real product photos:** 1 to 2 photos of each mat and sheet you sell.
2. **Sizes and thicknesses in stock:** Confirm standard sizes (4x6, 4x7, 4x8) and thicknesses (18mm, 20mm, 24mm).
3. **Prices:** Decide whether you want to display starting prices (e.g., "From Rs. 4,500") or keep "Price on request".
4. **Delivery terms:** Minimum quantity for cargo dispatch (e.g., 5 or 10 mats).
5. **Exact operating hours:** e.g., 9:30 AM to 7:30 PM, Monday to Saturday.

---

## 8. Questions Owners Usually Ask

- **How much does it cost to run?**
  Almost nothing. Because this website is built cleanly as a lightweight static site, it can be hosted on fast, free or low-cost modern hosting (like Cloudflare Pages or Netlify). You only pay for your annual domain name (e.g. `ahmadrubber.pk`).
- **Who updates it?**
  You or your developer can update prices, phone numbers, or text in `data/site-data.json` at any time.
- **How do we show up on Google?**
  The website already has your official Google Business information, Fleming Road address, phone number, and 4.9 rating built into its code so Google can index your shop correctly for searches like *"cow mats Lahore"* or *"rubber flooring Punjab"*.

