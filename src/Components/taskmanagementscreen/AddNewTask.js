import React, {  useState,useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Colors } from "../Colors";
import { Styles } from "../Styles";
import LinearGradient from "react-native-linear-gradient";
import normalize from "react-native-normalize/src/index";
import { Container, Content } from "native-base";
import { TextInputI } from "../component/TextInputI";
import { removeDataStorage, writeDataStorage } from "../Get_Location";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Modalize } from "react-native-modalize";
import { Footer1 } from "../component/Footer";
import { Header } from "../component/Header";
import { selectPhotocamera, selectPhotoGallery, writePostApi,selectPhotocameraVideo,selectPhotoGalleryVideo } from "../writePostApi";
import { readOnlineApi } from "../ReadPostApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Warningmessage } from "../component/Warningmessage";
import { Image,Video } from 'react-native-compressor';
import {LogOutModal} from '../component/LogOutModal'
import FontAwesome from "react-native-vector-icons/FontAwesome";
const GLOBAL = require("../Global");
const Api = require("../Api");
const Photoes=require('../Photoes')
let A=[];
let B=[];
let C=[];
let D=[]
function AddNewTask({ navigation, navigation: { goBack } }) {
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedcategory, setSelectedcategory] = useState({label:"snag",value:"2",_index:1});
  const [selectedrelated,setSelectedrelated] = useState('');
  const [Cheked,setCheked] = useState(false);
  const [Taskcategory, setTaskcategory] = useState([]);
  const [dateType, setdateType] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [relatedId, setRelatedId] = useState(0);
  const [relatedName, setRelatedName] = useState('');
  const [SelectedParentTask, setSelectedParentTask] = useState(0);
  const [ParentTaskId, setParentTaskId] = useState(0);
  const [ShowBtn, setShowBtn] = useState(false);
  const modalizeRef =  React.createRef();

  const [ImageSourceviewarray, setImageSourceviewarray] = useState([]);
  const [RelatedNameList, setRelatedNameList] = useState([]);
  const [ShowMessage, setShowMessage] = useState(false);
  const [Message, setMessage] = useState("");
  const [error, setErrors] = useState("");
  const [TaskRelated, setTaskRelated] = useState([]);
  const [TaskRelatedNameId, setTaskRelatedNameId] = useState('');
  const [selectedrelatedname,setselectedrelatedname] = useState('');
  const [ShowButton, setShowButton] = useState(true);
  const [showWarning, setshowWarning] = useState(false);
  const [ShowWarningMessage, setShowWarningMessage] = useState(false);
  const [ShowBackBtn, setShowBackBtn] = useState(true);
  const [modules, setmodules] = useState([]);
  const [selectedTaskProjectName,setselectedTaskProjectName] = useState('');
  const [selectedTaskSiteName,setselectedTaskSiteName] = useState('');
  const [selectedunitName,setselectedunitName] = useState('');
  const [selectedsectionName,setselectedsectionName] = useState('');
  const [selectedfeatureName,setselectedfeatureName] = useState('');
  const [Taskpriority, setTaskpriority] = useState([]);
  const [TaskWorkType, setTaskWorkType] = useState([]);
  const [selectedWorkType, setselectedWorkType] = useState('');
  const [WorkTypeId, setWorkTypeId] = useState(0);
  const [uploadType, setUploadType] = useState('');
  const [selectedpriority, setselectedpriority] = useState(
  {
    label:'Normal',
      value: '2',
    _index: 1,
  }
  );
  const [priorityId, setpriorityId] = useState("2");
  useEffect(()=>{
      Task_category();
     Task_priority();
    Task_WorkTypeList(2)

  }, []);
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
  const Task_priority = async () => {
      let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.priorities));
      let A = [];
      for (let item in json?.priorities) {
        let obj = json?.priorities?.[item];
        A.push({
          value: obj.priorityId,
          label: obj.priorityTitle,
        });
      }
      setTaskpriority(A);
  };
  const Task_category =async () => {
    let A=[];
      let json =JSON.parse( await AsyncStorage.getItem(GLOBAL.Task_Category));
      for (let item in json?.categories) {
        let obj = json?.categories?.[item];
        A.push({
          value: obj.categoryId,
          label: obj.categoryTitle,
          categoryEntityShow:obj.categoryEntityShow
        });
      }
      setTaskcategory(A);

  };

  const Navigate_Url= (Url) => {
      navigation.navigate(Url);
  };
  ///LogOut Function///
  const LogOut = () => {
    removeDataStorage(GLOBAL.PASSWORD_KEY);
    setshowModalDelete(false);
    navigation.navigate("LogIn");
  };
