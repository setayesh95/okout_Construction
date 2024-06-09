import React, { useState, useEffect } from "react";
import {
  Text,
  View, FlatList, ImageBackground,
} from "react-native";
import { Styles } from "../Styles";
import { Container, Content } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { writePostApi } from "../writePostApi";
import { Header } from "../component/Header";
import { Footer1 } from "../component/Footer";
import { AddModal } from "../component/AddModal";
import List_Items from "../component/list_Items";
import { FloatAddBtn } from "../component/FloatAddBtn";
import { writeDataStorage, removeDataStorage } from "../Get_Location";
import { readOnlineApi } from "../ReadPostApi";
import { LogOutModal } from "../component/LogOutModal";
import DYB_Item from "../component/DYB_Item";
import { Warningmessage } from "../component/Warningmessage";
const GLOBAL = require("../Global");
const Api = require("../Api");
const Photoes = require("../Photoes");
function Project_Features({ navigation, navigation: { goBack } }) {
  const [modules, setmodules] = useState([]);
  const [Message, setMessage] = useState("");
  const [ShowMessage, setShowMessage] = useState(false);
  const [Cheked, setCheked] = useState(false);
  const [ShowMessageDelete, setShowMessageDelete] = useState(false);
  const [visibleAddModal, setvisibleAddModal] = useState(false);
  const [Json, setJson] = useState([]);
  const [ShowMessageUpdate, setShowMessageUpdate] = useState(false);
  const [AddId, setAddId] = useState(0);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [ShowChangedybMessage, setShowChangedybMessage] = useState(false);
  const [route, setroute] = useState("");
  const [ShowButton, setShowButton] = useState(true);
  const [showWarning, setshowWarning] = useState(false);
  const [CategoryId, setCategoryId] = useState(0);
  const [Selectedcategory, setSelectedcategory] = useState(0);
  const [TaskRelatedNameId, setTaskRelatedNameId] = useState(0);
  const [selectedrelatedname, setselectedrelatedname] = useState(0);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setroute(GLOBAL.route);
      if (GLOBAL.route === "structure" || route === "structure") {
        getFeatures();
      } else {
        getDYB();
      }
    });

    return unsubscribe;
  }, []);
  const onOpen = () => {
    setvisibleAddModal(true);
  };
  const getDYB = async () => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.AllProjectInfo_dyb));
    let feature_List = [];
    let Count = 0;
    let Filter_units = "";
    let Filter_sites = "";
    let Filter_section = "";
    let Filter_feature = "";
    if (json !== null) {
      Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId)?.sections;
      Filter_feature = Filter_section?.find((p) => p?.sectionId === GLOBAL.SectionId);
      if (Filter_feature?.features) {
        Filter_feature?.features?.forEach((obj) => {
          if (obj.DYB === "n")
            Count = 0;
          else
            Count = Count + 1;
          feature_List.push({
            featureId: obj.featureId,
            featureName: obj.featureName,
            DYB: obj.DYB,
            ListName: "feature",
            sectionId: GLOBAL.SectionId,
            task: obj?.task,
            Count: Count.toString(),
          });

        });
        if (feature_List?.length !== 0) {
          feature_List?.sort(dateComparison_count);
          setmodules(feature_List);
        } else
          setmodules("");
      }
    }
  };
  ///compare 2 array and get  Difference///
  const getDifference = (array1, array2) => {
    return array1?.filter(object1 => {
      return !array2?.some(object2 => {
        return parseInt(object1?.featureId) === parseInt(object2?.featureId) && object1.featureName === object2.featureName;
      });
    });
  };
  ///save feature when user offline///
  const SaveFeatures = async (A) => {
    let List = [];
    List = modules;
    let Filter_sites = Json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
    let Filter_unit = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
    let Filter_section = Filter_unit?.find((p) => p?.unitId === GLOBAL.UnitId)?.sections;
    let index_project = Json?.findIndex((p) => p?.projectId === GLOBAL.ProjectId);
    let index_sites = Filter_sites?.findIndex((p) => p?.siteId === GLOBAL.SiteId);
    let index_unit = Filter_unit?.findIndex((p) => p?.unitId === GLOBAL.UnitId);
    let index_section = Filter_section?.findIndex((p) => p?.sectionId === GLOBAL.SectionId);
    let ListTotal = [...Json];
    let markers_sites = [...Filter_sites];
    let markers_unit = [...Filter_unit];
    let markers_section = [...Filter_section];
    let different = getDifference(A, List);
    let Exist = false;
    different?.forEach((obj) => {
      Exist = List?.findIndex((p) => p.featureId === obj.featureId);
    });
    if (Exist === -1) {
      let MakeList = [].concat(modules, different);
      markers_section[index_section] = { ...markers_section[index_section], features: MakeList };
      markers_unit[index_unit] = { ...markers_unit[index_unit], sections: markers_section };
      markers_sites[index_sites] = { ...markers_sites[index_sites], units: markers_unit };
      ListTotal[index_project] = { ...ListTotal[index_project], sites: markers_sites };
      writeDataStorage(GLOBAL.All_Lists, ListTotal);
    } else {
      markers_section[index_section] = { ...markers_section[index_section], features: A };
      markers_unit[index_unit] = { ...markers_unit[index_unit], sections: markers_section };
      markers_sites[index_sites] = { ...markers_sites[index_sites], units: markers_unit };
      ListTotal[index_project] = { ...ListTotal[index_project], sites: markers_sites };
      writeDataStorage(GLOBAL.All_Lists, ListTotal);
    }
  };
  ///Get  Dyb===n Project Total List///
  const getAllProjectInfo = async () => {
    readOnlineApi(Api.getAllProjectInfo + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
      let feature_List = [];
      let DYB = "";
      let Filter_sites = json?.projects?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      let Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      let Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId)?.sections;
      let Filter_feature = Filter_section?.find((p) => p?.sectionId === GLOBAL.SectionId);
      if (Filter_feature?.features) {
        Filter_feature?.features?.forEach((obj) => {
          if (obj.DYB === "n") {
            DYB = false;
          } else {
            DYB = true;
          }
          feature_List.push({
            featureId: obj.featureId,
            featureName: obj.featureName,
            Boolean: DYB,
            DYB: obj.DYB,
            ListName: "DYB",
            FeatureNote: "",
            sectionId: GLOBAL.SectionId,
            task: obj?.task,
          });
        });
        writeDataStorage(GLOBAL.All_Lists, json?.projects);
        if (feature_List?.length !== 0)
          setmodules(feature_List);
        else
          setmodules("");
      }
    });
  };
  const getFeatures = async () => {
    let DYB = false;

    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Lists));
    if (json !== null) {
      let feature_List = [];
      let Filter_units = "";
      let Filter_sites = "";
      let Filter_section = "";
      let Filter_feature = "";
      Filter_sites = json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId)?.sections;
      Filter_feature = Filter_section?.find((p) => p?.sectionId === GLOBAL.SectionId);
      if (Filter_feature?.features) {
        Filter_feature?.features?.forEach((obj) => {
          if (obj.DYB === "n") {
            DYB = false;
          } else {
            DYB = true;
          }
          feature_List.push({
            featureId: obj.featureId,
            featureName: obj.featureName,
            Boolean: DYB,
            DYB: obj.DYB,
            ListName: "DYB",
            FeatureNote: "",
            sectionId: GLOBAL.SectionId,
            task: obj?.task,
          });
        });
        if (feature_List?.length !== 0) {
          feature_List?.sort(dateComparison_count);
          setmodules(feature_List);
        } else
          setmodules("");
      }
    }

  };
  ///compare 2 array by Count and sort///
  const dateComparison_count = (a, b) => {
    const date1 = a?.Count;
    const date2 = b?.Count;
    return date2 - date1;
  };
  ///compare 2 array by Id and sort///
  const dateComparison = (a, b) => {
    const date1 = a?.Id;
    const date2 = b?.Id;
    return date1 - date2;
  };
  const UpdateFeature_DYB = (FeatureName, Cheked) => {
    let switchDYB = "";
    if (Cheked === true) {
      switchDYB = "y";
    } else {
      switchDYB = "n";
    }
    var formdata = new FormData();
    formdata.append("featureName", FeatureName);
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("notes", "");
    formdata.append("featureId", GLOBAL.UpdateFeatureID);
    formdata.append("featureDYB", switchDYB);
    writePostApi("POST", Api.UpdateFeature, formdata).then(json => {
      if (json) {
        if (json?.status === true) {
          getAllProjectInfo();
          setMessage(json?.msg);
          setShowChangedybMessage(true);
          const timerId = setInterval(() => {
            setShowChangedybMessage(false);
          }, 4000);
          return () => clearInterval(timerId);

        }
      } else {
        let List_Item = modules;
        let index = List_Item?.findIndex((p) => p.featureId === GLOBAL.UpdateFeatureID);
        let markers = [...List_Item];
        markers[index] = markers[index] = { ...markers[index], Boolean: Cheked, DYB: switchDYB };
        SaveFeatures(markers);
        setmodules(markers);
        setMessage("Your feature successfully updated");
        setShowChangedybMessage(true);
        const timerId = setInterval(() => {
          setShowChangedybMessage(false);
        }, 4000);
        return () => clearInterval(timerId);
      }
    });
  };
  const DeleteFeature = () => {
    var formdata = new FormData();
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("notes", "value.Unitname");
    formdata.append("featureId", GLOBAL.FeatureIdDelete);
    writePostApi("POST", Api.DeleteFeature, formdata).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessageDelete(true);
          getAllProjectInfo();
          const timerId = setInterval(() => {
            setShowMessageDelete(false);
          }, 4000);
          return () => clearInterval(timerId);
        }
      } else {
        let List_Item = modules;
        let index = List_Item?.findIndex((p) => p.featureId === GLOBAL.FeatureIdDelete);
        let markers = [...List_Item];
        markers?.splice(index, 1);
        SaveFeatures(markers);
        setmodules(markers);
        Delete_Detail_Offline();
        setMessage("Your feature successfully deleted");
        setShowMessageDelete(true);
        const timerId = setInterval(() => {
          setShowMessageDelete(false);
        }, 4115);
        return () => clearInterval(timerId);
      }
    });
  };
  const Delete_Detail_Offline = async () => {
    let Modules = await AsyncStorage.getItem(GLOBAL.FeatureList_KEY);
    let Filter = JSON.parse(Modules)?.filter((p) => parseInt(p.relatedId) !== parseInt(GLOBAL.FeatureIdDelete));
    let ModulesDetail = await AsyncStorage.getItem(GLOBAL.FeatureList_Details_KEY);
    let FilterDetail = JSON.parse(ModulesDetail)?.filter((p) => parseInt(p.relatedId) !== parseInt(GLOBAL.FeatureIdDelete));
    await AsyncStorage.setItem(GLOBAL.FeatureList_Details_KEY, JSON.stringify(FilterDetail));
    await AsyncStorage.setItem(GLOBAL.FeatureList_KEY, JSON.stringify(Filter));
  };
  const AddFeature = (value) => {
    let switchDYB = "";
    if (Cheked === true) {
      switchDYB = "y";
    } else {
      switchDYB = "n";
    }
    setShowButton(false);
    var formdata = new FormData();
    formdata.append("projectId", GLOBAL.ProjectId);
    formdata.append("userId", GLOBAL.UserInformation?.userId);
    formdata.append("unitId", GLOBAL.UnitId);
    formdata.append("siteId", GLOBAL.SiteId);
    formdata.append("sectionId", GLOBAL.SectionId);
    formdata.append("featureName", value.FeatureName);
    formdata.append("notes", value.FeatureNote);
    formdata.append("DYB", switchDYB);
    writePostApi("POST", Api.CreateFeature, formdata).then(json => {
      if (json) {
        if (json?.status === true) {
          setMessage(json?.msg);
          setShowMessage(true);
          setShowButton(true);
          getAllProjectInfo();
          setvisibleAddModal(false);
          const timerId = setInterval(() => {
            setShowMessage(false);
          }, 4125);
          return () => clearInterval(timerId);
        }
      } else {
        let List_Item = [];
        let A = [];
        let Count = 0;
        List_Item = modules;
        if (List_Item?.length !== 0) {
          A = [...List_Item];
        }
        if (AddId.length !== 0)
          Count = parseInt(AddId[AddId?.length - 1]?.Id) + 1;
        else
          Count = Count + 1;
        A.push({
          featureId: Count.toString(),
          featureName: value.FeatureName,
          Boolean: Cheked,
          DYB: switchDYB,
          ListName: "DYB",
          sectionId: GLOBAL.SectionId,
          FeatureNote: "",
          task: "0",
        });
        List_Item = A;
        setmodules(List_Item);
        SaveFeatures(List_Item);
        setMessage("Your feature successfully added");
        setShowMessage(true);
        setShowButton(true);
        let All_Sites = [];
        json?.forEach((obj) => {
          obj?.sites?.forEach((obj2) => {
            obj2?.units?.forEach((obj3) => {
              obj3?.sections?.forEach((obj4) => {
                obj4?.features?.forEach((obj5) => {
                  All_Sites?.push(
                    { Id: obj5?.featureId },
                  );
                });
              });
            });
          });
        });
        All_Sites?.sort(dateComparison);
        setAddId(All_Sites);
        setvisibleAddModal(false);
        const timerId = setInterval(() => {
          setShowMessage(false);
        }, 4125);
        return () => clearInterval(timerId);
      }
    });
  };
  const ChangeChecked = () => {
    setCheked(!Cheked);
  };
  const Navigate_Url = (Url) => {
    navigation.navigate(Url);
  };
  const Update_Off = (value, switchDYB) => {
    let List_Item = modules;
    let index = List_Item?.findIndex((p) => p.featureId === GLOBAL.UpdateFeatureID);
    let markers = [...List_Item];
    markers[index] = { ...markers[index], featureName: value.FeatureName, Boolean: Cheked, DYB: switchDYB };
    SaveFeatures(markers);
    setmodules(markers);
  };
  const logout_Url = () => {
    setshowModalDelete(true);
  };
  const renderItem = ({ item, index }) => (
    <List_Items key={index} setShowMessage={setShowMessageUpdate} value={item} Navigate_Url={Navigate_Url}
                ShowWarningMessage={ShowWarningMessage} setShowWarningMessage={setShowWarningMessage}
                Message={Message} getAllProjectInfo={getAllProjectInfo} data={GLOBAL.Feature_data}
                UpdateFeature_DYB={UpdateFeature_DYB}
                ShowButton={ShowButton} Update_Off={Update_Off} setSelectedcategory={setSelectedcategory}
                setTaskRelatedNameId={setTaskRelatedNameId}
                setselectedrelatedname={setselectedrelatedname} setCategoryId={setCategoryId}
                ShowMessage={ShowMessageUpdate} tittlebtn={"Update Feature"} numberValue={16}
                onPressDelete={DeleteFeature}
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
      {ShowChangedybMessage === true ?
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
  const renderItem_dyb = ({ item }) => (
    <DYB_Item value={item} Navigate_Url={Navigate_Url} />
  );
  ///LogOut Function///
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    navigation.navigate("LogIn");
  };
  return (
    <Container  style={{backgroundColor:GLOBAL.backgroundColor}}>
      <Header colors={route === "structure" ? ["#ffadad", "#f67070", "#FF0000"] : ["#ffc2b5", "#fca795", "#d1583b"]}
              StatusColor={route === "structure" ? "#ffadad" : "#ffc6bb"} onPress={goBack} Title={"Features"} />
      <ImageBackground source={Photoes.featureBack}
                       style={{ width: "100%", flex: 1, alignSelf: "stretch" }} resizeMode="stretch">
      <View style={Styles.containerList}>
        {showModalDelete &&
        <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut} />
        }
        {showWarning === true && <Warningmessage />}
        {
          route === "structure" ?
            <>
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
                      " No Features defined
                    </Text>
                    <Text style={Styles.EmptyText}>
                      Add by pressing button below "
                    </Text>
                  </View>
              }
            </> :
            <>
              {
                modules !== "" ?
                  <View style={Styles.ItemsBoxDyb}>
                    {modules && (
                      <FlatList
                        data={modules}
                        style={{ width: "100%" }}
                        renderItem={renderItem_dyb}
                        keyExtractor={(item, index) => {
                          return index.toString();
                        }}
                      />
                    )}
                  </View> :
                  <View style={Styles.With90CenterVertical}>
                    <Text style={Styles.EmptyText}>
                      " No DYB defined "
                    </Text>
                  </View>
              }
            </>
        }

      </View>
      {
        route==="structure"?
          <FloatAddBtn onPress={onOpen} colors={["#ffadad","#f67070","#FF0000"]}/> : null}
      </ImageBackground>
      <AddModal ShowMessage={ShowMessage} Message={Message}
                numberValue={15} ChangeChecked={ChangeChecked}
                setSelectedcategory={setSelectedcategory} setTaskRelatedNameId={setTaskRelatedNameId}
                setselectedrelatedname={setselectedrelatedname}
                setvisibleAddModal={setvisibleAddModal} setCategoryId={setCategoryId}
                visibleAddModal={visibleAddModal} setShowMessage={setShowMessage} ShowButton={ShowButton}
                onPressAdd={AddFeature} tittlebtn={"Add Feature"} setCheked={setCheked} Cheked={Cheked} />


      <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
    </Container>
  );
}


export default Project_Features;
