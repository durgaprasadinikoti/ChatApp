import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";
import AuthProvider from "./store/AuthProvider";
import IndexPage from "./Index";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

//SplashScreen.preventAutoHideAsync();

function App() {
  useEffect(() => {
    const syncUser = async () => {
      // get the current authenticated user
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      // query the database using auth user id (sub)
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );

      //if not user in db, create one
      if (userData.data.getUser) {
        return;
      }

      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.phone_number,
        status: true,
      };

      const newUserResponse = await API.graphql(
        graphqlOperation(createUser, { input: newUser })
      );
    };
    syncUser();
  }, []);

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  // Your custom font load function
  const loadCustomFont = async () => {
    await Font.loadAsync({
      logoFont: require("./assets/fonts/LuckiestGuy-Regular.ttf"),
      navFont: require("./assets/fonts/FiraSans-Regular.ttf"),
      // Add more custom fonts here if needed
    });

    setIsFontLoaded(true);
  };

  useEffect(() => {
    loadCustomFont();
    SplashScreen.hideAsync();
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <StatusBar style="light" />
      <IndexPage />
    </AuthProvider>
  );
}

export default withAuthenticator(App);
