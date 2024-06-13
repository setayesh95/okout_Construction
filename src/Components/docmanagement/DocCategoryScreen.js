import { Container } from "native-base";
import { Header } from "../component/Header";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, ImageBackground, Linking, PermissionsAndroid, Text, View } from "react-native";
import { Styles } from "../Styles";
import { LogOutModal } from "../component/LogOutModal";
import { Footer1 } from "../component/Footer";
import { removeDataStorage,writeDataStorage } from "../Get_Location";
import Doc_List_Item from "../component/Doc_List_Item";
import { readOnlineApi } from "../ReadPostApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from "rn-fetch-blob";
import FileViewer from "react-native-file-viewer";
const Photoes = require("../Photoes");
const Api = require("../Api");
const GLOBAL = require("../Global");
function DocCategoryScreen({ navigation, navigation: { goBack } }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [modules, setmodules] = useState('');
  const [ShowMessage, setShowMessage] = useState(false);
  const [ShowMessageDelete, setShowMessageDelete] = useState(false);
  const [Message, setMessage] = useState("");
  const [categorylist, setcategorylist] = useState([{  value: '1',name: ' Architect',Code:'Demo5',
    Reference:'07/05/2024',Notes:'07/05/2024',CreatedOn:'Okout Admin',CreatedBy:'07/05/2024'}]);
  const [data, setdata] = useState(['']);
  useEffect(() => {
    if(GLOBAL.Projectdocinfo==='')
      get_document();
    else {
      GLOBAL.DocSubCategoryTitle='Doc sub Management'
      getDocstructor();
    }
  }, []);
  const getDocstructor=async ()=>{
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.get_document_structor + `userId=${GLOBAL.UserInformation?.userId}&relatedName=${GLOBAL.Projectdocinfo}&relatedId=${GLOBAL.SelectId}`).then(json => {
        let data_New = [];
        let getDoc = [];
        let data = [];
        console.log(json,'json')
        json?.sections?.forEach((obj) => {
          getDoc.push({
            Id: obj?.sectionId,
            name: obj?.sectionTitle,
            documents:obj?.documents,
            type:'Cat'
          });
        });

        json?.sectionMenu?.forEach((obj) => {
          data.push({
            value: obj?.id,
            label: obj?.name,
          });
        });
        setdata(data)
        setmodules(getDoc)
      });

    }

  }
  const get_document= async () => {
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.get_document + `userId=${GLOBAL.UserInformation?.userId}&sectionId=${GLOBAL.DocID}`).then(json => {
        let getDoc = [];
        let data = [];
        let data_New = [];
        json?.sections?.forEach((obj) => {
          getDoc.push({
            Id: obj?.sectionId,
            name: obj?.sectionTitle,
            documents:obj?.documents,
            type:'Cat'
          });
        });
if(GLOBAL.documents) {
  const NewDoc = GLOBAL?.documents.map((obj, i) => {
    const dataList = [{
      value: 0,
      label: "Open",
    }, {
      value: 1,
      label: "Download",
    }];
    const statusList = [];
    // obj?.documentMenu?.forEach((obj) => {
    //   dataList.push({
    //         value: obj?.id,
    //         label: obj?.name,
    //   });
    // });
    obj?.documentStatus?.forEach((obj) => {
      statusList.push({
        value: obj?.id,
        label: obj?.name,
      });
    });
    return {
      ...obj, data: dataList, status: statusList,
    };
  });
  data_New = [...getDoc];
  NewDoc?.forEach((obj) => {
    data_New.push({
      Id: obj?.documentId,
      name: obj?.documentTitle,
      documentStatusTitle: obj.documentStatusTitle,
      documentVersion: obj.documentVersion,
      documentMenu: obj?.documentMenu,
      documentStatus: obj?.documentStatus,
      documentUrl: obj.documentUrl,
      documentName: obj.documentUrl.split("/")?.[4],
      type: "SubCat",
      data: obj.data, status: obj.status,
    });
  });

  setmodules(data_New)
}
else {
  setmodules(getDoc)
}
        json?.sectionMenu?.forEach((obj) => {
          data.push({
            value: obj?.id,
            label: obj?.name,
          });
        });
        setdata(data)
        writeDataStorage(GLOBAL.Get_Docmanagecategory, json);
      });
    }
    else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.Get_Docmanage));
      let getDoc = [];
      let data = [];
      let data_New = [];
      json?.sections?.forEach((obj) => {
        getDoc.push({
          Id: obj?.sectionId,
          name: obj?.sectionTitle,
          documents:obj?.documents,
          type:'Cat'
        });
      });
      if(GLOBAL.documents) {
        const NewDoc = GLOBAL?.documents.map((obj, i) => {
          const dataList = [{
            value: 0,
            label: "Open",
          }, {
            value: 1,
            label: "Download",
          }];
          const statusList = [];
          // obj?.documentMenu?.forEach((obj) => {
          //   dataList.push({
          //         value: obj?.id,
          //         label: obj?.name,
          //   });
          // });
          obj?.documentStatus?.forEach((obj) => {
            statusList.push({
              value: obj?.id,
              label: obj?.name,
            });
          });
          return {
            ...obj, data: dataList, status: statusList,
          };
        });
        data_New = [...getDoc];
        NewDoc?.forEach((obj) => {
          data_New.push({
            Id: obj?.documentId,
            name: obj?.documentTitle,
            documentStatusTitle: obj.documentStatusTitle,
            documentVersion: obj.documentVersion,
            documentMenu: obj?.documentMenu,
            documentStatus: obj?.documentStatus,
            documentUrl: obj.documentUrl,
            documentName: obj.documentUrl.split("/")?.[4],
            type: "SubCat",
            data: obj.data, status: obj.status,
          });
        });

        setmodules(data_New)
      }
      else {
        setmodules(getDoc)
      }
      json?.sectionMenu?.forEach((obj) => {
        data.push({
          value: obj?.id,
          label: obj?.name,
        });
      });
      setdata(data)
    }
  };
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    navigation.navigate("LogIn");
  };
  ///Bottom menu click On LogOut button///
  const logout_Url = () => {
    setshowModalDelete(true);
  };
  const Navigate_Url = (Url) => {
    GLOBAL.Projectdocinfo===''
    navigation.navigate(Url);
  };
  const openSettings = () => {
    Linking.openSettings();
  };
  const download=async(documentUrl,documentName)=> {
    const granted = PermissionsAndroid.RESULTS.GRANTED;
    const FilePath =documentUrl;
    const Filename=documentName
    try {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const android = RNFetchBlob.android;
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob
          .config({
            addAndroidDownloads: {
              useDownloadManager: true,
              title: Filename,
              description: "File will be Downloaded",
              notification: true,
              path: dirs.DownloadDir+`/${Filename}`,
            },
          })
          .fetch('GET',FilePath, {
            //some headers ..
          })
          .then((res) => {
            console.log(res,'resresresres')
            // the path should be dirs.DocumentDir + 'path-to-file.anything'
            android.actionViewIntent(
              res.path(),
              "application/vnd.android.package-archive"
            );
            FileViewer.open(dirs.DownloadDir+ `/${Filename}`)
          });
      }
      else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Storage Permission Denied with Never Ask Again.');
        Alert.alert(
          'Storage Permission Required',
          'App needs access to your storage to read files. Please go to app settings and grant permission.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: openSettings },
          ],
        );
      }
      else {
        console.log("please grant permission");
      }
    } catch (err) {
      console.log("display error",err)    }
  };
  const renderItem = ({ item, index }) => (
    <Doc_List_Item key={index}  value={item} SeeDetail={SeeDetail} categorylist={categorylist} Screen={'category'}
                   Navigate_Url={Navigate_Url} Message={Message} data={data} download={download}
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
    GLOBAL.DocID=value.Id
    GLOBAL.documents=value.documents;
    if(GLOBAL.Projectdocinfo==='')
    GLOBAL.DocSubCategoryTitle=GLOBAL.DocSubCategoryTitle+' / '+value.name
    else
      GLOBAL.DocSubCategoryTitle=GLOBAL.Projectdocinfo+' / '+value.name
    //navigation.navigate("DocSubCategoryScreen");
    get_document()
  };
  const backnavigate=()=>{
    GLOBAL.Projectdocinfo='';
    goBack()
  }
  return (
    <Container  style={{backgroundColor:GLOBAL.backgroundColor}}>
      <Header colors={["#8bc3f8", "#4a7fb3", "#1c3045"]}
              StatusColor={"#8bc3f8"} onPress={backnavigate} Title={GLOBAL.DocSubCategoryTitle} />
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
export default DocCategoryScreen;
