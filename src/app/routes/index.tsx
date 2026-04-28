import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreen from "@/app/modules/search/screens";
import RepositoryScreen from "@/app/modules/repository/screens";
import IssuesScreen from "@/app/modules/issues/screens";
import ShowcaseScreen from "@/app/modules/showcase/screens";

export type RootStackParamList = {
  Search: undefined;
  Repository: { owner: string; repo: string };
  Issues: { owner: string; repo: string };
  Showcase: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Repository" component={RepositoryScreen} />
      <Stack.Screen name="Issues" component={IssuesScreen} />
      <Stack.Screen name="Showcase" component={ShowcaseScreen} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
