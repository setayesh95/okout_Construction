import React, { useEffect, useRef, useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity, Linking, Button, ImageBackground, Modal, Image, LogBox,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Styles } from "../Styles";
import normalize from "react-native-normalize";
import { ButtonI } from "./ButtonI";
import {TaskImages} from './TaskImages'
import {Taskdropdown} from './Taskdropdown'
const { width: viewportWidth } = Dimensions.get('window');
const GLOBAL = require("../Global");
const Api = require("../Api");
const Photoes=require('../Photoes')
let RelatedId_Info=''
const SLIDER_1_FIRST_ITEM = 0;
function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(83);
const itemHorizontalMargin = wp(3);
const  sliderWidth=viewportWidth
const itemWidth= slideWidth + itemHorizontalMargin * 2.2
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import ToggleSwitch from "toggle-switch-react-native";
import { Dropdown,MultiSelect } from "react-native-element-dropdown";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../Colors";
import Carousel from "react-native-snap-carousel";
import Task_Edit_Image from "./Task_Edit_Image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { geocodePosition, requestLocationPermission, writeDataStorage } from "../Get_Location";
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoder";
import MapView, { Marker } from "react-native-maps";
import { writePostApi } from "../writePostApi";
import { readOnlineApi } from "../ReadPostApi";
import { DropDownItems } from "./DropDownItems";
import Voice from "@react-native-voice/voice";
import { TaskFilterDropDown } from "./TaskFilterDropDown";
let numOfLinesCompany = 0;
const screen = Dimensions.get('window');
const ASPECT_RATIO = (screen.width / screen.height)/4;
const LATITUDE_DELTA = 4;
let City=[]

