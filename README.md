# MyApp - React Native Expo Project

A complete React Native application built with Expo, featuring modern navigation patterns and theme support.

## Features

- 🚀 Built with Expo (Latest version)
- 🧭 Multiple navigation patterns (Stack, Bottom Tabs, Material Top Tabs, Drawer)
- 🎨 Light & Dark theme support
- 🔐 Authentication flow (Login/Register)
- 📱 Modern UI with clean design
- 💡 Context API for state management

## Project Structure

```
├── App.js                          # Main app entry point
├── src/
│   ├── components/                 # Reusable components
│   │   ├── CustomButton.tsx
│   │   ├── CustomInput.tsx
│   │   └── CustomDrawerContent.tsx
│   ├── context/                    # React Context providers
│   │   └── ThemeContext.tsx
│   ├── navigation/                 # Navigation configuration
│   │   ├── AuthStack.tsx
│   │   ├── BottomTabs.tsx
│   │   ├── DrawerNavigator.tsx
│   │   └── HomeTopTabs.tsx
│   ├── screens/                    # App screens
│   │   ├── SplashScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── FeedScreen.tsx
│   │   ├── TrendingScreen.tsx
│   │   ├── LatestScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   ├── NotificationsScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── theme/                      # Theme configuration
│       └── colors.ts
```

## Navigation Structure

```
Splash Screen (2 seconds)
    ↓
Auth Stack
    ├── Login Screen
    └── Register Screen
        ↓
Drawer Navigator
    └── Bottom Tab Navigator
            ├── Home (Material Top Tabs)
            │   ├── Feed Tab
            │   ├── Trending Tab
            │   └── Latest Tab
            ├── Explore
            ├── Notifications
            └── Profile
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Run on Android:
```bash
npx expo run:android
```

4. Run on iOS:
```bash
npx expo run:ios
```

5. Run on Web:
```bash
npm run build:web
```

## Theme Support

The app includes built-in light and dark theme support. Toggle between themes using the switch in the drawer menu.

### Light Mode Colors
- Background: #FFFFFF
- Card: #F5F5F5
- Text: #222222
- Primary: #3B82F6

### Dark Mode Colors
- Background: #121212
- Card: #1E1E1E
- Text: #EEEEEE
- Primary: #2563EB

## Dependencies

- @react-navigation/native
- @react-navigation/native-stack
- @react-navigation/bottom-tabs
- @react-navigation/drawer
- @react-navigation/material-top-tabs
- react-native-gesture-handler
- react-native-reanimated
- react-native-screens
- react-native-safe-area-context
- lucide-react-native (for icons)

## Scripts

- `npm run dev` - Start development server
- `npm run build:web` - Build for web
- `npm run lint` - Run linter
- `npm run typecheck` - Run TypeScript type checking
