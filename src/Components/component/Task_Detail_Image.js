import { Image, Modal, Text, TouchableOpacity, View,ImageBackground } from "react-native";
import { Styles } from "../Styles";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import React, { useState,useEffect } from "react";
const GLOBAL = require("../Global");
import { Content } from "native-base";
import Video from "react-native-video";

function TaskDetailImage({ item,colors,IconColor,index}) {

  const [FullImage,setFullImage] = useState('');
  const [visible,setvisible] = useState(false);

  const ShowImage=(attachmentUrl)=>{
    setvisible(!visible)
    setFullImage(attachmentUrl)

  }
  return (
    <View index={index} style={Styles.cardContainer}>

      <View style={Styles.card}>
        { item.type==='mp4'?
        <Video
          source={{ uri: item.attachmentUrl }}

          controls={true}
          resizeMode="cover"
          autoplay={false}
          style={{width:367, height: normalize(280),zIndex:0,borderRadius:normalize(6)}}
        />:
        <ImageBackground source={{uri:item.attachmentUrl }}
                         style={Styles.FatureDetailImagestyleFullScreen}
                         resizeMode="stretch">
          <LinearGradient colors={colors} style={[Styles.ImageBtnFeature, {
            height: "10%",
          }]}>
            <View style={[Styles.With100, { justifyContent: "center" }]}>
                  <View style={[Styles.With100, { justifyContent: "center" }]}>
                    <TouchableOpacity onPress={() => ShowImage(item.attachmentUrl)}
                                      style={[Styles.UnitDetailAddTextBox23, { marginTop: normalize(2) }]}>
                      <AntDesign name={"arrowsalt"} size={16} color={"#fff"} />
                    </TouchableOpacity>
                  </View>
            </View>
          </LinearGradient>
        </ImageBackground>
}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}>
        <Content contentContainerStyle={Styles.ModalStyleFullImageDetails}>
          <View style={[{ width: "95%", marginVertical: "4%" }]}>
            <TouchableOpacity onPress={() => {
              setvisible(false);
            }} style={[Styles.CancelBtnLeft, { flexDirection: "row" }]}>
              <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
              <Text style={[Styles.txtLightcenter]}>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={[{ width: "96%", marginBottom: "5%" }]}>
            <Image source={{ uri:FullImage }}
                   imageStyle={{ borderRadius: normalize(6) }}
                   style={Styles.UnitDetailImagestyleFullScreen}
                   resizeMode="stretch"/>
          </View>
        </Content>
      </Modal>
    </View>
  );

}

export default TaskDetailImage;