const LONGITUDE_DELTA =( LATITUDE_DELTA * ASPECT_RATIO)/2;
function TextInputI({ GeoAddressCity,
                      GeoAddressCountry,
                      GeoAddressStreet,GeoAddressPostalCode,
                      CityList,CountryfList,
                      Version,
                      onChangeText,
                      setCheked,
                      numberValue,
                      Name,setshowMap,
                      tittlebtn,
                      ChangeChecked,
                      Cheked,onOpen,Full,
                      Pinrecovery,location,
                      emailOnpress,DeleteImage,marker,setErrors,setShowButton,WorkTypeId,relatedId,Add_Task_Offline2,
                      featureName,Boolean,Btn,iconcheck,checkOrgCode,setCountryList,setCityList,showMap,
                      setGeoAddressCity,setGeoAddressCountry,SelectedParentTask, setSelectedParentTask,ParentTaskId, setParentTaskId,
                       setvisible,ImageSourceviewarray,modules, setselectedpriority,setmarker,setImageSourceviewarray,
                      setcountryId,setcityId,getCity,geoLat,geoLong,setShowMessage,priorityId, setpriorityId,
                      setSelectedcategory,selectedcategory,Taskcategory,value,Taskassigned,setSelectedassigned,selectedassigned,
                      Taskpriority,selectedpriority,setSelectedpriority,setOpen,setdateType,setGeoAddressPostalCode
                      ,DateFormatplanend,DateFormatplanstart,Taskstatus,selectedstatus, setSelectedstatus,
                      selecteduser,setSelecteduser,Taskuser,setUserId,setCategoryId,setRelatedId,setOpenend,setPriorityId,setTaskStatusId,
                      selectedrelated,setSelectedrelated,error,ShowButton,reasons,ShowMessage,Message,
                      Back_navigate,setShowWarningMessage,setShowBackBtn,RelatedNameList,TaskRelatedNameId, setTaskRelatedNameId,
                      selectedrelatedname,setselectedrelatedname,categoryId,GeoAddress,setGeoAddress,
                     selectedTaskSiteName,setselectedTaskSiteName,dateDifferenceHours,setLocation,setGeoAddressStreet,
                      selectedunitName,setselectedunitName,selectedsectionName,setselectedsectionName,
                      selectedfeatureName,setselectedfeatureName,TimeRelated,TimeRelatedselct, setTimeRelatedselct,dateDifferenceDays,
                      TaskWorkType,selectedWorkType, setselectedWorkType, setWorkTypeId,setTaskWorkType,setTaskpriority,ShowBtn, setShowBtn,
                      My_TaskList_server2,getAllProjectInfo_dyb,getAllProjectInfo,setMessage,setRelatedNameList,Parentlist,setselectparentId,
                      selectparentname, setselectparentname,DirectoryUser,DirectoryUserName,setDirectoryUserName,setDirectoryUserId,
                      setOpenEnd,DateFormat,DateFormatEnd,Status,StatusName,setStatusName,setStatusId,selectFile,filename,Recipient,
                      RecipientName,setRecipientName,RecipientId,setRecipientId,setRelatedName,uploadType,setShowMessagetype,
                      setTaskissuesId,selectedTaskissues, setselectedTaskissues,Taskissues
                    }) {
  const { navigate } = useNavigation();
  const player = useRef(null);
  const videoRef = useRef(null);
  const [securetText, setSecuretText] = useState(true);
  const [securetTextConfirm, setSecuretTextConfirm] = useState(true);
  const [slider1ActiveSlide,setslider1ActiveSlide] = useState(0);
  let _slider1Ref = useRef(null);
  const [attachmentId, setattachmentId] = useState(true);
  const [taskId, settaskId] = useState(true);
  const [iconsecuret, setIconsecuret] = useState("eye-off");
  const [iconsecuret2, setIconsecuret2] = useState("eye-off");
  const [isFocus, setIsFocus] = useState(false);
  const [switchDYB, setswitchDYB] = useState(false);
  const [switchDYB2, setswitchDYB2] = useState(false);
  const [isFocusassigned, setIsFocusassigned] = useState(false);
  const [isFocuspriority, setIsFocuspriority] = useState(false);
  const [isFocusrelated, setIsFocusrelated] = useState(false);
  const [isFocususer, setIsFocususer] = useState(false);
  const [isFocusstatus, setIsFocusstatus] = useState(false);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [showNewInput, setshowNewInput] = useState(false);
  const [TaskProjectId, setTaskProjectId] = useState('');
  const [TaskRelated, setTaskRelated] = useState([]);
  const [TaskSiteId, setTaskSiteId] = useState('');
  const [TaskunitId, setTaskunitId] = useState('');
  const [TasksectionId, setTasksectionId] = useState('');
  const [TaskfeatureId, setTaskfeatureId] = useState('');
  const [SiteList, setSiteList] = useState([]);
  const [unitList, setunitList] = useState([]);
  const [sectionList, setsectionList] = useState([]);
  const [featureList, setfeatureList] = useState([]);
  const [categoryLevellist, setcategoryLevellist] = useState([]);
  const [entityIdList, setEntityIdList] = useState([]);
  const [categoryLevel, setcategoryLevel] = useState('');
 const [categoryEntityShow, setcategoryEntityShow] = useState('n');
  const [RelatedNameLvalue, setRelatedNameLvalue] = useState('');
  const [tasktitleerro, settasktitleerro] = useState(false);
  const [tasknoteerro, settasknoteerro] = useState(false);

  const [recognized, setRecognized] = useState('');
  const [volume, setVolume] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState('');
  const [endtitle, setEndtitle] = useState('');
  const [startedtitle, setStartedtitle] = useState('');
  const [resultstitle, setResultstitle] = useState('');
  const [partialResults, setPartialResults] = useState([]);
  const [Title, setTitle] = useState('');
  const [RelatedNameListTask, setRelatedNameListTask] = useState([]);
  const videoError = error => {

  }
  const  navigatebtn=()=>{
    setShowBackBtn(false)
  }
  const FilterTaskEntityDropDown=(Item)=> {
  }
  const getListsTask=async(TaskRelatedNameId,value)=>{
    const json=await getEntityInfo(TaskRelatedNameId,value)
    RelatedNameListTask.find((p)=>p.value===TaskRelatedNameId).data=[];
    for (let item in json.relatedList) {
      let obj = json.relatedList?.[item];
      RelatedNameListTask.find((p)=>p.value===TaskRelatedNameId).data?.push({value: obj.relatedId,
        label: obj.relatedName,})
    }

  }
    const Task_subcategory =async (value) => {

    writeDataStorage(GLOBAL.Category_Last_Info,value);
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.Task_subcategory + `userId=${GLOBAL.UserInformation?.userId}&categoryId=${value}`).then(json => {
        let A = [];

        const dataList=[];
        for (let item in json?.subCategories) {
          let obj = json?.subCategories?.[item];
          A.push({
            value: obj.categoryId,
            label: obj.categoryTitle,
            categoryEntityShow:obj.categoryEntityShow,
            categoryLevel:obj.categoryLevel,
            data:dataList,
          });
        }

        setRelatedNameList(A);
        if(GLOBAL.TaskRelatedCheck!=='') {
          A.find((p) => p.value === GLOBAL.relatedId).label = "";
        }
        if(GLOBAL.TaskRelatedNameId!==''){
         if(GLOBAL.TaskRelatedNameId==='1') {
            setcategoryLevellist(A.filter((p)=>parseInt(p?.categoryLevel)<=2))

          }
          else if(GLOBAL.TaskRelatedNameId==='2') {
            setcategoryLevellist(A.filter((p)=>parseInt(p?.categoryLevel)<=3))

          }
          else if(GLOBAL.TaskRelatedNameId==='3') {
            setcategoryLevellist(A.filter((p)=>parseInt(p?.categoryLevel)<=4))
          }
          else if(GLOBAL.TaskRelatedNameId==='4') {
            setcategoryLevellist(A.filter((p)=>parseInt(p?.categoryLevel)<=5))

          }
        }
        else if(value==='4'||value==='5') {
          console.log(value==='4','value===\'4\'',value)
          setRelatedNameListTask (A);

          if(value==='4'){

            getSites3(A);
          }

        }
        else if(value==='1'||value==='2')
        {
          setRelatedNameListTask (A);
          console.log(A,'A: Task_subcategory')
          const first = A?.find((_, index) => !index);
          Task_RelatedList(first?.value,A);
          // Task_RelatedList(Id,A);
        }
        else {
          setcategoryLevellist(A)
        }
        writeDataStorage(GLOBAL.Task_SubCategory, json);
      })
    }
    else {
      let A=[]
        let json =JSON.parse( await AsyncStorage.getItem(GLOBAL.Task_SubCategory));
        for (let item in json?.subCategories) {
          let obj = json?.subCategories?.[item];
          A.push({
            value: obj.categoryId,
            label: obj.categoryTitle,
            categoryEntityShow:obj.categoryEntityShow,
            categoryLevel:obj.categoryLevel
          });
        }
      setRelatedNameList(A);
      }
  }
  const getSites3=async (list)=>{
    console.log('getSites3')
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.RentalUnits + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        writeDataStorage(GLOBAL.RentalUnits_List, json?.allSiteInfo);
        let A = [];
        json?.allSiteInfo?.forEach((obj) => {
          A.push({
            value: obj.siteId,
            label: obj.siteName,
            units:obj.units,
          });
          console.log(list,'list')
          const first = list?.find((_, index) => !index);
          if(list?.length!==0) {
            list?.find((p) => p?.value ===first?.value)?.data?.push({
              value: obj.siteId,
              label: obj.siteName,
            });
          }
        })

        setRelatedNameListTask (list);
        setSiteList(A);
      });
    }
    else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.RentalUnits_List));
      let A = [];
      json?.forEach((obj) => {
        A.push({
          value: obj.siteId,
          label: obj.siteName,
          units:obj.units
        });
      })
      setSiteList(A);
    }
  }

  const getLocation =async (coordinate) => {
    requestLocationPermission().then(res => {
      if (res) {
        setLocation(coordinate);
        var NY = {
          lat: coordinate.latitude,
          lng: coordinate.longitude,
        };
        geocodePosition(NY).then(res => {
          if (res) {
            setGeoAddress(res?.[0]?.formattedAddress);
            setGeoAddressCountry(res?.[0]?.country);
            if(res?.[0]?.adminArea!==null)
              setGeoAddressCity(res?.[0]?.adminArea);
            if(res?.[0]?.postalCode!==null)
              setGeoAddressPostalCode(res?.[0]?.postalCode);
            if(res?.[0]?.streetName!==null)
              setGeoAddressStreet(res?.[0]?.streetName);
            getCountry_city(res?.[0]?.country, res?.[0]?.adminArea);
          } else {
            getCountry_city("United States", "California");
          }
        })
          .catch(err => console.log(err, "errrrr"));
      }})
  };
  const getCountry_city = async (country,adminArea) => {
    let A=[]
    GLOBAL.Country?.countries?.forEach((obj) => {
      if(obj?.countryName!=='') {
        A.push({
          value: obj?.countryId,
          label: obj?.countryName,
        });
      }
    });
    setCountryList(A);
    City=GLOBAL.City;
    let Default_countryId=A?.find((p)=>p?.label===country)?.value
    setcountryId(Default_countryId)
    if(Default_countryId!==''||Default_countryId!==null) {
      getCity3(Default_countryId,adminArea);
    }
  };
  const getCity3 = async (value,adminArea) => {
    let A = [];
    let City_filter=City?.cities?.filter((p)=>p?.coutryId===value)
    City_filter?.forEach((obj) => {
      if(obj?.cityName!=='') {
        A.push({
          value: obj?.cityId,
          label: obj?.cityName,
          coutryId:obj?.coutryId
        });
      }
    });
    setCityList(A);
    if(adminArea!==''){
      let Default_cityId= A?.find((p)=>p.label===adminArea)?.value
      setcityId(Default_cityId)
    }
  };
  const _renderItem_Carousel = ({item, index}) => {
    return (
      <Task_Edit_Image item={item} key={index} onOpen={onOpen}
                       colors={ ['#a39898','#786b6b','#382e2e'] }
                       IconColor={"#786b6b"} setattachmentId={setattachmentId} settaskId={settaskId} setshowModalDelete={setshowModalDelete} />
    );
  }
  const validationSchema30 = Yup.object().shape({
    CompanyName: Yup.string().required("please! Company Name?"),
    CustomerName: Yup.string().required("please! Customer Name?"),
    TRNNo: Yup.string().required("please!  TRN Number?"),
    Phone: Yup.string().matches(new RegExp("[0-9]{7}")).required("please! PhoneNumber?"),
    Email: Yup.string()
      .required("please! email?")
      .email("well that's not an email"),
    Street: Yup.string().required("please! Street Name?"),
  });
  const validationSchema1 = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .required("please! email?")
      .email("well that's not an email"),
    password: Yup.string()
      .required()
      .min(8, "password should be at least 8 characters long."),
    confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const validationSchema2 = Yup.object().shape({
    UserName: Yup.string().required(),
    password: Yup.string()
      .required()
      .min(7, "pretty sure this will be hacked"),
    Confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),

  });
  const validationSchema3 = Yup.object().shape({
    Projectname: Yup.string()
      .required("ProjectName ! Please?")

  });
  const validationSchema34 = Yup.object().shape({
    DirectoryName: Yup.string()
      .required("Directory Name ! Please?")

  });
  const validationSchema38 = Yup.object().shape({
    Version: Yup.string()
      .required("Version ! Please?")

  });
  const validationSchema12 = Yup.object().shape({
    SectionName: Yup.string()
      .required("SectionName ! Please?")
  });
  const validationSchema14 = Yup.object().shape({
    Unitname: Yup.string()
      .required("UnitName ! Please?"),
    UnitNote: Yup.string()
      .required("UnitNote ! Please?")

  });
  const validationSchema13 = Yup.object().shape({
    SectionName: Yup.string()
      .required("SectionName ! Please?")

  });
  const validationSchema18 = Yup.object().shape({
    TaskNote: Yup.string()
      .required("Reject Reason ! Please?")

  });
  const validationSchema19 = Yup.object().shape({
    CaseNote: Yup.string()
      .required("CaseNote ! Please?"),
    FeedbackNote: Yup.string()
      .required("CaseNote ! Please?")

  });
  const validationSchema32 = Yup.object().shape({
    taskNote: Yup.string()
      .required("Reason ! Please?"),
  });
  const validationSchema15 = Yup.object().shape({
    FeatureName: Yup.string()
      .required("FeatureName ! Please?")
  });
  const validationSchema4 = Yup.object().shape({
    sitename: Yup.string()
      .required("ProjectSite Name ! Please?"),
  });
  const validationSchema6 = Yup.object().shape({
    username: Yup.string()
      .required("please! username?"),
    password: Yup.string()
      .required()
      .min(4, "pretty sure this will be hacked"),
    orgkey: Yup.string().required("please! Orgkey?")
  });
  const validationSchema22 = Yup.object().shape({

    orgkey: Yup.string().required("please! Orgkey?"),
    email: Yup.string().required("please! email?").email("well that's not an email")
  });
  const validationSchema7 = Yup.object().shape({
    OTPNumber: Yup.string().required("please! OTP Number?"),
    password: Yup.string()
      .required()
      .min(4, "pretty sure this will be hacked"),
    confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const validationSchema5 = Yup.object().shape({
    Title: Yup.string()
      .required("task Title ! Please?"),

  });
  const validationSchema24 = Yup.object().shape({
    TaskNote: Yup.string()
      .required("Description ! Please?"),
  });
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
    <View style={Styles.DeleteModalStyle}>
      <View style={Styles.With100NoFlex}>
        <Image style={{width:'27%',aspectRatio:1,marginVertical:normalize(10)}}
               source={Photoes.Alert}
               resizeMode="contain" />
        <View style={Styles.With100NoFlex}>
          <Text style={Styles.txt_left2}>
            Do you want to delete Image from List?
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
            DeleteImage(attachmentId, ImageSourceviewarray,taskId);
            setshowModalDelete( false)
            setIsFocus(false)
          }} >
            <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
  const  string_equalityTask=(values)=>{
    let isValid = false;
      if (values?.Title!==value?.taskTitle) {
        setShowBackBtn(false)

        isValid=true;
      }
     else if (values?.TaskNote!==value?.taskDescription) {
        setShowBackBtn(false)
        isValid=true;
      }
      if(isValid)
      {
        isValid=true
        Back_navigate(false)
      }
      else{
        Back_navigate()
      }
  }
  const  string_equalityAssignTask=(values)=>{
    let isValid = false;
      if (values?.Title !== value?.taskTitle) {
        setShowBackBtn(false)
        isValid=true;
      }
      else  if(values?.DateFormatplanend!==DateFormatplanend){
        setShowBackBtn(false)
        isValid=true;
      }
      else  if(values?.DateFormatplanstart!==DateFormatplanstart){
          setShowBackBtn(false)
          isValid=true;
      }
      else if (values?.TaskNote!==value?.taskFeedback) {
        setShowBackBtn(false)
        isValid=true;
      }
else if(values?.CaseNote?.split("\n")?.length>1){
        if (values?.CaseNote?.split("\n")?.[2]!== '') {
          setShowBackBtn(false)
          isValid=true;
        }
      }
else  if(values?.CaseNote?.split("\n")?.length===1){
        if (values?.CaseNote===''||values?.CaseNote.split("\n")?.[0]!== value?.taskRequestNotes) {
          setShowBackBtn(false)
          isValid=true;
        }
      }
    if(isValid)
    {
      //setShowBackBtn(false)
      isValid=true
      Back_navigate(false)
    }
    else{
      Back_navigate()
    }
  }

  const width = Dimensions.get("screen").width;
  const inputStyle = {
    borderWidth: 1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius: normalize(6),
    padding: 12,
    marginBottom: 5,
    width:'100%',
    paddingVertical: 4,
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontFamily:'TisaSansProBoldItalic',

  };
  const inputStyleCustomer = {
    borderWidth: 1,
    borderColor:GLOBAL.OFFICIAL_Button,
    borderRadius: normalize(6),
    padding: 12,
    marginBottom: 5,
    width:'100%',
    paddingVertical: 4,
    color: GLOBAL.OFFICIAL_BLUE_COLOR,
    fontFamily:'TisaSansProBoldItalic',
    backgroundColor:GLOBAL.OFFICIAL_WITE_COLOR,
  };
  const inputStyleProfile = {

    borderRadius: normalize(6),
    padding:12,
    marginBottom:5,
    width:'100%',
    paddingVertical:6,
    color:Colors.button,
    backgroundColor:GLOBAL.OFFICIAL_WITE_COLOR,
    fontFamily:'TisaSansProBoldItalic',
  };
  const inputStyleProfileNumber = {
    borderRadius: normalize(6),
    padding:12,
    marginBottom:5,
    width:'100%',
    paddingVertical:6,
    color:Colors.button,
    backgroundColor:GLOBAL.OFFICIAL_WITE_COLOR,
    fontFamily:'aSignboardCpsNrBoldItalic',
  };
  const inputStyleLocation = {
    borderWidth:1,
    borderColor:'#1e233b',
    borderRadius:normalize(6),
    backgroundColor:'#1e233b',
    padding:6,
    marginBottom:5,
    width:'100%',
    color:"#fff",
    marginVertical: normalize(8),
    paddingVertical: 4,
  };
  const onpress = () => {
    if (securetText === false) {
      setSecuretText(true);
      setIconsecuret("eye-off");
    } else {
      setSecuretText(false);
      setIconsecuret("eye");
    }
  };
  const onpressConfirm = () => {

    if (securetTextConfirm === false) {
      setSecuretTextConfirm(true);
      setIconsecuret2("eye-off");
    } else {
      setSecuretTextConfirm(false);
      setIconsecuret2("eye");
    }
  };
  const CreateTask = (values) => {
    if(values?.Title===''){
      settasktitleerro(true)
    }
    // else if(values?.TaskNote===''){
    //   settasknoteerro(true)
    // }
    else {
      let idsArray = "";
      const date = new Date();
      const Year = date.getFullYear();
      const Day = date.getDate();
      const Month = date.getMonth() + 1;
      const Hour=date.getHours();
      const Minute=date.getMinutes()
      const Second=date.getSeconds()
      const TodayDate = `${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
      const formData = new FormData();
      if (categoryId === 0) {
        setErrors("selectedcategory");
      }
      else {
        setShowButton(false)
        formData.append("userId",  GLOBAL.UserInformation?.userId);
        formData.append("categoryId", categoryId);
        formData.append("workTypeId", WorkTypeId);
        if(categoryId==='1'||categoryId==='2') {
          formData.append("relatedId", relatedId);
          formData.append("relatedName", selectedrelatedname.label);
        }
        formData.append("requestDate", TodayDate);
        formData.append("priorityId", priorityId);
        formData.append("planStartDate", null);
        formData.append("planEndDate", null);
        formData.append("taskStatusId", "1");
        formData.append("title", values?.Title);
        formData.append("description", values?.TaskNote);
        formData.append("requestedBy", GLOBAL?.UserInformation?.userId);
        formData.append("requestBy", GLOBAL?.UserInformation?.userId);
        if(GLOBAL.Subtask!=='')
          formData.append("parentTaskId", GLOBAL.Subtask);
        else
          formData.append("parentTaskId", null);
        formData.append("assignedTo", null);
        if (GLOBAL.isConnected=== false) {
          Add_Task_Offline2(values,TodayDate);
        }
        if (ImageSourceviewarray.length !== 0) {
          for (let i = 0; i < ImageSourceviewarray?.length; i++) {
            idsArray = ImageSourceviewarray[i];
            formData.append("attachments[]", {
              uri: idsArray.uri,
              type: idsArray.type,
              name: idsArray.fileName,
            });
          }
          writePostApi("POST", Api.AddTask, formData, ImageSourceviewarray).then(json => {
            if (json) {
              setShowMessagetype(json?.status);
              if (json?.status === true) {
                My_TaskList_server2();
                getAllProjectInfo();
                getAllProjectInfo_dyb();
                values.TaskNote=''
                values.Title=''
                setResults('');
                setTitle('')
                setImageSourceviewarray([])
                setMessage(json?.msg);
                setMessage(json?.msg);
                setShowMessage(true);
                setShowButton(true)
                setShowBtn(true)
                setTimeout(function(){ setShowMessage(false)}, 4000)
              }
              else{
                setMessage(json?.msg);
                setShowMessage(true);
                setShowButton(true)
                setShowBtn(true)
                const timerId = setInterval(() => {
                  setShowMessage(false);
                }, 4115);
                return () => clearInterval(timerId);
              }
            }
            else {
              values.TaskNote=''
              values.Title=''
              setMessage("Your task successfully added");

              setShowMessage(true);
              setShowButton(true)
              setShowBtn(true)
              setImageSourceviewarray([]);
              setShowBtn(true)
              setTimeout(function(){ setShowMessage(false)}, 4000)
            }
          });
        }
        else {
          writePostApi("POST", Api.AddTask, formData).then(json => {
            if (json) {
              setShowMessagetype(json?.status);
              if (json?.status === true) {
                values.TaskNote=''
                values.Title='';
                setResults('');
                setTitle('')

                My_TaskList_server2();
                getAllProjectInfo();
                getAllProjectInfo_dyb();
                setMessage(json?.msg);
                setShowMessage(true);
                setShowButton(true)
                setShowBtn(true)
                setTimeout(function(){ setShowMessage(false)}, 4000)
              }
              else{
                setMessage(json?.msg);
                setShowMessage(true);
                setShowButton(true)
                setShowBtn(true)
                const timerId = setInterval(() => {
                  setShowMessage(false);
                }, 4115);
                return () => clearInterval(timerId);
              }
            }
            else {
              setMessage("Your task successfully added");
              values.TaskNote=''
              values.Title=''
              setShowMessage(true);
              setShowButton(true)
              setShowBtn(true)
              setTimeout(function(){ setShowMessage(false)}, 4000)
            }
          });
        }
      }
    }

  };

  const Task_WorkTypeList =async (Id) => {
    let WorkType_Info =JSON.parse(await AsyncStorage.getItem(GLOBAL.WorkType_Last_Info));
    if (GLOBAL.isConnected === true){
      readOnlineApi(Api.Task_WorkType+`userId=${GLOBAL.UserInformation?.userId}&categoryId=${Id}`).then(json => {
        let A = [];

        for (let item in json?.workTypeList) {
          let obj = json?.workTypeList?.[item];
          A.push({
            value: obj.workTypeId,
            label: obj. workTypeName,
          });
        }
        if(WorkType_Info!==''||WorkType_Info!==null){
          setselectedWorkType({
            label:A?.find(p => parseInt(p.value) ===parseInt(WorkType_Info))?.label,
            value:A?.find(p =>parseInt(p.value) ===parseInt(WorkType_Info))?.value,
            _index:A?.findIndex(p =>parseInt(p.value) ===parseInt(WorkType_Info)),
          });
          setWorkTypeId(WorkType_Info);
        }
        setTaskWorkType(A);
      });
    }
  };
  const Task_RelatedList = (Id,list,SubCategory_List) => {
    if (GLOBAL.isConnected === true)
    {
      readOnlineApi(Api.Task_Project+`userId=${GLOBAL.UserInformation?.userId}&categoryId=${Id}`).then(json => {
        let A = [];
        for (let item in json?.relatedList) {
          let obj = json?.relatedList?.[item];
          A.push({
            value: obj.relatedId,
            label: obj.relatedName,
          });
          console.log(A,'A')
          console.log(list,'list')
          if(list?.length!==0&&list!==undefined)
          {
            list.find((p) => p.value ===Id).data=[]
            list?.find((p) => p?.value ===Id)?.data?.push({
              value: obj.relatedId,
              label: obj.relatedName,
            });
          }
        }
        if(GLOBAL.TaskRelatedNameId!==''||RelatedId_Info!=='') {
          let seacrhId=A?.find(p =>parseInt(p.value) ===parseInt( GLOBAL.ProjectId))?.value
          const categoryId= SubCategory_List.find((p)=>p.categoryLevel==='2')?.value
          setSelectedrelated({
            label: A?.find(p =>parseInt(p.value) ===parseInt( GLOBAL.ProjectId))?.label,
            value: A?.find(p =>parseInt (p.value )=== parseInt( GLOBAL.ProjectId))?.value,
            _index: A?.findIndex(p => parseInt (p.value )=== parseInt( GLOBAL.ProjectId)),
          });
          if(GLOBAL.TaskRelatedNameId==='0') {
            setRelatedId(A?.find(p => p.value === GLOBAL.ProjectId)?.value);
          }
          else
            getSites(categoryId,seacrhId,SubCategory_List);
        }
        setTaskRelated(A);
      })
    }
    else {

    }

  };
  const Task_RelatedList2 = (Id) => {
    if (GLOBAL.isConnected === true)
    {
      readOnlineApi(Api.Task_Project+`userId=${GLOBAL.UserInformation?.userId}&categoryId=${Id}`).then(json => {
        let A = [];
        console.log(json?.relatedList,'json?.relatedList')
        for (let item in json?.relatedList) {
          let obj = json?.relatedList?.[item];
          A.push({
            value: obj.relatedId,
            label: obj.relatedName,
          });

        }
        setTaskRelated(A);
      })
    }
    else {

    }

  };
  const FindCategoryId=async(item)=>{

    const list =RelatedNameList.filter((p)=>p?.categoryLevel<=item?.categoryLevel)
    setcategoryLevellist(RelatedNameList.filter((p)=>p?.categoryLevel<=item?.categoryLevel))
    const first = list.find((_, index) => !index);
    Task_RelatedList(first.value,list);

  }
  const getLists=async(TaskRelatedNameId,value)=>{
    let list=''
    const json=await getEntityInfo(TaskRelatedNameId,value)
    RelatedNameList.find((p)=>p.value===TaskRelatedNameId).data=[];
    for (let item in json?.relatedList) {
      let obj = json?.relatedList?.[item];

      RelatedNameList?.find((p)=>p.value===TaskRelatedNameId)?.data?.push({  value: obj.relatedId,
      label: obj.relatedName,})
    }
  }
  const getSites = async (TaskRelatedNameId,value,SubCategory_List) => {
                 const json=await getEntityInfo(TaskRelatedNameId,value)
                let A = [];
                for (let item in json?.relatedList) {
                  let obj = json?.relatedList?.[item];
                  A.push({
                    value: obj.relatedId,
                    label: obj.relatedName,
                  });
                }
                setSiteList(A);
                  if(GLOBAL.TaskRelatedNameId!==''||RelatedId_Info!=='') {
                    let seacrhId=A?.find(p =>parseInt(p.value) ===parseInt( GLOBAL.SiteId))?.value
                    const categoryId= SubCategory_List.find((p)=>p.categoryLevel==='3')?.value;
                    console.log(A,'A')
                    console.log(GLOBAL.SiteId,'GLOBAL.SiteId')
                    console.log(A?.find(p => parseInt(p.value) ===parseInt(  GLOBAL.SiteId)),'A?.find(p => parseInt(p.value) ===parseInt(  GLOBAL.SiteId))')
                    setselectedTaskSiteName({
                      label:A?.find(p => parseInt(p.value) ===parseInt(  GLOBAL.SiteId))?.label,
                      value:A?.find(p =>parseInt(p.value) ===parseInt( GLOBAL.SiteId))?.value,
                      _index:A?.findIndex(p =>parseInt(p.value) ===parseInt( GLOBAL.SiteId)),
                    });
                    if(GLOBAL.TaskRelatedNameId==='1') {
                      setRelatedId(A?.find(p => parseInt(p.value) ===parseInt( GLOBAL.SiteId))?.value)
                    }
                    else {
                      getUnits(categoryId,seacrhId,SubCategory_List)
                    }
                  }
    }
  const getEntityInfo =async (categoryId,SearchId) => {
    return (
      readOnlineApi(Api.Task_Project+`userId=${GLOBAL.UserInformation?.userId}&categoryId=${categoryId}&relatedSearchId=${SearchId}`).then(json => {

       return json;
      }));


  };
  const getUnits =async (TaskRelatedNameId,value,SubCategory_List) => {
      const json=await getEntityInfo(TaskRelatedNameId,value)
        let A = [];
        for (let item in json?.relatedList) {
          let obj = json?.relatedList?.[item];
          A.push({
            value: obj.relatedId,
            label: obj.relatedName,
          });
        }
        setunitList(A);
        if(GLOBAL.TaskRelatedNameId!==''||RelatedId_Info!=='') {
          let seacrhId=A?.find(p => parseInt(p.value) ===parseInt(  GLOBAL.UnitId))?.value;
          const categoryId= SubCategory_List.find((p)=>p.categoryLevel==='4')?.value
          setselectedunitName({
            label:A?.find(p => parseInt(p.value) ===parseInt( GLOBAL.UnitId))?.label,
            value:A?.find(p => parseInt(p.value) ===parseInt(  GLOBAL.UnitId))?.value,
            _index:A?.findIndex(p => parseInt(p.value) ===parseInt(  GLOBAL.UnitId)),
          });
          if(GLOBAL.TaskRelatedNameId==='2'){
            setRelatedId(A?.find(p =>parseInt(p.value) ===parseInt(  GLOBAL.UnitId))?.value)
          }
          else
            getSection(categoryId,seacrhId,SubCategory_List)
        }
  };
  const getSection = async (TaskRelatedNameId,value,SubCategory_List) => {
    const json=await getEntityInfo(TaskRelatedNameId,value)
        let A = [];
        for (let item in json?.relatedList) {
          let obj = json?.relatedList?.[item];
          A.push({
            value: obj.relatedId,
            label: obj.relatedName,
          });
        }
        setsectionList(A);
        if(GLOBAL.TaskRelatedNameId!==''||RelatedId_Info!=='') {
          let seacrhId=A?.find(p => parseInt(p.value) ===parseInt(  GLOBAL.SectionId))?.value;
          const categoryId= SubCategory_List.find((p)=>p.categoryLevel==='5')?.value
          setselectedsectionName({
            label:A?.find(p => parseInt(p.value) ===parseInt( GLOBAL.SectionId))?.label,
            value:A?.find(p => parseInt(p.value) ===parseInt(  GLOBAL.SectionId))?.value,
            _index:A?.findIndex(p => parseInt(p.value) ===parseInt( GLOBAL.SectionId)),
          });
          if(GLOBAL.TaskRelatedNameId==='3'){
            setRelatedId(A?.find(p => parseInt(p.value) ===parseInt(  GLOBAL.SectionId))?.value)
          }
          else
            getFeatures(categoryId,seacrhId)
        }
  };
  const getFeatures = async (TaskRelatedNameId,value) => {
    const json=await getEntityInfo(TaskRelatedNameId,value)
        let A = [];
        for (let item in json?.relatedList) {
          let obj = json?.relatedList?.[item];
          A.push({
            value: obj.relatedId,
            label: obj.relatedName,
          });
        }
        setfeatureList(A);
        if(GLOBAL.TaskRelatedNameId==='4'||RelatedId_Info!=='') {
          setselectedfeatureName({
            label:A?.find(p => parseInt(p.value) ===parseInt(GLOBAL.UpdateFeatureID))?.label,
            value:A?.find(p => parseInt(p.value) ===parseInt(GLOBAL.UpdateFeatureID))?.value,
            _index:A?.findIndex(p =>parseInt(p.value) ===parseInt(GLOBAL.UpdateFeatureID)),
          });
          if(GLOBAL.TaskRelatedNameId==='4')
            setRelatedId(A?.find(p =>parseInt(p.value) ===parseInt(  GLOBAL.UpdateFeatureID))?.value)
        }
  };
  const getInfo=async ()=>{
    setCategoryId(GLOBAL?.categoryId);
    setSelectedcategory({label:"Subcontract",value:"1",_index:0});
    let SubCategory_List =JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_SubCategory2))
    setRelatedNameList(SubCategory_List);
    console.log(SubCategory_List,'SubCategory_List')
    setcategoryEntityShow('y');
    Task_WorkTypeList(GLOBAL?.categoryId);
    Task_RelatedList('1',[],SubCategory_List);
    if(GLOBAL.TaskRelatedNameId==='0') {
      setTaskRelatedNameId("0");
      setselectedrelatedname({label:"Project",value:"0",_index:0})
    }
    else if(GLOBAL.TaskRelatedNameId==='1') {
      setTaskRelatedNameId("1");
      setselectedrelatedname({label:"Site",value:"1",_index:1})
      setcategoryLevellist(SubCategory_List.filter((p)=>parseInt(p?.categoryLevel)<=2))
    }
    else if(GLOBAL.TaskRelatedNameId==='2') {
      setTaskRelatedNameId("2");
      setselectedrelatedname({label:"Unit",value:"2",_index:2})
      setcategoryLevellist(SubCategory_List.filter((p)=>parseInt(p?.categoryLevel)<=3))
    }
    else if(GLOBAL.TaskRelatedNameId==='3') {
      setTaskRelatedNameId("3");
      setselectedrelatedname({label:"Section",value:"3",_index:3})
      setcategoryLevellist(SubCategory_List.filter((p)=>parseInt(p?.categoryLevel)<=4))
    }
    else if(GLOBAL.TaskRelatedNameId==='4') {
      setTaskRelatedNameId("4");
      setselectedrelatedname({label:"Feature",value:"4",_index:4})
      setcategoryLevellist(SubCategory_List.filter((p)=>parseInt(p?.categoryLevel)<=5))
    }
  }
  const getSites2=async ()=>{
    if (GLOBAL.isConnected === true) {
      readOnlineApi(Api.RentalUnits + `userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        writeDataStorage(GLOBAL.RentalUnits_List, json?.allSiteInfo);
        let A = [];
        json?.allSiteInfo?.forEach((obj) => {
          A.push({
            value: obj.siteId,
            label: obj.siteName,
            units:obj.units
          });
        })
        setSiteList(A);
        getUnit2(GLOBAL.UnitId)
        let json2=A.find((p)=>p.value===GLOBAL.UnitId)?.units
        let B=[]
        json2?.forEach((obj) => {
          B.push({
            value: obj.unitId,
            label: obj.unitName,

          });
        })
        setunitList(B);
        if(GLOBAL.TaskRelatedCheck!=='') {
          let Index=A.findIndex((p)=>p.value===GLOBAL.UnitId)
          let Name=A.find((p)=>p.value===GLOBAL.UnitId).label
          let Id=A.find((p)=>p.value===GLOBAL.UnitId).value
          setselectedTaskSiteName({label:Name,value:Id,_index:Index});
          let unit=A.find((p)=>p.value===GLOBAL.UnitId)?.units
          let unitIndex=unit.findIndex((p)=>p.unitId===GLOBAL.relatedId)
          setselectedunitName({label:unit.find((p)=>p.unitId===GLOBAL.relatedId)?.unitName,value:unit.find((p)=>p.unitId===GLOBAL.relatedId)?.unitId,_index:unitIndex})
          //setselectedrelatedname({label:unit.find((p)=>p.unitId===GLOBAL.relatedId)?.unitName,value:unit.find((p)=>p.unitId===GLOBAL.relatedId)?.unitId,_index:unitIndex})
        }

      });
    }
    else {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.RentalUnits_List));
      let A = [];
      json?.forEach((obj) => {
        A.push({
          value: obj.siteId,
          label: obj.siteName,
          units:obj.units
      });
      })
      setSiteList(A);
    }

  }
  const getUnit2=(categoryId,value)=>{
    let A=[]
    let json=SiteList.find((p)=>p.value===value)?.units
    console.log(json,'json',value,'value')
    console.log(SiteList,'SiteList')
    console.log(RelatedNameListTask,'RelatedNameListTask')
    //RelatedNameListTask.find((p)=>p.value===categoryId).data=[];
    json?.forEach((obj) => {
      A.push({
        value: obj.unitId,
        label: obj.unitName,
      });
    })
    let List_Item =RelatedNameListTask;
    let index = List_Item?.findIndex((p) =>  p.value === categoryId);
    let markers = [...List_Item];
    markers[index] = {
      ...markers[index],data:A
    };
    setRelatedNameListTask(markers);
  }
  useEffect(()=>{

    if(location===undefined||location?.latitude==='') {
      if(location?.latitude==='') {
        requestLocationPermission().then(res => {
          if (res) {
            Geolocation.getCurrentPosition(
              position => {
                setLocation(position.coords);
              },
              error => {
                setLocation(false);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
          }
        });
      }
    }
    if(Boolean) {
      setCheked(Boolean);
      setswitchDYB2(Boolean);
    }

    if( GLOBAL.TaskRelatedNameId!==''){
      getInfo()
    }
    if(GLOBAL.TaskRelatedCheck===''||  GLOBAL.ScreenName!=='Snagging'&& GLOBAL.ScreenName!=='Subcontract'&&GLOBAL.ScreenName!=='Property Maintenance'&&GLOBAL.ScreenName!=='Support') {
      setcategoryEntityShow("y");
    }
    if(  GLOBAL.ScreenName==='Snagging'|| GLOBAL.ScreenName==='Subcontract'||
      GLOBAL.ScreenName==='Property Maintenance'||GLOBAL.ScreenName==='Support') {
      setCategoryId(GLOBAL?.categoryId);
      if(  GLOBAL.ScreenName==='Snagging'|| GLOBAL.ScreenName==='Subcontract') {
        setcategoryEntityShow('n')
        let Id=''
        if( GLOBAL.ScreenName==='Subcontract')
          Id='1'
        else
          Id='2'
        Task_subcategory(Id);

      }
      else if(GLOBAL.ScreenName==='Property Maintenance'){
        Task_subcategory('4')
        setcategoryEntityShow('n')
      }
    }

    Task_subcategory('1');
    if(GLOBAL.ScreenName==='Support')
      setcategoryEntityShow("n")
    if(GLOBAL.TaskRelatedCheck!==''){

      Task_subcategory('4')
      setcategoryEntityShow("n")
      setCategoryId(GLOBAL?.categoryId);
      setSelectedcategory({label:"Maintenance",value:"4",_index:2});
      setRelatedId(GLOBAL.relatedId)
      setselectedrelatedname({label:GLOBAL.relatedName,value:'3',_index:0})
      Task_WorkTypeList(GLOBAL?.categoryId);
    }
    if(numberValue === 25)
    setResults(value?.taskDescription)
    LogBox.ignoreLogs(['new NativeEventEmitter']);
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  },[]);
  const ClearDate=()=>{
    setGeoAddressCity('')
  }
  const onSpeechStart = (e) => {
    if(GLOBAL.Type==='Description')
      setStarted('√');
    else if(GLOBAL.Type==='Title')
      setStartedtitle('√');

  };
  const onSpeechRecognized = (e) => {
    setRecognized('√');
  };

  const onSpeechEnd = (e) => {
    if(GLOBAL.Type==='Description')
    { setEnd('');
      setStarted('');}
    else if(GLOBAL.Type==='Title')
    {
      setEndtitle('');
      setStartedtitle('');
    }


  };

  const onSpeechResults = (e) => {
    let result=e.value?.[0].toString();
    if(numberValue === 25&&GLOBAL.Type==='Description')
      setResults(value?.taskDescription +' '+result)
      else if(GLOBAL.Type==='Title')
      setResultstitle(value?.Title +' '+result)
    else {
      setResults(result);
    }
  };
  const onSpeechPartialResults = (e) => {
    setPartialResults(e.value);
  };
  const onSpeechVolumeChanged = (e) => {
    setVolume(e.value);
  };
  const _startRecognizing = async (Title) => {
    GLOBAL.Type='Description'
    setTitle(Title)
    _clearState();
    try {
      await Voice.start('en-US');
    } catch (e) {

    }
  };
  const _startRecognizingtitle = async (Title) => {
    GLOBAL.Type='Title'
    setTitle(Title)
    _clearState();
    try {
      await Voice.start('en-US');
    } catch (e) {

    }
  };
  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {

    }
    _clearState();
  };

  const _clearState = () => {
    setRecognized('');
    setVolume('');
    setEnd('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
  };
  const renderItem_Location = (item,value) => {
    return (
      <View style={Styles.item_dropdownLocation}>
        <Text style={Styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={Styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  const renderItem = item => {
    return (
      <View style={Styles.item}>
        <Text style={Styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={Styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
  const renderItem_status = item => {
    return (
      <View style={Styles.item_status}>
        <View style={{width:'80%'}}>
          <Text style={Styles.textItem}>{item.label}</Text>
        </View>
        <View style={[
          Styles.Task_satus,{backgroundColor:item?.statusColorCode,}
        ]}>
          <Text style={Styles.textItem_status}>{item.statusClass}</Text>
        </View>
      </View>
    );
  };
  const Func=()=>{

  }
   const Geocoder_latlong=async (label)=>{
     Geocoder.fallbackToGoogle(GLOBAL.mapKeyValue);
     const res = await Geocoder.geocodeAddress(label)
     var NY = {
       latitude: res?.[0]?.position?.lat.toFixed(7),
       longitude: res?.[0]?.position?.lng.toFixed(7),
     };
     setLocation(NY)
   }
  if (numberValue === 1) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Projectname: "",
            ProjectNote:""
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema3}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={{width:'90%'}}>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Project Name</Text>
              <TextInput
                value={values.Projectname}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("Projectname")}
                onFocus={() => setFieldTouched("Projectname")}
                placeholderTextColor={GLOBAL.OFFICIAL_BLUE_COLOR} />
              {touched.Projectname && errors.Projectname &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.Projectname}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.ProjectNote}
                onChangeText={handleChange("ProjectNote")}
                onFocus={() => setFieldTouched("ProjectNote")}
                multiline={true}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                placeholderTextColor={GLOBAL.OFFICIAL_BLUE_COLOR} />
              {
                ShowButton===true?
                  <View style={[Styles.ViewItems_center]}>
                    <ButtonI style={[Styles.btn, {
                      //margin: normalize(15),
                      flexDirection: "row",
                      width: '100%',
                      paddingVertical: 2,
                      marginTop: normalize(30),
                    }]}//handleSubmit
                             onpress={handleSubmit}
                             categoriIcon={""}
                             title={tittlebtn}
                             colorsArray={['#ffadad','#f67070','#FF0000']}
                             styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
                  </View>:null
              }

            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 3) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Projectname:Name,
            ProjectNote:""
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema3}>
          {({ values, handleChange, errors,setFieldTouched, touched, handleSubmit}) => (
            <View style={{width:'90%'}}>
                <TouchableOpacity onPress={() => {
                  setvisible(false);
                 setShowMessage(false);
                }} style={Styles.CancelBtnLeftAlign2}>
                  <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
                </TouchableOpacity>
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
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Project Name</Text>
              <TextInput
                value={values.Projectname}
                style={[inputStyle,{paddingVertical:6}]}
                onChangeText={handleChange("Projectname")}
                onFocus={()=> {
                  setFieldTouched("Projectname");

                }}

                placeholderTextColor={'#fff'}/>
              {touched.Projectname&&errors.Projectname &&
              <Text style={{fontSize:12,color:"#FF0D10"}}>{errors.Projectname}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.ProjectNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("ProjectNote")}
                onFocus={() => setFieldTouched("ProjectNote")}

                multiline={true}
                placeholderTextColor={'#fff'} />
              {
                ShowButton===true?
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txtbtn2,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>:null
              }
            </View>

          )}
        </Formik>

      </View>
    );
  }

/////////////Project////////////////

  else if (numberValue === 2) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>

        <Formik
          initialValues={{
            sitename: "",
            note:"",
            GeoAddressPostalCode:GeoAddressPostalCode,
            GeoAddressStreet:GeoAddressStreet
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema4}>
          {({ values,handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              {
                showMap === true ?
                  <MapView
                    style={Styles.map}
                    initialRegion={{
                      latitude: parseFloat(location?.latitude),
                      longitude: parseFloat(location?.longitude),
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }}
                    //onPress={(e) => setmarker({ marker: e.nativeEvent.coordinate })}
                    onPress={(e) => {
                      setmarker({ coordinate: e.nativeEvent.coordinate })
                      getLocation(e.nativeEvent.coordinate)
                    }}
                    mapType="standard"
                    zoomEnabled={true}
                    pitchEnabled={true}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsCompass={true}
                    showsBuildings={true}
                    showsTraffic={true}
                    showsIndoors={true}
                  >
                    {marker !== '' ?
                      <Marker coordinate={marker?.coordinate} /> : null}
                  </MapView> :
                  <>
                    <Text style={[Styles.txtLightColor, { marginTop: normalize(10), }]}>Site Name</Text>
                    <TextInput
                      value={values.sitename}
                      style={[inputStyle]}
                      onChangeText={handleChange("sitename")}
                      onFocus={() => setFieldTouched("sitename")}
                      placeholderTextColor={'#fff'}
                    />
                    {touched.sitename && errors.sitename &&
                    <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.sitename}</Text>
                    }
                    <Text style={[Styles.txtLightColor, { marginTop: normalize(10), }]}>Street Address</Text>
                    <TextInput
                      value={values.GeoAddressStreet}
                      style={[inputStyle, { paddingVertical: '3%' }]}
                      onContentSizeChange={(e) => {
                        numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                      }}
                      onChangeText={handleChange("GeoAddressStreet")}
                      onFocus={() => setFieldTouched("GeoAddressStreet")}
                      multiline={true}
                      placeholderTextColor={'#fff'} />
                    <View style={Styles.InputeRow}>
                      <View style={Styles.InputeRowItems}>
                        <DropDownItems labale={'Country'} data={CountryList}  setIsFocus={setIsFocus} name={GeoAddressCountry}
                                      textStyle={Styles.txtLightColor22}  dropdownStyle={Styles.dropdownLocationAdd}   placeholderStyle={Styles.placeholderStyle}
                                      selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true} Onpres={getCity}  setcategoryLevel={setcategoryLevel}  setRelatedNameLvalue={setRelatedNameLvalue}
                                      containerStyle={Styles.containerStyle} inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                                      setId={setcountryId} setname={setGeoAddressCountry} Function={ClearDate} categoryEntityShow={setcategoryEntityShow}
                        />
                        {GeoAddressCountry === '' &&
                        <Text style={{ fontSize: 12, color: "#FF0D10" }}>"Country! Please?"</Text>
                        }
                      </View>
                      <View style={Styles.InputeRowItems}>
                        <DropDownItems labale={'City'} data={CityList}  setIsFocus={setIsFocus}  setcategoryLevel={setcategoryLevel}  setRelatedNameLvalue={setRelatedNameLvalue}
                                       textStyle={Styles.txtLightColor22}  dropdownStyle={GeoAddressCity!==''?Styles.dropdownLocation:Styles.dropdownLocationError}   placeholderStyle={Styles.placeholderStyle}
                                       selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true} Onpres={Func}
                                       containerStyle={Styles.containerStyle} inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                                       setId={setcityId} setname={setGeoAddressCity} Function={Geocoder_latlong} categoryEntityShow={setcategoryEntityShow}
                        />
                        {GeoAddressCity === '' &&
                        <Text style={{ fontSize: 12, color: "#FF0D10" }}>"City! Please?"</Text>
                        }
                      </View>
                      <View style={Styles.InputeRowItems}>
                        <Text style={[Styles.txtLightColor, { marginTop: normalize(10), textAlign: "left" }]}>Postal code</Text>
                        <TextInput
                          value={values.GeoAddressPostalCode}
                          style={Styles.inputStyleLocationAdd2}
                          onContentSizeChange={(e) => {
                            numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                          }}
                          onChangeText={handleChange("GeoAddressPostalCode")}
                          onFocus={() => setFieldTouched("GeoAddressPostalCode")}
                          multiline={true}
                          placeholderTextColor={'#fff'} />
                      </View>

                      <TouchableOpacity onPress={() => setshowMap(true)} style={Styles.InputeRowItems}>
                        <View style={Styles.InputeRowLocation}>
                          <MaterialCommunityIcons
                            style={Styles.icon_Location}
                            color="#fff"
                            name="map-search-outline"
                            size={14}
                          />
                          <Text style={[Styles.txtLightColor, { marginTop: normalize(10), textAlign: "left" }]}>Lat & Long
                            <Text style={Styles.txtLightColor_samall}> (click here)</Text>
                          </Text>
                        </View>
                        <View
                          style={Styles.inputStyleLocationAdd2}>
                          {
                            location?.latitude !== '' && location?.longitude ?
                              <Text
                                style={Styles.txtLightColorLocation}>{parseFloat(location?.latitude).toFixed(7)} , {parseFloat(location?.longitude).toFixed(7)}</Text> :
                              <Text style={Styles.txtLightColorLocation}></Text>
                          }
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Text style={[Styles.txtLightColor, { marginTop: normalize(10), }]}>Notes</Text>
                    <TextInput
                      value={values.siteNote}
                      style={[inputStyle, { paddingVertical: '3%' }]}
                      onContentSizeChange={(e) => {
                        numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                      }}
                      onChangeText={handleChange("siteNote")}
                      onFocus={() => setFieldTouched("siteNote")}
                      multiline={true}
                      placeholderTextColor={'#fff'} />
                    {ShowButton === true ?
                      <ButtonI style={[Styles.btn, {
                        //margin: normalize(15),
                        flexDirection: "row",
                        width: '100%',
                        paddingVertical: 2,
                        marginTop: normalize(15),
                      }]}
                               onpress={handleSubmit}
                               categoriIcon={""}
                               title={tittlebtn}
                               colorsArray={['#ffadad', '#f67070', '#FF0000']}
                               styleTxt={[Styles.txtbtn, { fontSize: normalize(16), }]} sizeIcon={27} /> : null
                    }
                  </>
                      }
            </View>
          )}
        </Formik>

      </View>
    );
  }
  else if (numberValue === 4) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            sitename:Name,
            siteNote:"",
            GeoAddressPostalCode:GeoAddressPostalCode,
            GeoAddressStreet:GeoAddressStreet,
            GeoAddressCountry:GeoAddressCountry,
            GeoAddressCity:GeoAddressCity
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema4}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <TouchableOpacity onPress={() => {
                setvisible(false);
                setShowMessage(false);
              }} style={Styles.CancelBtnLeftAlign2}>
                <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
              </TouchableOpacity>
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
              <Text style={[Styles.txt,{marginTop: normalize(18),}]}>Site Name</Text>
              <TextInput
                value={values.sitename}
                style={[inputStyle,   { marginTop: normalize(10) }]}
                onChangeText={handleChange("sitename")}
                onFocus={() => {
                  setFieldTouched("sitename");
                }}
                placeholderTextColor={'#fff'}

              />
              {touched.sitename && errors.sitename &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.sitename}</Text>
              }
              <View style={Styles.InputeRowItems2}>
                <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Street</Text>
                <TextInput
                  value={values.GeoAddressStreet}
                  style={[inputStyle,{paddingVertical:'3%'}]}
                  onContentSizeChange={(e) => {
                    numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                  }}
                  onChangeText={handleChange("GeoAddressStreet")}
                  onFocus={() => {
                    setFieldTouched("GeoAddressStreet");
                  }}
                  multiline={true}
                  placeholderTextColor={'#fff'} />
                {touched.GeoAddressStreet && errors.GeoAddressStreet &&
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.GeoAddressStreet}</Text>
                }
              </View>
              <View style={Styles.InputeRow}>
                <View style={Styles.InputeRowItems}>
                  <DropDownItems labale={'Country'} data={CountryList}  setIsFocus={setIsFocus}  setcategoryLevel={setcategoryLevel}  setRelatedNameLvalue={setRelatedNameLvalue}
                                 textStyle={Styles.txtLightColor22}  dropdownStyle={Styles.dropdownLocation}
                                 placeholderStyle={Styles.placeholderStyle}
                                 selectedTextStyle={Styles.selectedTextStyle}
                                 containerStyle={Styles.containerStyle}
                                 inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                                 setId={setcountryId} setname={setGeoAddressCountry} Function={ClearDate}
                                 searchBoolean={true} Onpres={getCity} name={GeoAddressCountry} categoryEntityShow={setcategoryEntityShow}
                  />
                  {GeoAddressCountry==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"Country! Please?"</Text>
                  }
                </View>
                <View style={Styles.InputeRowItems}>
                  <DropDownItems labale={'City'} data={CityList}  setIsFocus={setIsFocus}  setcategoryLevel={setcategoryLevel}  setRelatedNameLvalue={setRelatedNameLvalue}
                                 textStyle={Styles.txtLightColor22}  dropdownStyle={GeoAddressCity!==''?Styles.dropdownLocation:Styles.dropdownLocationError}   placeholderStyle={Styles.placeholderStyle}
                                 selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true} Onpres={Func}
                                 containerStyle={Styles.containerStyle} inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                                 setId={setcityId} setname={setGeoAddressCity} Function={Geocoder_latlong} name={GeoAddressCity} categoryEntityShow={setcategoryEntityShow}
                  />
                  {GeoAddressCity==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"City! Please?"</Text>
                  }
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Postal code</Text>
                  <TextInput
                    value={values.GeoAddressPostalCode}
                    style={Styles.inputStyleLocationAdd2}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("GeoAddressPostalCode")}
                    onFocus={() => {
                      setFieldTouched("GeoAddressPostalCode");
                    }}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                  {touched.GeoAddressPostalCode && errors.GeoAddressPostalCode &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.GeoAddressPostalCode}</Text>
                  }
                </View>
                <TouchableOpacity onPress={()=>setshowMap(true)} style={Styles.InputeRowItems}>
                  <View style={Styles.InputeRowLocation}>
                    <MaterialCommunityIcons
                      style={Styles.icon_Location}
                      color="#fff"
                      name="map-search-outline"
                      size={14}
                    />
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Lat & Long
                      <Text style={Styles.txtLightColor_samall}>  (click here)</Text>
                    </Text>
                  </View>
                  <View
                    style={Styles.inputStyleLocationAdd2}>
                    {
                      location?.latitude!==''&&location?.longitude?
                      <Text style={Styles.txtLightColorLocation}>{parseFloat(location?.latitude).toFixed(7)} , {parseFloat(location?.longitude).toFixed(7)}</Text>:
                        <Text
                          style={Styles.txtLightColorLocation}></Text>
                    }
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.siteNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("siteNote")}
                onFocus={() => setFieldTouched("siteNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              {ShowButton===true?
                <ButtonI style={[Styles.btn, {
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />:null
              }


            </View>
          )}
        </Formik>

      </View>
    );
  }

  /////////////Site////////////////

  if (numberValue === 11) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Unitname: "",
            UnitNote:"",
            GeoAddressPostalCode:GeoAddressPostalCode,
            GeoAddressStreet:GeoAddressStreet
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema14}>
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              {
                showMap===true?
                  <MapView
                    style={Styles.map}
                    initialRegion={{
                      latitude:parseFloat(location?.latitude) ,
                      longitude:parseFloat( location?.longitude),
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }}
                    onPress={(e) => {
                      setmarker({coordinate: e.nativeEvent.coordinate})
                      getLocation(e.nativeEvent.coordinate)
                    }}
                    mapType="standard"
                    zoomEnabled={true}
                    pitchEnabled={true}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsCompass={true}
                    showsBuildings={true}
                    showsTraffic={true}
                    showsIndoors={true}
                  >
                    {marker!=='' ?
                      <Marker coordinate={marker?.coordinate} />:null}
                  </MapView>:
                  <>
                    <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Unit Name</Text>
                    <TextInput
                      value={values.Unitname}
                      style={[inputStyle, { paddingVertical: 6 }]}
                      onChangeText={handleChange("Unitname")}
                      onFocus={() => setFieldTouched("Unitname")}
                      placeholderTextColor={'#fff'} />
                    {touched.Unitname && errors.Unitname &&
                    <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.Unitname}</Text>
                    }
                    <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Street Address</Text>
                    <TextInput
                      value={values.GeoAddressStreet}
                      style={[inputStyle,{paddingVertical:'3%'}]}
                      onContentSizeChange={(e) => {
                        numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                      }}
                      onChangeText={handleChange("GeoAddressStreet")}
                      onFocus={() => setFieldTouched("GeoAddressStreet")}
                      multiline={true}
                      placeholderTextColor={'#fff'} />
                    <View style={Styles.InputeRow}>
                      <View style={Styles.InputeRowItems}>
                        <DropDownItems labale={'Country'} data={CountryList}  setIsFocus={setIsFocus} name={GeoAddressCountry}  setcategoryLevel={setcategoryLevel}  setRelatedNameLvalue={setRelatedNameLvalue}
                                       textStyle={Styles.txtLightColor22}  dropdownStyle={Styles.dropdownLocationAdd}   placeholderStyle={Styles.placeholderStyle}
                                       selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true} Onpres={getCity}
                                       containerStyle={Styles.containerStyle} inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                                       setId={setcountryId} setname={setGeoAddressCountry} Function={ClearDate} categoryEntityShow={setcategoryEntityShow}
                        />
                        {GeoAddressCountry==='' &&
                        <Text style={{ fontSize: 12, color: "#FF0D10" }}>"Country! Please?"</Text>
                        }
                      </View>
                      <View style={Styles.InputeRowItems}>
                        <DropDownItems labale={'City'} data={CityList}  setIsFocus={setIsFocus}  setcategoryLevel={setcategoryLevel}  setRelatedNameLvalue={setRelatedNameLvalue}
                                       textStyle={Styles.txtLightColor22}  dropdownStyle={Styles.dropdownLocationAdd}   placeholderStyle={Styles.placeholderStyle}
                                       selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true} Onpres={Func}
                                       containerStyle={Styles.containerStyle} inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                                       setId={setcityId} setname={setGeoAddressCity} Function={Geocoder_latlong} categoryEntityShow={setcategoryEntityShow}
                        />
                        {GeoAddressCity==='' &&
                        <Text style={{ fontSize: 12, color: "#FF0D10" }}>"City! Please?"</Text>
                        }
                      </View>
                      <View style={Styles.InputeRowItems}>
                        <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Postal code</Text>
                        <TextInput
                          value={values.GeoAddressPostalCode}
                          style={Styles.inputStyleLocationAdd2}
                          onContentSizeChange={(e) => {
                            numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                          }}
                          onChangeText={handleChange("GeoAddressPostalCode")}
                          onFocus={() => setFieldTouched("GeoAddressPostalCode")}
                          multiline={true}
                          placeholderTextColor={'#fff'} />
                      </View>
                      <TouchableOpacity onPress={()=>setshowMap(true)} style={Styles.InputeRowItems}>
                        <View style={Styles.InputeRowLocation}>
                          <MaterialCommunityIcons
                            style={Styles.icon_Location}
                            color="#fff"
                            name="map-search-outline"
                            size={14}
                          />
                          <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Lat & Long
                            <Text style={Styles.txtLightColor_samall}>  (click here)</Text>
                          </Text>
                        </View>
                        <View
                          style={Styles.inputStyleLocationAdd2}>
                          {
                            location?.latitude !== '' && location?.longitude ?
                              <Text
                                style={Styles.txtLightColorLocation}>{parseFloat(location?.latitude).toFixed(7)} , {parseFloat(location?.longitude).toFixed(7)}</Text>:
                              <Text style={Styles.txtLightColorLocation}/>
                          }
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Notes</Text>
                    <TextInput
                      value={values.UnitNote}
                      style={[inputStyle,{paddingVertical:'4%'}]}
                      onContentSizeChange={(e) => {
                        numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                      }}
                      onChangeText={handleChange("UnitNote")}
                      onFocus={() => setFieldTouched("UnitNote")}
                      multiline={true}
                      placeholderTextColor={'#fff'} />
                    {touched.UnitNote && errors.UnitNote &&
                    <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.UnitNote}</Text>
                    }
                    {ShowButton===true?
                      <View style={[Styles.ViewItems_center]}>
                        <ButtonI style={[Styles.btn, {
                          //margin: normalize(15),
                          flexDirection: "row",
                          width: '100%',
                          paddingVertical: 2,
                          marginTop: normalize(15),
                        }]}
                                 onpress={handleSubmit}
                                 categoriIcon={""}
                                 title={tittlebtn}
                                 colorsArray={['#ffadad','#f67070','#FF0000']}
                                 styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
                      </View>:null
                    }
                  </>

              }



            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 12) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Unitname: Name,
            UnitNote:"",
            GeoAddressPostalCode:GeoAddressPostalCode,
            GeoAddressStreet:GeoAddressStreet,
            GeoAddressCountry:GeoAddressCountry,
            GeoAddressCity:GeoAddressCity
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema14}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
            <View style={styles.formContainer}>
              <TouchableOpacity onPress={() => {
                setvisible(false);
                setShowMessage(false);
                //string_equality_unit(values)
              }} style={Styles.CancelBtnLeftAlign2}>
                <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
              </TouchableOpacity>
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
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Unit Name</Text>
              <TextInput
                value={values.Unitname}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("Unitname")}
                onFocus={() => setFieldTouched("Unitname")}
                placeholderTextColor={'#fff'} />
              {touched.Unitname && errors.Unitname &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.Unitname}</Text>
              }
              <View style={Styles.InputeRowItems2}>
                <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Street</Text>
                <TextInput
                  value={values.GeoAddressStreet}
                  style={[inputStyle,{paddingVertical:'3%'}]}
                  onContentSizeChange={(e) => {
                    numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                  }}
                  onChangeText={handleChange("GeoAddressStreet")}
                  onFocus={() => setFieldTouched("GeoAddressStreet")}
                  multiline={true}
                  placeholderTextColor={'#fff'} />
                {touched.GeoAddressStreet && errors.GeoAddressStreet &&
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.GeoAddressStreet}</Text>
                }
              </View>
              <View style={Styles.InputeRow}>
                <View style={Styles.InputeRowItems}>
                  <DropDownItems labale={'Country'} data={CountryList}  setIsFocus={setIsFocus}  setcategoryLevel={setcategoryLevel}  setRelatedNameLvalue={setRelatedNameLvalue}
                                 textStyle={Styles.txtLightColor22}  dropdownStyle={Styles.dropdownLocation}
                                 placeholderStyle={Styles.placeholderStyle}
                                 selectedTextStyle={Styles.selectedTextStyle}
                                 containerStyle={Styles.containerStyle}
                                 inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                                 setId={setcountryId} setname={setGeoAddressCountry} Function={ClearDate}
                                 searchBoolean={true} Onpres={getCity} name={GeoAddressCountry} categoryEntityShow={setcategoryEntityShow}
                  />

                  {GeoAddressCountry==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"Country! Please?"</Text>
                  }
                </View>
                <View style={Styles.InputeRowItems}>
                  <DropDownItems labale={'City'} data={CityList}  setIsFocus={setIsFocus}  setcategoryLevel={setcategoryLevel}  setRelatedNameLvalue={setRelatedNameLvalue}
                                 textStyle={Styles.txtLightColor22}  dropdownStyle={GeoAddressCity!==''?Styles.dropdownLocation:Styles.dropdownLocationError}   placeholderStyle={Styles.placeholderStyle}
                                 selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true} Onpres={Func}
                                 containerStyle={Styles.containerStyle} inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                                 setId={setcityId} setname={setGeoAddressCity} Function={Geocoder_latlong} name={GeoAddressCity} categoryEntityShow={setcategoryEntityShow}
                  />
                  {GeoAddressCity==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"City! Please?"</Text>
                  }
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Postal code</Text>
                  <TextInput
                    value={values.GeoAddressPostalCode}
                    style={Styles.inputStyleLocationAdd2}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("GeoAddressPostalCode")}
                    onFocus={() => setFieldTouched("GeoAddressPostalCode")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                  {touched.GeoAddressPostalCode && errors.GeoAddressPostalCode &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.GeoAddressPostalCode}</Text>
                  }
                </View>

                <TouchableOpacity onPress={()=>setshowMap(true)} style={Styles.InputeRowItems}>
                  <View style={Styles.InputeRowLocation}>
                    <MaterialCommunityIcons
                      style={Styles.icon_Location}
                      color="#fff"
                      name="map-search-outline"
                      size={14}
                    />
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Lat & Long
                      <Text style={Styles.txtLightColor_samall}>  (click here)</Text>
                    </Text>
                  </View>
                  <View
                    style={Styles.inputStyleLocationAdd2}>
                    {
                      location?.latitude!==''&&location?.longitude?
                      <Text style={Styles.txtLightColorLocation}>{parseFloat(location?.latitude).toFixed(7)} , {parseFloat(location?.longitude).toFixed(7)}</Text>:
                        <Text
                          style={Styles.txtLightColorLocation}></Text>
                    }
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Notes</Text>
              <TextInput
                value={values.UnitNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("UnitNote")}
                onFocus={() => setFieldTouched("UnitNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              {touched.UnitNote && errors.UnitNote &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.UnitNote}</Text>
              }
              {ShowButton===true?
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>:null}
            </View>

          )}
        </Formik>

      </View>
    );
  }

  /////////////Units////////////////

  if (numberValue === 13) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            SectionName: "",
            SectionNote:""
          }}
          onSubmit={values => {
            onChangeText(values);

          }}
          validationSchema={validationSchema13}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>

              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Section Name</Text>
              <TextInput
                value={values.SectionName}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("SectionName")}
                onFocus={() => setFieldTouched("SectionName")}
                placeholderTextColor={'#fff'} />
              {touched.SectionName && errors.SectionName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.SectionName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.SectionNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("SectionNote")}
                onFocus={() => setFieldTouched("SectionNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              {
                ShowButton===true?
                  <View style={[Styles.ViewItems_center]}>
                    <ButtonI style={[Styles.btn, {
                      //margin: normalize(15),
                      flexDirection: "row",
                      width: '100%',
                      paddingVertical: 2,
                      marginTop: normalize(30),
                    }]}//handleSubmit
                             onpress={handleSubmit}
                             categoriIcon={""}
                             title={tittlebtn}
                             colorsArray={['#ffadad','#f67070','#FF0000']}
                             styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
                  </View>:null
              }

            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 14) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            SectionName:Name,
            SectionNote:""
          }}
          onSubmit={values => {
            onChangeText(values);

          }}
          validationSchema={validationSchema13}>
          {({values,handleChange,errors,setFieldTouched,touched,isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <TouchableOpacity onPress={() => {
                setvisible(false);
                setShowMessage(false);
                //string_equality_section(values)
              }} style={Styles.CancelBtnLeftAlign2}>
                <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
              </TouchableOpacity>
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
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Section Name</Text>
              <TextInput
                value={values.SectionName}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("SectionName")}
                onFocus={() =>setFieldTouched("SectionName")}
                placeholderTextColor={'#fff'} />
              {touched.SectionName && errors.SectionName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.SectionName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.SectionNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("SectionNote")}
                onFocus={() => setFieldTouched("SectionNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              {
                ShowButton===true?
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>:null}
            </View>

          )}
        </Formik>

      </View>
    );
  }

  /////////////Section////////////////

  if (numberValue === 15) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik

          initialValues={{
            FeatureName: "",
            FeatureNote:"",
            switchDYB:switchDYB
          }}

          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema15}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Feature Name</Text>
              <TextInput
                value={values.FeatureName}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("FeatureName")}
                onFocus={() => setFieldTouched("FeatureName")}
                placeholderTextColor={'#fff'} />
              {touched.FeatureName && errors.FeatureName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.FeatureName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.FeatureNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("FeatureNote")}
                onFocus={() => setFieldTouched("FeatureNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              <View style={{
                flexDirection: "row",
                width: '100%', marginTop: '3%', zIndex: 100,
              }}>
                <Text style={[Styles.txtLightColor,{marginTop: normalize(18),}]}>Need DYB</Text>

                <ToggleSwitch
                  isOn={switchDYB}
                  size="large"
                  style={{marginLeft:'auto',marginTop: normalize(18)}}
                  trackOnStyle={{

                    backgroundColor:GLOBAL.OFFICIAL_Button,
                  }}
                  trackOffStyle={{

                    backgroundColor: "#a0a3bd",
                  }}
                  thumbOffStyle={{

                    borderRadius: 19,
                    // rgb(102,134,205)
                    borderColor: "rgb(255,255,255)",
                  }}
                  thumbOnStyle={{

                    borderRadius: 19,
                    borderColor: "rgb(255,255,255)", // rgb(102,134,205)
                  }}
                  onToggle={isOn => {

                    setswitchDYB(isOn)
                    setCheked(isOn)
                  }}
                />

              </View>
              {
                ShowButton===true?
              <View style={Styles.ViewItems_center}>
                <ButtonI style={Styles.btnFullWith}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>:null}
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 16) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>

        <Formik

          initialValues={{
            FeatureName:Name,
            FeatureNote:'',
            switchDYB:switchDYB2
          }}
          onSubmit={values => {
            onChangeText(values);

          }}
          validationSchema={validationSchema15}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <TouchableOpacity onPress={() => {
                setvisible(false);
                setShowMessage(false);
              }} style={Styles.CancelBtnLeftAlign2}>
                <AntDesign name={"closecircleo"} size={20} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
              </TouchableOpacity>
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
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Feature Name</Text>
              <TextInput
                value={values.FeatureName}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("FeatureName")}
                onFocus={() => setFieldTouched("FeatureName")}
                placeholderTextColor={'#fff'} />
              {touched.FeatureName && errors.FeatureName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.FeatureName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.FeatureNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("FeatureNote")}
                onFocus={() => setFieldTouched("FeatureNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              <View style={{
                flexDirection: "row",

                width: '95%', marginTop: '4%', zIndex: 100,

              }}>
                <Text style={[Styles.txtLightColor,{marginTop: normalize(18),}]}>Need DYB</Text>

                <ToggleSwitch
                  isOn={switchDYB2}
                  size="large"
                  style={{marginLeft:'auto',marginTop: normalize(18)}}
                  trackOnStyle={{

                    backgroundColor:GLOBAL.OFFICIAL_Button,
                  }}
                  trackOffStyle={{

                    backgroundColor: "#a0a3bd",
                  }}
                  thumbOffStyle={{

                    borderRadius: 19,
                    // rgb(102,134,205)
                    borderColor: "rgb(255,255,255)",
                  }}
                  thumbOnStyle={{

                    borderRadius: 19,
                    borderColor: "rgb(255,255,255)", // rgb(102,134,205)
                  }}
                  onToggle={isOn => {
                    setswitchDYB2(isOn)
                    setCheked(isOn)
                  }}
                />

              </View>
              {
                ShowButton===true?
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>:null}
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 18) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            FeatureNote:""
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema13}>
          {({values,handleChange,errors,setFieldTouched,touched,isValid, handleSubmit }) => (
            <View style={styles.formContainer}>

              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.FeatureNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("FeatureNote")}
                onFocus={() => setFieldTouched("FeatureNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 19) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            ImageTitle: "",

          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema13}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Image Title</Text>
              <View style={{alignItems:'center',width:'100%'}}>
                <TextInput
                  value={values.ImageTitle}
                  style={[inputStyle,{paddingVertical:'4%'}]}
                  onContentSizeChange={(e) => {
                    numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                  }}
                  onChangeText={handleChange("ImageTitle")}
                  onFocus={() => setFieldTouched("ImageTitle")}

                  placeholderTextColor={'#fff'} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

  /////////////Feature////////////////

  else if (numberValue === 7) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center',}}>
        <Formik
          initialValues={{
            username:GLOBAL?.UserInformation?.Username,
            password: "",
            orgkey:GLOBAL?.UserInformation?.OrgAppKey
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema6}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={[styles.formContainer]}>

              <Text style={[Styles.txt,{paddingVertical:'3%'}]}>Org Key</Text>
              <View style={[{
                borderWidth: 1,
                borderColor: GLOBAL.OFFICIAL_Button,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width: '100%',
                paddingVertical: 4,
                color: GLOBAL.OFFICIAL_BLUE_COLOR,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }]}>
                <TextInput
                  value={values.orgkey}
                  style={[{
                    width: '97%',
                    paddingVertical: 3, color:GLOBAL.OFFICIAL_BLUE_COLOR,
                    fontFamily:'OpenSansBold',
                  }]}
                  onChangeText={handleChange("orgkey")}
                  onFocus={() => setFieldTouched("orgkey")}
                  onBlur={()=>{
                    if(values?.orgkey!=='')
                      checkOrgCode(values?.orgkey)
                  }}
                  placeholderTextColor={'#fff'} />
                <View style={[{}]}>
                  <View>
                    <Feather name={iconcheck} size={15} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
                  </View>
                </View>
              </View>
              {touched.orgkey && errors.orgkey &&
              <Text style={{ fontSize: 12, color: "#FF0D10",paddingTop:2 }}>{errors.orgkey}</Text>
              }
              <Text style={[Styles.txt,{paddingVertical:'3%'}]}>User name</Text>
              <View style={[{
                borderWidth: 1,
                borderColor: GLOBAL.OFFICIAL_Button,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width: '100%',
                paddingVertical: 4,
                color: GLOBAL.OFFICIAL_BLUE_COLOR,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }]}>
              <TextInput
                value={values.username}
                style={[{
                  width: '100%',
                  paddingVertical: 2,
                  borderRadius: normalize(6),
                  color: GLOBAL.OFFICIAL_BLUE_COLOR,
                  fontFamily:'OpenSansBold',
                }]}
                onChangeText={handleChange("username")}
                onFocus={() => setFieldTouched("username")}
                placeholderTextColor={'#fff'} />
              </View>
              {touched.username && errors.username &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.username}</Text>
              }
              <Text style={[Styles.txt,{paddingVertical:'3%'}]}>Password</Text>
              <View style={[{
                borderWidth: 1,
                borderColor: GLOBAL.OFFICIAL_Button,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width: '100%',
                paddingVertical: 4,
                color: GLOBAL.OFFICIAL_BLUE_COLOR,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }]}>
                <TextInput
                  value={values.password}
                  style={[{
                    width: '97%',
                    paddingVertical: 3, color: GLOBAL.OFFICIAL_BLUE_COLOR,
                    fontFamily:'OpenSansBold',
                  }]}
                  onChangeText={handleChange("password")}
                  onFocus={() => setFieldTouched("password")}
                  secureTextEntry={securetText}
                  placeholderTextColor={'#fff'} />
                <View style={[{}]}>
                  <TouchableOpacity onPress={onpress}>
                    <Feather name={iconsecuret} size={15} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
                  </TouchableOpacity>
                </View>
              </View>
              {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.password}</Text>
              }
              <View style={[{
                flexDirection: "row", marginTop: 5,   width: '100%',
              }]}>
                <View style={{ flexDirection: "row", width: "60%", alignItems: "center" }}>
                </View>
                <TouchableOpacity style={{ width: "40%" }}
                                  onPress={Pinrecovery}>
                  <Text style={[Styles.txt, { color:GLOBAL.OFFICIAL_BLUE_COLOR, marginLeft: "auto",  fontFamily:'TisaSansProBoldItalic', }]}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>
              {Btn===true?
                <View style={[Styles.ViewItems_center,{flexDirection:'row'}]}>
                  <ButtonI style={[ {
                    width: '50%',
                    paddingVertical: normalize(4),
                    marginTop: normalize(30),
                    borderRadius: normalize(7),
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection:'row',
                    backgroundColor:GLOBAL.OFFICIAL_Button

                  }]}//handleSubmit
                           onpress={handleSubmit}
                           categoriIcon={"AntDesign"}
                           title={tittlebtn}
                           styleTxt={[Styles.txt_center_login,{fontSize: normalize(16),}]} sizeIcon={27} />
                </View>
                    :null
              }
            </View>
          )}
        </Formik>
      </View>

    );
  }

  ///////////////////LOGIN////////////////

  else if (numberValue === 10) {
    return (
      <View style={{ flex: 1 }}>
        <Formik
          initialValues={{
            orgkey: "",
            email: "",
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema22}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <Text style={[Styles.txtLightColor]}>Org key</Text>

              <View style={[{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                borderWidth: 1,
                borderColor:GLOBAL.OFFICIAL_Button,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width:'100%',
                paddingVertical: 4,
                color: GLOBAL.OFFICIAL_BLUE_COLOR,
              }]}>
                <TextInput
                  value={values.orgkey}
                  style={[{
                    width: '97%',
                    paddingVertical: 5, color:GLOBAL.OFFICIAL_BLUE_COLOR,
                    fontFamily:'OpenSansBold',
                  }]}
                  onChangeText={handleChange("orgkey")}
                  onFocus={() => setFieldTouched("orgkey")}
                  onBlur={()=>{
                    if(values?.orgkey!=='')
                      checkOrgCode(values?.orgkey)
                  }}
                  placeholderTextColor={'#fff'} />
                <View style={[{}]}>
                  <View>
                    <Feather name={iconcheck} size={15} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
                  </View>
                </View>
              </View>
              {touched.orgkey && errors.orgkey &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.orgkey}</Text>
              }
              <Text style={[Styles.txtLightColor]}>Email</Text>

                <View style={[{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor:GLOBAL.OFFICIAL_Button,
                  borderRadius: normalize(6),
                  padding: 12,
                  marginBottom: 5,
                  width:'100%',
                  paddingVertical: 4,
                }]}>
                  <TextInput

                    style={[{
                      width:'100%',
                      paddingVertical: 5,
                      color:GLOBAL.OFFICIAL_BLUE_COLOR,
                      fontFamily:'OpenSansBold',
                    }]}
                    value={values.email}
                onChangeText={handleChange("email")}
                onFocus={() => setFieldTouched("email")}
                placeholderTextColor={'#fff'} />
                </View>
              {touched.email && errors.email &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.email}</Text>
              }


              <View style={[Styles.ViewItems_center]}>
                    {/*<ButtonI style={[Styles.btn, {*/}
                    {/*  //margin: normalize(15),*/}
                    {/*  width: width /2.5,*/}
                    {/*  paddingVertical: 2,*/}
                    {/*  marginTop: normalize(30),*/}
                    {/*}]}*/}
                    {/*         colorsArray={["#4d78a5", "#375e89", "#27405c"]}*/}
                    {/*         onpress={handleSubmit}*/}
                    {/*         categoriIcon={""}*/}
                    {/*         title={tittlebtn}*/}
                    {/*         styleTxt={Styles.txtbtn2} sizeIcon={27} />*/}
              </View>
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={["#4d78a5", "#375e89", "#27405c"]}
                         styleTxt={[Styles.txtbtn2,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>
          )}
        </Formik>
      </View>

    );
  }
  else if (numberValue === 9) {
    return (
      <View>
        <Formik
          initialValues={{
            OTPNumber: "",
            password: "",
            confirmpassword: "",
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema7}>
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <Text style={[Styles.txtLightColor]}>OTP Number</Text>
              <View style={[{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                borderWidth: 1,
                borderColor:GLOBAL.OFFICIAL_Button,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width:'100%',
                paddingVertical: 4,
                color: GLOBAL.OFFICIAL_BLUE_COLOR,
                fontFamily:'OpenSansBold',
              }]}>
                <TextInput
                  value={values.OTPNumber}
                  style={[{
                    width:'100%',
                    paddingVertical: 5,
                  }]}
                  onChangeText={handleChange("OTPNumber")}
                  onFocus={() => setFieldTouched("OTPNumber")}
                  placeholderTextColor={'#fff'}
                />
              </View>
              {touched.OTPNumber && errors.OTPNumber &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.email}</Text>
              }
              <Text style={[Styles.txt]}>New Password</Text>
              <View style={[{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor:GLOBAL.OFFICIAL_Button,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width:'100%',
                paddingVertical: 4,
                color: GLOBAL.OFFICIAL_BLUE_COLOR,
                fontFamily:'TisaSansProBoldItalic',
              }]}>
                <TextInput
                  value={values.password}
                  style={[{
                    width: '96%',
                    paddingVertical: 5,
                  }]}
                  onChangeText={handleChange("password")}
                  onFocus={() => setFieldTouched("password")}
                  secureTextEntry={securetText}
                  placeholderTextColor={GLOBAL.OFFICIAL_BLUE_COLOR}
                />
                <View style={[{}]}>
                  <TouchableOpacity
                    onPress={onpress}>
                    <Feather name={iconsecuret} size={15} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
                  </TouchableOpacity>
                </View>
              </View>
              {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.password}</Text>
              }
              <Text style={[Styles.txt]}>Confirm Password</Text>
              <View style={[
                touched.confirmpassword && errors.confirmpassword ?
                    {
                      borderWidth: 1,
                      borderColor:'red',
                      color: GLOBAL.OFFICIAL_BLUE_COLOR,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      borderRadius: normalize(6),
                      padding: 12,
                      marginBottom: 5,
                      width:'100%',
                      paddingVertical: 4,
                      fontFamily:'TisaSansProBoldItalic',
                    } :
                    {
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor:GLOBAL.OFFICIAL_Button,
                      borderRadius: normalize(6),
                      padding: 12,
                      marginBottom: 5,
                      width:'100%',
                      paddingVertical: 4,
                      color: GLOBAL.OFFICIAL_BLUE_COLOR,
                      fontFamily:'TisaSansProBoldItalic',
                    }
              ]}>

                <TextInput
                  value={values.confirmpassword}
                  style={[{
                    width: '100%',
                    paddingVertical: 5,
                  }]}
                  onChangeText={handleChange("confirmpassword")}
                  //placeholder="Password"
                  onFocus={() => setFieldTouched("confirmpassword")}
                  secureTextEntry={securetText}
                  placeholderTextColor={'#fff'}
                />
                <View style={[{}]}>
                  {
                    touched.confirmpassword && errors.confirmpassword &&
                        <AntDesign name={"closecircleo"} size={20} color={"red"} />
                  }
                </View>
              </View>
              {touched.confirmpassword && errors.confirmpassword &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.confirmpassword}</Text>
              }
              <View style={[Styles.ViewItems_center, {}]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                  colorsArray={["#4d78a5", "#375e89", "#27405c"]}
                  styleTxt={Styles.txtbtn2} sizeIcon={27} />
              </View>

            </View>
          )}
        </Formik>

      </View>
    );
  }