/// Bottom menu click On LogOut button///
  const logout_Url= () => {
    setshowModalDelete(true)
  };

  const ChangeChecked = (value) => {
    setCheked(!Cheked);
  };
  ///when user come to add task screen from project or Dyb after add get list from server///
  const DataStorage=async (tasks)=>{
      getAllProjectInfo();
      getAllProjectInfo_dyb();
    setShowMessage(false);
    await writeDataStorage(GLOBAL.All_Task,tasks);
    navigation.navigate('Task_Management')
  }
  ///get  task list when user come from project or Dyb///
  const My_TaskList_server = async () => {
      readOnlineApi(Api.My_TaskList+`userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        DataStorage(json?.tasks)
      });
  };
  ///get  task list ///
  const My_TaskList_server2 = async () => {
    readOnlineApi(Api.My_TaskList+`userId=${GLOBAL.UserInformation?.userId}`).then(json => {
       writeDataStorage(GLOBAL.All_Task,json?.tasks);
    });
  };
  const AddTask = (value) => {

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
    } else {
      setShowButton(false)
      formData.append("userId",  GLOBAL.UserInformation?.userId);
      formData.append("categoryId", categoryId);
      formData.append("workTypeId", WorkTypeId);
      if(categoryId==='1'||categoryId==='2'||categoryId==='4') {
        formData.append("relatedId", relatedId);
        formData.append("relatedName", selectedrelatedname.label);
      }
      formData.append("requestDate", TodayDate);
      formData.append("priorityId", priorityId);
      formData.append("planStartDate", null);
      formData.append("planEndDate", null);
      formData.append("taskStatusId", "1");
      formData.append("title", value?.Title);
      formData.append("description", value?.TaskNote);
      formData.append("requestedBy", GLOBAL?.UserInformation?.userId);
      formData.append("requestBy", GLOBAL?.UserInformation?.userId);
      if(GLOBAL.Subtask!=='')
      formData.append("parentTaskId", GLOBAL.Subtask);
      else
        formData.append("parentTaskId", null);
        formData.append("assignedTo", null);
        console.log(formData,'formData')
      if (GLOBAL.isConnected=== false) {
        Add_Task_Offline(value,TodayDate);
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
            if (json?.status === true) {
              My_TaskList_server();
              setMessage(json?.msg);
              setShowMessage(true);
              setImageSourceviewarray([]);
              setCategoryId(0);
              setRelatedId(0);
              setShowBtn(true);
              //setTimeout(function(){ setShowMessage(false)}, 2000)
            }
          }
          else {
            setMessage("Your task successfully added");
            setShowMessage(true);
            setShowButton(true);
            setImageSourceviewarray([]);
            setCategoryId(0);
            setRelatedId(0);
            setShowBtn(true);
            //setTimeout(function(){ setShowMessage(false)}, 2000)
            //navigation.navigate('Task_Management')
          }
        });
      }
      else {
        writePostApi("POST", Api.AddTask, formData).then(json => {
          if (json) {
            if (json?.status === true) {
              My_TaskList_server();
              setMessage(json?.msg);
              setShowMessage(true);
              setShowButton(true)
              setCategoryId(0)
              setRelatedId(0)
              setShowBtn(true)
            }
          }
          else {
            setMessage("Your task successfully added");
            setShowMessage(true);
            setShowButton(true)
            setCategoryId(0)
            setRelatedId(0)
            setShowBtn(true)
            //setTimeout(function(){ setShowMessage(false)}, 2000)
            //navigation.navigate('Task_Management')
          }
        });
      }
    }
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    setUploadType('')
    modalizeRef.current?.close();
  };
  ///Reduce the size of the photo///
  const Image_compress=async (path)=>{
   return  await Image.compress(path, {
         maxWidth: 1000,
         quality: 0.8,
       })
  }
  const selectPhotoFromGallery = async () => {
    onClose();
    selectPhotoGallery().then(response => {
      if (response.didCancel) {
      } else if (response.error) {

      } else if (response.customButton) {

        alert(response.customButton);
      }
      else {
        if (ImageSourceviewarray)
          A = [...ImageSourceviewarray];
        B = [...ImageSourceviewarray];
        for (let item in response) {
          let obj = response[item];
          var getFilename = obj.path.split("/");
          var imgName = getFilename[getFilename.length - 1];
          let attachmentId=0;
          Image_compress(obj.path).then(res=>{
            A.push({
              uri: res,
              type: obj.mime,
              fileName: imgName,
              attachmentId:attachmentId,
              taskId: GLOBAL.TaskId,
            });
              if(A?.length===response?.length) {
                setImageSourceviewarray(A);
                setShowBackBtn(false)
                A = [...A];
                B = [...B];
              }
          })
        }
      }
    });
  };
  const selectPhoto =async () => {
    onClose();
    selectPhotocamera().then(response => {
      var getFilename = response.path.split("/");
      var imgName = getFilename[getFilename.length - 1];
      if (ImageSourceviewarray)
        A = [...ImageSourceviewarray];
      let attachmentId=0;
       Image.compress( response.path, {
        maxWidth: 1000,
        quality: 0.8,
      }).then(res => {
         A.push({
           uri:res,
           type:response.mime,
           fileName:imgName,
           attachmentId:attachmentId,
           taskId:GLOBAL.TaskId,
         });
         setImageSourceviewarray(A);
         setShowBackBtn(false)
         A = [...A];
      })
    });
  };


  const selectVideoGallery= async () => {
    onClose();
    selectPhotoGalleryVideo().then(response => {
      if (response.didCancel) {
      } else if (response.error) {

      } else if (response.customButton) {

        alert(response.customButton);
      }   else {
        if (ImageSourceviewarray)
          C = [...ImageSourceviewarray];
        D = [...ImageSourceviewarray];
        for (let item in response) {
          let obj = response[item];
          var getFilename = obj.path.split("/");
          var imgName = getFilename[getFilename.length - 1];
          let attachmentId=0;
          Image_compress(obj.path).then(res=>{
            D.push({
              uri: res,
              type: obj.mime,
              fileName: imgName,
              attachmentId:attachmentId,
              taskId: GLOBAL.TaskId,
            });
            if(D?.length===response?.length) {
              setImageSourceviewarray(D);
              setShowBackBtn(false)
              C = [...C];
             D = [...D];
            }
          })
        }
      }
    });
  };
  const selectVideocamera =async () => {
    onClose();
    selectPhotocameraVideo().then(response => {
      var getFilename = response.path.split("/");
      var imgName = getFilename[getFilename.length - 1];
      if (ImageSourceviewarray)
        C = [...ImageSourceviewarray];
      let attachmentId=0;
      Video.compress(response.path).then(res => {
        C.push({
          uri:res,
          fileName:imgName,
          type:response.mime,
          attachmentId:attachmentId,
          taskId:GLOBAL.TaskId,
        })
        setImageSourceviewarray(C);
        setShowBackBtn(false)
      })
      C = [...C];
    });
  };
  ///add task to asyncStorage when app is offline///
  const Add_Task_Offline = async (value, TodayDate) => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let json_attachments = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_attachments));
    let List_Item = [];
    let List_Item_detail = [];
    let List_attachments = [];
    let A = [];
    let B = [];
    let C = [];
    List_Item = json;
    List_Item_detail = json_detail;
    List_attachments = json_attachments;
    if (List_Item?.length !== 0) {
      A = [...List_Item];
    }
    if (List_Item_detail?.length !== 0) {
      B = [...List_Item_detail];
    }
    if (List_attachments?.length !== 0) {
      C = [...List_attachments];
    }

    let attachments=[]
    ImageSourceviewarray?.forEach((obj) => {
        attachments.push({
          attachmentId:obj?.attachmentId,
          attachmentUrl: obj?.uri,
          attachmentName:obj?.fileName
        });
      },
    );
    A.push({
      taskAssignedTo: "",
      taskCategoryName: value.SectionName,
      taskCreatedBy: "0",
      taskCreatedOn: TodayDate,
      taskDescription: value.TaskNote,
      taskId: GLOBAL.TaskId,
      taskPriorityName: "Low",
      taskRequestBy: GLOBAL?.UserInformation?.FullName,
      taskRequestDate: TodayDate,
      taskStatusClass: "info",
      taskStatusColor: "#68BC31",
      taskStatusId: "1",
      taskStatusName: "New",
      taskTitle: value.Title,
      taskUpdated:'n',
      taskPriorityColor:"#fcd274",

      attachments:attachments
    });
    List_Item = A;

    B.push({
      taskAssignedTo: "",
      taskCategoryName: value.SectionName,
      taskCreatedBy: "0",
      taskCreatedOn: TodayDate,
      taskDescription: value.TaskNote,
      taskId: GLOBAL.TaskId,
      taskPriorityName: "Low",
      taskRequestBy: GLOBAL?.UserInformation?.FullName,
      taskRequestDate: TodayDate,
      taskStatusClass: "info",
      taskStatusColor: "#68BC31",
      taskStatusId: "1",
      taskStatusName: "New",
      taskTitle: value.Title,
    });
    List_Item_detail = B;

    ImageSourceviewarray?.forEach((obj) => {
        C.push({
          taskId: GLOBAL.TaskId,
          attachmentUrl: obj?.uri,
        });
      },
    );
    List_attachments = C;
    if(GLOBAL.TaskName!=='')
      Update_taskNumoffline()
    await AsyncStorage.setItem(GLOBAL.All_Task, JSON.stringify(List_Item));
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(List_Item_detail));
    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(List_attachments));
    navigation.navigate('Task_Management')
  };
  ///add task to asyncStorage when app is offline add and creat button///
  const Add_Task_Offline2 = async (value, TodayDate) => {
    let json = JSON.parse(await AsyncStorage.getItem(GLOBAL.All_Task));
    let json_detail = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_Detail));
    let json_attachments = JSON.parse(await AsyncStorage.getItem(GLOBAL.Task_attachments));
    let List_Item = [];
    let List_Item_detail = [];
    let List_attachments = [];
    let A = [];
    let B = [];
    let C = [];
    List_Item = json;
    List_Item_detail = json_detail;
    List_attachments = json_attachments;
    if (List_Item?.length !== 0) {
      A = [...List_Item];
    }
    if (List_Item_detail?.length !== 0) {
      B = [...List_Item_detail];
    }
    if (List_attachments?.length !== 0) {
      C = [...List_attachments];
    }

    let attachments=[]
    ImageSourceviewarray?.forEach((obj) => {
        attachments.push({
          attachmentId:obj?.attachmentId,
          attachmentUrl: obj?.uri,
          attachmentName:obj?.fileName
        });
      },
    );
    A.push({
      taskAssignedTo: "",
      taskCategoryName: value.SectionName,
      taskCreatedBy: "0",
      taskCreatedOn: TodayDate,
      taskDescription: value.TaskNote,
      taskId: GLOBAL.TaskId,
      taskPriorityName: "Normal",
      taskRequestBy: GLOBAL?.UserInformation?.FullName,
      taskRequestDate: TodayDate,
      taskStatusClass: "info",
      taskStatusColor: "#ffc2c2",
      taskStatusId: "1",
      taskStatusName: "Open",
      taskTitle: value.Title,
      taskUpdated:'n',
      taskPriorityColor:"#fcd274",
      attachments:attachments
    });
    List_Item = A;

    B.push({
      taskAssignedTo: "",
      taskCategoryName: value.SectionName,
      taskCreatedBy: "0",
      taskCreatedOn: TodayDate,
      taskDescription: value.TaskNote,
      taskId: GLOBAL.TaskId,
      taskPriorityName: "Normal",
      taskRequestBy: GLOBAL?.UserInformation?.FullName,
      taskRequestDate: TodayDate,
      taskStatusClass: "info",
      taskStatusColor: "#ffc2c2",
      taskStatusId: "1",
      taskStatusName: "Open",
      taskTitle: value.Title,
    });
    List_Item_detail = B;

    ImageSourceviewarray?.forEach((obj) => {
        C.push({
          taskId: GLOBAL.TaskId,
          attachmentUrl: obj?.uri,
        });
      });
    List_attachments = C;
    if(GLOBAL.TaskName!=='')
      Update_taskNumoffline()
    await AsyncStorage.setItem(GLOBAL.All_Task, JSON.stringify(List_Item));
    await AsyncStorage.setItem(GLOBAL.Task_Detail, JSON.stringify(List_Item_detail));
    await AsyncStorage.setItem(GLOBAL.Task_attachments, JSON.stringify(List_attachments));
  };
  ///update task number in project and dyb when app is offline///
  const Update_taskNumoffline=async ()=>{
    let json=JSON.parse (await AsyncStorage.getItem(GLOBAL.All_Lists))
    let json_dyb=JSON.parse (await AsyncStorage.getItem(GLOBAL.AllProjectInfo_dyb))
    let task_Count=0;
    let index =0
    let markers=[]

    let task_Count_dyb=0;
    let index_dyb =0
    let markers_dyb=[];
    let index_project=0
    let index_project_dyb=0
    let ListTotal=[];
    let ListTotal_dyb=[];
    let index_sites=0;
    let index_sites_dyb=0
    let index_unit=0
    let index_unit_dyb=0
    let index_section=0;
    let index_section_dyb=0
    if(GLOBAL.RelatedName==='project'){
      index = json?.findIndex((p) => p.projectId === GLOBAL.RelatedId);
      task_Count=parseInt(json?.find((p) => p.projectId === GLOBAL.RelatedId)?.task) +1
      markers = [...json];
      markers[index] = { ...markers[index], task: task_Count};

      index_dyb = json_dyb?.findIndex((p) => p.projectId === GLOBAL.RelatedId);
      task_Count_dyb=parseInt(json_dyb?.find((p) => p.projectId === GLOBAL.RelatedId)?.task) +1
      markers_dyb = [...json_dyb];
      markers_dyb[index_dyb] = { ...markers_dyb[index_dyb], task: task_Count_dyb};
      writeDataStorage(GLOBAL.All_Lists,markers)
      writeDataStorage(GLOBAL.AllProjectInfo_dyb, markers_dyb)
    }
    else if(GLOBAL.RelatedName==='site'){
      let Site= json?.find((p) => p?.siteId === GLOBAL.RelatedId)
      index = Site?.findIndex((p) => p.siteId === GLOBAL.RelatedId);
      task_Count=parseInt(Site?.find((p) => p.siteId === GLOBAL.RelatedId)?.task) +1
      markers = [...Site];
      markers[index] = { ...markers[index], task: task_Count};
      ListTotal=[...json];
      index_project=json?.findIndex((p)=>p?.projectId===GLOBAL.ProjectId);
      ListTotal[index_project]={...ListTotal[index_project],sites:markers};

      let Site_dyb= json_dyb?.find((p) => p?.siteId === GLOBAL.RelatedId)
      index_dyb = Site_dyb?.findIndex((p) => p.siteId === GLOBAL.RelatedId);
      task_Count_dyb=parseInt(Site_dyb?.find((p) => p.siteId === GLOBAL.RelatedId)?.task) +1
      markers_dyb = [...Site_dyb];
      markers_dyb[index_dyb] = { ...markers_dyb[index_dyb], task: task_Count_dyb};
      ListTotal_dyb=[...json_dyb];
      index_project_dyb=json_dyb?.findIndex((p)=>p?.projectId===GLOBAL.ProjectId);
      ListTotal_dyb[index_project_dyb]={...ListTotal_dyb[index_project_dyb],sites:markers};
      writeDataStorage(GLOBAL.All_Lists,ListTotal)
      writeDataStorage(GLOBAL.AllProjectInfo_dyb, ListTotal_dyb)
    }
    else if(GLOBAL.RelatedName==='unit'){
      let Filter_sites= json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites
      let Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      index = Filter_units?.findIndex((p) => p.unitId === GLOBAL.RelatedId);
      task_Count=parseInt(Filter_units?.find((p) => p.unitId === GLOBAL.RelatedId)?.task) +1
      markers = [...Filter_units];
      markers[index]={ ...markers[index], task: task_Count};
      ListTotal=[...json];
      index_project=json?.findIndex((p)=>p?.projectId===GLOBAL.ProjectId);
      let index_sites=Filter_sites?.findIndex((p)=>p?.siteId===GLOBAL.SiteId);
      let markers_sites = [...Filter_sites];
      markers_sites[index_sites] = { ...markers_sites[index_sites], units: markers };
      ListTotal[index_project]={...ListTotal[index_project],sites: markers_sites };


      let Filter_sites_dyb= json_dyb?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites;
      let Filter_units_dyb = Filter_sites_dyb?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      index_dyb=Filter_units_dyb?.findIndex((p) => p.unitId === GLOBAL.RelatedId);
      task_Count_dyb=parseInt(Filter_units_dyb?.find((p) => p.unitId === GLOBAL.RelatedId)?.task) +1
      markers_dyb=[...Filter_units_dyb];
      markers_dyb[index_dyb]={ ...markers_dyb[index_dyb], task: task_Count_dyb};

      ListTotal_dyb=[...json_dyb];
      index_project_dyb=json_dyb?.findIndex((p)=>p?.projectId===GLOBAL.ProjectId);
      let index_sites_dyb=Filter_sites?.findIndex((p)=>p?.siteId===GLOBAL.SiteId);
      let markers_sites_dyb = [...Filter_sites];
      markers_sites_dyb[index_sites_dyb] = { ...markers_sites_dyb[index_sites_dyb], units: markers_dyb };
      ListTotal_dyb[index_project_dyb]={...ListTotal_dyb[index_project_dyb],sites: markers_sites_dyb };

      writeDataStorage(GLOBAL.All_Lists,ListTotal)
      writeDataStorage(GLOBAL.AllProjectInfo_dyb, ListTotal_dyb)
    }
    else if(GLOBAL.RelatedName==='section'){
      let Filter_sites= json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites
      let Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      let Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId)?.sections;
      index = Filter_section?.findIndex((p) => p.sectionId === GLOBAL.RelatedId);
      task_Count=parseInt(Filter_section?.find((p) => p.sectionId === GLOBAL.RelatedId)?.task) +1
      markers = [...Filter_section];
      markers[index]={ ...markers[index], task: task_Count};
      ListTotal=[...json];
      index_project=json?.findIndex((p)=>p?.projectId===GLOBAL.ProjectId)
      index_sites=Filter_sites?.findIndex((p)=>p?.siteId===GLOBAL.SiteId);
      index_unit=Filter_units?.findIndex((p)=>p?.unitId===GLOBAL.UnitId);
      let markers_sites = [...Filter_sites];
      let markers_unit = [...Filter_units];
      markers_unit[index_unit] = { ...markers_unit[index_unit], sections: markers };
      markers_sites[index_sites] = { ...markers_sites[index_sites], units: markers_unit };
      ListTotal[index_project]={...ListTotal[index_project],sites: markers_sites };



      let Filter_sites_dyb= json_dyb?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites
      let Filter_units_dyb = Filter_sites_dyb?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      let Filter_section_dyb = Filter_units_dyb?.find((p) => p?.unitId === GLOBAL.UnitId)?.sections;
      index_dyb = Filter_section_dyb?.findIndex((p) => p.sectionId === GLOBAL.RelatedId);
      task_Count_dyb=parseInt(Filter_section_dyb?.find((p) => p.sectionId === GLOBAL.RelatedId)?.task) +1
      markers_dyb = [...Filter_section_dyb];
      markers_dyb[index_dyb]={ ...markers_dyb[index_dyb], task: task_Count_dyb};
      ListTotal_dyb=[...json_dyb];
      index_project_dyb=json_dyb?.findIndex((p)=>p?.projectId===GLOBAL.ProjectId)
      index_sites_dyb=Filter_sites?.findIndex((p)=>p?.siteId===GLOBAL.SiteId);
      index_unit_dyb=Filter_units?.findIndex((p)=>p?.unitId===GLOBAL.UnitId);
      let markers_sites_dyb = [...Filter_sites];
      let markers_unit_dyb = [...Filter_units];
      markers_unit_dyb[index_unit_dyb] = { ...markers_unit_dyb[index_unit_dyb], sections: markers_dyb };
      markers_sites_dyb[index_sites_dyb] = { ...markers_sites_dyb[index_sites_dyb], units: markers_unit_dyb };
      ListTotal_dyb[index_project_dyb]={...ListTotal_dyb[index_project_dyb],sites: markers_sites_dyb };
      writeDataStorage(GLOBAL.All_Lists,ListTotal)
      writeDataStorage(GLOBAL.AllProjectInfo_dyb, ListTotal_dyb)
    }
    else if(GLOBAL.RelatedName==='section'){
      let Filter_sites= json?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites
      let Filter_units = Filter_sites?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      let Filter_section = Filter_units?.find((p) => p?.unitId === GLOBAL.UnitId)?.sections;
      let  Filter_feature = Filter_section?.find((p) => p?.sectionId === GLOBAL.SectionId)?.features;
      index = Filter_feature?.findIndex((p) => p.featureId === GLOBAL.RelatedId);
      task_Count=parseInt(Filter_feature?.find((p) => p.featureId === GLOBAL.RelatedId)?.task) +1
      markers = [...Filter_feature];
      markers[index]={ ...markers[index], task: task_Count};

      ListTotal=[...json];
      index_project=json?.findIndex((p)=>p?.projectId===GLOBAL.ProjectId)
      index_sites=Filter_sites?.findIndex((p)=>p?.siteId===GLOBAL.SiteId);
      index_unit=Filter_units?.findIndex((p)=>p?.unitId===GLOBAL.UnitId);
      index_section=Filter_section?.findIndex((p)=>p?.sectionId===GLOBAL.SectionId);
      let markers_sites = [...Filter_sites];
      let markers_unit = [...Filter_units];
      let markers_section = [...Filter_section];
      markers_section[index_section] = { ...markers_section[index_section], features: markers };
      markers_unit[index_unit] = { ...markers_unit[index_unit], sections: markers_section };
      markers_sites[index_sites] = { ...markers_sites[index_sites], units: markers_unit };
      ListTotal[index_project]={...ListTotal[index_project],sites: markers_sites };

      let Filter_sites_dyb= json_dyb?.find((p) => p?.projectId === GLOBAL.ProjectId)?.sites
      let Filter_units_dyb = Filter_sites_dyb?.find((p) => p?.siteId === GLOBAL.SiteId)?.units;
      let Filter_section_dyb = Filter_units_dyb?.find((p) => p?.unitId === GLOBAL.UnitId)?.sections;
      let  Filter_feature_dyb = Filter_section_dyb?.find((p) => p?.sectionId === GLOBAL.SectionId)?.features;
      index_dyb = Filter_feature_dyb?.findIndex((p) => p.featureId === GLOBAL.RelatedId);
      task_Count_dyb=parseInt(Filter_feature_dyb?.find((p) => p.featureId === GLOBAL.RelatedId)?.task) +1
      markers_dyb = [...Filter_feature_dyb];
      markers_dyb[index_dyb]={ ...markers_dyb[index_dyb], task: task_Count_dyb};

      ListTotal=[...json_dyb];
      index_project_dyb=json_dyb?.findIndex((p)=>p?.projectId===GLOBAL.ProjectId)
      index_sites_dyb=Filter_sites_dyb?.findIndex((p)=>p?.siteId===GLOBAL.SiteId);
      index_unit_dyb=Filter_units_dyb?.findIndex((p)=>p?.unitId===GLOBAL.UnitId);
      index_section_dyb=Filter_section_dyb?.findIndex((p)=>p?.sectionId===GLOBAL.SectionId);
      let markers_sites_dyb = [...Filter_sites_dyb];
      let markers_unit_dyb = [...Filter_units_dyb];
      let markers_section_dyb = [...Filter_section_dyb];
      markers_section_dyb[index_section] = { ...markers_section_dyb[index_section], features: markers };
      markers_unit_dyb[index_unit] = { ...markers_unit_dyb[index_unit], sections: markers_section_dyb };
      markers_sites_dyb[index_unit_dyb] = { ...markers_sites_dyb[index_unit_dyb], units: markers_unit_dyb };
      ListTotal_dyb[index_project_dyb]={...ListTotal[index_project_dyb],sites: markers_sites_dyb };
      writeDataStorage(GLOBAL.All_Lists,ListTotal)
      writeDataStorage(GLOBAL.AllProjectInfo_dyb, ListTotal_dyb)
    }
  }
  //Get  Dyb===n Project Total List///
  const getAllProjectInfo = async () => {
    if (GLOBAL.isConnected === true){
      readOnlineApi(Api.getAllProjectInfo+`userId=${GLOBAL.UserInformation?.userId}`).then(json => {
        writeDataStorage(GLOBAL.All_Lists, json?.projects);
      });
    }
  };
  //Get  Dyb===y Project Total List///
  const getAllProjectInfo_dyb = async () => {
    if (GLOBAL.isConnected === true){
      readOnlineApi(Api.getAllProjectInfo_dyb+`userId=${GLOBAL.UserInformation?.userId}&dyb=y`).then(json => {
        writeDataStorage(GLOBAL.AllProjectInfo_dyb, json?.projects);
      });
    }
  };
  const  renderContent= () => (
    <View style={Styles.BtnBox}>
      <TouchableOpacity onPress={()=> {
        onClose();
      }} style={Styles.CancelBtn}>
        <View style={{width:'80%'}}>
          <AntDesign name={"closecircleo"} size={20} color={Colors.button}  />
        </View>
      </TouchableOpacity>
      {
        uploadType===''&&
          <>
            <TouchableOpacity onPress={() => {
              setUploadType('Images')
            }} style={Styles.UploadBtn}>
              <AntDesign name={"picture"} size={17} color={'#fff'} />
              <Text style={[Styles.TextUploadBtn]}>
                Upload Images
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setUploadType('Video')
            }} style={Styles.UploadBtn}>
              <AntDesign name={"videocamera"} size={17} color={'#fff'} />
              <Text style={[Styles.TextUploadBtn]}>
                Upload Video
              </Text>
            </TouchableOpacity>
          </>
      }

      {
        uploadType==='Images'?
          <>
            <TouchableOpacity onPress={() => {
              selectPhoto()
            }} style={Styles.UploadBtn}>
              <AntDesign name={"camera"} size={17} color={'#fff'} />
              <Text style={[Styles.TextUploadBtn]}>
                Use Camera Upload Images
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              selectPhotoFromGallery()
            }} style={Styles.UploadBtn}>
              <AntDesign name={"picture"} size={17} color={'#fff'} />
              <Text style={[Styles.TextUploadBtn]}>
                Choose From Gallery Upload Images
              </Text>

            </TouchableOpacity>
          </>:
          uploadType==='Video'?
          <>
            <TouchableOpacity onPress={() => {
              selectVideocamera()
            }} style={Styles.UploadBtn}>
              <AntDesign name={"camera"} size={17} color={'#fff'} />
              <Text style={[Styles.TextUploadBtn]}>
                Use Camera Upload Video
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              selectVideoGallery()
            }} style={Styles.UploadBtn}>
              <AntDesign name={"picture"} size={17} color={'#fff'} />
              <Text style={[Styles.TextUploadBtn]}>
                Choose From Gallery Upload Video
              </Text>
            </TouchableOpacity>
          </>:null
      }



    </View>
  )
  const DeleteImage=(uri)=>{
    let List_Item = ImageSourceviewarray;
    const index= List_Item.findIndex((p)=>p.uri===uri)
    let markers=[...List_Item]
    markers?.splice(index, 1);
    setImageSourceviewarray(markers)
  }
  const Back_navigate=async ()=>{
    if (ShowBackBtn===false) {
      setShowWarningMessage(true);
      setShowBackBtn(true)
    }
    else {
      goBack()
      await AsyncStorage.removeItem(GLOBAL.Category_Last_Info);
      await AsyncStorage.removeItem(GLOBAL.projectId_Last_Info);
      await AsyncStorage.removeItem(GLOBAL.siteId_Last_Info);
      await AsyncStorage.removeItem(GLOBAL.unitId_Last_Info);
      await AsyncStorage.removeItem(GLOBAL.sectionId_Last_Info);
      await AsyncStorage.removeItem(GLOBAL.featureId_Last_Info);
      // GLOBAL.TaskRelatedNameId=''
      // GLOBAL.TaskRelatedCheck=''
    }
  }

  return (
    <Container  style={{backgroundColor:GLOBAL.backgroundColor}}>
        <Header colors={["#a39898", "#786b6b", "#382e2e"]} StatusColor={"#a39897"} onPress={Back_navigate}
                Title={"Add New Task"} />
        {ShowMessage === true ?
          <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
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
      {showWarning===true&&  <Warningmessage/>}
        <Content>
          <View style={Styles.container}>
            <View style={Styles.Center_margin_Bottom}>
              {showModalDelete &&
              <LogOutModal setshowModalDelete={setshowModalDelete} showModalDelete={showModalDelete} LogOut={LogOut}/>
              }
              {ShowWarningMessage===true&&
              <View style={Styles.flashMessageWarning4}>
                <View style={Styles.flashMessageWarning6}>
                  <View  style={{ width: "10%",alignItems:'center',justifyContent:'flex-start' }}>
                    <FontAwesome size={normalize(18)} color={'#fff'}  name={'exclamation-circle'} />
                  </View>
                  <View style={{ width: "90%",alignItems:'flex-start' }}>
                    <Text style={Styles.AddedtTxt}>
                      You will lose all changes.Do you still want to leave?
                    </Text>
                  </View>
                </View>
                <View style={Styles.With100Row2}>
                  <LinearGradient colors={["#9ab3fd", "#82a2ff", "#4B75FCFF"]} style={Styles.btnListDelete}>
                    <TouchableOpacity onPress={() => {
                      setShowBackBtn(false)
                      setShowWarningMessage(false)}}>
                      <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> No</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient colors={["#ffadad", "#f67070", "#FF0000"]} style={Styles.btnListDelete}>
                    <TouchableOpacity onPress={() => {
                      setShowWarningMessage(false);
                      setShowBackBtn(true);
                      navigation.navigate('Task_Management')}}>
                      <Text style={[Styles.txt_left2, { fontSize: normalize(14) }]}> Yes</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
              }
              <View style={[Styles.With100NoFlex]}>
                <TextInputI onChangeText={(value) => {
                  AddTask(value);
                }} numberValue={24} modules={modules} Taskpriority={Taskpriority}  setTaskpriority={setTaskpriority} setShowBackBtn={setShowBackBtn}
                            ChangeChecked={(value) => ChangeChecked(value)} Cheked={Cheked} setRelatedName={setRelatedName}
                            tittlebtn={"Add Task"} onOpen={onOpen} DeleteImage={DeleteImage} uploadType={uploadType}
                            value={value} ImageSourceviewarray={ImageSourceviewarray} setImageSourceviewarray={setImageSourceviewarray}
                            setSelectedcategory={setSelectedcategory} selectedcategory={selectedcategory}
                            selectedrelated={selectedrelated} setSelectedrelated={setSelectedrelated}
                            setRelatedId={setRelatedId} ShowButton={ShowButton} categoryId={categoryId}
                            setdateType={setdateType} Taskcategory={Taskcategory} setCategoryId={setCategoryId}
                            TaskRelated={TaskRelated} error={error} ParentTaskId={ParentTaskId} setParentTaskId={setParentTaskId}
                            RelatedNameList={RelatedNameList} SelectedParentTask={SelectedParentTask} setSelectedParentTask={setSelectedParentTask}
                            TaskRelatedNameId={TaskRelatedNameId} setTaskRelatedNameId={setTaskRelatedNameId}
                            selectedTaskProjectName={selectedTaskProjectName} setselectedTaskProjectName={setselectedTaskProjectName}
                            selectedfeatureName={selectedfeatureName} setselectedfeatureName={setselectedfeatureName}
                            selectedTaskSiteName={selectedTaskSiteName}  setselectedTaskSiteName={setselectedTaskSiteName}
                            selectedunitName={selectedunitName} setselectedunitName={setselectedunitName} setTaskWorkType={setTaskWorkType}
                            selectedrelatedname={selectedrelatedname} setselectedrelatedname={setselectedrelatedname}
                            selectedsectionName={selectedsectionName} setselectedsectionName={setselectedsectionName} setWorkTypeId={setWorkTypeId}
                            setselectedWorkType={setselectedWorkType} selectedWorkType={selectedWorkType} TaskWorkType={TaskWorkType}
                            selectedpriority={selectedpriority} setselectedpriority={setselectedpriority}
                            priorityId={priorityId} setpriorityId={setpriorityId} ShowBtn={ShowBtn} setShowBtn={setShowBtn}
                            setErrors={setErrors} setShowButton={setShowButton} WorkTypeId={WorkTypeId} relatedId={relatedId}
                            Add_Task_Offline2={Add_Task_Offline2} My_TaskList_server2={My_TaskList_server2} getAllProjectInfo={getAllProjectInfo}
                            getAllProjectInfo_dyb={getAllProjectInfo_dyb} setMessage={setMessage} setShowMessage={setShowMessage} setRelatedNameList={setRelatedNameList}
                />
              </View>
            </View>
          </View>
        </Content>
        <Modalize ref={modalizeRef} withHandle={false} modalStyle={Styles.ModalizeDetalStyle}>
          {renderContent()}
        </Modalize>
        <Footer1 onPressHome={Navigate_Url} onPressdeleteAsync={logout_Url} />
      </Container>


  );
}


export default AddNewTask;
