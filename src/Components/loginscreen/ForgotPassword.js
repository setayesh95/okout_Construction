import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet, Image, ToastAndroid, StatusBar, Dimensions, Platform, Linking, AppState,

} from "react-native";
import { Colors } from "../Colors";
import { TextInputI } from "../component/TextInputI";
import { Styles } from "../Styles";
const GLOBAL = require("../Global");
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Body, Button, Container, Content, Header, Left, Right } from "native-base";
import normalize from "react-native-normalize/src/index";
function ForgotPassword({ navigation, navigation: { goBack } }) {
  const width = Dimensions.get("screen").width;
  const [Value, setSValue] = useState(false);
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(GLOBAL.EMAIL_KEY, JSON.stringify(value.email));
    } catch (e) {
    }
  };
  const onpress = (value) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      identifier: value.email,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    };
    console.log(requestOptions, "resp");
    isNetworkConnected().then(status => {
      if (status) {
        console.log(status, "status");
        fetch(GLOBAL.BASE_URL + Url.FORGOTACCOUNT, requestOptions)
          .then(resp => {
            console.log(resp, "resp");
            return resp.json();
          })
          .then(json => {
            console.log(json, "json");
            if (json.status === "ok") {
              GLOBAL.Account = value.email;
              //setStatus
              setSValue(true);
              GLOBAL.Value = true;
              storeData();
              // navigation.navigate('ResetPassword')

              //resetPassword
            } else {
              ToastI(json.detail);
              GLOBAL.Value = false;
            }

          })
          .catch(function(error) {

            let errorString = error.toString();
            console.log(errorString, "errorString");
          });
      }
    });

  };

  useEffect(() => {
    // Linking.getInitialURL().then((url) => {
    //   console.log("initial url:" + url);
    //   handleOpenURL;
    // }).catch(error => console.log("errorwwww", error));
    // Linking.addEventListener("url", handleOpenURL);
  }, []);
  // const handleOpenURL = (event) => {
  //   console.log(event.url, "loginnnnn");
  //   navigate2(event.url);
  // };

  // const navigate2 = (url) => {
  //   let domain = url.split(/[/?#]/);
  //   console.log(domain[3], domain[3] === "ResetPassword", "urlurlurl");
  //   let A = domain[5].split(/=/);
  //   console.log(A, domain[3] === "ResetPassword", "urlurlurl");
  //   GLOBAL.TokenResetPass = A[1];
  //   if (domain[3] === "reset-password")
  //     /* if (routeName === 'ResetPassword')*/ {
  //     navigate("ResetPassword");
  //   }
  //   ;
  // };
  return (
    <Container style={[Styles.Backcolor]}>
      <Header style={Styles.HeaderBackColor}>
        <Left style={{ flex: 0.5, flexDirection: "row" }}>
          <Button onPress={goBack} transparent style={Styles.Backbtn}>
            <AntDesign name={"arrowleft"} size={21} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
          </Button>
        </Left>
        <Body style={{
          flex: 2, alignItems: "center",
        }}>
          <Text style={{
            color:GLOBAL.OFFICIAL_BLUE_COLOR,
            fontSize: normalize(23),
            fontFamily:'TisaSansProBoldItalic',
          }}>
            Password recovery
          </Text>
        </Body>
        <Right style={{ flex: 0.5,}}>
        </Right>
      </Header>
      <StatusBar barStyle="light-content" backgroundColor={GLOBAL.OFFICIAL_background}/>
      <Content>
        <View style={Styles.container}>

          <TextInputI onChangeText={(value) => {
            onpress(value);
          }} numberValue={9} Value2={Value}
                      tittlebtn={'Reset Password'} />
          {/*<View style={[style.bottomView]}>*/}
          {/*  <View style={{ width: "90%" }}>*/}
          {/*    <Image resizeMode={"stretch"} source={require("../../picture/bottom.png")}*/}
          {/*           style={[Styles.images]} />*/}
          {/*  </View>*/}
          {/*  <View style={{ width: "10%" }} />*/}
          {/*</View>*/}
        </View>
      </Content>
    </Container>
  );
}



export default ForgotPassword;
