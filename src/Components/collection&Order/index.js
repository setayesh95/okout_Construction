import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack=createNativeStackNavigator();
import MainPage from "./MainPage";
import Collection from './Collection';
import WalkInCustomer from './WalkInCustomer';
import CollectionDetail from './CollectionDetail'
function MainPageStack() {
  return (

    <Stack.Navigator screenOptions={{headerShown:false,gesturesEnabled:false}}>
      <Stack.Screen name="MainPage" component={MainPage} initialRouteName={MainPage}/>
      <Stack.Screen  name="Collection"      component={Collection} />
      <Stack.Screen  name="WalkInCustomer"      component={WalkInCustomer} />
      <Stack.Screen  name="CollectionDetail"      component={CollectionDetail} />
    </Stack.Navigator>

  );
}
export default MainPageStack;
