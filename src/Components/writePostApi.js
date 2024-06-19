import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePicker from "react-native-image-crop-picker";
let List=[]
const GLOBAL = require("./Global");
export async function writePostApi(type, Url, formdata, ImageSourceviewarrayUpload)
  {

  const  writeOnlineApi = async (type,Url, formdata) => {
    const requestOptions={
      method: type,
      headers: { "Content-Type": "multipart/form-data" },
      body:formdata,
    };
    return (
      fetch(GLOBAL.OrgAppLink_value + Url, requestOptions)
        .then(resp => {
          return resp.json();
        }).then(json => {

        return json;
      }).catch(error => console.warn("Imageee", error)));
    };

    const saveAsynStorage=async(STORAGE_KEY,STORAGE_OBJ)=> {
      try
      {

        writeDataStorage(STORAGE_KEY,STORAGE_OBJ);
        var returnData = undefined//await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(STORAGE_OBJ));

        return returnData;
      }
      catch (error)
      {
      }
    };
    const  writeDataStorage=async (key, obj)=>{
      try {
        await AsyncStorage.setItem(key, JSON.stringify(obj));
      } catch (e) {
      }
    }
    const  removeItemValue=async (STORAGE_KEY)=> {
      try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        return true;
      }
      catch(exception) {
        return false;
      }
    }
    const writeOfflineApi=async (type,Url, formdata)=>{
      try{
        let get_MethodsList = await AsyncStorage.getItem(GLOBAL.offline_data)
        let List = [];
        let AllList=[];
        let ID=0

        if(get_MethodsList!==null) {
          ID = parseInt(JSON.parse(get_MethodsList).length) + 1;
        }
        else {
          ID = 0;
        }
        List.push({
          type,
          Url,
          formdata,
          ImageSourceviewarrayUpload:ImageSourceviewarrayUpload,
          id:ID
        });
        if(get_MethodsList!==null) {
          AllList = [...JSON.parse(get_MethodsList),...List];
        }
        else {
          AllList = [...List]
        }
        var returnData = saveAsynStorage(GLOBAL.offline_data,AllList);
        return returnData;
      }
      catch(error){
        return false;
      }
    }
    if (GLOBAL.isConnected === true)
    {
      return writeOnlineApi(type,Url, formdata)
    }
    else {
        return writeOfflineApi(type,Url,formdata,ImageSourceviewarrayUpload)
    }
    let json='';
    json=undefined;
    return json;
  }
export async function selectPhotocamera()
{

  return (
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // cropping: true,
      // hideBottomControls:false,
      // enableRotationGesture:true,
    }).then(response => {
      return response;
    })
  )
};

  export async function selectPhotoGallery()
  {
  return (
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      mediaType: "photo",
      includeExif: true,
      // cropping: true,
      // hideBottomControls:false,
    }).then(response => {
      return response;
    })
   );
};



export async function selectPhotocameraVideo()
{

  return (
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(response => {
      return response;
    })
  )
};

export async function selectPhotoGalleryVideo()
{
  return (
    ImagePicker.openPicker({
      mediaType: 'video',
      includeExif: true,
      multiple: true,
    }).then(response => {
      return response;
    })
  );
};
