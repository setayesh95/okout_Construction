import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity, Dimensions, PermissionsAndroid, Modal,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Styles } from "../Styles";
import { Container, Content } from "native-base";
import normalize from "react-native-normalize/src/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectPhotocamera, selectPhotoGallery, writePostApi } from "../writePostApi";
import { Footer1 } from "../component/Footer";
import { Header } from "../component/Header";
import DYB_List_Details_Image_Item from "../component/DYB_List_Details_Image_Item";
import Notes_Item from "../component/Feature_DYB_List_Detail_Notes_Item";
import { Colors } from "../Colors";
import { Image } from "react-native-compressor";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { removeDataStorage, requestLocationPermission, geocodePosition } from "../Get_Location";
import LinearGradient from "react-native-linear-gradient";
import Geolocation from "react-native-geolocation-service";
import { Modalize } from "react-native-modalize";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ButtonI } from "../component/ButtonI";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LogOutModal } from "../component/LogOutModal";
const GLOBAL = require("../Global");
const Api = require("../Api");
const Photoes = require("../Photoes");
const { width: viewportWidth } = Dimensions.get("window");
let ImageList = [];
let ImageListUpload = [];
let Full = "";
let List = [];
const SLIDER_1_FIRST_ITEM = 0;

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(80);
const itemHorizontalMargin = wp(3);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

