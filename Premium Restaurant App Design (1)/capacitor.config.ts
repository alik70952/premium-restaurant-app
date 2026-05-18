import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.premiumrestaurant.app',
  appName: 'Premium Restaurant',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: false,
    backgroundColor: '#000000',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: '#000000',
      showSpinner: false,
      androidSplashResourceName: 'splash',
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#000000',
      overlaysWebView: true,
    },
  },
}

export default config
