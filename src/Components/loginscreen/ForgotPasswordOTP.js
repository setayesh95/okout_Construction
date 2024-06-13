import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet, Image, ToastAndroid, StatusBar, Dimensions, Platform, Linking, AppState, TouchableOpacity,

} from "react-native";
import { Colors } from "../Colors";
import { TextInputI } from "../component/TextInputI";
import { Styles } from "../Styles";
const GLOBAL = require("../Global");
const Api = require("../Api");
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Body, Button, Container, Content, Header, Left, Right } from "native-base";
import normalize from "react-native-normalize/src/index";
import { ButtonI } from "../component/ButtonI";
import { isNetworkConnected } from "../GlobalConnected";
function ForgotPasswordOTP({ navigation, navigation: { goBack } }) {
  const width = Dimensions.get("screen").width;
  const [Value, setSValue] = useState(false);
  const [ShowButton, setShowButton] = useState(false);
  const [ErrorMs, setErrorMs] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(GLOBAL.EMAIL_KEY, JSON.stringify(value.email));
    } catch (e) {
    }
  };
  const onpress = (value) => {

    var myHeaders = new Headers();
    const formData = new FormData();
    myHeaders.append("Content-Type", "application/json");
    formData.append("otp",value.OTPNumber);
    formData.append("password",value.password);
    formData.append("repassword",value.confirmpassword);
    formData.append("orgKey",GLOBAL.OrgKeyValue );
    formData.append("emailId", GLOBAL.Email);
    formData.append("userId",GLOBAL.UserInformation?.userId);
    console.log(formData,'formData')
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body:formData
    };
    console.log(GLOBAL.OrgAppLink_value+Api.Update_Password,'GLOBAL.OrgAppLink_value+Api.Reset_Password')
    isNetworkConnected().then(status => {
      if (status) {
        fetch( GLOBAL.OrgAppLink_value+Api.Update_Password,requestOptions)
          .then(resp => {
            return resp.json();
          })
          .then(json => {
            console.log(json,'json')
            if (json.status === true)
            {
              setShowButton(true)
              navigation.navigate("LogIn");
            }
            else {
              setErrorMs(json.msg)
              setShowMessage(true);
              setTimeout(() => setShowMessage(false), 3000);
            }
          })
          .catch(error => console.log("error", error));
      }
    })
  };
  const handleSubmit = (value) => {
    navigation.navigate("ForgotPassword");

  };


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
        {ShowMessage === true &&
        <View style={Styles.flashMessage}>
          <View style={{ width: "10%" }} />
          <View style={{ width: "80%" }}>
            <Text style={{
              color: "white",
              fontFamily: GLOBAL.FONT_FAMILY_BOLD,
              textAlign:'center'
            }}>
              {ErrorMs}
            </Text>
          </View>
          <TouchableOpacity onPress={()=> setShowMessage(false)} style={{ width: "10%" }}>
            <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
          </TouchableOpacity>
          <View style={{ width: "10%" }} />
        </View>
        }
        <View style={Styles.container}>

            <TextInputI onChangeText={(value) => {
              onpress(value);
            }} numberValue={9} Value2={Value}
                        tittlebtn={'Submit'} ShowButton={ShowButton} />



        </View>
      </Content>
    </Container>
  );
}



export default ForgotPasswordOTP;