///////////////////PasswordRecovery////////////////

  if (numberValue === 17) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Title:'',
            TaskNote: "",
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema5}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={[styles.formContainer2,]}>
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Title</Text>
              <TextInput
                value={values.Title}
                style={[Styles.inputStyleTask]}
                onChangeText={handleChange("Title")}
                onFocus={() => setFieldTouched("Title")}
                multiline={true}
                placeholderTextColor={"#fff"} />
              {touched.Title && errors.Title &&
              <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10) }}>{errors.Title}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Requested By</Text>
              <Dropdown
                style={[Styles.dropdowntask]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={Taskuser}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocususer ? 'Select Requested user' : '...'}
                searchPlaceholder="Search..."
                value={selecteduser}
                containerStyle={Styles.containerStyle}
                renderItem={renderItem}
                onFocus={() => setIsFocususer(true)}
                onBlur={() => setIsFocususer(false)}
                onChange={item=> {
                  setSelecteduser(item);
                  setUserId(item.value)
                }}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                    <View style={Styles.selectedStyle2}>
                      <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                      <AntDesign color="#fff" name="delete" size={15} />
                    </View>
                  </TouchableOpacity>
                )}
              />
              {error==='selecteduser'&& selecteduser==='' ?
              <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select Requested user ! Please?</Text>:null
              }
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Category</Text>
              <Dropdown
                style={[Styles.dropdowntask]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={Taskcategory}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select category' : '...'}
                searchPlaceholder="Search..."
                value={selectedcategory}
                containerStyle={Styles.containerStyle}
                renderItem={renderItem}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item=> {

                  setSelectedcategory(item);
                  setCategoryId(item.value);
                  Task_RelatedList(item.value)
                }}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                    <View style={Styles.selectedStyle2}>
                      <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                      <AntDesign color="#fff" name="delete" size={15} />
                    </View>
                  </TouchableOpacity>
                )}
              />

              {error==='selectedcategory' && selectedcategory==='' ?
              <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select category! Please?</Text>:null
              }
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Related</Text>
              <Dropdown
                style={[Styles.dropdowntask]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={TaskRelated}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusrelated ? 'Select related' : '...'}
                searchPlaceholder="Search..."
                value={selectedrelated}
                containerStyle={Styles.containerStyle}
                renderItem={renderItem}
                onFocus={() => setIsFocusrelated(true)}
                onBlur={() => setIsFocusrelated(false)}
                onChange={item=> {
                  setSelectedrelated(item);
                  setRelatedId(item.value)
                }}
              />
              {error==='selectedrelated' && selectedrelated==='' ?
              <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select related! Please?</Text>:null
              }
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Assigned</Text>
              <MultiSelect
                style={[Styles.dropdowntask]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={Taskassigned}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusassigned ? 'assigned to' : '...'}
                searchPlaceholder="Search..."
                value={selectedassigned}
                containerStyle={Styles.containerStyle}
                renderItem={renderItem}
                onFocus={() => setIsFocusassigned(true)}
                onBlur={() => setIsFocusassigned(false)}
                onChange={item=> {
                  setSelectedassigned(item);
                }}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                    <View style={Styles.selectedStyle2}>
                      <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                      <AntDesign color="#fff" name="delete" size={15} />
                    </View>
                  </TouchableOpacity>
                )}
              />
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Priority</Text>
              <Dropdown
                style={[Styles.dropdowntask]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={Taskpriority}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocuspriority ? 'Select priority' : '...'}
                searchPlaceholder="Search..."
                value={selectedpriority}
                containerStyle={Styles.containerStyle}
                renderItem={renderItem}
                onFocus={() => setIsFocuspriority(true)}
                onBlur={() => setIsFocuspriority(false)}
                onChange={item=> {
                  setSelectedpriority(item);
                  setPriorityId(item.value)
                }}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                    <View style={Styles.selectedStyle2}>
                      <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                      <AntDesign color="#fff" name="delete" size={15} />
                    </View>
                  </TouchableOpacity>
                )}/>
              {error==='selectedpriority' && selectedpriority==='' ?
                <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select selected priority! Please?</Text>:null
              }
              <View  style={Styles.dateBox}>
                <View  style={Styles.dateBoxitems}>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanStartDate");
                    setOpen(true)
                  }} style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                  Plan StartDate
                </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanEndDate");
                    setOpen(true)
                  }} style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                      Plan EndDate
                  </Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.dateBoxitems}>
                <TouchableOpacity onPress={()=> {
                  setdateType("PlanStartDate");
                  setOpen(true)
                }} style={Styles.dateBoxItem}>
                  <Text style={Styles.txtdate}>
                    {DateFormatplanstart}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> {
                  setdateType("PlanEndDate");
                  setOpen(true)
                }} style={Styles.dateBoxItem}>
                  <Text style={Styles.txtdate}>
                    {DateFormatplanend}
                  </Text>
                </TouchableOpacity>
                </View>
                <View style={Styles.dateBoxitems}>
                  <View style={Styles.dateBoxItemBorder}>

                    {error==='PlanStartDate' && DateFormatplanstart==='' ?
                    <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select PlanStartDate! Please?</Text>:null
                    }
                  </View>
                  <View style={Styles.dateBoxItemBorder}>
                    {error==='PlanEndDate' && DateFormatplanend==='' ?
                    <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select PlanEndDate! Please?</Text>:null
                    }
                  </View>
                </View>
              </View>
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Status</Text>
              <Dropdown
                style={[Styles.dropdowntask]}
                placeholderStyle={Styles.placeholderStyle}
                selectedTextStyle={Styles.selectedTextStyle}
                inputSearchStyle={Styles.inputSearchStyle}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                data={Taskstatus}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusstatus ? 'Select Status' : '...'}
                searchPlaceholder="Search..."
                value={selectedstatus}
                containerStyle={Styles.containerStyle}
                renderItem={renderItem_status}
                onFocus={() => setIsFocusstatus(true)}
                onBlur={() => setIsFocusstatus(false)}
                onChange={item=> {
                  setSelectedstatus(item);
                  setTaskStatusId(item.value)
                }}
                renderSelectedItem={(item, unSelect) => (
                    <View style={Styles.selectedStyle2}>
                      <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                    </View>
                )}
              />
              {error==='selectedstatus' && selectedstatus==='' ?
              <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select Status! Please?</Text>:null
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(15),}]}>Description</Text>
              <TextInput
                value={values.TaskNote}
                style={[Styles.inputStyleTask,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("TaskNote")}
                onFocus={() => setFieldTouched("TaskNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              {touched.TaskNote && errors.TaskNote &&
              <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10) }}>{errors.TaskNote}</Text>
              }
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#a39898','#786b6b','#382e2e']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 24) {
    return (
        <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
          <Formik
            initialValues={{
              Title:Title,
              TaskNote:results,
            }}
            enableReinitialize
            onSubmit={values => {
              onChangeText(values);
            }}
            validationSchema={validationSchema5}
          >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <View style={[Styles.formContainer2]}>
                <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Title</Text>
                <View style={[{
                  borderWidth:0.5,
                  borderColor:GLOBAL.footertext_backgroundColor,
                  borderRadius: normalize(6),
                  padding: 12,
                  marginBottom: 5,
                  width: '100%',
                  paddingVertical: 4,
                  color: GLOBAL.OFFICIAL_BLUE_COLOR,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }]}>
                  <TextInput
                    value={values.Title}
                    style={[{
                      width: '97%',
                      paddingVertical: 3,
                      fontFamily:'OpenSansBold'
                      ,color: GLOBAL.footertext_backgroundColor
                    }]}
                    onChangeText={handleChange("Title")}
                    onFocus={() => {
                      setFieldTouched("Title");
                      if(values.Title!=='')
                        setShowBackBtn(false);
                    }}
                    multiline={true}
                    onBlur={() => {
                      if(values.Title!=='')
                        setShowBackBtn(false);
                    }}
                    placeholderTextColor={'#fff'} />
                  {
                    startedtitle===''&&endtitle===''?
                      <TouchableOpacity onPress={()=> {
                        _startRecognizingtitle(values.Title);
                      }} style={[{}]}>
                        <MaterialIcons name={"keyboard-voice"} size={18} color={startedtitle===''&&endtitle===''?Colors.borderButton:Colors.Red} />
                      </TouchableOpacity>:
                      <View>
                        <MaterialIcons name={"keyboard-voice"} size={18} color={startedtitle===''&&endtitle===''?Colors.borderButton:Colors.Red} />
                      </View>
                  }

                </View>
                {/*<TextInput*/}
                {/*  value={values.Title}*/}
                {/*  style={[Styles.inputStyleTask,{borderColor: GLOBAL.footertext_backgroundColor, color:GLOBAL.footertext_backgroundColor,}]}*/}
                {/*  onChangeText={handleChange("Title")}*/}
                {/*  onFocus={() => {*/}
                {/*    setFieldTouched("Title");*/}
                {/*    if(values.Title!=='')*/}
                {/*      setShowBackBtn(false);*/}
                {/*  }}*/}
                {/*  multiline={true}*/}
                {/*  onBlur={() => {*/}
                {/*    if(values.Title!=='')*/}
                {/*    setShowBackBtn(false);*/}
                {/*  }}*/}
                {/*  placeholderTextColor={"#fff"} />*/}
                {touched.Title && errors.Title &&
                <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10) }}>{errors.Title}</Text>
                }
                {
                  touched.Title && !errors.Title&&
                 navigatebtn()
                }
                {tasktitleerro===true &&
                <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10) }}>task Title ! Please?</Text>
                }

                  {
                    GLOBAL.ScreenName==='Snagging'|| GLOBAL.ScreenName==='Subcontract'|| GLOBAL.ScreenName==='Property Maintenance'|| GLOBAL.ScreenName==='Support'?null:
                      <>
                        <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Category</Text>
                        <Dropdown
                          style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
                          placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
                          selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
                          inputSearchStyle={Styles.inputSearchStyle}
                          iconStyle={Styles.iconStyle}
                          itemTextStyle={Styles.itemTextStyle}
                          data={Taskcategory}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          disabled={true}
                          placeholder={!isFocus ? 'Select category' : '...'}
                          searchPlaceholder="Search..."
                          value={selectedcategory}
                          containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                          renderItem={renderItem}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item=> {
                            setShowBackBtn(false)
                            setSelectedcategory(item);
                            setCategoryId(item.value);
                            writeDataStorage(GLOBAL.Category_Last_Info,item.value);
                            Task_WorkTypeList(item.value);
                            setcategoryEntityShow(item.categoryEntityShow);
                            Task_subcategory(item.value)
                          }}
                          renderSelectedItem={(item, unSelect) => (
                            <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                              <View style={Styles.selectedStyle2}>
                                <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                                <AntDesign color="#fff" name="delete" size={15} />
                              </View>
                            </TouchableOpacity>
                          )}
                        />
                        {error==='selectedcategory' && selectedcategory==='' ?
                          <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select category! Please?</Text>:null
                        }
                      </>
                  }

                {
                  GLOBAL.ScreenName==='Support'?null:
                    <>
                      <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Work Type</Text>
                      <Dropdown
                        style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
                        placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
                        selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
                        inputSearchStyle={Styles.inputSearchStyle}
                        iconStyle={Styles.iconStyle}
                        itemTextStyle={Styles.itemTextStyle}
                        data={TaskWorkType}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Work Type' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedWorkType}
                        containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                        renderItem={renderItem}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item=> {
                          setShowBackBtn(false)
                          setselectedWorkType(item);
                          setWorkTypeId(item.value);
                          writeDataStorage(GLOBAL.WorkType_Last_Info,item.value)
                        }}
                        renderSelectedItem={(item, unSelect) => (
                          <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                            <View style={Styles.selectedStyle2}>
                              <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                              <AntDesign color="#fff" name="delete" size={15} />
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    </>
                }


                <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Priority</Text>
                <Dropdown
                  style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
                  placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
                  selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
                  inputSearchStyle={Styles.inputSearchStyle}
                  iconStyle={Styles.iconStyle}
                  itemTextStyle={Styles.itemTextStyle}
                  data={Taskpriority}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select Priority' : '...'}
                  value={selectedpriority}
                  containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                  renderItem={renderItem}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item=> {
                    setShowBackBtn(false)
                    setselectedpriority(item);
                    setpriorityId(item.value);
                    writeDataStorage(GLOBAL.priorityId_Last_Info,item.value)
                  }}
                  renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                      <View style={Styles.selectedStyle2}>
                        <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                        <AntDesign color="#fff" name="delete" size={15} />
                      </View>
                    </TouchableOpacity>
                  )}
                />
                {categoryEntityShow==='y' ?
                  <>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Target Entity </Text>
                    <Dropdown
                      style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
                      placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
                      selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
                      iconStyle={Styles.iconStyle}
                      itemTextStyle={Styles.itemTextStyle}
                      data={RelatedNameList}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocusrelated ? 'Select Target Entity' : '...'}
                      searchPlaceholder="Search..."
                      value={selectedrelatedname}
                      containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                      renderItem={renderItem}
                      onFocus={() => setIsFocusrelated(true)}
                      onBlur={() => setIsFocusrelated(false)}
                      onChange={item=> {
                        setShowBackBtn(false)
                        FindCategoryId(item)
                        setselectedrelatedname(item);
                        setTaskRelatedNameId(item.value);
                        setcategoryLevel(item.categoryLevel);
                        writeDataStorage(GLOBAL.RelatedName_Last_Info, item.label);
                        setRelatedNameLvalue(item.label);
                      }}
                    />
                  </>:null
                }

                {
                  GLOBAL.TaskRelatedNameId!==''?
                  <>
                      <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Project</Text>
                      <Dropdown
                        style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
                        placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
                        selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
                        iconStyle={Styles.iconStyle}
                        itemTextStyle={Styles.itemTextStyle}
                        containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                        data={TaskRelated}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusrelated ? 'Select Project ' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedrelated}
                        renderItem={renderItem}
                        onFocus={() => setIsFocusrelated(true)}
                        onBlur={() => setIsFocusrelated(false)}
                        onChange={item=> {
                          setShowBackBtn(false)
                          writeDataStorage(GLOBAL.projectId_Last_Info,item.value)
                          GLOBAL.ProjectId=item.value;
                          if(RelatedNameLvalue==='project') {
                            setSelectedrelated(item);
                            setRelatedId(item.value);
                            writeDataStorage(GLOBAL.RelatedId_Last_Info, item.value)
                          }
                          else {
                            const categoryId= categoryLevellist.find((p)=>p.categoryLevel==='2')?.value
                            getSites(categoryId,item.value);
                            setSelectedrelated(item);
                            setTaskProjectId(item.value)
                          }
                        }}
                      />

                    {categoryLevellist.find((p) => p?.label === 'Site') &&
                    <>
                        <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Site</Text>
                        <Dropdown
                          style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
                          placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
                          selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
                          iconStyle={Styles.iconStyle}
                          itemTextStyle={Styles.itemTextStyle}
                          containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                          data={SiteList}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocusrelated ? 'Select Site' : '...'}
                          searchPlaceholder="Search..."
                          value={selectedTaskSiteName}
                          renderItem={renderItem}
                          onFocus={() => setIsFocusrelated(true)}
                          onBlur={() => setIsFocusrelated(false)}
                          onChange={item=> {
                            setShowBackBtn(false)
                            GLOBAL.SiteId=item.value;
                            writeDataStorage(GLOBAL.siteId_Last_Info,item.value)
                            if(RelatedNameLvalue==='Site') {
                              setselectedTaskSiteName(item);
                              setRelatedId(item.value)
                              writeDataStorage(GLOBAL.RelatedId_Last_Info, item.value)
                            }
                            else {
                              const categoryId= categoryLevellist.find((p)=>p.categoryLevel==='3')?.value
                              getUnits(categoryId,item.value);
                              setselectedTaskSiteName(item);
                              setTaskSiteId(item.value)
                            }
                          }}
                        />
                    </>
                    }
                    {categoryLevellist.find((p)=>p?.label==='Unit')&&
                    <>
                      <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Unit</Text>
                      <Dropdown
                        style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
                        placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
                        selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
                        iconStyle={Styles.iconStyle}
                        itemTextStyle={Styles.itemTextStyle}
                        containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusrelated ? 'Select unit' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedunitName}
                        data={unitList}
                        search
                        renderItem={renderItem}
                        onFocus={() => setIsFocusrelated(true)}
                        onBlur={() => setIsFocusrelated(false)}
                        onChange={item=> {
                          setShowBackBtn(false)
                          writeDataStorage(GLOBAL.unitId_Last_Info,item.value)
                          GLOBAL.UnitId=item.value
                          if(RelatedNameLvalue==='Unit') {
                            setselectedunitName(item);
                            setRelatedId(item.value)
                            writeDataStorage(GLOBAL.RelatedId_Last_Info, item.value)
                          }
                          else {
                            const categoryId= categoryLevellist.find((p)=>p.categoryLevel==='4')?.value
                            getSection(categoryId,item.value);
                            setselectedunitName(item);
                            setTaskunitId(item.value)
                          }
                        }}
                      />
                    </>
                    }
                    {categoryLevellist.find((p)=>p?.label==='Section')&&
                    <>
                      <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Section</Text>
                      <Dropdown
                        style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
                        placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
                        selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
                        inputSearchStyle={Styles.inputSearchStyle}
                        iconStyle={Styles.iconStyle}
                        itemTextStyle={Styles.itemTextStyle}
                        data={sectionList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusrelated ? 'Select Section' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedsectionName}
                        containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                        renderItem={renderItem}
                        onFocus={() => setIsFocusrelated(true)}
                        onBlur={() => setIsFocusrelated(false)}
                        onChange={item=> {
                          setShowBackBtn(false)
                          writeDataStorage(GLOBAL.sectionId_Last_Info,item.value)
                          GLOBAL.SectionId=item.value
                          if(RelatedNameLvalue==='Section') {
                            setselectedsectionName(item);
                            setRelatedId(item.value)
                            writeDataStorage(GLOBAL.RelatedId_Last_Info, item.value)
                          }
                          else {
                            const categoryId= categoryLevellist.find((p)=>p.categoryLevel==='5')?.value
                            getFeatures(categoryId,item.value);
                            setselectedsectionName(item);
                            setTasksectionId(item.value)
                          }
                        }}
                      />
                    </>
                    }
                    {categoryLevellist.find((p)=>p?.label==='Feature')&&
                    <>
                      <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Feature</Text>
                      <Dropdown
                        style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
                        placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
                        selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
                        inputSearchStyle={Styles.inputSearchStyle}
                        iconStyle={Styles.iconStyle}
                        itemTextStyle={Styles.itemTextStyle}
                        data={featureList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusrelated ? 'Select Feature' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedfeatureName}
                        containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                        renderItem={renderItem}
                        onFocus={() => setIsFocusrelated(true)}
                        onBlur={() => setIsFocusrelated(false)}
                        onChange={item=> {
                          setShowBackBtn(false)
                          writeDataStorage(GLOBAL.featureId_Last_Info,item.value)
                          if(RelatedNameLvalue==='Feature') {
                            setselectedfeatureName(item);
                            setRelatedId(item.value)
                            writeDataStorage(GLOBAL.RelatedId_Last_Info, item.value)
                          }
                          else {
                            getFeatures();
                            setTaskfeatureId(item);
                            setTasksectionId(item.value)
                          }
                        }}
                      />
                    </>
                    }

                    </>
                        :

                  GLOBAL.ScreenName==='Snagging'|| GLOBAL.ScreenName==='Subcontract'?
                    <>

                        {RelatedNameListTask?.map((value, key) => {
                          return (
                            <TaskFilterDropDown
                              categoryLevellist={RelatedNameListTask}  value={value} key={key} getLists={getListsTask} SubCategory_List={categoryLevellist} setRelatedId={setRelatedId} entityIdList={entityIdList}  setEntityIdList={setEntityIdList}
                              dropdownStyle={Styles.dropdownModalFilter} textStyle={Styles.txt_leftModalFilter} placeholderStyle={Styles.placeholderStyleModalFilter}
                              selectedTextStyle={Styles.selectedTextModalFilter} containerStyle={Styles.containerModalFilter} setRelatedName={setRelatedName}
                              TypeName={GLOBAL.ScreenName} getSection={getSection}  getUnit2={getUnit2}
                              selectedrelated={selectedrelated} setSelectedrelated={setSelectedrelated}
                              categoryId={categoryId} TypeName2={'Add'}
                              Taskcategory={Taskcategory} setCategoryId={setCategoryId}
                              TaskRelated={TaskRelated}
                              RelatedNameList={RelatedNameListTask}
                              TaskRelatedNameId={TaskRelatedNameId} setTaskRelatedNameId={setTaskRelatedNameId}
                              selectedrelatedname={selectedrelatedname} setselectedrelatedname={setselectedrelatedname}
                              relatedId={relatedId} FilterTaskEntityDropDown={FilterTaskEntityDropDown}
                            />

                          );
                        })}

                    </>
                    :
                  //||GLOBAL.TaskRelatedCheck!==''
                      GLOBAL.ScreenName==='Property Maintenance'?
                        <>

                          {RelatedNameListTask?.map((value, key) => {
                            return (
                              <TaskFilterDropDown
                                categoryLevellist={RelatedNameListTask}  value={value} key={key} getLists={getListsTask} SubCategory_List={categoryLevellist} setRelatedId={setRelatedId} entityIdList={entityIdList}  setEntityIdList={setEntityIdList}
                                dropdownStyle={Styles.dropdownModalFilter} textStyle={Styles.txt_leftModalFilter} placeholderStyle={Styles.placeholderStyleModalFilter}
                                selectedTextStyle={Styles.selectedTextModalFilter} containerStyle={Styles.containerModalFilter} setRelatedName={setRelatedName}
                                TypeName={GLOBAL.ScreenName} getSection={getSection}  getUnit2={getUnit2}
                                selectedrelated={selectedrelated} setSelectedrelated={setSelectedrelated}
                                categoryId={categoryId} TypeName2={'Add'}
                                Taskcategory={Taskcategory} setCategoryId={setCategoryId}
                                TaskRelated={TaskRelated}
                                RelatedNameList={RelatedNameListTask}
                                TaskRelatedNameId={TaskRelatedNameId} setTaskRelatedNameId={setTaskRelatedNameId}
                                selectedrelatedname={selectedrelatedname} setselectedrelatedname={setselectedrelatedname}
                                relatedId={relatedId} FilterTaskEntityDropDown={FilterTaskEntityDropDown}
                              />

                            );
                          })}
                          
                        </>:
                        GLOBAL.ScreenName==='Support'?
