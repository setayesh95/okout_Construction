import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity, Dimensions, Modal, Platform, Linking,
} from "react-native";
import { Colors } from "../Colors";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { Dropdown } from "react-native-element-dropdown";
import LinearGradient from "react-native-linear-gradient";
import { Container, Content } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TextInputI } from "./TextInputI";
const GLOBAL = require("../Global");
function POS_List_Item({
                              value,
                              SeeDetail,
                               data,
                               Navigate_Url,Type
                            }) {
  const [isFocus, setIsFocus] = useState(false);
  const [visible,setvisible] = useState(false);
  const [GeoAddressCountry, setGeoAddressCountry] = useState('');
  const [Cheked,setCheked] = useState(false);
  const [CountryList,setCountryList] = useState([]);
  const ClickManagement = (id, Id) => {
    if(id=== "14") {
      setvisible(true)
    }
    else if(id=== "2") {
      GLOBAL.UpdateUnitID = value.Id;
      Navigate_Url('Project_Unit_Detail')
    }
    else if(id=== "3") {
      GLOBAL.UpdateSiteID = value.Id;
      Navigate_Url('Project_Site_Detail');
    }
  };
  const renderItem = (item, index) => {
    return (
      <View key={index} style={Styles.renderItemDetailStyle}>
        <View style={{ paddingLeft: 7 }}>
          <FontAwesome6 size={normalize(12)} color={Colors.button} name={item.Icon} />
        </View>
        <Text style={Styles.txt_leftDropdown}>{item.label}</Text>
      </View>
    );
  };
  const openMaps=(latitude,longitude)=> {
    if (Platform.OS === "android") {
      Linking.openURL(`geo:0,0?q=${latitude},${longitude}`)
        .catch(err => console.error("An error occurred", err));
    }
  }
  const CreateCustomer=()=>{
  }
  const ChangeChecked =(value) => {
    setCheked(!Cheked);
  };
  return (
          <View  style={Styles.ItemDetailBox}>
            <View style={Styles.With90}>
              <View style={{ width: "100%" }}>
                <TouchableOpacity  onPress={() => {
                  SeeDetail(value);
                  if(Type==='Pos')
                  setvisible(true)
                }} style={{ width: "100%" ,flexDirection:'row'}}>
                  <FontAwesome size={normalize(22)} color={Colors.black} name={'user'} style={{ }}/>
                  <Text style={[Styles.txt_left4]}>{value.Name}</Text>
                </TouchableOpacity>
                  <Text  style={[Styles.txt_left_Pos_Gray]}>{value.Address}</Text>

              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={visible}
            >
              <Content contentContainerStyle={[Styles.centeredView, {
                flexGrow: 1,
                backgroundColor: "rgba(0,0,0, 0.5)",
                justifyContent: "center",
              }]}>
                <View style={[Styles.ModalLocationStyle]}>
                  <View style={[{ width: "89%", marginBottom: "4%" }]}>
                    <TouchableOpacity onPress={() => {
                      setvisible(false);
                    }} style={Styles.CancelBtnLeftAlign}>
                      <AntDesign name={"closecircleo"} size={20} color={Colors.button} />
                    </TouchableOpacity>
                  </View>
                  <View style={Styles.formContainertask}>
                    <TextInputI onChangeText={(value)=>CreateCustomer(value)}  numberValue={42} CountryList={CountryList}
                                ChangeChecked={(value)=>ChangeChecked(value)}
                                GeoAddressCountry={GeoAddressCountry} setGeoAddressCountry={setGeoAddressCountry}

                    />
                      <View style={Styles.BtnListStylePos}>
                        {/*<Text onPress={() => SeeDetail(value.Id)} style={[Styles.txt_left_small2]}>{value.Address}</Text>*/}
                        <LinearGradient colors={["#4d78a5", "#375e89", "#27405c"]} style={Styles.btnList}>
                          <TouchableOpacity onPress={() =>  Navigate_Url('InvoiceScreen')}>
                            <Text
                              style={[Styles.txt_left2, { fontSize: normalize(15),paddingVertical:7 }]}>Invoice</Text>
                          </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient colors={['#a39898', '#786b6b', '#382e2e']} style={Styles.btnPos}>
                          <TouchableOpacity onPress={() => {
                            Navigate_Url('InvoiceScreen')}}>
                            <Text style={[Styles.txt_left2, { fontSize: normalize(15),paddingVertical:7 }]}> Return Invoice</Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                  </View>
                </View>
              </Content>
            </Modal>
          </View>
  );
}

export default POS_List_Item;
