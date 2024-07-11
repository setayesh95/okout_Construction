import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Styles } from "../Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import normalize from "react-native-normalize/src/index";
import React, { useEffect, useState } from "react";
import Video from "react-native-video";
const GLOBAL = require("../Global");
function TaskImages({ index,value,DeleteImage,key
                    }) {
  const [SelectItem,setSelectItem]=useState('');
  const videoError = error => {

  }
  return(
      <View key={key} style={Styles.UnitDetailImageBoxFeatureStyle2}>
        {
          value.type==='video/mp4'?
            <>
              <TouchableOpacity onPress={()=>DeleteImage(value.uri)} style={Styles.UnitDetailAddTextBox234}>
                <MaterialCommunityIcons name={"delete"} size={17} color={'#fff'} />
              </TouchableOpacity>
              <Video
                source={{ uri: value.uri }}
                onError={videoError}
                controls={true}
                resizeMode="cover"
                autoplay={false}
                style={{width:190, height: normalize(200),zIndex:0,borderRadius:normalize(6)}}
              />
            </>:
            <>

              <ImageBackground source={{uri:value.uri}}
                               imageStyle={{borderRadius:normalize(6)}}
                               style={Styles.UnitDetailImagestyle}
                               resizeMode="stretch">
                <TouchableOpacity onPress={()=>DeleteImage(value.uri)} style={Styles.UnitDetailAddTextBox}>
                  <MaterialCommunityIcons name={"delete"} size={17} color={'#fff'} />
                </TouchableOpacity>

              </ImageBackground>
              {/*<TextInput*/}
              {/*  value={SelectItem}*/}
              {/*  style={[Styles.inputStyletaskImages]}*/}
              {/*  onChangeText={(val) => setSelectItem(val)}*/}
              {/*  multiline={true}*/}
              {/*  placeholderTextColor={'#fff'} />*/}
            </>

        }

      </View>
  )
}
export { TaskImages };