<>
  <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Type of Issues</Text>

  <MultiSelect
    style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
    placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
    selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
    inputSearchStyle={Styles.inputSearchStyle}
    iconStyle={Styles.iconStyle}
    itemTextStyle={Styles.itemTextStyle}
    data={Taskissues}
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder={!isFocus ? 'Select Priority' : '...'}
    value={selectedTaskissues}
    containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
    renderItem={renderItem}
    onFocus={() => setIsFocus(true)}
    onBlur={() => setIsFocus(false)}
    onChange={item=> {
      setShowBackBtn(false)
      setselectedTaskissues(item);
      setTaskissuesId(item.value);
      writeDataStorage(GLOBAL.TaskIssues,item.value)
    }}
    renderSelectedItem={(item, unSelect) => (
      <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
        <View style={Styles.selectedStyle2}>
          <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
          <AntDesign color="#fff" name="delete" size={15} />
        </View>
      </TouchableOpacity>
    )}
  />

                          <Text style={[Styles.txtLightColor,{marginTop:normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Section</Text>
                          <Dropdown
                            style={[Styles.dropdowntask,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
                            placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
                            selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
                            inputSearchStyle={Styles.inputSearchStyle}
                            iconStyle={Styles.iconStyle}
                            itemTextStyle={Styles.itemTextStyle}
                            data={sectionList}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocusrelated ? 'Select Section' : '...'}
                            searchPlaceholder="Search..."
                            value={selectedsectionName}
                            containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                            renderItem={renderItem}
                            onFocus={() => setIsFocusrelated(true)}
                            onBlur={() => setIsFocusrelated(false)}
                            onChange={item=> {
                              setShowBackBtn(false)
                              writeDataStorage(GLOBAL.sectionId_Last_Info,item.value)
                              GLOBAL.SectionId=item.value

                                setselectedsectionName(item);
                                setRelatedId(item.value)
                                setselectedrelatedname({label:'support',value:'2',_index:0})
                                writeDataStorage(GLOBAL.RelatedId_Last_Info, item.value)

                                setTasksectionId(item.value)

                            }}
                          />
</>:
                          GLOBAL.TaskRelatedNameId===''&&GLOBAL.ScreenName===''&&GLOBAL.TaskRelatedCheck===''?
                            <>
                              {categoryLevellist?.map((value, key) => {
                                return (
                                  <Taskdropdown value={value} key={key} getLists={getLists} SubCategory_List={categoryLevellist} setRelatedId={setRelatedId} entityIdList={entityIdList}  setEntityIdList={setEntityIdList}
                                                textStyle={Styles.txtLightColor22}  dropdownStyle={Styles.dropdowntask}   placeholderStyle={Styles.placeholderStyle}
                                                selectedTextStyle={Styles.selectedTextStyle}  setShowBackBtn={ setShowBackBtn}
                                                containerStyle={Styles.containerStyle} setRelatedName={setRelatedName}

                                  />
                                );
                              })}
                            </>
                            :

                          null


                }

                <Text style={[Styles.txtLightColor,{marginTop: normalize(15),color:GLOBAL.footertext_backgroundColor}]}>Description</Text>
                <View style={[{
                  borderWidth: 1,
                  borderColor:GLOBAL.footertext_backgroundColor,
                  borderRadius: normalize(6),
                  padding: 12,
                  marginBottom: 5,
                  width: '100%',
                  paddingVertical: 4,
                  color: GLOBAL.OFFICIAL_BLUE_COLOR,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }]}>
                  <TextInput
                    value={values.TaskNote}
                    style={[{
                      width: '97%',
                      paddingVertical: 3,
                      fontFamily:'OpenSansBold'
                      ,color: GLOBAL.footertext_backgroundColor
                    }]}
                    onChangeText={handleChange("TaskNote")}
                    onFocus={() => {
                      setFieldTouched("TaskNote");
                      if(values.TaskNote!=='')
                        setShowBackBtn(false);
                    }}
                    multiline={true}
                    onBlur={() => {
                      if(values.TaskNote!=='')
                        setShowBackBtn(false);
                    }}
                    placeholderTextColor={'#fff'} />
                  {
                    started===''&&end===''?
                      <TouchableOpacity onPress={()=> {
                          _startRecognizing(values.Title);
                      }} style={[{}]}>
                        <MaterialIcons name={"keyboard-voice"} size={18} color={started===''&&end===''?Colors.borderButton:Colors.Red} />
                      </TouchableOpacity>:
                      <View>
                        <MaterialIcons name={"keyboard-voice"} size={18} color={started===''&&end===''?Colors.borderButton:Colors.Red} />
                      </View>
                  }

                </View>
                {
                  touched.TaskNote && !errors.TaskNote&&
                  navigatebtn()
                }
                {touched.TaskNote && errors.TaskNote &&
                <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10) }}>{errors.TaskNote}</Text>
                }
                {tasknoteerro===true &&
                <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10) }}>"Description ! Please?"</Text>
                }
                <View style={Styles.FlexWrap}>
                  <TouchableOpacity onPress={() => onOpen()} style={[Styles.unitDetailUploadImagebox,{borderColor:GLOBAL.footertext_backgroundColor}]}>
                    <Text style={[Styles.UploadImageText,{color:GLOBAL.footertext_backgroundColor}]}>
                      Add Media
                    </Text>
                    <MaterialIcons name={"add-a-photo"} size={20} color={GLOBAL.footertext_backgroundColor}  />
                  </TouchableOpacity>

                    <>
                      {
                        ImageSourceviewarray.map((value,index) => {
                          return (
                            <TaskImages key={index} value={value} DeleteImage={DeleteImage} />
                            // <View key={key} style={Styles.UnitDetailImageBoxFeatureStyle2}>
                            //   {
                            //     value.type==='video/mp4'?
                            //       <>
                            //         <TouchableOpacity onPress={()=>DeleteImage(value.uri)} style={Styles.UnitDetailAddTextBox234}>
                            //           <MaterialCommunityIcons name={"delete"} size={17} color={'#fff'} />
                            //         </TouchableOpacity>
                            //         <Video
                            //           source={{ uri: value.uri }}
                            //           onError={videoError}
                            //           controls={true}
                            //           resizeMode="cover"
                            //           autoplay={false}
                            //           style={{width:190, height: normalize(200),zIndex:0,borderRadius:normalize(6)}}
                            //         />
                            //       </>:
                            //       <ImageBackground source={{uri:value.uri}}
                            //                        imageStyle={{borderRadius:normalize(6)}}
                            //                        style={Styles.UnitDetailImagestyle}
                            //                        resizeMode="stretch">
                            //         <TouchableOpacity onPress={()=>DeleteImage(value.uri)} style={Styles.UnitDetailAddTextBox}>
                            //           <MaterialCommunityIcons name={"delete"} size={17} color={'#fff'} />
                            //         </TouchableOpacity>
                            //       </ImageBackground>
                            //   }
                            // </View>
                          )
                        })
                      }
                    </>




                </View>
                {/*{*/}
                {/*  uploadType==='Video'?*/}
                {/*    <View style={[Styles.FlexWrap,]}>*/}

                {/*      {*/}
                {/*        ImageSourceviewarray?.map((value,key) => {*/}
                {/*          return (*/}
                {/*            <View key={key} style={Styles.UnitDetailImageBoxFeatureStyle2}>*/}
                {/*              <TouchableOpacity onPress={()=>DeleteImage(value.uri)} style={Styles.UnitDetailAddTextBox}>*/}
                {/*                <MaterialCommunityIcons name={"delete"} size={17} color={'#fff'} />*/}
                {/*              </TouchableOpacity>*/}
                {/*              <Video*/}
                {/*                source={{ uri: value.uri }}*/}
                {/*                onError={videoError}*/}
                {/*                controls={true}*/}
                {/*                resizeMode="cover"*/}
                {/*                autoplay={false}*/}
                {/*                style={{width:195,height:200}}*/}
                {/*              />*/}

                {/*            </View>*/}
                {/*          )*/}
                {/*        })*/}
                {/*      }*/}


                {/*    </View>:null*/}
                {/*}*/}
                {
                  ShowButton===true?
                    <View style={[Styles.ViewItems_center_row2]}>
                      <ButtonI style={[Styles.btn, {
                        //margin:normalize(15),
                        flexDirection: "row",
                        width:'35%',
                        paddingVertical: 2,
                        marginTop: normalize(30),
                      }]}//handleSubmit
                               onpress={handleSubmit}
                               categoriIcon={""}
                               title={'Add Task'}
                               colorsArray={['#a39898','#786b6b','#382e2e']}
                               styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
                        <ButtonI style={[Styles.btn, {
                          //margin:normalize(15),
                          flexDirection: "row",
                          width: '60%',
                          paddingVertical: 2,
                          marginTop: normalize(30),
                        }]}//handleSubmit
                                 onpress={()=>CreateTask(values)}
                                 categoriIcon={""}
                                 title={'Add & Create Next Task'}
                                 colorsArray={['#4d78a5', "#375e89", "#27405c"]}
                                 styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
                    </View>:null
                }
              </View>

            )}
          </Formik>

        </View>


    );
  }
  if (numberValue === 25) {
    return (

      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Title:value?.taskTitle,
            TaskNote:results,
          }}
          enableReinitialize
          onSubmit={values => {
            onChangeText(values);
          }}
          // validationSchema={validationSchema24}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={[Styles.formContainer2,]}>
              <View style={[{width:"89%",marginBottom:"4%" }]}>
                <TouchableOpacity onPress={() => {
                  string_equalityTask(values)
                }} style={Styles.CancelBtnLeftAlign}>
                  <AntDesign name={"closecircleo"} size={20} color={Colors.button} />
                </TouchableOpacity>
              </View>
              {
                showModalDelete &&
                <View>
                  {
                    _showModalDelete()
                  }
                </View>
              }

              <View style={[Styles.dateBoxitems,{marginTop:'1%'}]}>
                <View  style={Styles.dateBoxItem1}>
                  <Text style={[Styles.txtLightColor2,{marginTop:normalize(8)}]}>Task Work Type</Text>
                </View>
                <View  style={Styles.dateBoxItem1}>
                  <Text style={[Styles.txtLightColor2,{marginTop:normalize(8)}]}>Task Category Name</Text>
                </View>
              </View>
              <View style={[Styles.dateBoxitems,{marginTop:'1%'}]}>
                <View  style={[Styles.dateBoxItem,]}>
                  <Text style={[Styles.txtdate2]}>
                    {value?.taskWorkType}
                  </Text>
                </View>
                <View  style={Styles.dateBoxItem}>
                  <Text style={[Styles.txtdate2]}>
                    {value?.taskCategoryName}
                  </Text>
                </View>
              </View>

              <View style={[Styles.dateBoxitems,{marginTop:'1%'}]}>
                <View  style={Styles.dateBoxItem1}>
                  <Text style={[Styles.txtLightColor2,{marginTop:normalize(8)}]}>Task Related Name</Text>
                </View>
                <View  style={Styles.dateBoxItem1}>
                  <Text style={[Styles.txtLightColor2,{marginTop:normalize(8)}]}>Task Related NameRef</Text>
                </View>
              </View>
              <View style={[Styles.dateBoxitems,{marginTop:'1%'}]}>
                <View  style={[Styles.dateBoxItem,]}>
                  <Text style={[Styles.txtdate2]}>
                    {value?.taskRelatedName}
                  </Text>
                </View>
                <View  style={Styles.dateBoxItem}>
                  <Text style={[Styles.txtdate2]}>
                    {value?.taskRelatedNameRef}
                  </Text>
                </View>
              </View>
              <View style={[Styles.dateBoxitems,{marginTop:'1%'}]}>
                <View  style={Styles.dateBoxItem1}>
                  <Text style={[Styles.txtLightColor2,{marginTop:normalize(8)}]}>Status</Text>
                </View>
                <View  style={Styles.dateBoxItem1}>
                  <Text style={[Styles.txtLightColor2,{marginTop:normalize(8)}]}>Priority</Text>
                </View>
              </View>
              <View style={[Styles.dateBoxitems,{marginTop:'1%'}]}>
                <View  style={Styles.dateBoxItem}>
                  <Text style={[Styles.txtdate,{color:value?.taskStatusColor}]}>
                    {value?.taskStatusName}
                  </Text>
                </View>
                <View  style={[Styles.dateBoxItem,]}>
                  <Text style={[Styles.txtdate,{color:'#fcd274' }]}>
                    {value?.taskPriorityName}
                  </Text>
                </View>
              </View>
              <View style={[Styles.dateBoxitems,{marginTop:'1%'}]}>

                <View  style={Styles.dateBoxItem1}>
                  <Text style={[Styles.txtLightColor2,{marginTop:normalize(8)}]}>Task Created On</Text>
                </View>
              </View>
              <View style={[Styles.dateBoxitems,{marginTop:'1%'}]}>

                <View  style={[Styles.dateBoxItem,]}>
                  <Text style={[Styles.txtdate2]}>
                    {value?.taskCreatedOn}
                  </Text>
                </View>
              </View>

              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Title</Text>

              <TextInput
                value={values.Title}
                style={[Styles.inputStyleTask]}
                onChangeText={handleChange("Title")}
                onFocus={() => setFieldTouched("Title")}
                multiline={true}
                placeholderTextColor={"#fff"} />
              {touched.Title && errors.Title &&
              <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10) }}>{errors.Title}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(15),}]}>{GLOBAL.selectItem === 1 ?'Description':'PlanFeedback'}</Text>
              <View style={[{
                borderWidth: 1,
                borderColor:GLOBAL.footertext_backgroundColor,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width: '100%',
                paddingVertical: 4,
                color: GLOBAL.OFFICIAL_BLUE_COLOR,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }]}>
                <TextInput
                  value={values.TaskNote}
                  style={[{
                    width: '97%',
                    paddingVertical: 3,
                    fontFamily:'OpenSansBold'
                    ,color: GLOBAL.footertext_backgroundColor
                  }]}
                  onChangeText={handleChange("TaskNote")}
                  onFocus={() => setFieldTouched("TaskNote")}
                  multiline={true}
                  placeholderTextColor={'#fff'} />
                {
                  started===''&&end===''?
                    <TouchableOpacity onPress={()=> {
                      _startRecognizing(values.Title);
                    }} style={[{}]}>
                      <MaterialIcons name={"keyboard-voice"} size={18} color={started===''&&end===''?Colors.borderButton:Colors.Red} />
                    </TouchableOpacity>:
                    <View>
                      <MaterialIcons name={"keyboard-voice"} size={18} color={started===''&&end===''?Colors.borderButton:Colors.Red} />
                    </View>
                }
              </View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(15),}]}>{GLOBAL.selectItem === 1 ?'':'CaseNote'}</Text>

              {
                GLOBAL.selectItem === 1 ?
                  null :
                  <TextInput
                    value={values.CaseNote}
                    style={[Styles.inputStyleTask, { paddingVertical: '4%' }]}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("CaseNote")}
                    onFocus={() => setFieldTouched("CaseNote")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
              }
              {ImageSourceviewarray?.length!==0 && (
                <View style={Styles.With100NoFlexMarginBotoom}>
                  <View style={[Styles.carouselBtnStyle,{marginTop:'4%'}]}>
                    <TouchableOpacity style={Styles.carouselStyle} onPress={()=>_slider1Ref.snapToPrev()}>
                      <AntDesign name="caretleft" size={normalize(14)} color={Colors.button} />
                      <Text style={Styles.skiptext}>Prev</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={Styles.carouselStyle1} onPress={()=>_slider1Ref.snapToNext()}>
                      <Text style={Styles.skiptext}>Next</Text>
                      <AntDesign name="caretright" size={normalize(14)} color={Colors.button} />
                    </TouchableOpacity>
                  </View>
                  <Carousel
                    ref={c => _slider1Ref = c}
                    data={ImageSourceviewarray}
                    renderItem={_renderItem_Carousel}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.4}
                    containerCustomStyle={Styles.slider}
                    contentContainerCustomStyle={Styles.tasksliderContentContainer}
                    onSnapToItem={(index) => setslider1ActiveSlide(index)}
                  />
                </View>
              )}
              {
              ShowButton===true?
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(20),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#a39898','#786b6b','#382e2e']}
                         styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>:null
              }
            </View>
          )}
        </Formik>
      </View>
    );
  }
  if (numberValue === 29) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Title:value?.taskTitle,
            TaskNote:value?.taskFeedback,
            CaseNote:value?.taskRequestNotes,
            switchDYB:switchDYB2,
            DateFormatplanstart:DateFormatplanstart,
            DateFormatplanend:DateFormatplanend
          }}
          onSubmit={values => {
            onChangeText(values);
          }}>
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={[Styles.formContainer2,]}>
              <View style={[{ width: "89%", marginBottom: "4%" }]}>
                <TouchableOpacity onPress={() => {
                  string_equalityAssignTask(values)
                }} style={Styles.CancelBtnLeftAlign}>
                  <AntDesign name={"closecircleo"} size={20} color={"#fff"} />
                </TouchableOpacity>
              </View>
              {
                showModalDelete &&
                <View>
                  {
                    _showModalDelete()
                  }
                </View>
              }
              <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>Title</Text>
              <TextInput
                value={values.Title}
                style={[Styles.inputStyleTask]}
                onChangeText={handleChange("Title")}
                onFocus={() => setFieldTouched("Title")}
                multiline={true}
                placeholderTextColor={"#fff"} />
              {touched.Title && errors.Title &&
              <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10) }}>{errors.Title}</Text>
              }
              <View  style={Styles.dateBox}>
                <View  style={Styles.dateBoxitems}>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanStartDate");
                    setOpen(true)
                  }} style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                      Plan StartDate
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanEndDate");
                    setOpen(true)
                  }} style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                      Plan EndDate
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.dateBoxitems}>
                  <TouchableOpacity onPress={()=> {
                    setOpen(true)
                  }} style={Styles.dateBoxItem}>
                    <Text style={Styles.txtdate}>
                      {DateFormatplanstart}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> {
                    setOpenend(true)}}
                    style={Styles.dateBoxItem}>
                    <Text style={Styles.txtdate}>
                      {DateFormatplanend}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.dateBoxitems}>
                  <View style={Styles.dateBoxItemBorder}>

                    {error==='PlanStartDate' && DateFormatplanstart==='' ?
                      <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select PlanStartDate! Please?</Text>:null
                    }
                  </View>
                  <View style={Styles.dateBoxItemBorder}>
                    {error==='PlanEndDate' && DateFormatplanend==='' ?
                      <Text style={{fontSize: 12,color:"#FF0D10",marginTop:normalize(10)}}>Select PlanEndDate! Please?</Text>:null
                    }
                  </View>
                </View>
                <View  style={Styles.dateBoxitems}>
                  <View  style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                     Status
                    </Text>
                  </View>
                  <View  style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                    Priority
                    </Text>
                  </View>
                </View>
                <View style={[Styles.dateBoxitems,{marginTop:'1%'}]}>
                  <View  style={Styles.dateBoxItem}>
                    <Text style={[Styles.txtdate,{color:value?.taskStatusColor}]}>
                      {value?.taskStatusName}
                    </Text>
                  </View>
                  <View  style={[Styles.dateBoxItem,]}>
                    <Text style={[Styles.txtdate,{color:value?.taskPriorityColor }]}>
                      {value?.taskPriorityName}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(15),}]}>Plan Feedback</Text>
              <TextInput
                value={values.TaskNote}
                style={[Styles.inputStyleTask,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("TaskNote")}
                onFocus={() => {
                  setFieldTouched("TaskNote");
                }}
                multiline={true}
                placeholderTextColor={'#fff'} />
              <Text style={[Styles.txtLightColor,{marginTop: normalize(15),}]}>Case Note</Text>
              {showNewInput===false&&
              <TextInput
                value={values.CaseNote}
                style={[Styles.inputStyleTask, { paddingVertical: '4%' }]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                onChangeText={handleChange("CaseNote")}
                onFocus={() => {
                  setFieldTouched("CaseNote");
                  values.CaseNote=value?.taskRequestNotes+`\n---${Full}---\n`;
                }}
                multiline={true}
                placeholderTextColor={'#fff'} />
              }
              {ImageSourceviewarray?.length!==0 && (
                <View style={Styles.With100NoFlexMarginBotoom}>
                  <View style={[Styles.carouselBtnStyle,{marginTop:'4%'}]}>
                    <TouchableOpacity style={Styles.carouselStyle} onPress={()=>_slider1Ref.snapToPrev()}>
                      <AntDesign name="caretleft" size={normalize(14)} color={Colors.withe} />
                      <Text style={Styles.skiptext}>Prev</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={Styles.carouselStyle1} onPress={()=>_slider1Ref.snapToNext()}>
                      <Text style={Styles.skiptext}>Next</Text>
                      <AntDesign name="caretright" size={normalize(14)} color={Colors.withe} />
                    </TouchableOpacity>
                  </View>
                  <Carousel
                    ref={c => _slider1Ref = c}
                    data={ImageSourceviewarray}
                    renderItem={_renderItem_Carousel}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.4}
                    containerCustomStyle={Styles.slider}
                    contentContainerCustomStyle={Styles.tasksliderContentContainer}
                    onSnapToItem={(index) => setslider1ActiveSlide(index)}
                  />
                </View>
              )}
              <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Task Finished</Text>
              <ToggleSwitch
                isOn={switchDYB2}
                size="large"
                style={{marginLeft:'auto'}}
                trackOnStyle={{
                  backgroundColor:GLOBAL.OFFICIAL_Button,
                }}
                trackOffStyle={{
                  backgroundColor: "#a0a3bd",
                }}
                thumbOffStyle={{
                  borderRadius: 19,
                  borderColor: "rgb(255,255,255)",
                }}
                thumbOnStyle={{
                  borderRadius: 19,
                  borderColor: "rgb(255,255,255)", // rgb(102,134,205)
                }}
                onToggle={isOn => {
                  setswitchDYB2(isOn)
                  setCheked(isOn)
                }}
              />
              {
                ShowButton===true?
                  <View style={[Styles.ViewItems_center]}>
                    <ButtonI style={[Styles.btn, {
                      //margin: normalize(15),
                      flexDirection: "row",
                      width: '100%',
                      paddingVertical: 2,
                      marginTop: normalize(20),
                    }]}//handleSubmit
                             onpress={handleSubmit}
                             categoriIcon={""}
                             title={tittlebtn}
                             colorsArray={['#a39898','#786b6b','#382e2e']}
                             styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
                  </View>:null
              }
            </View>

          )}
        </Formik>

      </View>


    );
  }
  if (numberValue === 27) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            TaskNote:""
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema18}>
          {({values,handleChange,errors,setFieldTouched,touched,handleSubmit }) => (
            <View style={styles.formContainer}>
              <DropDownItems labale={'Reason'} data={reasons}  setIsFocus={setIsFocus} name={selectedrelated}
                             textStyle={Styles.txtLightColor22}  dropdownStyle={Styles.dropdowntask}   placeholderStyle={Styles.placeholderStyle}
                             selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true} Onpres={Func}
                             containerStyle={Styles.containerStyle} inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                             setId={setRelatedId} setname={setSelectedrelated} Function={Func}
              />
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Reject Reason</Text>
              <TextInput
                value={values.TaskNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e)=>{
                  numOfLinesCompany=e.nativeEvent.contentSize.height/14
                }}
                onChangeText={handleChange("TaskNote")}
                onFocus={()=>setFieldTouched("TaskNote")}
                multiline={true}
                placeholderTextColor={'#fff'}/>
              {touched.TaskNote && errors.TaskNote &&
              <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10),fontWeight:'bold' }}>{errors.TaskNote}</Text>
              }
              <View style={[Styles.ViewItems_center_task]}>
                <ButtonI style={[Styles.btn,{
                  flexDirection:"row",
                  width:'50%',
                  paddingVertical:2,
                  marginTop:normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  }
  if (numberValue === 28) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            CaseNote:"",
            FeedbackNote:""
          }}
          onSubmit={values => {
            onChangeText(values);
          }}>
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <View  style={Styles.dateBox}>
                <View  style={Styles.dateBoxitems}>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanStartDate");
                    setOpen(true)
                  }} style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                      Plan StartDate
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanEndDate");
                    setOpen(true)
                  }} style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                      Plan EndDate
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.dateBoxitems}>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanStartDate");
                    setOpen(true)
                  }} style={Styles.dateBoxItem}>
                    <Text style={Styles.txtdate2}>
                      {DateFormatplanstart}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanEndDate");
                    setOpenend(true)
                  }} style={Styles.dateBoxItem}>
                    <Text style={Styles.txtdate2}>
                      {DateFormatplanend}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.dateBoxitems}>
                  <View style={Styles.dateBoxItemBorder}>
                    {error==='PlanStartDate' && DateFormatplanstart==='' ?
                      <Text style={{fontSize:11,color:"#FF0D10",marginTop:normalize(10),fontWeight:'bold'}}>Select PlanStartDate! Please?</Text>:null
                    }
                  </View>
                  <View style={Styles.dateBoxItemBorder}>
                    {error==='PlanEndDate' && DateFormatplanend==='' ?
                      <Text style={{fontSize:11,color:"#FF0D10",marginTop:normalize(10),fontWeight:'bold'}}>Select PlanEndDate! Please?</Text>:null
                    }
                  </View>
                </View>
              </View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Feedback for Request</Text>
              <TextInput
                value={values.FeedbackNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e)=>{
                  numOfLinesCompany=e.nativeEvent.contentSize.height/14
                }}
                onChangeText={handleChange("FeedbackNote")}
                onFocus={()=>setFieldTouched("FeedbackNote")}
                multiline={true}
                placeholderTextColor={'#fff'}/>
              {touched.FeedbackNote && errors.FeedbackNote &&
              <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10),fontWeight:'bold' }}>{errors.FeedbackNote}</Text>}
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Case Note</Text>
              <TextInput
                value={values.CaseNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e)=>{
                  numOfLinesCompany=e.nativeEvent.contentSize.height/14
                }}
                onChangeText={handleChange("CaseNote")}
                onFocus={()=>setFieldTouched("CaseNote")}
                multiline={true}
                placeholderTextColor={'#fff'}/>
              {touched.CaseNote && errors.CaseNote &&
              <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10),fontWeight:'bold' }}>{errors.CaseNote}</Text>
              }
              <View style={[Styles.ViewItems_center_task]}>
                <ButtonI style={[Styles.btn,{
                  flexDirection:"row",
                  width:'50%',
                  paddingVertical:2,
                  marginTop:normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txtbtn2,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  }
  if (numberValue === 32) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            taskNote:"",
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema32}>
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>

              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Reason</Text>
              <TextInput
                value={values.taskNote}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e)=>{
                  numOfLinesCompany=e.nativeEvent.contentSize.height/14
                }}
                onChangeText={handleChange("taskNote")}
                onFocus={()=>setFieldTouched("taskNote")}
                multiline={true}
                placeholderTextColor={'#fff'}/>
              {touched.taskNote && errors.taskNote &&
              <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10),fontWeight:'bold' }}>{errors.taskNote}</Text>}

              <View style={[Styles.ViewItems_center_task]}>
                <ButtonI style={[Styles.btn,{
                  flexDirection:"row",
                  width:'50%',
                  paddingVertical:2,
                  marginTop:normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txt,{fontSize: normalize(16),}]} sizeIcon={27} />

              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  }
  if (numberValue === 33) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            CompletedDetails:"",
            TimeRelated:'',
            totalTime:''
          }}
          onSubmit={values => {
            onChangeText(values);
          }}>
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <View  style={Styles.dateBox}>
                <View  style={Styles.dateBoxitems}>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanStartDate");
                    setOpen(true)
                  }} style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                      Task StartDate
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanEndDate");
                    setOpen(true)
                  }} style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                      Task EndDate
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.dateBoxitems}>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanStartDate");
                    setOpen(true)
                  }} style={Styles.dateBoxItem}>
                    <Text style={Styles.txtdate2}>
                      {DateFormatplanstart}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> {
                    setdateType("PlanEndDate");
                    setOpenend(true)
                  }} style={Styles.dateBoxItem}>
                    <Text style={Styles.txtdate2}>
                      {DateFormatplanend}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.dateBoxitems}>
                  <View style={Styles.dateBoxItemBorder}>
                    {error==='PlanStartDate' && DateFormatplanstart==='' ?
                      <Text style={{fontSize:11,color:"#FF0D10",marginTop:normalize(10),fontWeight:'bold'}}>Select PlanStartDate! Please?</Text>:null
                    }
                  </View>
                  <View style={Styles.dateBoxItemBorder}>
                    {error==='PlanEndDate' && DateFormatplanend==='' ?
                      <Text style={{fontSize:11,color:"#FF0D10",marginTop:normalize(10),fontWeight:'bold'}}>Select PlanEndDate! Please?</Text>:null
                    }
                  </View>
                </View>
              </View>
              <View  style={Styles.dateBox}>
                <View  style={Styles.dateBoxitems}>
                  <View  style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                      Time Related
                    </Text>
                  </View>
                  <View style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                    Total Time
                    </Text>
                  </View>
                </View>
                <View style={Styles.dateBoxitems}>
                  <View style={Styles.InputeRowItems}>
                    <DropDownItems labale={''} data={reasons}  setIsFocus={setIsFocus} name={TimeRelatedselct}
                                   textStyle={Styles.txtLightColor22}  dropdownStyle={Styles.dropdownLocation}   placeholderStyle={Styles.placeholderStyle}
                                   selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true} Onpres={Func}
                                   containerStyle={Styles.containerStyle} inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                                   setId={setRelatedId} setname={setTimeRelatedselct} Function={Func}
                    />
                    {GeoAddressCountry==='' &&
                    <Text style={{ fontSize: 12, color: "#FF0D10" }}>"Country! Please?"</Text>
                    }
                  </View>
                  <View  style={Styles.dateBoxItem}>
                    <Text style={Styles.txtdate2}>
                      {dateDifferenceHours!==0&&dateDifferenceHours}  {dateDifferenceDays!==0&&dateDifferenceDays}
                    </Text>
                  </View>
                </View>
                <View style={Styles.dateBoxitems}>
                  <View style={Styles.dateBoxItemBorder}>
                    {error==='PlanStartDate' && DateFormatplanstart==='' ?
                      <Text style={{fontSize:11,color:"#FF0D10",marginTop:normalize(10),fontWeight:'bold'}}>Select PlanStartDate! Please?</Text>:null
                    }
                  </View>
                  <View style={Styles.dateBoxItemBorder}>
                    {error==='PlanEndDate' && DateFormatplanend==='' ?
                      <Text style={{fontSize:11,color:"#FF0D10",marginTop:normalize(10),fontWeight:'bold'}}>Select PlanEndDate! Please?</Text>:null
                    }
                  </View>
                </View>
              </View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Completed Details</Text>
              <TextInput
                value={values.CompletedDetails}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e)=>{
                  numOfLinesCompany=e.nativeEvent.contentSize.height/14
                }}
                onChangeText={handleChange("CompletedDetails")}
                onFocus={()=>setFieldTouched("CompletedDetails")}
                multiline={true}
                placeholderTextColor={'#fff'}/>
              {touched.CompletedDetails && errors.CompletedDetails &&
              <Text style={{ fontSize: 12, color: "#FF0D10",marginTop:normalize(10),fontWeight:'bold' }}>{errors.CompletedDetails}</Text>}
              <View style={[Styles.ViewItems_center_task]}>
                <ButtonI style={[Styles.btn,{
                  flexDirection:"row",
                  width:'50%',
                  paddingVertical:2,
                  marginTop:normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txtbtn2,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  }

  ///////////////////Task////////////////

  if (numberValue === 20) {
    return (
      <View>
        <Formik
          initialValues={{
            DYBName: "",
            DYBNote:"",
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema15}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>DYB Name</Text>
              <TextInput
                value={values.DYBName}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("DYBName")}
                onFocus={() => setFieldTouched("DYBName")}
                placeholderTextColor={'#fff'} />
              {touched.DYBName && errors.DYBName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.DYBName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Notes</Text>
              <TextInput
                value={values.DYBNote}
                style={[inputStyle, { paddingVertical: normalize(25) }]}
                onChangeText={handleChange("DYBNote")}
                onFocus={() => setFieldTouched("DYBNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              <View style={{
                flexDirection: "row",
                width: width - 50, marginTop: 12, zIndex: 100,
              }}>
              </View>
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn,{
                  flexDirection:"row",
                  width:width-53,
                  paddingVertical:2,
                  marginTop:normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffc2b5','#fca795','#d1583b']}
                         styleTxt={[Styles.txtbtn2,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 21) {
    return (
      <View>
        <Formik

          initialValues={{
            DYBName:featureName,
            DYBNote:'',

          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema15}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>DYB Name</Text>
              <TextInput
                value={values.DYBName}
                style={[inputStyle, { paddingVertical: 6 }]}
                onChangeText={handleChange("DYBName")}
                onFocus={() => setFieldTouched("DYBName")}
                placeholderTextColor={'#fff'} />
              {touched.DYBName && errors.DYBName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.DYBName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}> Notes</Text>
              <TextInput
                value={values.DYBNote}
                style={[inputStyle, { paddingVertical: normalize(25) }]}
                onChangeText={handleChange("DYBNote")}
                onFocus={() => setFieldTouched("DYBNote")}
                multiline={true}
                placeholderTextColor={'#fff'} />
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn,{
                  flexDirection:"row",
                  width:'95%',
                  paddingVertical:2,
                  marginTop:normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffc2b5','#fca795','#d1583b']}
                         styleTxt={[Styles.txtbtn2,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

  ///////////////////DYB////////////////

  if (numberValue === 5) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            UserName:GLOBAL.UserInformation.Username,
            password:GLOBAL.UserInformation.Password,
            Confirmpassword:GLOBAL.UserInformation.Password,
            FullName:GLOBAL.UserInformation.FullName,
            OrgKey:GLOBAL.UserInformation.OrgAppKey
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema2}>
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={{width:'90%'}}>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),color:GLOBAL.input_titleColor }]}>User Name</Text>
              <TextInput
                value={values.UserName}
                style={[inputStyle,{color:GLOBAL.input_titleColor,borderColor:GLOBAL.input_borderColor}]}
                onChangeText={handleChange("UserName")}
                onFocus={() => setFieldTouched("UserName")}
                placeholderTextColor={'#fff'} />
              {touched.UserName && errors.UserName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.UserName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),color:GLOBAL.input_titleColor}]}>Password</Text>
              <View style={[{
                borderWidth: 1,
                borderColor: GLOBAL.OFFICIAL_Button,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width: '100%',
                paddingVertical: 4,
                color: GLOBAL.OFFICIAL_BLUE_COLOR,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }]}>
                <TextInput
                  value={values.password}
                  style={[{
                    width: '97%',
                    paddingVertical: 3, color: GLOBAL.OFFICIAL_BLUE_COLOR,
                    fontFamily:'TisaSansProBoldItalic',
                  }]}
                  onChangeText={handleChange("password")}
                  onFocus={() => setFieldTouched("password")}
                  secureTextEntry={securetText}
                  placeholderTextColor={'#fff'} />
                <View style={[{}]}>
                  <TouchableOpacity onPress={onpress}>
                    <Feather name={iconsecuret} size={15} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
                  </TouchableOpacity>
                </View>
              </View>
              {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.password}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),color:GLOBAL.input_titleColor}]}>Confirm Password</Text>
              <View style={[{
                borderWidth: 1,
                borderColor: GLOBAL.OFFICIAL_Button,
                borderRadius: normalize(6),
                padding: 12,
                marginBottom: 5,
                width: '100%',
                paddingVertical: 4,
                color: GLOBAL.OFFICIAL_BLUE_COLOR,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }]}>
              <TextInput
                value={values.Confirmpassword}
                style={[{
                  width: '97%',
                  paddingVertical: 3, color: GLOBAL.OFFICIAL_BLUE_COLOR,
                  fontFamily:'TisaSansProBoldItalic',
                }]}
                onChangeText={handleChange("Confirmpassword")}
                onFocus={() => setFieldTouched("Confirmpassword")}
                secureTextEntry={securetTextConfirm}
                placeholderTextColor={'#fff'} />
              <View style={[{}]}>
                <TouchableOpacity onPress={onpressConfirm}>
                  <Feather name={iconsecuret2} size={15} color={GLOBAL.OFFICIAL_BLUE_COLOR} />
                </TouchableOpacity>
              </View>
            </View>
              {touched.Confirmpassword && errors.Confirmpassword &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.Confirmpassword}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),color:GLOBAL.input_titleColor}]}>Org Key</Text>
              <TextInput
                value={values.OrgKey}
                style={[inputStyle,{color:GLOBAL.input_titleColor,borderColor:GLOBAL.input_borderColor}]}
                onChangeText={handleChange("OrgKey")}
                onFocus={() => setFieldTouched("OrgKey")}
                editable={false}
                placeholderTextColor={'#fff'} />
              {touched.OrgKey && errors.OrgKey &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.OrgKey}</Text>
              }
              <View style={[Styles.bottomViewFixed]}>
                <Text style={[Styles.txtGrayColor,{color:GLOBAL.input_titleColor}] }>
                  CurrentVersion
                </Text>
                <Text style={[Styles.txtLightColorNumber,{color:GLOBAL.footertext_backgroundColor}]}>
                  {Version}
                </Text>
              </View>
              <View style={[Styles.ViewItems_center_transparent]}>
                <ButtonI style={[Styles.btnNOBackColor, {
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(16),
                }]}
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#a58cf8','#987aff','#7953FAFF']}
                         styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

  ///////////////////Profile////////////////

  if (numberValue === 22) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Location: "",

          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema13}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>
              <View style={Styles.InputeRow}>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Country</Text>
                  <TextInput
                    value={values.Location}
                    style={[inputStyleLocation,{paddingVertical:'4%'}]}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("ImageTitle")}
                    onFocus={() => setFieldTouched("ImageTitle")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>City</Text>
                  <TextInput
                    value={values.Location}
                    style={[inputStyleLocation,{paddingVertical:'4%'}]}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("ImageTitle")}
                    onFocus={() => setFieldTouched("ImageTitle")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                </View>

                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Postal code</Text>
                  <TextInput
                    value={values.Location}
                    style={[inputStyleLocation,{paddingVertical:'4%'}]}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("ImageTitle")}
                    onFocus={() => setFieldTouched("ImageTitle")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                </View>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Street</Text>
                  <TextInput
                    value={values.Location}
                    style={[inputStyleLocation,{paddingVertical:'4%'}]}
                    onContentSizeChange={(e) => {
                      numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                    }}
                    onChangeText={handleChange("ImageTitle")}
                    onFocus={() => setFieldTouched("ImageTitle")}
                    multiline={true}
                    placeholderTextColor={'#fff'} />
                </View>
              </View>
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn,{
                  flexDirection:"row",
                  width:'55%',
                  paddingVertical:2,
                  marginTop:normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#ffadad','#f67070','#FF0000']}
                         styleTxt={[Styles.txtbtn2,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

  ////////////////////Address//////////////////

  if (numberValue === 30) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            CompanyName:'',
            CustomerName:'',
            TRNNo:'',
            Phone:'',
            Email:'',
            Street:'',
            GeoAddressCountry:'',
            GeoAddressCity:''
          }}
          onSubmit={values => {
            onChangeText(values);

          }}
          validationSchema={validationSchema30}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={{width:'90%'}}>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Company Name</Text>
              <TextInput
                value={values.CompanyName}
                style={[inputStyleProfile,]}
                onChangeText={handleChange("CompanyName")}
                onFocus={() => setFieldTouched("CompanyName")}
                placeholderTextColor={'#fff'} />
              {touched.CompanyName && errors.CompanyName &&
              <Text style={{ fontSize: 12, color: "#FF0D10",fontWeight:'bold' }}>{errors.CompanyName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(20),}]}>Customer Name</Text>
              <TextInput
                value={values.CustomerName}
                style={[inputStyleProfile,]}
                onChangeText={handleChange("CustomerName")}
                onFocus={() => setFieldTouched("CustomerName")}
                placeholderTextColor={'#fff'} />
              {touched.CustomerName && errors.CustomerName &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.CustomerName}</Text>
              }
              <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>TRN No</Text>
              <TextInput
                value={values.TRNNo}
                style={[inputStyleProfile]}
                onChangeText={handleChange("TRNNo")}
                onFocus={() => setFieldTouched("TRNNo")}
                placeholderTextColor={'#fff'} />
              {touched.TRNNo && errors.TRNNo &&
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.TRNNo}</Text>
              }


            <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Phone</Text>
            <TextInput
            value={values.Phone}
            style={[inputStyleProfileNumber]}
            onChangeText={handleChange("Phone")}
            onFocus={() => setFieldTouched("Phone")}
            placeholderTextColor={'#fff'} />
          {touched.Phone && errors.Phone &&
            <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.Phone}</Text>
          }
            <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Email</Text>
            <TextInput
            value={values.Email}
            style={[inputStyleProfile]}
            onChangeText={handleChange("Email")}
            onFocus={() => setFieldTouched("Email")}
            placeholderTextColor={'#fff'} />
          {touched.Email && errors.Email &&
            <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.Email}</Text>
          }
              <View style={Styles.InputeRow}>
                <DropDownItems labale={'Country'} data={Parentlist}  setIsFocus={setIsFocus} name={StatusName}
                               textStyle={Styles.txtLightColor22}
                               dropdownStyle={Styles.dropdownLocationCustomer}
                               placeholderStyle={Styles.inputSearchStyle_dropdownLocation}
                               selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true}
                               Onpres={getCity}
                               containerStyle={Styles.containerStyle}
                               inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                               setId={setcountryId} setname={setGeoAddressCountry} Function={Func}
                />
                  {GeoAddressCountry==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"Country! Please?"</Text>
                  }

                <DropDownItems labale={'City'} data={Parentlist}  setIsFocus={setIsFocus} name={StatusName}
                               textStyle={Styles.txtLightColor22}  dropdownStyle={GeoAddressCity!==''?Styles.dropdownLocationCustomer:Styles.dropdownLocationError}
                               placeholderStyle={Styles.inputSearchStyle_dropdownLocation}
                               selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true}
                               Onpres={Func}
                               containerStyle={Styles.containerStyle}
                               inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                               setId={setcityId} setname={setGeoAddressCity} Function={Func}
                />

                  {GeoAddressCity==='' &&
                  <Text style={{ fontSize: 12, color: "#FF0D10" }}>"City! Please?"</Text>
                  }
                </View>

            <Text style={[Styles.txtLightColor,{marginTop: normalize(25),}]}>Street</Text>
            <TextInput
            value={values.Street}
            style={[inputStyleProfile]}
            onChangeText={handleChange("Street")}
            onFocus={() => setFieldTouched("Street")}
            placeholderTextColor={'#fff'} />
          {touched.Street && errors.Street &&
            <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.Street}</Text>
          }
              <View style={[Styles.ViewItems_center_transparent]}>
                <ButtonI style={[Styles.btnNOBackColor, {
                  width: '100%',
                  paddingVertical: 2,
                  marginVertical: normalize(20),
                }]}
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={['#a58cf8','#987aff','#7953FAFF']}
                         styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }

  ///////////////////Customer////////////////

  if (numberValue === 34) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            DirectoryName: "",
            Note:""
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema34}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={{width:'90%'}}>
<View style={Styles.InputeRow}>
  <View style={Styles.InputeRowItems}>
    <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Directory Name</Text>
    <TextInput
      value={values.DirectoryName}
      style={[inputStyle, { paddingVertical: 3 }]}
      onChangeText={handleChange("DirectoryName")}
      onFocus={() => setFieldTouched("DirectoryName")}
      placeholderTextColor={GLOBAL.OFFICIAL_BLUE_COLOR} />
    {touched.DirectoryName && errors.DirectoryName &&
    <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.DirectoryName}</Text>
    }
  </View>
  <View style={Styles.InputeRowItems}>
    <DropDownItems labale={'Parent'} data={Parentlist}  setIsFocus={setIsFocus} name={StatusName}
                   textStyle={Styles.txtLightColor22}  dropdownStyle={Styles.dropdownLocation}
                   placeholderStyle={Styles.inputSearchStyle_dropdownLocation}
                   selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true}
                   Onpres={Func}
                   containerStyle={Styles.containerStyle}
                   inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                   setId={setselectparentId} setname={setselectparentname} Function={Func}
    />
  </View>
