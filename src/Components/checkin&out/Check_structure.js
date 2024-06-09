import { Container } from "native-base";
import { Styles } from "../Styles";
import { Header } from "../component/Header";
import React, { useEffect, useState } from "react";
import { Footer1 } from "../component/Footer";
import { Image, ImageBackground, Modal, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
import { removeDataStorage, writeDataStorage } from "../Get_Location";
import { LogOutModal } from "../component/LogOutModal";
import { readOnlineApi } from "../ReadPostApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GLOBAL = require("../Global");
const Photoes = require("../Photoes");
const Api = require("../Api");

function Taskstructure({ navigation, navigation: { goBack } }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };

  ///LogOut Function///
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    navigation.navigate("LogIn");
  };
  /// Bottom menu click On LogOut button///
  const logout_Url = () => {
    setshowModalDelete(true);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      RentalUnits();
    });
    return unsubscribe;
  }, []);

  ///get Technician task list///
  const RentalUnits = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.RentalUnits + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        console.log(json,'json')
       writeDataStorage(GLOBAL.RentalUnits_List, json?.allSiteInfo);
      });
    }
  };
  ///Write Data in AsyncStorage///
  const writeDataStorage = async (key, obj) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(obj));
    }
    catch (e) {}
  };
  const Navigate_Between_Modules = (constModule_Id) => {
    if (constModule_Id === "1") {

      //GLOBAL.route = "structure";
      //Navigate_Url("Project_structureStack")

    } else if (constModule_Id === "2") {

      //Navigate_Url("Task_managementStack")
    } else if (constModule_Id === "3") {
      GLOBAL.route = "Inspection";
      Navigate_Url("Inspection")
    }
  };
  return (
    <Container  style={{backgroundColor:GLOBAL.backgroundColor}}>
      <Header colors={["#59a890", "#417f73", "#0B2B26"]} StatusColor={"#58a78f"} onPress={goBack}
              Title={"Check in & Check out"} />
      {showModalDelete &&
      <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
      }
      <ImageBackground tintColor={"rgba(1,224,199,0.06)"} source={Photoes.Task_backgrung}
                       style={{ width: "100%", flex: 1, alignSelf: "stretch" }} resizeMode="stretch">
        <View style={Styles.container_task2}>
          {
            GLOBAL.Submodules?.length !== 0 ?
              <View style={Styles.FlexWrapHome}>
                {GLOBAL.CheckSubmodules?.map((value, key) => {
                  return (
                    <LinearGradient key={key} colors={value.IconColor} style={Styles.ModuleBox}>
                      <TouchableOpacity onPress={() => { Navigate_Between_Modules(value.constModule_Id)}}
                                        style={{ width: "100%", alignItems: "center", justifyContent: "center", alignSelf: "center",
                      }}>
                        {
                          value?.constModule_Name === "Check in" ?
                            <Image tintColor={"#fff"} resizeMode={"contain"} source={Photoes.CheckIn}
                                   style={{
                                     width: "35%",
                                     height: normalize(90),
                                     alignItems: "center",
                                     justifyContent: "center",
                                     marginTop: normalize(7),
                                   }}
                            /> :
                            value?.constModule_Name === "Check out" ?
                            <Image tintColor={"#fff"} resizeMode={"contain"} source={Photoes.ChecOut}
                                   style={{
                                     width: "35%",
                                     height: normalize(90),
                                     alignItems: "center",
                                     justifyContent: "center",
                                     marginTop: normalize(7),
                                   }}
                            />: <Image tintColor={"#fff"} resizeMode={"contain"} source={Photoes.Inspection}
                                       style={{
                                         width: "35%",
                                         height: normalize(90),
                                         alignItems: "center",
                                         justifyContent: "center",
                                         marginTop: normalize(7),
                                       }}
                              />
                        }
                        <Text style={Styles.txtMenuHome2}>{value.constModule_Name}</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  );
                })}
              </View> :
              <View style={Styles.With90CenterVertical3}>
                <Text style={Styles.EmptyText}>
                  " No data found ! "
                </Text>
              </View>
          }
        </View>
      </ImageBackground>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>
  );
}

export default Taskstructure;
