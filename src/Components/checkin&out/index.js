import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Check_structure from './Check_structure'
import Inspection from './Inspection';
import InspectionUnits from './InspectionUnits'
import Task_managementStack2 from "../taskmanagementscreen/index2";
function Check_structureStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, gesturesEnabled: false,
      }}>
      <Stack.Screen name="Check_structure" component={Check_structure} initialRouteName={Check_structure} />
      <Stack.Screen name="Inspection" component={Inspection}/>
      <Stack.Screen name="InspectionUnits" component={InspectionUnits}/>
      <Stack.Screen name="Task_managementStack2"  component={Task_managementStack2}/>
    </Stack.Navigator>

  );
}

export default Check_structureStack;
