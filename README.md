# Movement Athlete: Android app package

This folder is the standalone version of your Movement Athlete app. It runs without Claude, works offline and saves everything on your phone.

## What's in here

| File | What it does |
|---|---|
| `index.html` | The whole app |
| `manifest.webmanifest` | App name, icon and colours (Android reads this) |
| `sw.js` | Offline support: keeps the app working without internet |
| `icons/` | App icons (192 and 512 px, plus a "maskable" one for round icons) |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## Step 1: Put it online (GitHub Pages, free)

1. Create a free account at **github.com**.
2. Click **+ → New repository**. Name it `movement-athlete`, set it to **Public**, click **Create repository**.
3. Click **uploading an existing file**. Drag in **everything inside this folder** (the files and the `icons` folder, not the folder itself). Click **Commit changes**.
   - `.nojekyll` is hidden on some computers. If you can't see it, skip it; the app still works.
4. Go to **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
5. Wait 1–2 minutes. Your app is live at `https://YOUR-USERNAME.github.io/movement-athlete/`.
6. Open that address on your phone in Chrome to check it loads.

## Step 2: Turn it into an Android app (PWABuilder, free)

1. Go to **pwabuilder.com** and paste your GitHub Pages address. Click **Start**.
2. The report should show the manifest, service worker and icons as passing.
3. Click **Package for stores → Android → Generate package**.
4. Settings: App name `Movement Athlete`, package ID e.g. `com.yourname.movementathlete`. Leave the rest as default.
5. Download the zip. Inside you'll find:
   - `*.apk`: the file you install on your phone
   - `*.aab`: only needed for the Google Play Store
   - `signing.keystore` + `signing-key-info.txt`: **keep these safe** (e.g. in Google Drive). You need them to publish updates under the same app.

## Step 3: Install on your phone

1. Send the `.apk` to your phone (Google Drive, email to yourself, or USB).
2. Tap it. Android asks to allow installs from that source (Files, Drive or Chrome). Allow it.
3. Tap **Install**. The app appears with its own icon.

## Step 4: Move your logs from the Claude version

1. In the Claude version: **Settings → Download backup**.
2. In the new app: **Settings → Import backup**, choose the file, tap **Replace my data**.

From now on the app on your phone is the one to log in. Use **Settings → Export backup** every week or two and save it to Drive. Uninstalling the app or clearing its data deletes your logs.

## Updating the app later

When the program changes, replace `index.html` (and the other files if they changed) in your GitHub repository. Also change the `VERSION` line at the top of `sw.js` (e.g. `ma-v3` → `ma-v4`) so phones fetch the new version. The installed app picks it up the next time it opens online. No reinstall needed.

## Optional: Google Play Store

To install through the Play Store (or share it publicly), create a Google Play developer account ($25 one-time) and upload the `.aab` from step 2. For your own phone, the `.apk` is all you need.
