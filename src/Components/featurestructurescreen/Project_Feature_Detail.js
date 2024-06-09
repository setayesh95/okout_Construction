import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput, Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../Colors";
import { Styles } from "../Styles";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import { Container, Content } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";

import Geolocation from "react-native-geolocation-service";
import { Modalize } from "react-native-modalize";
import { ButtonI } from "../component/ButtonI";
import { Image } from "react-native-compressor";
import { LogOutModal } from "../component/LogOutModal";
import Feature_DYB_detail_Image_Item from "../component/Feature_DYB_detail_Image_Item";
import DYB_List_Detail_NoteItem from "../component/DYB_List_Detail_NoteItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectPhotocamera, selectPhotoGallery, writePostApi } from "../writePostApi";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { geocodePosition, removeDataStorage, requestLocationPermission } from "../Get_Location";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Api = require("../Api");
const GLOBAL = require("../Global");
const Photoes = require("../Photoes");
let ImageList = [];
let ImageListUpload = [];
let Full = "";
let Date_Today = "";
let List = [];

function Project_Feature_Detail({ navigation, navigation: { goBack } }) {
  const { navigate } = useNavigation();
  const modalizeRef = React.createRef();
  const [ImageSource, setImageSource] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [MudolList, setMudolList] = useState([]);
  const [TitlesList, setTitlesList] = useState([]);
  const [Count, setCount] = useState(0);
  const [FeatureNote, setFeatureNote] = useState("");
  const [ImageTitle, setImageTitle] = useState("");
  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [location, setLocation] = useState(false);
  const [GeoAddress, setGeoAddress] = useState(false);
  const [Title, setTitle] = useState("");
  const [ImageSourceviewarrayUpload, setImageSourceviewarrayUpload] = useState([]);
  const [Country, setCountry] = useState(false);
  const [TitleValidate, setTitleValidate] = useState(false);
  const [ImageValidate, setImageValidate] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [ShowBackBtn, setShowBackBtn] = useState(true);
  const [ShowButton, setShowButton] = useState(true);

  useEffect(() => {
    getLocation();
    const date = new Date();
    const Day = date.getDate();
    const Month = date.getMonth() + 1;
    const Year = date.getFullYear();
    const Hour = date.getHours();
    const Minute = date.getMinutes();
    const Second = date.getSeconds();
    Full = `${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
    Date_Today = `${Year}-${Month}-${Day}`;

  }, []);
  const getLocation = async () => {
    requestLocationPermission().then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position.coords);
            var NY = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            geocodePosition(NY).then(res => {
              if (res) {
                setGeoAddress(res?.[0]?.formattedAddress);
                setCountry(res?.[0]?.country + " " + res?.[0]?.adminArea);
              } else {
                setGeoAddress("");
                setCountry("");
              }
            })
              .catch(err => {
              });
          },
          error => {
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
  };
  const AddFeatureImage = async () => {
    setShowButton(false);
    let idsArray = "";
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("relatedName", "feature");
    formData.append("relatedId", GLOBAL.UpdateFeatureID);
    formData.append("geoLat", location.latitude);
    formData.append("geoLong", location.longitude);
    formData.append("geoAddress", GeoAddress);
    formData.append("buildType", "dyb");
    if (GLOBAL.Feature === "Image") {
      if (GLOBAL.DYB !== "n" && Title === "")
        setTitleValidate(true);
      else if (ImageSourceviewarrayUpload?.length === 0) {
        setTitleValidate(false);
        setImageValidate(true);
      } else {
        setImageValidate(false);
        setTitleValidate(false);
        formData.append("title", Title);
        for (let i = 0; i < ImageSourceviewarrayUpload.length; i++) {
          idsArray = ImageSourceviewarrayUpload[i];
          formData.append("attachment", {
            uri: idsArray.uri,
            type: idsArray.type,
            name: idsArray.fileName,
          });
          formData.append("postDate", idsArray.Date);
          writePostApi("POST", Api.AddBuildNotes, formData, ImageSourceviewarrayUpload).then(json => {
            if (json) {
              if (json.status === true) {
                setMessage(json.msg);
                setShowMessage(true);
                setShowButton(true);
                setTimeout(function() {
                  setShowMessage(false);
                }, 2000);
                navigation.navigate("Project_Feature_List");
              }
            } else {
              setMessage("Your build notes successfully added");
              setShowMessage(true);
              setShowButton(true);
              setTimeout(function() {
                setShowMessage(false);
              }, 2000);
              navigation.navigate("Project_Feature_List");
            }
          });
        }
        if (GLOBAL.isConnected === false) {
          AddImageOffline();
        }
      }
    }
    /////////Send Note/////////////
    else {
      if (ImageTitle === "") {
        setTitleValidate(true);
      } else if (FeatureNote === "") {
        setTitleValidate(false);
        setImageValidate(true);
      } else {
        setImageValidate(false);
        setTitleValidate(false);
        /////////Send Note/////////////
        formData.append("title", ImageTitle);
        formData.append("notes", FeatureNote);
        formData.append("postDate", Full);
        formData.append("attachment", ImageSourceviewarrayUpload);
        if (GLOBAL.isConnected === true) {
          fetch(GLOBAL.OrgAppLink_value + Api.AddBuildNotes, {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          })
            .then(resp => {
              if (resp.status === 201) {
                setMessage("Your build notes successfully added");
                setShowMessage(true);
                setShowButton(true);
                setTimeout(function() {
                  setShowMessage(false);
                }, 2000);
                navigation.navigate("Project_Feature_List");
              }
              return resp.txt();
            })
            .then(txt => {

            })
            .catch(error => console.log("errorwwww", error));
        } else {
          AddNoteOffline();
          let get_MethodsList = await AsyncStorage.getItem(GLOBAL.offline_data);
          let List = [];
          let AllList = [];
          let ID = 0;
          if (get_MethodsList !== null) {
            ID = parseInt(JSON.parse(get_MethodsList).length) + 1;
          } else {
            ID = 0;
          }
          List.push({
            type: "POST",
            Url: Api.AddBuildNotes,
            formdata: formData,
            id: ID,
          });
          if (get_MethodsList !== null) {
            AllList = [...List, ...JSON.parse(get_MethodsList)];
          } else {
            AllList = [...List];
          }
          await AsyncStorage.setItem(GLOBAL.offline_data, JSON.stringify(AllList));
          setMessage("Your build notes successfully added");
          setShowMessage(true);
          setShowButton(true);
          setTimeout(function() {
            setShowMessage(false);
          }, 2000);
          navigation.navigate("Project_Feature_List");
        }
      }
    }
  };
  const ChangeChecked2 = (value) => {
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  ///Reduce the size of the photo///
  const Image_compress = async (path) => {
    return await Image.compress(path, {
      maxWidth: 1000,
      quality: 0.8,
    });
  };
  const selectPhotoFromGallery = () => {
    onClose();
    if (GLOBAL.isConnected !== true) {
      setGeoAddress("");
      setCountry("");
    }
    selectPhotoGallery().then(response => {
      if (response.didCancel) {
      } else if (response.error) {

      } else if (response.customButton) {

        alert(response.customButton);
      } else {
        if (ImageSourceviewarray)
          ImageList = [...ImageSourceviewarray];
        if (ImageSourceviewarrayUpload)
          ImageListUpload = [...ImageSourceviewarrayUpload];
        for (let item in response) {
          let obj = response[item];
          var getFilename = obj.path.split("/");
          var imgName = getFilename[getFilename.length - 1];
          let D = "";
          let B = "";
          let RealDate = "";
          let Months = "";
          if (obj?.exif?.DateTimeDigitized !== null) {
            D = obj?.exif?.DateTimeDigitized?.split(":");
            B = D?.[2].split(" ");
            RealDate = `${D?.[0]}-${D?.[1]}-${B?.[0]} ${B?.[1]}:${D?.[3]}:${D?.[4]}`;
            Months = D?.[1];
          } else {
            RealDate = Full;
          }
          Image_compress(obj.path).then(res => {

            ImageList.push({
              uri: res,
              type: obj.mime,
              fileName: imgName,
              buildId: 0,
              title: "",
              Date: RealDate,
              Type: "Gallery",
              geoLat: location.latitude,
              geoLong: location.longitude,
              geoAddress: GeoAddress,
              Country: Country,
            });
            ImageListUpload.push({
              uri: res,
              type: obj.mime,
              fileName: imgName,
              buildId: 0,
              title: "",
              Date: RealDate,
              Type: "Gallery",
              geoLat: location.latitude,
              geoLong: location.longitude,
              geoAddress: GeoAddress,
              Country: Country,
            });
            List.push({
              Type: "Gallery",
            });
            if (List?.length === response?.length) {
              setImageSourceviewarray(ImageList);
              setImageSourceviewarrayUpload(ImageListUpload);
              setMudolList(ImageList);
              setImageValidate(false);
              setShowBackBtn(false);
              List = [];
              ImageList = [...ImageList];
              ImageListUpload = [...ImageListUpload];
            }
          });
        }
      }
    });
  };
  const selectPhoto = () => {
    onClose();
    if (GLOBAL.isConnected !== true) {
      setGeoAddress("");
      setCountry("");
    }
    selectPhotocamera().then(response => {
      var getFilename = response.path.split("/");
      var imgName = getFilename[getFilename.length - 1];
      setImageSource(response.path);
      if (ImageSourceviewarray)
        ImageList = [...ImageSourceviewarray];
      if (ImageSourceviewarrayUpload)
        ImageListUpload = [...ImageSourceviewarrayUpload];
      Image.compress(response.path, {
        maxWidth: 1000,
        quality: 0.8,
      }).then(res => {
        ImageList.push({
          uri: res,
          type: response.mime,
          fileName: imgName,
          buildId: 0,
          title: "",
          Date: Full,
          Type: "Camera",
          geoLat: location.latitude,
          geoLong: location.longitude,
          geoAddress: GeoAddress,
          Country: Country,
        });
        ImageListUpload.push({
          uri: res,
          type: response.mime,
          fileName: imgName,
          buildId: 0,
          title: "",
          Date: Full,
          Type: "Camera",
          geoLat: location.latitude,
          geoLong: location.longitude,
          geoAddress: GeoAddress,
          Country: Country,
        });
        setImageSourceviewarray(ImageList);
        setImageSourceviewarrayUpload(ImageListUpload);
        setMudolList(ImageList);
        setImageValidate(false);
        setShowBackBtn(false);
        ImageList = [...ImageList];
        ImageListUpload = [...ImageListUpload];
      });

    });
  };
  ///calculate Names of the days of the week///
  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek];
  };
  const AddImageOffline = async () => {
    let Image_list = [];
    let Count = 0;
    let different = [];
    let SameTitle = 0;
    let FeatureList = [];
    let Buildid = 0;
    let differentDetail = [];
    let AllListDetail = [];
    let Detail_Exist = [];
    let AllList = [];
    let List = JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_KEY));
    different = List?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateFeatureID) && p.Type === "Image");
    SameTitle = different?.findIndex((p) => p.title === Title);
    let ListDetail = JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_Details_KEY));
    differentDetail = ListDetail?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateFeatureID) & p.Type === "Image");
    if (SameTitle === -1 || SameTitle === undefined) {
      const date = new Date();
      const Day = date.getDate();
      const Month = date.getMonth() + 1;
      if (List !== null) {
        Buildid = parseInt(List?.[List?.length - 1]?.buildId) + 1;
      } else {
        Buildid = Buildid + 1;
      }
      let WeekDay = getDayOfWeek(Date_Today);
      FeatureList.push({
        Type: "Image",
        Icon: "folder-multiple-image",
        title: Title,
        FullYear: Date_Today,
        Month: Day,
        Day: Month,
        relatedId: GLOBAL.UpdateFeatureID,
        buildId: Buildid,
        WeekDay: WeekDay,
      });
      if (List !== null) {
        AllList = [...List, ...FeatureList];
      } else {
        AllList = [...FeatureList];
      }
      ImageSourceviewarrayUpload?.forEach((obj) => {
        if (differentDetail !== undefined) {
          Count = parseInt(differentDetail?.[differentDetail?.length - 1]?.buildId) + 1;
        } else
          Count = Count + 1;
        Image_list.push({
          imageUrl: obj.uri,
          title: Title,
          buildId: Count,
          Type: "Image",
          postDate: obj.Date,
          buildIdParent: Buildid,
          geoLat: obj.geoLat,
          geoLong: obj.geoLong,
          geoAddress: obj.geoAddress,
          Country: obj.Country,
          relatedId: GLOBAL.UpdateFeatureID,
        });
      });
      if (ListDetail !== null) {
        AllListDetail = [...ListDetail, ...Image_list];
      } else {
        AllListDetail = [...Image_list];
      }
      await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(AllListDetail));
      await AsyncStorage.setItem(GLOBAL.FeatureList_KEY, JSON.stringify(AllList));
      setImageSourceviewarrayUpload([]);
    } else {
      Buildid = different?.find((p) => p.title === Title)?.buildId;
      Detail_Exist = differentDetail?.filter((p) => parseInt(p?.buildIdParent) === parseInt(Buildid));
      ImageSourceviewarrayUpload?.forEach((obj) => {
        if (Detail_Exist)
          Count = parseInt(Detail_Exist?.[Detail_Exist.length - 1]?.buildId) + 1;
        else
          Count = Count + 1;
        Image_list.push({
          imageUrl: obj.uri,
          title: Title,
          buildId: Count.toString(),
          Type: "Image",
          postDate: obj.Date,
          buildIdParent: Buildid,
          geoLat: obj.geoLat.toString(),
          geoLong: obj.geoLong.toString(),
          geoAddress: obj.geoAddress,
          Country: obj.Country,
          relatedId: GLOBAL.UpdateFeatureID,
        });
      });
      if (ListDetail) {
        AllListDetail = [...ListDetail, ...Image_list];
      } else {
        AllListDetail = [...Image_list];
      }
      setImageSourceviewarrayUpload([]);
      await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(AllListDetail));
    }
  };
  const AddNoteOffline = async () => {
    let Note_list = [];
    let Count = 0;
    let different = [];
    let SameTitle = 0;
    let FeatureList = [];
    let Buildid = 0;
    let differentDetail = [];
    let AllListDetail = [];
    let AllList = [];
    let List = JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_KEY));
    different = List?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateFeatureID) && p.Type === "Note");
    SameTitle = different?.findIndex((p) => p?.title === ImageTitle);
    let ListDetail = JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_Details_KEY));
    differentDetail = ListDetail?.filter((p) => parseInt(p?.relatedId) === parseInt(GLOBAL.UpdateFeatureID) & p?.Type === "Note");
    if (SameTitle === -1 || SameTitle === undefined) {
      const date = new Date();
      const Day = date.getDate();
      const Month = date.getMonth() + 1;
      if (List !== null) {
        Buildid = parseInt(List?.[List?.length - 1]?.buildId) + 1;
      } else
        Buildid = Buildid + 1;
      let WeekDay = getDayOfWeek(Date_Today);
      FeatureList.push({
        Type: "Note",
        Icon: "clipboard-text-outline",
        title: ImageTitle,
        FullYear: Date_Today,
        Month: Day,
        Day: Month,
        relatedId: GLOBAL.UpdateFeatureID,
        buildId: Buildid,
        WeekDay: WeekDay,
      });
      if (List !== null) {
        AllList = [...List, ...FeatureList];
      } else {
        AllList = [...FeatureList];
      }
      if (differentDetail !== undefined) {
        Count = parseInt(differentDetail?.[differentDetail?.length - 1]?.buildId) + 1;
      } else
        Count = Count + 1;
      Note_list.push({
        buildIdNotes: FeatureNote,
        title: ImageTitle,
        buildId: Count,
        Type: "Note",
        postDate: Full,
        buildIdParent: Buildid,
        geoLat: location.latitude,
        geoLong: location.longitude,
        geoAddress: GeoAddress,
        Country: Country,
        relatedId: GLOBAL.UpdateFeatureID,
      });
      if (ListDetail !== null) {
        AllListDetail = [...ListDetail, ...Note_list];
      } else {
        AllListDetail = [...Note_list];
      }
      await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(AllListDetail));
      await AsyncStorage.setItem(GLOBAL.FeatureList_KEY, JSON.stringify(AllList));
      setImageSourceviewarrayUpload([]);
    }
  };
  const DeleteImage = (fileName) => {
    let ImageList = [...ImageSourceviewarray];
    let ImageListupload = [...ImageSourceviewarrayUpload];
    const index = ImageList.findIndex((p) => p.fileName === fileName);
    const indexC = ImageListupload.findIndex((p) => p.fileName === fileName);
    ImageList.splice(index, 1);
    ImageListupload.splice(indexC, 1);
    setImageSourceviewarray(ImageList);
    setImageSourceviewarrayUpload(ImageListupload);
  };
  const renderContent = () => (
    <View style={Styles.BtnBox}>
      <TouchableOpacity onPress={() => onClose()} style={Styles.CancelBtn}>
        <View style={{ width: "80%" }}>
          <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        selectPhoto();
      }} style={Styles.UploadBtn}>
        <AntDesign name={"camera"} size={17} color={"#fff"} />
        <Text style={[Styles.TextUploadBtn]}>
          Use Camera
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        selectPhotoFromGallery();
      }} style={Styles.UploadBtn}>
        <AntDesign name={"picture"} size={17} color={"#fff"} />
        <Text style={[Styles.TextUploadBtn]}>
          Choose From Gallery
        </Text>
      </TouchableOpacity>
    </View>
  );
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };
  ///LogOut Function///
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    navigation.navigate("LogIn");
  };

  const logout_Url = () => {
    setshowModalDelete(true);
  };
  const Back_navigate = () => {

    if (ShowBackBtn === false) {
      setShowWarningMessage(true);
      setShowBackBtn(true);
    } else {

      goBack();
    }
  };
  return (
    <Container style={[Styles.Backcolor]}>
      <Header
        colors={GLOBAL.route === "structure" ? ["#ffadad", "#f67070", "#FF0000"] : ["#ffc2b5", "#fca795", "#d1583b"]}
        StatusColor={GLOBAL.route === "structure" ? "#ffadad" : "#ffc6bb"} onPress={Back_navigate}
        Title={"Features Detail"} />
      {ShowMessage === true ?
        <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
          <View style={[Styles.flashMessageSuccsess, { flexDirection: "row" }]}>

            <View style={{ width: "85%" }}>
              <Text style={Styles.AlertTxt}>
                {Message}
              </Text>
            </View>
            <View style={{ width: "15%" }}>
            </View>
          </View>
        </View>
        : null}
      <Content style={[{ backgroundColor: Colors.Light }]}>
        <View style={Styles.container}>
          {showModalDelete &&
          <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
          }
          {
            GLOBAL.Feature === "Image" ?
              <View style={Styles.Center}>
                {ShowWarningMessage === true &&
                <View style={Styles.flashMessageWarning4}>
                  <View style={Styles.flashMessageWarning6}>
                    <View style={{ width: "10%", alignItems: "center", justifyContent: "flex-start" }}>
                      <FontAwesome size={normalize(18)} color={"#fff"} name={"exclamation-circle"} />
                    </View>
                    <View style={{ width: "90%", alignItems: "flex-start" }}>
                      <Text style={Styles.AddedtTxt}>
                        You will lose all changes.Do you still want to leave?
                      </Text>
                    </View>
                  </View>
                  <View style={Styles.With100Row2}>
                    <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnListDelete}>
                      <TouchableOpacity onPress={() => {
                        setShowBackBtn(false);
                        setShowWarningMessage(false);
                      }}>
                        <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient colors={["#ffadad", "#f67070", "#FF0000"]} style={Styles.btnListDelete}>
                      <TouchableOpacity onPress={() => {
                        setShowWarningMessage(false);
                        setShowBackBtn(true);
                        navigation.navigate("Project_Feature_List");
                      }}>
                        <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
                }
                {
                  GLOBAL.DYB === "n" ? null :
                    <View style={Styles.inputStyleBoxPadding0}>
                      <Text style={[Styles.txtLightColor, { marginTop: normalize(4) }]}>Title</Text>
                      <TextInput
                        value={Title}
                        style={[Styles.inputStyleFeature, TitleValidate && { borderColor: "#CC0000" }]}
                        onChangeText={(val) => setTitle(val)}
                        multiline={true}
                        placeholderTextColor={"#fff"} />
                      {TitleValidate && (<Text style={Styles.TitleValidate}>Fill the field, please.</Text>)}
                    </View>
                }
                <View style={Styles.FlexWrap}>
                  <TouchableOpacity onPress={() => {
                    GLOBAL.DYB === "n" ?
                      onOpen() :
                      selectPhoto();
                  }} style={Styles.unitDetailUploadImagebox}>
                    <Text style={Styles.UploadImageText}>
                      Add Photos
                    </Text>
                    <MaterialIcons name={"add-a-photo"} size={20} color={Colors.button} />
                  </TouchableOpacity>
                  {
                    ImageSourceviewarray.map((value, index) => {
                      return (
                        <Feature_DYB_detail_Image_Item value={value} key={index} ImageTitle={ImageTitle}
                                                       ImagebtnColor={GLOBAL.route === "structure" ? ["#ffadad", "#f67070", "#FF0000"] : ["#ffc2b5", "#fca795", "#d1583b"]}
                                                       DeleteImage={DeleteImage} ChangeChecked={ChangeChecked2}
                                                       IconColor={"#F67070FF"} setImageValidate={setImageValidate} />
                      );
                    })}
                </View>
                <View style={Styles.FlexWrap}>
                  {ImageValidate && (<Text style={Styles.TitleValidate}>Select Photos, please.</Text>)}
                </View>
                {Title !== "" || ImageSourceviewarrayUpload?.length !== 0 && ShowButton === true ?
                  <ButtonI style={Styles.btnDYB}
                           onpress={AddFeatureImage}
                           categoriIcon={""}
                           title={"Save"}
                           colorsArray={GLOBAL.route === "structure" ? ["#ffadad", "#f67070", "#FF0000"] : ["#ffc2b5", "#fca795", "#d1583b"]}
                           styleTxt={[Styles.txtbtn, { fontSize: normalize(16) }]} sizeIcon={27} /> : null
                }
              </View> :
              <View style={Styles.Center}>
                <View style={Styles.With100}>
                  <View style={Styles.FlexWrap}>
                    <DYB_List_Detail_NoteItem FeatureNote={FeatureNote} setFeatureNote={setFeatureNote}
                                              setImageValidate={setImageValidate}
                                              ImageTitle={ImageTitle} setImageTitle={setImageTitle}
                                              ChangeChecked={ChangeChecked2} setTitlesList={setTitlesList}
                                              TitleValidate={TitleValidate}
                                              Count={Count} ImageValidate={ImageValidate} />
                  </View>
                </View>
                {
                  ShowButton === true ?
                    <ButtonI style={Styles.btnDYB}
                             onpress={AddFeatureImage}
                             categoriIcon={""}
                             title={"Save"}
                             colorsArray={GLOBAL.route === "structure" ? ["#ffadad", "#f67070", "#FF0000"] : ["#ffc2b5", "#fca795", "#d1583b"]}
                             styleTxt={[Styles.txtbtn, { fontSize: normalize(16) }]} sizeIcon={27} /> : null
                }
              </View>
          }
        </View>
      </Content>
      <Modalize ref={modalizeRef} withHandle={false} modalStyle={Styles.ModalizeDetalStyle}>
        {renderContent()}
      </Modalize>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>
  );
}

export default Project_Feature_Detail;
