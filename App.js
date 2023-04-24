import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { View, useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
  Text,
  configureFonts,
  useTheme,
} from "react-native-paper";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
SplashScreen.preventAutoHideAsync();

function HomeScreen() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins-Regular",
        }}
      >
        Auth
      </Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const statusBarHeight = Constants.statusBarHeight;
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const paperTheme =
    colorScheme === "dark"
      ? {
          ...MD3DarkTheme,
          colors: {
            ...MD3DarkTheme.colors,
            primary: "#2c6bed",
            background: "#121212",
          },
        }
      : {
          ...MD3LightTheme,
          colors: {
            ...MD3LightTheme.colors,
            primary: "#2c6bed",
            background: "#f1f1f1",
          },
        };

  const styles = StyleSheet.create({
    container: {
      paddingTop: statusBarHeight,
      height: "100%",
      backgroundColor: paperTheme.colors.background,
    },
  });

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="auth" component={HomeScreen} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}
