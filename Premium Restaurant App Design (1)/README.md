# Premium Restaurant App Design

This is a code bundle for Premium Restaurant App Design. The original project is available at https://www.figma.com/design/PWOmuBJTCQWxCEujcYK8Za/Premium-Restaurant-App-Design.

## Web development

```bash
npm install
npm run dev
```

## Android (Capacitor) setup

The app is configured for Capacitor + Android Studio with:

- **App name**: `Premium Restaurant`
- **App id / package id**: `com.premiumrestaurant.app`
- **Web build directory**: `dist`
- **Vite base path**: `./` (required for local file loading in native WebView)

### Build and sync scripts

```bash
npm run build            # production web build
npm run build:mobile     # alias for production build
npm run cap:sync         # sync web assets + native config to android
npm run cap:open:android # open Android Studio project
npm run cap:run:android  # run on connected device/emulator
npm run android:dev      # build + sync + run in one command
```

### First-time Android project generation

```bash
npx cap add android
```

> Run this once after installing dependencies. It creates the `android/` folder used by Android Studio.

### Generate APK (Android Studio)

1. Build and sync web assets:

```bash
npm run build
npm run cap:sync
```

2. Open Android Studio:

```bash
npm run cap:open:android
```

3. In Android Studio, use:

- **Build > Build Bundle(s) / APK(s) > Build APK(s)** (debug)
- **Build > Generate Signed Bundle / APK** (release)

### Icons and splash placeholders

Use `resources/README.md` for required placeholder asset filenames and sizes.
