import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerStack from '../customerscreen/index';
import PosStack from '../posscreen/index'
const Stack=createNativeStackNavigator();
import Doshboardscreen from "./Doshboardscreen";
import MoveOutStack from "../moveoutscreen";
import  MainPageStack from '../collection&Order/index'
function DoshboardStack() {
  return (

    <Stack.Navigator screenOptions={{headerShown:false,gesturesEnabled:false}}>
      <Stack.Screen  name="Doshboardscreen"      component={Doshboardscreen} initialRouteName={Doshboardscreen}/>
      <Stack.Screen  name="CustomerStack"      component={CustomerStack}/>
      <Stack.Screen  name="PosStack"      component={PosStack}/>
       <Stack.Screen  name="MoveOutStack"      component={MoveOutStack}/>
 <Stack.Screen  name="MainPageStack"      component={MainPageStack}/>

    </Stack.Navigator>

  );
}
export default DoshboardStack;
