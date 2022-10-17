import React from "react";
import { Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/Screens/Routes/Routes";
import { StatusBar } from "react-native";

const App = () => {

  let [fontLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  return (
    <>
      <StatusBar hidden />
      <SafeAreaProvider>
        {fontLoaded && (
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        )}
      </SafeAreaProvider>
    </>
  );
};

//make this component available to the app
export default App;
