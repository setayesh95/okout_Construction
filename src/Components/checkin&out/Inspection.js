

import { Container } from "native-base";
import { Header } from "../component/Header";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, Text, View } from "react-native";
import { Styles } from "../Styles";
import { LogOutModal } from "../component/LogOutModal";
import { Footer1 } from "../component/Footer";
import { removeDataStorage } from "../Get_Location";
import Doc_List_Item from "../component/Doc_List_Item";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { readOnlineApi } from "../ReadPostApi";
const Photoes = require("../Photoes");
const Api = require("../Api");
const GLOBAL = require("../Global");
function Inspection({ navigation, navigation: { goBack } }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [modules, setmodules] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [ShowMessageDelete, setShowMessageDelete] = useState(false);
  const [Message, setMessage] = useState("");
  const [data, setdata] = useState(['']);
  const [categorylist, setcategorylist] = useState([{ value: '1',name: 'St Albans',Code:'Demo5',
    Reference:'07/05/2024',Notes:'07/05/2024',CreatedOn:'Okout Admin',CreatedBy:'07/05/2024'}]);
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    navigation.navigate("LogIn");
  };
  /// Bottom menu click On LogOut button///
  const logout_Url = () => {
    setshowModalDelete(true);
  };
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };
  const renderItem = ({ item, index }) => (
    <Doc_List_Item key={index}  value={item} SeeDetail={SeeDetail} categorylist={categorylist} Screen={'Inspec'}
                   Navigate_Url={Navigate_Url} Message={Message} data={data}
    />
  );
  const renderSectionHeader = () => (
    <>
      {ShowMessageDelete === true ?
        <View style={Styles.flashMessageSuccsess}>
          <View style={{ width: "10%" }} />
          <View style={{ width: "80%" }}>
            <Text style={Styles.AlertTxt}>
              {Message}
            </Text>
          </View>
          <View style={{ width: "10%" }} />
        </View>
        :
        null
      }
      {ShowMessage === true ?
        <View style={Styles.flashMessageSuccsess}>
          <View style={{ width: "10%" }} />
          <View style={{ width: "80%" }}>
            <Text style={Styles.AlertTxt}>
              {Message}
            </Text>
          </View>
          <View style={{ width: "10%" }} />
        </View>
        :
        null
      }
    </>
  );
  const renderSectionFooter = () => (
    <View style={Styles.SectionFooter} />
  );
  const SeeDetail = (value) => {
    navigation.navigate("Inspection");
  };
  useEffect(() => {

    getUnits();

  }, []);
  const getUnits=async ()=>{
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.RentalUnits_List));
    let getUnits = [];
    json?.forEach((obj) => {
      getUnits.push({
        Id: obj?.siteId,
        name: obj?.siteName,
        address:obj?.address,
      geoLat:obj?.geoLat,
      geoLong:obj?.geoLong,
      notes:obj?.notes,
      task:obj?.task,
      taskList:obj?.taskList,
      unitCount:obj?.unitCount,
      units:obj?.units

    });
    });
    setmodules(getUnits)
  }
  return (
    <Container  style={{backgroundColor:GLOBAL.backgroundColor}}>
      <Header colors={["#59a890", "#417f73", "#0B2B26"]} StatusColor={"#58a78f"} onPress={goBack} Title={"Inspection"} />
      <View style={Styles.containerList}>
        {showModalDelete &&
        <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
        }
        {
          modules !== "" ?
            <View style={[Styles.Center_margin_Bottom3]}>
              {modules && (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={modules}
                  style={{ width: "100%", flexGrow: 0 }}
                  renderItem={renderItem}
                  ListHeaderComponent={renderSectionHeader}
                  ListFooterComponent={renderSectionFooter}
                  keyExtractor={(item, index) => {
                    return index.toString();
                  }}
                />
              )}
            </View> :
            <View style={Styles.With90CenterVertical}>
              <Text style={Styles.EmptyText}>
                " No Document defined "
              </Text>
            </View>
        }
      </View>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>
  )
}

export default Inspection;

