import { View, Text, StyleSheet } from 'react-native';
import App from './Components/App';
import React, {Component} from 'react';
const HomeScreen = () => (
    <App/>
  // <View style={styles.home}>
  //   <Text>
  //     Congratulations Apollo 11 🍾🍾. You had a great ride so far 🖖🏽. Will see
  //     you at Mars next time 🚀.
  //   </Text>
  // </View>
);
const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