</View>

              <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Notes</Text>
              <TextInput
                value={values.Note}
                onChangeText={handleChange("Note")}
                onFocus={() => setFieldTouched("Note")}
                multiline={true}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                placeholderTextColor={GLOBAL.OFFICIAL_BLUE_COLOR} />
              {
                ShowButton===true?
                  <View style={[Styles.ViewItems_center]}>
                    <ButtonI style={[Styles.btn, {
                      //margin: normalize(15),
                      flexDirection: "row",
                      width: '100%',
                      paddingVertical: 2,
                      marginTop: normalize(30),
                    }]}//handleSubmit
                             onpress={handleSubmit}
                             categoriIcon={""}
                             title={tittlebtn}
                             colorsArray={['#ffadad','#f67070','#FF0000']}
                             styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
                  </View>:null
              }

            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 35) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Note:""
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema34}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={{width:'90%'}}>
              <View style={Styles.InputeRow}>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Directory Name</Text>
                  <View
                    style={[inputStyle, { paddingVertical: 3 }]}
                   >
                    <Text style={Styles.textItem2}>
                      {Name}
                    </Text>
                  </View>
                </View>
                <View style={Styles.InputeRowItems}>
                  <DropDownItems labale={'Directory'} data={DirectoryUser}  setIsFocus={setIsFocus} name={StatusName}
                                 textStyle={Styles.txtLightColor22}  dropdownStyle={Styles.dropdownLocation}
                                 placeholderStyle={Styles.inputSearchStyle_dropdownLocation}
                                 selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true}
                                 Onpres={Func}
                                 containerStyle={Styles.containerStyle}
                                 inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                                 setId={setDirectoryUserId} setname={setDirectoryUserName} Function={Func}
                  />
                </View>
              </View>
              <View  style={Styles.dateBox}>
                <View  style={Styles.dateBoxitems}>
                  <TouchableOpacity onPress={()=> {
                    setOpencompleted(true)
                  }} style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                      Approval Date start
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> {
                    setOpencompleted(true)
                  }} style={Styles.dateBoxItemtransparent}>
                    <Text style={[Styles.txtLightColor,{marginTop:normalize(15)}]}>
                      Approval Date end
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={Styles.dateBoxitems}>
                  <TouchableOpacity onPress={()=> {
                    setOpen(true)
                  }} style={Styles.dateBoxItem}>
                    <Text style={Styles.txtdate2}>
                      {DateFormat}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> {
                    setOpenEnd(true)
                  }} style={Styles.dateBoxItem}>
                    <Text style={Styles.txtdate2}>
                      {/*{dateendcompleted}*/}
                      {DateFormatEnd}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Notes</Text>
              <TextInput
                value={values.Note}
                onChangeText={handleChange("Note")}
                onFocus={() => setFieldTouched("Note")}
                multiline={true}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                placeholderTextColor={GLOBAL.OFFICIAL_BLUE_COLOR} />

                  <View style={[Styles.ViewItems_center]}>
                    <ButtonI style={[Styles.btn, {
                      //margin: normalize(15),
                      flexDirection: "row",
                      width: '100%',
                      paddingVertical: 2,
                      marginTop: normalize(30),
                    }]}//handleSubmit
                             onpress={handleSubmit}
                             categoriIcon={""}
                             title={tittlebtn}
                             colorsArray={["#8bc3f8", "#4a7fb3", "#1c3045"]}
                             styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
                  </View>


            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 36) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Note:""
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema34}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={{width:'90%'}}>
              <View style={Styles.InputeRow}>
                <DropDownItems labale={'Tags'} data={DirectoryUser}  setIsFocus={setIsFocus} name={StatusName}
                               textStyle={Styles.txtLightColor22}  dropdownStyle={Styles.dropdownLocation}
                               placeholderStyle={Styles.inputSearchStyle_dropdownLocation}
                               selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true}
                               Onpres={Func}
                               containerStyle={Styles.containerStyle}
                               inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                               setId={setDirectoryUserId} setname={setDirectoryUserName} Function={Func}
                />
              </View>
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={["#8bc3f8", "#4a7fb3", "#1c3045"]}
                         styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>


            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 37) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Note:""
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema34}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={{width:'90%'}}>
              <View style={Styles.InputeRow}>
                <DropDownItems labale={'Status'} data={Status}  setIsFocus={setIsFocus} name={StatusName}
                               textStyle={Styles.txtLightColor22}  dropdownStyle={Styles.dropdownLocation}
                               placeholderStyle={Styles.placeholderStyle}
                               selectedTextStyle={Styles.selectedTextStyle}  searchBoolean={true}
                               Onpres={Func}
                               containerStyle={Styles.containerStyle}
                               inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                               setId={setStatusId} setname={setStatusName} Function={Func}
                />
              </View>
              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(60),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={["#8bc3f8", "#4a7fb3", "#1c3045"]}
                         styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>
            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 38) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Version:'',
            Note:""
          }}
          onSubmit={values => {
            onChangeText(values);
          }}
          validationSchema={validationSchema38}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={{width:'90%'}}>
              <View style={Styles.InputeRow}>
                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Document Title</Text>
                  <View
                    style={[inputStyle, { paddingVertical: 4 }]}
                  >
                    <Text style={Styles.textItem2}>
                      {Name}
                    </Text>
                  </View>
                </View>

                <View style={Styles.InputeRowItems}>
                  <Text style={[Styles.txtLightColor,{marginTop:normalize(10),textAlign:"left"}]}>Document Version</Text>
                  <TextInput
                    value={values.Version}
                    onChangeText={handleChange("Version")}
                    onFocus={() => setFieldTouched("Version")}
                    multiline={true}
                    style={[inputStyle,{paddingVertical:3}]}
                    placeholderTextColor={GLOBAL.OFFICIAL_BLUE_COLOR} />
                </View>
                {touched.Version && errors.Version &&
                <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.Version}</Text>
                }
              </View>

              <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Notes</Text>
              <TextInput
                value={values.Note}
                onChangeText={handleChange("Note")}
                onFocus={() => setFieldTouched("Note")}
                multiline={true}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                placeholderTextColor={GLOBAL.OFFICIAL_BLUE_COLOR} />

              <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Upload File</Text>
              <TouchableOpacity onPress={()=>selectFile()}
                style={[inputStyle, { paddingVertical: 3 }]}
              >
                {
                  filename===''?
                    <Text style={Styles.textItem2}>
                      Choose

                    </Text>:
                    <Text style={Styles.textItem2}>
                      {filename}
                    </Text>
                }

              </TouchableOpacity>


              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={["#8bc3f8", "#4a7fb3", "#1c3045"]}
                         styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>


            </View>

          )}
        </Formik>

      </View>
    );
  }
  if (numberValue === 39) {
    return (
      <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Formik
          initialValues={{
            Subject:'',
            Message:""
          }}
          onSubmit={values => {
          onChangeText(values);
          }}
          validationSchema={validationSchema38}>
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={{width:'90%'}}>

                  <Text style={[Styles.txtLightColor,{textAlign:"left"}]}>Recipient</Text>
                  <Dropdown
                    style={[Styles.dropdownLocation]}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    iconStyle={Styles.iconStyle}
                    itemTextStyle={Styles.itemTextStyle}
                    data={Recipient}
                    maxHeight={125}
                    labelField="label"
                    valueField="value"
                    inputSearchStyle={Styles.inputSearchStyle_dropdownLocation}
                    placeholder={RecipientName}
                    value={RecipientName}
                    containerStyle={Styles.containerStyle}
                    renderItem={renderItem_Location}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setRecipientName(item.label);
                      setIsFocus(false);
                      setRecipientId(item.value);
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity  onPress={() => unSelect && unSelect(item)}>
                        <View style={Styles.selectedStyle2}>
                          <Text style={Styles.selectedTextStyle2}>{item.label}</Text>
                          <AntDesign color="#fff" name="delete" size={15} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />

                <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Subject</Text>
                <TextInput
                  value={values.Subject}
                  onChangeText={handleChange("Subject")}
                  onFocus={() => setFieldTouched("Subject")}
                  multiline={true}
                  style={[inputStyle,{paddingVertical:'4%'}]}
                  placeholderTextColor={GLOBAL.OFFICIAL_BLUE_COLOR} />
              <Text style={[Styles.txtLightColor,{marginTop: normalize(10),}]}>Message</Text>
              <TextInput
                value={values.Note}
                onChangeText={handleChange("Message")}
                onFocus={() => setFieldTouched("Message")}
                multiline={true}
                style={[inputStyle,{paddingVertical:'4%'}]}
                onContentSizeChange={(e) => {
                  numOfLinesCompany = e.nativeEvent.contentSize.height / 14;
                }}
                placeholderTextColor={GLOBAL.OFFICIAL_BLUE_COLOR} />

              <View style={[Styles.ViewItems_center]}>
                <ButtonI style={[Styles.btn, {
                  //margin: normalize(15),
                  flexDirection: "row",
                  width: '100%',
                  paddingVertical: 2,
                  marginTop: normalize(30),
                }]}//handleSubmit
                         onpress={handleSubmit}
                         categoriIcon={""}
                         title={tittlebtn}
                         colorsArray={["#8bc3f8", "#4a7fb3", "#1c3045"]}
                         styleTxt={[Styles.txtbtn,{fontSize: normalize(16),}]} sizeIcon={27} />
              </View>


            </View>

          )}
        </Formik>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
width:'95%'
  },
  formContainer2: {
    width:'100%'
  },
  linearView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  liner: {
    height: normalize(3), flex: 1,
    backgroundColor:'#fff',
  },
  txt: {
    color:'#fff',
    fontSize: normalize(13),
  },
  eyeIcon: {
    flexDirection: "row-reverse",
    position: "relative",
    bottom: normalize(200),
    right: normalize(20),
  },
});

console.disableYellowBox = true;

export { TextInputI };
