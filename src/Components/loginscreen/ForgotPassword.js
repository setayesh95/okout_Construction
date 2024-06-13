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
const serialize = require("../GlobalSerialize");
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Body, Button, Container, Content, Header, Left, Right } from "native-base";
import normalize from "react-native-normalize/src/index";
import { ButtonI } from "../component/ButtonI";
import { isNetworkConnected } from "../GlobalConnected";
import { readOnlineApi } from "../ReadPostApi";
function ForgotPassword({ navigation, navigation: { goBack } }) {
  const width = Dimensions.get("screen").width;
  const [Value, setSValue] = useState(false);
  const [ShowButton, setShowButton] = useState(false);
  const [iconcheck, seticoncheck] = useState("user");

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
    formData.append("emailId",value.email);
    formData.append("orgKey",value.orgkey);
    console.log(formData,'formData')
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body:formData
    };
    console.log(GLOBAL.OrgAppLink_value+Api.Reset_Password,'GLOBAL.OrgAppLink_value+Api.Reset_Password')
    isNetworkConnected().then(status => {
      if (status) {
        fetch( GLOBAL.OrgAppLink_value+Api.Reset_Password,requestOptions)
          .then(resp => {
            return resp.json();
          })
          .then(json => {
            console.log(json,'json')
            if (json.status === true)
            {
              setShowButton(true)
              GLOBAL.OrgKeyValue = value.orgkey;
              GLOBAL.Email=value.email;
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
   setShowButton(false)
   navigation.navigate("ForgotPasswordOTP");

  };
  const writeDataStorage=async (key,obj)=>{
    try {
      await AsyncStorage.setItem(key,JSON.stringify(obj));
    }
    catch (e) {
    }
  }
  const checkOrgCode = (value) => {
    console.log(GLOBAL.UserInformation,'GLOBAL.UserInformation')
    var myHeaders = new Headers();
    const formData = new FormData();
    myHeaders.append("Content-Type", "application/json");
    formData.append("orgAppKey",value);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body:formData
    };
    isNetworkConnected().then(status => {
      if (status) {
        fetch(GLOBAL.BASE_URL_first,requestOptions)
          .then(resp => {
            return resp.json();
          })
          .then(json => {
console.log(json,'json')
            if (json.status === true)
            {
              seticoncheck('user-check')
              GLOBAL.BASE_URL_User = json;
              GLOBAL.OrgAppLink_value=json.OrgAppLink;
              writeDataStorage(GLOBAL.OrgAppLink,json?.OrgAppLink)
              writeDataStorage(GLOBAL.mapKey,json?.mapKey)
              readOnlineApi(Api.getCountry).then(json => {
                writeDataStorage(GLOBAL.All_Country,json)
              });
              readOnlineApi(Api.getCity).then(json => {
                writeDataStorage(GLOBAL.All_City,json)
              });
            }
            else {
              setErrorMs("invalid Organization App Key !");
              setShowMessage(true);
              setTimeout(() => setShowMessage(false), 3000);
            }
          })
          .catch(error => console.log("error", error));
      }
    })
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
          {ShowButton===false?
            <TextInputI onChangeText={(value) => {
              onpress(value);
            }} numberValue={10} Value2={Value} checkOrgCode={checkOrgCode}    iconcheck={iconcheck}
                        tittlebtn={'Submit'} ShowButton={ShowButton} />:
            <>

            <Text style={Styles.txtPassword}>Check Your Email For OTP</Text>
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '20%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={'Next'}
                         colorsArray={["#4d78a5", "#375e89", "#27405c"]}
                         styleTxt={[Styles.txtbtn2,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </>
          }


        </View>
      </Content>
    </Container>
  );
}



export default ForgotPassword;