function Project_Feature_List_Detail({ navigation, navigation: { goBack } }) {
  const modalizeRef = React.createRef();
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [ShowEditBtn, setShowEditBtn] = useState(false);
  const [FeatureSelectDetail, setFeatureSelectDetail] = useState("");
  const [slider1ActiveSlide, setslider1ActiveSlide] = useState(0);
  const [location, setLocation] = useState(false);
  const [GeoAddress, setGeoAddress] = useState(false);
  const [Title, setTitle] = useState("");
  const [ImageSourceviewarrayUpload, setImageSourceviewarrayUpload] = useState([]);
  const [Country, setCountry] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [ShowBackBtn, setShowBackBtn] = useState(true);
  const [ShowButton, setShowButton] = useState(true);
  let _slider1Ref = useRef(null);
  const DeleteImageFromApi = (buildId) => {
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("buildNoteId", buildId);
    formData.append("notes", "delete");
    writePostApi("POST", Api.DeleteBuildNote, formData).then(json => {
      if (json) {
        if (json.status === true) {
          setMessage(json.msg);
          setShowMessage(true);
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4000);
          return () => clearInterval(timerId);
        }
      } else {
        setMessage("Your feature successfully deleted");
        setShowMessage(true);
        const timerId = setInterval(() => {
          setShowMessage(false);
        }, 4000);
        return () => clearInterval(timerId);
      }
    });
  };
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
    let mark = GLOBAL.FeatureSelectDetail;
    if (GLOBAL.DYB_Type === "Image") {
      let mark2 = {
        Country: "",
        Type: "AddImage",
        buildId: "",
        buildIdParent: "",
        geoAddress: "",
        geoLat: "",
        geoLong: "",
        imageUrl: "",
        postDate: "",
        relatedId: "",
        title: "",
      };
      mark = [...mark, mark2];
      setFeatureSelectDetail(mark);
      setTitle(GLOBAL.FeatureNameDetail);
    } else {
      setFeatureSelectDetail(GLOBAL.FeatureSelectDetail);
    }
    if (GLOBAL.isConnected !== true) {
      setGeoAddress("");
      setCountry("");
    }
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
            // See error code charts below.
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
  };
  const AddFeatureImage = async (value) => {
    setShowButton(false);
    let idsArray = "";
    const formData = new FormData();
    formData.append("userId", GLOBAL.UserInformation?.userId);
    formData.append("relatedName", "feature");
    formData.append("relatedId", GLOBAL.UpdateFeatureID);
    formData.append("geoLat", location.latitude);
    formData.append("geoLong", location.longitude);
    formData.append("geoAddress", GeoAddress);
    if (GLOBAL.DYB === "n")
      formData.append("buildType", "general");
    else
      formData.append("buildType", "dyb");
    if (ImageSourceviewarrayUpload.length !== 0) {
      if (GLOBAL.DYB !== "n") {
        formData.append("title", Title);
      }
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
              setShowWarningMessage(false);
              setShowBackBtn(true);
              const timerId = setInterval(() => {
                setShowMessage(false);
              }, 4000);
              return () => clearInterval(timerId);
            }
          } else {
            setMessage("Your build notes successfully added");
            setShowMessage(true);
            setShowButton(true);
            setShowWarningMessage(false);
            setShowBackBtn(true);
            const timerId = setInterval(() => {
              setShowMessage(false);
            }, 4000);
            return () => clearInterval(timerId);
          }
        });

      }
      AddImageOffline();
    }
  };
  const DeleteImage = (DeleteID) => {
    let A = [];
    let List_Item = FeatureSelectDetail;
    let index = List_Item?.findIndex((p) => p.buildId === DeleteID);
    let markers = [...List_Item];
    markers?.splice(index, 1);
    setFeatureSelectDetail(markers);
    let index2 = List_Item?.findIndex((p) => p.Type === "AddImage");
    let markers2 = [...List_Item];
    markers2?.splice(index2, 1);
    A = [...markers2];
    SaveFeatures(A);
    DeleteImageFromApi(DeleteID);
  };
  const SaveFeatures = async (A) => {
    try {
      let List = [];
      let AllList = [];
      let Filter = [];
      let different = [];
      let TypeList = [];
      List = (JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_Details_KEY)));
      Filter = List?.filter((p) => parseInt(p.relatedId) !== parseInt(GLOBAL.UpdateFeatureID));
      different = List?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateFeatureID) && p.Type !== GLOBAL.DYB_Type);
      TypeList = List?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateFeatureID) && p.Type === GLOBAL.DYB_Type && p.title !== GLOBAL.FeatureNameDetail);
      let MakeList = [].concat(Filter, different);
      let MakeList2 = [].concat(MakeList, TypeList);
      AllList = [...MakeList2, ...A];
      await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(AllList));
    } catch (e) {
    }
  };
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
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  const AddImageOffline = async () => {
    setShowWarningMessage(false);
    setShowBackBtn(true);
    let Detail_List = [];
    let Count = 0;
    let different = [];
    let Buildid = 0;
    let differentDetail = [];
    let AllListDetail = [];
    let Detail_Exist = [];
    let List = JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_KEY));
    different = List?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateFeatureID) && p.Type === "Image");
    let ListDetail = JSON.parse(await AsyncStorage.getItem(GLOBAL.FeatureList_Details_KEY));
    differentDetail = ListDetail?.filter((p) => parseInt(p.relatedId) === parseInt(GLOBAL.UpdateFeatureID) & p.Type === "Image");
    Buildid = different?.find((p) => p.title === Title)?.buildId;
    Detail_Exist = differentDetail?.filter((p) => parseInt(p?.buildIdParent) === parseInt(Buildid));
    ImageSourceviewarrayUpload?.forEach((obj) => {
      if (Detail_Exist !== undefined)
        Count = parseInt(Detail_Exist?.[Detail_Exist.length - 1]?.buildId) + 1;
      else
        Count = Count + 1;
      Detail_List.push({
        imageUrl: obj.uri,
        buildId: Count.toString(),
        relatedId: GLOBAL.UpdateFeatureID,
        postDate: obj.Date,
        geoLat: obj.geoLat.toString(),
        geoLong: obj.geoLong.toString(),
        geoAddress: obj.geoAddress,
        Country: obj.Country,
        buildIdParent: Buildid,
        title: Title,
        Type: "Image",
      });
    });
    if (ListDetail !== null) {
      AllListDetail = [...ListDetail, ...Detail_List];
    } else {
      AllListDetail = [...Detail_List];
    }
    setImageSourceviewarrayUpload([]);
    await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(AllListDetail));
  };
  const UpdateBuildNote = (FeatureNote, buildId, Title) => {
    var formdata = new FormData();
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("buildNoteId", buildId);
    formdata.append("title", Title);
    formdata.append("notes", FeatureNote);
    formdata.append("attachment", []);
    writePostApi("POST", Api.UpdateBuildNote, formdata).then(json => {
      let List_Item = FeatureSelectDetail;
      let index = List_Item?.findIndex((p) => p.buildId === buildId);
      let markers = [...List_Item];
      markers[index] = { ...markers?.[index], buildIdNotes: FeatureNote, title: Title };
      GLOBAL.FeatureNameDetail = Title;
      if (json) {
        if (json?.status === true) {
          SaveFeatures(markers);
          setMessage(json?.msg);
          setShowEditBtn(true);
          setShowMessage(true);
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4000);
          return () => clearInterval(timerId);
        }
      } else {
        SaveFeatures(markers);
        setMessage("Your note successfully updated");
        setShowMessage(true);
        setShowEditBtn(true);
        const timerId = setInterval(() => {
          setShowMessage(false);
        }, 4000);
        return () => clearInterval(timerId);
      }
    });
  };
  const Image_compress = async (path) => {
    return await Image.compress(path, {
      maxWidth: 1000,
      quality: 0.8,
    });
  };
  const selectPhotoFromGallery = () => {
    onClose();
    selectPhotoGallery().then(response => {
      if (response.didCancel) {
      } else if (response.error) {

      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        if (FeatureSelectDetail) {
          let List_Item = FeatureSelectDetail;
          let index = List_Item?.findIndex((p) => p.Type === "AddImage");
          let markers = [...List_Item];
          markers?.splice(index, 1);
          ImageList = [...markers];
        }
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
              imageUrl: res,
              type: obj.mime,
              fileName: imgName,
              buildId: 0,
              title: "",
              postDate: RealDate,
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
              let mark2 = {
                Country: "",
                Type: "AddImage",
                buildId: "",
                buildIdParent: "",
                geoAddress: "",
                geoLat: "",
                geoLong: "",
                imageUrl: "",
                postDate: "",
                relatedId: "",
                title: "",
              };
              ImageList = [...ImageList, mark2];
              setFeatureSelectDetail(ImageList);
              setImageSourceviewarrayUpload(ImageListUpload);
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
      if (FeatureSelectDetail) {
        let List_Item = FeatureSelectDetail;
        let index = List_Item?.findIndex((p) => p.Type === "AddImage");
        let markers = [...List_Item];
        markers?.splice(index, 1);
        ImageList = [...markers];
      }
      if (ImageSourceviewarrayUpload)
        ImageListUpload = [...ImageSourceviewarrayUpload];
      Image.compress(response.path, {
        maxWidth: 1000,
        quality: 0.8,
      }).then(res => {
        ImageList.push({
          imageUrl: res,
          type: response.mime,
          fileName: imgName,
          buildId: 0,
          title: "",
          postDate: Full,
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
        let mark2 = {
          Country: "",
          Type: "AddImage",
          buildId: "",
          buildIdParent: "",
          geoAddress: "",
          geoLat: "",
          geoLong: "",
          imageUrl: "",
          postDate: "",
          relatedId: "",
          title: "",
        };
        ImageList = [...ImageList, mark2];
        setFeatureSelectDetail(ImageList);
        setImageSourceviewarrayUpload(ImageListUpload);
        setShowBackBtn(false);
        ImageList = [...ImageList];
        ImageListUpload = [...ImageListUpload];
      });
    });
  };
  const _renderItem_Carousel = ({ item, index }) => {
    if (item.Type !== "AddImage") {
      return (
        <DYB_List_Details_Image_Item item={item} key={index} DeleteImageFromApi={DeleteImage}
                                     colors={GLOBAL.route === "structure" ? ["#ffadad", "#f67070", "#FF0000"] : ["#ffc2b5", "#fca795", "#d1583b"]}
                                     IconColor={"#F67070FF"} />
      );
    } else {
      return (
        <View key={index} style={Styles.cardContainer}>
          <View style={Styles.cardAddimage}>
            <TouchableOpacity onPress={() => {
              GLOBAL.DYB === "n" ?
                onOpen() :
                selectPhoto();
            }} style={Styles.ListDetailUploadImagebox}>
              <Text style={Styles.UploadImageText2}>
                Add Photos
              </Text>
              <MaterialIcons name={"add-a-photo"} size={20} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  const renderContent = () => (
    <View style={Styles.BtnBox}>
      <TouchableOpacity onPress={() => onClose()} style={Styles.CancelBtn}>
        <View style={{ width: "80%" }}>
          <AntDesign name={"closecircleo"} size={20} color={Colors.button} />
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
        Title={GLOBAL.FeatureNameDetail} />
      {ShowMessage === true ?
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={Styles.flashMessageSuccsess}>
            <View style={{ width: "10%" }} />
            <View style={{ width: "80%" }}>
              <Text style={Styles.AlertTxt}>
                {Message}
              </Text>
            </View>
            <View style={{ width: "10%" }} />
          </View>
        </View>
        : null}

      <Content>
        {showModalDelete &&
        <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
        }
        {
          GLOBAL.DYB_Type === "Image" ?
            <View style={Styles.container2}>
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
              {FeatureSelectDetail && (
                <View style={Styles.With100Padding}>
                  <View style={Styles.carouselBtnStyle3}>
                    <TouchableOpacity style={Styles.carouselStyle} onPress={() => _slider1Ref.snapToPrev()}>
                      <AntDesign name="caretleft" size={normalize(14)} color={Colors.button} />
                      <Text style={Styles.skiptext}>Prev</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.carouselStyle1} onPress={() => _slider1Ref.snapToNext()}>
                      <Text style={Styles.skiptext}>Next</Text>
                      <AntDesign name="caretright" size={normalize(14)} color={Colors.button} />
                    </TouchableOpacity>
                  </View>
                  <Carousel
                    ref={c => _slider1Ref = c}
                    data={FeatureSelectDetail}
                    renderItem={_renderItem_Carousel}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.4}
                    // inactiveSlideShift={20}
                    containerCustomStyle={Styles.slider}
                    contentContainerCustomStyle={Styles.sliderContentContainer}
                    onSnapToItem={(index) => setslider1ActiveSlide(index)}
                  />
                  <Pagination
                    dotsLength={FeatureSelectDetail.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={Styles.paginationContainer}
                    dotColor={"rgba(255, 255, 255, 0.92)"}
                    dotStyle={Styles.paginationDot}
                    inactiveDotColor={Colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                  />

                  {ImageSourceviewarrayUpload.length !== 0 && ShowButton === true ?
                    <ButtonI
                      style={Styles.btnDYBListDetail}
                      onpress={AddFeatureImage}
                      categoriIcon={"FontAwesome"}
                      title={"Save Photos"}
                      colorsArray={GLOBAL.route === "structure" ? ["#ffadad", "#f67070", "#FF0000"] : ["#ffc2b5", "#fca795", "#d1583b"]}
                      styleTxt={[Styles.txtbtn, { fontSize: normalize(16) }]} sizeIcon={27} /> : null}
                </View>
              )}

            </View>
            :
            <View style={Styles.container2}>
              {FeatureSelectDetail && (
                FeatureSelectDetail?.map((value, index) => {
                  return (
                    <Notes_Item value={value} key={index} UpdateBuildNote={UpdateBuildNote}
                                ShowEditBtn={ShowEditBtn}
                    />
                  );
                })
              )
              }
            </View>
        }
      </Content>
      <Modalize ref={modalizeRef} withHandle={false} modalStyle={Styles.ModalizeDetalStyle}>
        {renderContent()}
      </Modalize>
      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>

  );
}

export default Project_Feature_List_Detail;
