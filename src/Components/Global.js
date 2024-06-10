const LATITUDE = 35.6892;
const LONGITUDE = 51.389;
module.exports = {
  BASE_URL_User: "",
  BASE_URL_first: 'https://master.okout.net/api/ApiLogin/checkOrgCode',
  FONT_FAMILY: "OpenSansBold",
  FONT_FAMILY1: "IRANSansMobileFaNum-Medium",
  FONT_FAMILYHEAVY: "YEKANBAKHEN07HEAVY",
  FONT_FAMILY_BOLD: "YekanBakhBold",
  FONT_FAMILY_ENGLISH: "yekanbakh",
  OFFICIAL_GREEN_COLOR: "#bded80",
  OFFICIAL_ORANGE_COLOR: "#ecd897",
  OFFICIAL_WITE_COLOR: "#fff",
  OFFICIAL_BLACK_COLOR: "#000",
  OFFICIAL_BLUE_COLOR: "#4a6e8e",
  OFFICIAL_PURPLE_COLOR: "#999999",
  OFFICIAL_background: "#f6f9f9",
  OFFICIAL_Button: "#5658DD",
  OFFICIAL_Buttondark: "#2122b6",
  OFFICIAL_backgroundItem: "#2A3052FF",
  OFFICIAL_backgroundItem_Light: "rgba(42,48,82,0.6)",
  OFFICIAL_backgroundItem_Lighter: "#434a79",
  OFFICIAL_PROJECTCOLOR:"#FF0000",
  REGION: {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  },
  token: "",
  PASSWORD_KEY: "@MySuperStore:password",
  OrgAppLink: "@MySuperStore:OrgAppLink",
  OrgAppKey: "@MySuperStore:OrgAppKey",
  VersionCheck: "@MySuperStore:VersionCheck",
  RoleID_Key: "@MySuperStore:RoleID",
  UserInfo: "@MySuperStore:UserInfo",
  Modules: "@MySuperStore:Modules",
  DYBList: "@MySuperStore:DYBList",
  SiteDetail_KEY: "@MySuperStore:SiteDetail_KEY",
  UnitDetail_KEY: "@MySuperStore:UnitDetail_KEY",
  SectionDetail_KEY: "@MySuperStore:SectionDetail_KEY",
  FeatureDetailList_KEY: "@MySuperStore:FeatureDetailList_KEY",
  FeatureList_KEY: "@MySuperStore:FeatureDetailList_KEY",
  FeatureList_Details_KEY: "@MySuperStore:FeatureList_Details_KEY",
  DYBList_Details_KEY: "@MySuperStore:DYBList_Details_KEY",
  DYBlList_KEY: "@MySuperStore:DYBlList_KEY",
  Methdos_KEY: "@MySuperStore:Methdos_KEY",
  DYBProjectsDetails: "@MySuperStore:DYBProjectsDetails",
  FeatureAdd_Image_KEY: "@MySuperStore:FeatureAdd_Image_KEY",
  offline_data: "@MySuperStore:offline_data",
  All_Lists:'@MySuperStore:All_Lists',
  Related_Task:'@MySuperStore:Related_Task',
  All_Country:'@MySuperStore:All_Country',
  All_City:'@MySuperStore:All_City',
  AllProjectInfo_dyb:'@MySuperStore:AllProjectInfo_dyb',
  Assigned_TaskList:'@MySuperStore:Assigned_TaskList',
  RentalUnits_List:'@MySuperStore:RentalUnits_List',
  Get_Docmanage:'@MySuperStore:Get_Docmanage',
  Get_Docmanagecategory:'@MySuperStore:Get_Docmanagecategory',
  UserPermissions:'@MySuperStore:UserPermissions',
  All_Task:'@MySuperStore:All_Task',
  Task_Detail:'@MySuperStore:Task_Detail',
  Task_Category:'@MySuperStore:TaskCategory',
  Task_SubCategory:'@MySuperStore:TaskSubCategory',
  Task_SubCategory2:'@MySuperStore:Task_SubCategory2',
  ImageSourceviewarray:'@MySuperStore:ImageSourceviewarray',
  Task_attachments:'@MySuperStore:Task_attachments',
  priorities:'@MySuperStore:priorities',
  Task_status:'@MySuperStore:Task_status',
  Reason_Code:'@MySuperStore:Reason_Code',
  Reason_Code_Reopen:'@MySuperStore:Reason_Code_Reopen',
  mapKey:'@MySuperStore:mapKey',
  Category_Last_Info:'@MySuperStore:CategoryLastInfo',
  WorkType_Last_Info:'@MySuperStore:WorkTypeLastInfo',
  RelatedId_Last_Info:'@MySuperStore:RelatedIdLastInfo',
  RelatedName_Last_Info:'@MySuperStore:RelatedNameLastInfo',
  priorityId_Last_Info:'@MySuperStore:priorityId_Last_Info',
  projectId_Last_Info:'@MySuperStore:projectId_Last_Info',
  siteId_Last_Info:'@MySuperStore:siteId_Last_Info',
  unitId_Last_Info:'@MySuperStore:unitId_Last_Info',
  sectionId_Last_Info:'@MySuperStore:sectionId_Last_Info',
  featureId_Last_Info:'@MySuperStore:featureId_Last_Info',
  Theme_Color:'@MySuperStore:Theme',
  RelatedList:'@MySuperStore:RelatedList',
  categories:'@MySuperStore:categories',
  EntityList:'@MySuperStore:EntityList',
  PASSWORD_value:"",
  OrgAppLink_value:"",
  OrgAppKey_value:"",
  modules:[],
  doshboardlist:[{constModule_Name:'Customer',Icon:require("../Picture/png/customer.png"),IconColor:['#BCE7FC','#38AECC','#022F40']},
    {constModule_Name:'Pos',Icon:require("../Picture/png/shop.png"),IconColor:['#BCE7FC','#38AECC','#022F40']},
    {constModule_Name:'Sales',Icon:require("../Picture/png/sales.png"),IconColor:['#BCE7FC','#38AECC','#022F40']}
  ],
  ProjectId:0,
  SiteId:0,
  UnitId:0,
  SectionId:0,
  SectionIdDelete:0,
  FeatureIdDelete:0,
  UpdateProjectId:0,
  UnitIdDelete:0,
  UpdateSiteID:0,
  UpdateUnitID:0,
  UpdateSectionID:0,
  UpdateFeatureID:0,
  TaskId:0,
  DYB:'',
  SectionName:'',
  MenuName:'',
  FeatureName:'',
  FeatureNameDetail:'',
  FeatureSelectDetail:'',
  Feature:"",
  RoleID:0,
  UserInformation:'',
  isConnected:true,
  SiteDetailList:[],
  UpdateId:0,
  location:'',
  DYB_Type:'',
  buildId:0,
  Navigation:'',
  Country:[],
  City:[],
  AllProjectInfo:[],
  Task_detail:'',
  selectItem:0,
  route:"",
  TaskMenuName:"",
  UserPermissionsList:'',
  FilterTime:false,
  FilterStatus:false,
  FilterPriority:false,
  FilterCategory:false,
  FilterList:[],
  List:[],
  FilterTime_name:'All',
  FilterStatus_name:'All',
  FilterPriority_name:'Normal',
  FilterCategory_name:'',
  FilterEntity_name:'',
  FilterProject_name:'',
  FilterSite_name:'',
  FilterUnit_name:'',
  FilterSection_name:'',
  FilterFeature_name:'',
  selectedRange:{},
  buttonName:'',
  TaskName:"",
  TaskRelatedNameId:"",
  TaskRelatedName:"",
  categoryId:'',
  TaskRelatedId:'',
  Subtask:'',
  Submodules:[],
  CheckSubmodules:[{constModule_Name:'Check in',IconColor:[ "#8DA750", "#537B2F", "#2D5128"],constModule_Id:'1'},
    {constModule_Name:'Check out',IconColor:["#abb456", "#989a2b", "#48450B"],constModule_Id:'2'},
    {constModule_Name:'Inspection',IconColor:["#80a569", "#6c8e5a", "#33402c"],constModule_Id:'3'}],
  mapKeyValue:'',
  Unitdata : [
    { label: "Edit", value: "4", Icon: "edit" },
    { label: "Delete", value: "5", Icon: "trash" },
    { label: "Photos", value: "6", Icon: "images" },
    { label: "Location", value: "15", Icon: "location" },
    { label: "Add Task", value: "22", Icon: "new-message" },
  ],
  Unitdata_dyb:[{label: "Photos",value: "2",Icon: "images" },
    {label: "Location",value: "14",Icon: "location" },],
// { label: "Document", value: "3", Icon: "attachment" }
  Task_data:[{ label: "Edit", value: "1", Icon: "edit" }, { label: "Cancel Task", value: "2", Icon: "cross" }, ],
  Task_data_assigned : [ { label: "Complete Task", value: "4", Icon: "check" }],
  Section_Data:[
    {label: "Edit",value: "7",Icon: "edit" },
    {label: "Delete",value: "8",Icon: "trash" },
    { label: "Add Task", value: "19", Icon:"new-message"}
  ],
  Project_data:[{ label: "Edit", value: "1", Icon: "edit" },{ label: "Add Task", value: "16", Icon: "new-message" }],
  Site_data:[
    { label: "Edit", value: "2", Icon:"edit"},
    { label: "Photos", value: "3", Icon:"images"},
    { label: "Location", value: "14", Icon:"location"},
    { label: "Add Task", value: "18", Icon:"new-message"}
  ],
  Site_data_dyb:[
    {label: "Photos",value: "3",Icon: "images" },
    {label: "Location",value: "14",Icon: "location" },
  ],
  Pos_dyb: [
    {label: "Invoice",value: "3",Icon: "hand-holding-dollar" },
    {label: "Return Invoice",value: "14",Icon: "sack-dollar" },
  ],
  Feature_data:[{ label: "Edit", value: "10", Icon: "edit" },
    {label:"Delete", value: "11", Icon: "trash" },
    {label:"Photos / Notes", value: "12", Icon: "level-down" },
    {label:"Change DYB",value:"13",Icon:"retweet"},
    {label:"Add Task", value: '20', Icon:"new-message"}],
  RelatedName:'',
  RelatedId:'',
  Url_Navigate:'',
  PictureUrl:'',

  backgroundColor:'#f6f9f9',
  header_backgroundColor:'#fff',
  status_backgroundColor:'#fff',
  footer_backgroundColor:'#fff',
  backgroundImage_backgroundColor:'',
  headertext_backgroundColor:'#4a6e8e',
  filter_backgroundColor:'#4a6e8e',
  task_structurelistbackgroundColor:["#6598cd", "#5082ba", "#4a6e8e"],
  Check_structurelistbackgroundColor:["#42dad9", "#30b2be", "#208ca2"],
  input_borderColor:'#4a6e8e',
  input_titleColor:'#4a6e8e',
  input_textColor:'#4a6e8e',
  footertext_backgroundColor:'#4a6e8e',
  DocID:0,
  DocCategoryID:0,
  DocSubCategoryID:0,
  SubCategoryTitle:'',
  DocSubCategoryTitle:'',
  screenName:'',
  doc_sectionId:'',
  documents:'',
  Projectdocinfo:'',
  SelectId:'',
  SelectName:'',
  RelatedNameLvalue:"",
  relatedName:"",
  relatedId:0,
  TaskRelatedCheck:"",

};
