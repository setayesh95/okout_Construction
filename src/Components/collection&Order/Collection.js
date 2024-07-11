import { FlatList, Image, ImageBackground, Modal, Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../Styles";
import normalize from "react-native-normalize/src/index";
import LinearGradient from "react-native-linear-gradient";
import { removeDataStorage } from "../Get_Location";
import { UserPermission } from "../CheckPermission";
import React, { useState } from "react";
import { Container, Content } from "native-base";
import { Header } from "../component/Header";
import { Warningmessage } from "../component/Warningmessage";
import { Footer1 } from "../component/Footer";
import InvoiceFactor from "../component/InvoiceFactor";
let A=[]
const Photoes=require('../Photoes');
function CollectionDetail({navigation,navigation:{goBack}}) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [showWarning, setshowWarning] = useState(false);
  const [categorylist,setcategorylist] = useState([]);
  const [Sourceviewarray, setSourceviewarray] = useState([]);
  const logout_Url= () => {
    setshowModalDelete(true)
  };
  const _showModalDelete = () => {
    return (
      <View style={Styles.bottomModal}>
        <Modal
          isVisible={showModalDelete}
          avoKeyboard={true}
          onBackdropPress={() => setshowModalDelete( false)}
          transparent={true}>
          {renderModalContent()}
        </Modal>
      </View>
    );
  };
  const renderModalContent = () => (
    <View style={Styles.DeleteModalTotalStyle}>
      <View style={Styles.DeleteModalStyle2}>
        <View style={Styles.With100NoFlex}>
          <Image style={{width:'27%',aspectRatio:1,marginVertical:normalize(10)}}
                 source={Photoes.Alert}
                 resizeMode="contain" />
          <View style={Styles.With100NoFlex}>
            <Text style={Styles.txt_left2}>
              Do you want to Log Out from App?
            </Text>
          </View>
        </View>
        <View style={Styles.With100Row}>
          <LinearGradient  colors={['#9ab3fd','#82a2ff','#4B75FCFF']} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => setshowModalDelete( false)} >
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient   colors={['#ffadad','#f67070','#FF0000']} style={Styles.btnListDelete}>
            <TouchableOpacity onPress={() => {
              removeDataStorage(GLOBAL.PASSWORD_KEY)
              setshowModalDelete(false)
              navigation.navigate('LogIn');
            }} >
              <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
  const Navigate_Url= (Url) => {
    if(Url==='ProfileStack') {
      UserPermission(GLOBAL.UserPermissionsList?.Profile).then(res => {
        if (res.view === "1") {
          navigation.navigate(Url);
        } else {
          setshowWarning(true);
        }
      });
    }
    else
      navigation.navigate(Url);
  };
  return (
    <Container style={[Styles.Backcolor]}>
      <Header colors={["#4d78a5", "#375e89", "#27405c"]} StatusColor={'#5079a5'} onPress={goBack}
              Title={"Collection"} />
      <Content contentContainerStyle={{alignItems:'center',justifyContent:'center'}}>
      <View style={[Styles.containerList]}>
        {
          showModalDelete &&
          <View>
            {
              _showModalDelete()
            }
          </View>
        }
        {showWarning===true&& <Warningmessage/>}
        <View style={Styles.mainSystemDesigner}>
        <View style={Styles.greenView2}>

          <Text style={[Styles.txtGreenView ,{flex:1}]}>Due Amount</Text>
          <Text style={[Styles.txtGreenView ,{flex:0.5}]}>Date</Text>
          <Text style={[Styles.txtGreenView ,{flex:1}]}>Collection Number</Text>
          <Text style={[Styles.txtGreenView, {flex: 1.5}]}>Invoice Amount</Text>
          <Text style={[Styles.txtGreenView, {flex: 1}]}>Invoice No
          </Text>
        </View>
        {categorylist?.map((item, key) => {
          return (
            <View style={Styles.greenView3}>
              <Text style={[Styles.CatText4 ,{flex:1}]}>{item.CreatedBy}</Text>
              <Text style={[Styles.CatText4 ,{flex:1}]}>{item.CreatedOn}</Text>
              <Text style={[Styles.CatText4 ,{flex:1}]}>{item.Notes}</Text>
              <Text style={[Styles.CatText4 ,{flex:1}]}>{item.Reference}</Text>
              <Text style={[Styles.CatText4 ,{flex:1}]}>{item.Code}</Text>
              <Text style={[Styles.CatText4 ,{flex:1}]}>{item.name}</Text>
            </View>
          )})
        }
        </View>
      </View>
      </Content>
      <Footer1 onPressHome={Navigate_Url}  onPressdeleteAsync={logout_Url} />
    </Container>
  );
}
export default CollectionDetail;
