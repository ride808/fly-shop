# Chase's Fly Shop: setup

Three one-time jobs, about 15 minutes in total:

1. Put the app on the web (GitHub Pages).
2. Create the sync database (Firebase, free).
3. Put the app on Chase's phone and connect both devices.

## 1. Host the app on GitHub Pages

1. Create a new **public** repo, for example `fly-shop`. (Free GitHub accounts need a public repo for Pages. The app holds no personal data: all of Chase's data lives on the devices and in the database below.)
2. Upload everything in this folder to the root of the repo: `index.html`, `sw.js`, `manifest.webmanifest`, and the three `.png` icons. The other files are for you and do not need to go online.
3. In the repo, go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, and save.
4. After a minute the app is live at `https://YOUR-USERNAME.github.io/fly-shop/`.

When you change `index.html` later, also change `VERSION` at the top of `sw.js` (for example to `fly-shop-v2`). That makes phones pick up the new copy.

## 2. Create the sync database (Firebase Realtime Database)

1. Go to the Firebase console (console.firebase.google.com) and create a project. Skip Google Analytics.
2. In the project, open **Build > Realtime Database > Create database**. Pick a location and start in **locked mode**.
3. Open the **Rules** tab, replace everything with the contents of `firebase-rules.json`, and **Publish**.
4. On the **Data** tab, copy the database address at the top. It looks like `https://fly-shop-12345-default-rtdb.firebaseio.com`.

How the rules work: nobody can list or browse the database. Someone can read or write only if they know the exact shop code, which is a long random string, so treat that code like a password. Do not post the setup link anywhere public.

Nothing else in Firebase is needed: no sign-in, no billing plan.

## 3. Connect the devices

**On the iPhone (Chase's):**
1. Open the GitHub Pages address in **Safari**.
2. Tap Share, then **Add to Home Screen**.
3. Open the new **Fly Shop** icon on the home screen and use the app from there.
   On iPhone, the home-screen app has its own separate storage from Safari, so set up sync inside the home-screen app, not in Safari.
4. Go to the **Flies** tab and scroll to **Sync with Dad**.

**To create the connection (do this once, on your Mac or your phone):**
1. Open the app, go to Flies, then **Sync with Dad**.
2. Paste in the database address from step 2, tap **Make a new shop code**, then tap **Connect**.
3. The card now shows a **setup link**. Tap **Copy setup link** and send it to Chase's phone (a text message works).

**On Chase's home-screen app:** Flies > Sync with Dad > paste the setup link into the box > **Connect**.

You both now see the same orders, shelf, and jars. The header shows "Synced 10:02" when it is up to date.

## How sync behaves

- The app checks for changes every 10 seconds while it is open and when you switch back to it. Edits upload about a second after you make them.
- If there is no signal, the app keeps working and shows "Offline". It syncs when the connection returns.
- If you both edit at nearly the same moment, the later save wins for the whole shop. This is fine for two people.
- "Turn off sync" only stops syncing on that device. It does not delete the data in Firebase.
- The Flies tab still has Backup and restore. Use it before experimenting.

## Things I could not test

I tested the sync logic against a stand-in database and the app screens in a test harness. I did not test it against a real Firebase project, or the offline mode and Home Screen install on a real iPhone. Try these first:

1. Connect two browsers and watch an order appear on both.
2. Put the phone in airplane mode, make a change, turn airplane mode off, and confirm the other device updates.
3. Open the home-screen app with airplane mode on and confirm it still loads.
