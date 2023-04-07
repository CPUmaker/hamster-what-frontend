import "react-native-gesture-handler";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native";

import useFonts from "./hooks/useFonts";
import { AuthProvider } from "./src/context/AuthContext";
import { PeofileProvider } from "./src/context/ProfileContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import AppNav from "./src/navigation/AppNav";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const mainViewRef = useRef(null);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await useFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthProvider>
      <PeofileProvider>
        <ThemeProvider>
          <SafeAreaView
            ref={mainViewRef}
            style={{
              flex: 1,
            }}
            onLayout={onLayoutRootView}
          >
            <AppNav mainViewRef={mainViewRef} />
          </SafeAreaView>
        </ThemeProvider>
      </PeofileProvider>
    </AuthProvider>
  );
}
