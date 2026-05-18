import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.premiumrestaurant.app',
  appName: 'Premium Restaurant',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: false,
    backgroundColor: '#0A0A0A',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: '#0A0A0A',
      showSpinner: false,
      androidSplashResourceName: 'splash',
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#0A0A0A',
      overlaysWebView: true,
    },
  },
}

export default config
