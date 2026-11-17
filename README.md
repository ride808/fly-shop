# Chase's Fly Shop

A phone-first shop manager for Chase's hand-tied flies. It tracks orders, tying materials, what each order costs, and where the money goes. Chase uses it on his phone and Dad can see and manage the same shop from a Mac or phone.

## What is in the app

**Shop-facing tabs** (safe to hand to a shop owner: no costs, margins, or money totals):

- **Shop:** a "Do this next" card, a button to show the fly menu, the Greenlight pay button (if a link is set), and simple counts.
- **Orders:** new orders with a negotiated price per fly, "I tied them", and "Got paid". Paid orders are tucked under "Show paid orders". A paid order can be taken back with "Fix this payment".
- **Tying Materials:** what is in stock, searchable, with type filters. Count it, add a new material, and "Bought a pack".
- **Flies:** the fly menu with photos and prices, and a **Fly wishlist** of flies Chase wants to learn (with notes and a link). "Make it a recipe" turns an idea into a new fly and removes it from the wishlist when saved. "See recipe" shows the materials per fly and per dozen, numbered tying steps Chase can tap to check off, and a link to a video or page.

**Office** (PIN protected. Stays open for 3 minutes after you last look at it, so you can hop between tabs. Locks right away if the app is closed or put in the background, or when you tap Lock):

- **Money:** Shop pays you (all together), Restock (money for supplies) and Your money, plus "I paid for supplies" and a "What to buy" list for low or short materials. Each paid order shows what it kept.
- **Flies:** the wishlist button, plus add or edit flies and their recipes (swipe a material to remove it, add more from the shelf, photo, tying steps, link), set prices, see what a price keeps in real time, and the minimum margin warning.
- **Settings:** Greenlight pay link, sync, app version and "Refresh the app", backup and restore, undo, change PIN, and start over.

## How the money works

- When a shop pays, the supply cost of that order goes to **Restock** and the rest goes to **Your money**.
- Restock is money for supplies. Chase spends it on materials, or pays Dad in Greenlight so Dad buys them. He then taps "I paid for supplies" so Restock goes down.
- The app never moves real money. Greenlight does that. The app only keeps the tally.
- Each order saves the recipe and cost it was tied with, so changing a recipe later never changes old orders.

## Prices and margin

- Each fly has a standing price (the default). Each order stores the price actually agreed.
- The minimum margin (50% by default) only warns. On the order screens it says only "Your lowest price is $X each", so it does not show a shop how much Chase keeps.

## Setup (one time, about 15 minutes)

### 1. Host the app on GitHub Pages

1. Create a **public** repo, for example `fly-shop`. The repo holds only the app code. Chase's orders, photos and pay link live in his devices and the database below, never in the repo.
2. Put these files in the root: `index.html`, `sw.js`, `manifest.webmanifest`, and the three `.png` icons. `README.md` and `firebase-rules.json` are for you.
3. In the repo go to **Settings > Pages**, choose **Deploy from a branch**, the `main` branch and the `/ (root)` folder, and save.
4. After a minute the app is live at `https://YOUR-USERNAME.github.io/fly-shop/`.

### 2. Create the sync database (Firebase Realtime Database)

1. In the Firebase console create a project. Skip Google Analytics.
2. Open **Build > Realtime Database > Create database**, pick a location and start in **locked mode**.
3. On the **Rules** tab replace everything with `firebase-rules.json` and **Publish**.
4. On the **Data** tab copy the database address at the top, like `https://fly-shop-12345-default-rtdb.firebaseio.com`.

How the rules work: nobody can list or browse the database. Reading or writing needs the exact shop code, a long random string, so treat it like a password. The rules also cap the shop data at 300,000 characters. The app keeps photos inside that limit and tells you when there is no room for another photo.

### 3. Connect the devices

1. On Chase's iPhone open the GitHub Pages address in **Safari**, tap Share, then **Add to Home Screen**. Use the new home-screen icon from then on. On iPhone the home-screen app has separate storage from Safari, so set up sync inside the home-screen app.
2. On your Mac or phone open the app, go to **Office**, set a PIN the first time, then **Settings > Sync with Dad**. Paste the database address, tap **Make a new shop code**, then **Connect**.
3. Copy the **setup link** and send it to Chase's phone. In his home-screen app go to Office > Settings > Sync with Dad, paste the link, and tap **Connect**.

Both of you now see the same shop. The header shows "Synced" when it is up to date.

### 4. Optional: the Greenlight pay link

In **Office > Settings > Greenlight pay link** paste Chase's link. A "Pay Chase with Greenlight" button then appears on the Shop tab, on the menu, and on orders waiting to be paid. It opens a screen with a QR code the person paying can scan with their phone camera, plus the link to open or copy. The QR code is drawn by the app from the link, so there is nothing extra to upload. The link is saved in the shop data, not in the code, so it is not in the public repo.

## Updating the app

1. Change `index.html` (and push). The app checks for a new copy whenever it is opened.
2. On each device go to **Office > Settings** and tap **Refresh the app**. The version label shows which copy that device is running.
3. If you ever change `sw.js`, also change `VERSION` at the top of that file.

You never need to reconnect sync after an update. Reconnect only on a new phone or browser, after clearing site data, or if you create a new shop code.

## How sync behaves

- The app checks for changes every 10 seconds while open and when you switch back to it. Edits upload about a second after you make them.
- With no signal it keeps working, shows "Offline", and syncs when the connection returns.
- If both of you edit at nearly the same moment, the later save wins for the whole shop. That is fine for two people.
- "Turn off sync" only stops syncing on that device. It does not delete the data in Firebase.

## Safety

- **PIN:** Office is behind a 4-digit PIN stored on each device. If it is forgotten, clear the site's data in the browser settings. When sync is on, the shop is safe in the cloud: reconnect with the setup link.
- **Confirmations:** destructive actions ask first. Restoring a backup and erasing everything need a typed word. Most actions can be undone once from Office > Settings.
- **Backups:** use Backup and restore before experimenting.

## Not yet tested on real devices

The logic was tested in a test harness and against a stand-in database. Please try these on the real phone before relying on them:

1. Add a fly photo from the camera or library.
2. Swipe a material out of a recipe.
3. Open the Greenlight link from the pay button.
4. Put the phone in airplane mode, make a change, turn airplane mode off, and confirm the other device updates.
5. Open the home-screen app in airplane mode and confirm it still loads.
