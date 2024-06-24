import { Container, Content } from "native-base";
import { Styles } from "../Styles";
import { Header } from "../component/Header";
import React, { useEffect, useState } from "react";
import { Footer1 } from "../component/Footer";
import { Image, ImageBackground, Modal, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
import { removeDataStorage } from "../Get_Location";
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
      Assigned_TaskList();
    });
    return unsubscribe;
  }, []);
  ///get Technician task list///
  const Assigned_TaskList = async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Assigned_TaskList + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        writeDataStorage(GLOBAL.Assigned_TaskList, json?.tasks);
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
  const back=()=>{
    GLOBAL.Addtask='Add New Task';
    goBack()
  }
  return (
    <Container  style={{backgroundColor:GLOBAL.backgroundColor}}>
      <Header colors={["#a39898", "#786b6b", "#382e2e"]} StatusColor={"#a39897"} onPress={back}
              Title={"Task Management"} />
      {showModalDelete &&
      <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
      }
      <Content contentContainerStyle={{ alignItems: "center", justifyContent: "center"}}>
      <ImageBackground tintColor={"rgba(77,120,165,0.16)"} source={Photoes.Task_backgrung}
                       style={{ width: "100%", flex: 1, alignSelf: "stretch" }} resizeMode="stretch">
        <View style={Styles.container_task2}>
          {
            GLOBAL.Submodules?.length !== 0 ?
              <View style={Styles.FlexWrapHome}>
                {GLOBAL.Submodules?.map((value, key) => {
                  return (
                    <LinearGradient key={key} colors={GLOBAL.task_structurelistbackgroundColor} style={Styles.ModuleBox}>
                      <TouchableOpacity onPress={() => {
                        if (value?.constModule_Name === "My Tasks") {
                          GLOBAL.ScreenName=''
                          GLOBAL.selectItem = 1;
                          GLOBAL.TaskMenuName = "My Tasks";
                          GLOBAL.TaskName = "";
                          navigation.navigate("Task_Management");
                        } else  if (value?.constModule_Name === "WorkShop") {
                          GLOBAL.ScreenName=''
                          GLOBAL.selectItem = 2;
                          GLOBAL.TaskMenuName = "WorkShop";
                          GLOBAL.TaskName = "";
                          navigation.navigate("Task_Management");
                          GLOBAL.TaskRelatedCheck=''
                        }
                        else{
                          GLOBAL.ScreenName=value?.constModule_Name
                          GLOBAL.selectItem = 1;
                          GLOBAL.TaskMenuName = "My "+value?.constModule_Name;
                          GLOBAL.TaskName = "";
                          GLOBAL.Addtask="Add new "+value?.constModule_Name;
                          GLOBAL.TaskRelatedCheck=''
                          GLOBAL.Url_Navigate=''
                          GLOBAL.TaskRelatedNameId=''
                          navigation.navigate("Task_Management");
                        }
                      }

                      } style={{
                        width: "100%", alignItems: "center", justifyContent: "center", alignSelf: "center",
                      }}>
                        {
                          value?.constModule_Name === "My Tasks" ?
                            <Image tintColor={"#fff"} resizeMode={"contain"} source={Photoes.MyTasks}
                                   style={{
                                     width: "100%",
                                     height: normalize(90),
                                     alignItems: "center",
                                     justifyContent: "center",
                                     marginTop: normalize(7),
                                   }}
                            /> :  value?.constModule_Name === "WorkShop" ?
                            <Image tintColor={"#fff"} resizeMode={"contain"} source={Photoes.workshop}
                                   style={{
                                     width: "35%",
                                     height: normalize(90),
                                     alignItems: "center",
                                     justifyContent: "center",
                                     marginTop: normalize(7),
                                   }}
                            />:  value?.constModule_Name === "Support" ?
                              <Image tintColor={"#fff"} resizeMode={"contain"} source={Photoes.Support}
                                     style={{
                                       width: "35%",
                                       height: normalize(95),
                                       alignItems: "center",
                                       justifyContent: "center",
                                       marginTop: normalize(7),
                                     }}
                              />
                              :  value?.constModule_Name === "Property Maintenance" ?
                                <Image tintColor={"#fff"} resizeMode={"contain"} source={Photoes.Maintenance}
                                       style={{
                                         width: "80%",
                                         height: normalize(90),
                                         alignItems: "center",
                                         justifyContent: "center",
                                         marginTop: normalize(7),
                                       }}
                                /> :  value?.constModule_Name === "Subcontract" ?
                                <Image tintColor={"#fff"} resizeMode={"contain"} source={Photoes.Subcontract}
                                       style={{
                                         width: "35%",
                                         height: normalize(90),
                                         alignItems: "center",
                                         justifyContent: "center",
                                         marginTop: normalize(7),
                                       }}
                                /> :  value?.constModule_Name === "Snagging" ?
                                <Image tintColor={"#fff"} resizeMode={"contain"} source={Photoes.Snagging}
                                       style={{
                                         width: "35%",
                                         height: normalize(60),
                                         alignItems: "center",
                                         justifyContent: "center",
                                         marginTop: normalize(7),
                                       }}
                                />:null
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
      </Content>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>
  );
}

export default Taskstructure;
