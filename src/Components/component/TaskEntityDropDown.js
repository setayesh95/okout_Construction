import {Text,View} from "react-native";
import {Styles} from "../Styles";
import normalize from "react-native-normalize/src/index";
import React, {useEffect,useState} from "react";
import {Dropdown} from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { writeDataStorage } from "../Get_Location";
const GLOBAL = require("../Global");
function TaskEntityDropDown({TypeName,TaskRelated,setRelatedId,setSelectedrelated,SiteList,selectedunitName,unitList,sectionList,
                              selectedsectionName,featureList,setRelatedName,selectedfeatureName,RelatedNameList,getSites,
                              getUnits,getSection,getFeatures,selectedrelated,selectedTaskSiteName,setselectedTaskSiteName,
                              setselectedunitName,setselectedsectionName,setselectedfeatureName,FilterTaskEntityDropDown,getUnit2
                      }) {
  const [selectedTaskName,setselectedTaskName]=useState('');
  const [isFocusrelated, setIsFocusrelated] = useState(false);
  const [isFocusrelated1, setIsFocusrelated1] = useState(false);
  const [isFocusrelated2, setIsFocusrelated2] = useState(false);
  const [isFocusrelated3, setIsFocusrelated3] = useState(false);
  const [isFocusrelated4, setIsFocusrelated4] = useState(false);


  const renderItem = item => {
    return (
      <View style={Styles.item}>
        <Text style={Styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return(
    <>
      {TypeName==='Snagging'||TypeName==='Subcontract'?
          <View style={Styles.TaskEntityDropDown}>
            <Dropdown
              style={[Styles.dropdowntaskentity,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
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
              placeholder={!isFocusrelated ? 'Project ' : '...'}
              searchPlaceholder="Search..."
              value={selectedrelated}
              renderItem={renderItem}
              onFocus={() => setIsFocusrelated(true)}
              onBlur={() => setIsFocusrelated(false)}
              onChange={item=> {
                setSelectedrelated(item);
                GLOBAL.ProjectName=item.label
                const categoryId= RelatedNameList.find((p)=>p.categoryLevel==='2')?.value
                console.log(RelatedNameList,'RelatedNameList')
             console.log(categoryId,'categoryId')
                console.log(item.value,'ProjectId')
                FilterTaskEntityDropDown(item)
                GLOBAL.ProjectId=item.value;

                getSites(categoryId,item.value)
              }}
            />

              <Dropdown
                style={[Styles.dropdowntaskentity,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
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
                placeholder={!isFocusrelated1 ? ' Site' : '...'}
                searchPlaceholder="Search..."
                value={selectedTaskSiteName}
                renderItem={renderItem}
                onFocus={() => setIsFocusrelated1(true)}
                onBlur={() => setIsFocusrelated1(false)}
                onChange={item=> {
                  setselectedTaskSiteName(item)
                  FilterTaskEntityDropDown(item)
                  GLOBAL.SiteName=item.label
                  GLOBAL.SiteId=item.value;
                 // writeDataStorage(GLOBAL.siteId_Last_Info,item.value)
                    const categoryId= RelatedNameList.find((p)=>p.categoryLevel==='3')?.value
                     getUnits(categoryId,item.value);
                }}
              />
              <Dropdown
                style={[Styles.dropdowntaskentity,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
                placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
                selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
                iconStyle={Styles.iconStyle}
                itemTextStyle={Styles.itemTextStyle}
                containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusrelated2 ? ' unit' : '...'}
                searchPlaceholder="Search..."
                value={selectedunitName}
                data={unitList}
                search
                renderItem={renderItem}
                onFocus={() => setIsFocusrelated2(true)}
                onBlur={() => setIsFocusrelated2(false)}
                onChange={item=> {
                  setselectedunitName(item)
                  FilterTaskEntityDropDown(item)
                  GLOBAL.UnitName=item.label
                  //writeDataStorage(GLOBAL.unitId_Last_Info,item.value)
                  GLOBAL.UnitId=item.value
                  const categoryId= RelatedNameList.find((p)=>p.categoryLevel==='4')?.value
                    getSection(categoryId,item.value);
                }}
              />


              <Dropdown
                style={[Styles.dropdowntaskentity,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
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
                placeholder={!isFocusrelated3 ? ' Section' : '...'}
                searchPlaceholder="Search..."
                value={selectedsectionName}
                containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                renderItem={renderItem}
                onFocus={() => setIsFocusrelated3(true)}
                onBlur={() => setIsFocusrelated3(false)}
                onChange={item=> {
                  setselectedsectionName(item)
                  GLOBAL.SectionId=item.value
                  const categoryId= RelatedNameList.find((p)=>p.categoryLevel==='5')?.value
                  GLOBAL.SectionNamee=item.label
                  FilterTaskEntityDropDown(item)
                  //writeDataStorage(GLOBAL.sectionId_Last_Info,item.value)

                     getFeatures(categoryId,item.value);
                }}
              />

              <Dropdown
                style={[Styles.dropdowntaskentity,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
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
                placeholder={!isFocusrelated4 ? 'Feature' : '...'}
                searchPlaceholder="Search..."
                value={selectedfeatureName}
                containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                renderItem={renderItem}
                onFocus={() => setIsFocusrelated4(true)}
                onBlur={() => setIsFocusrelated4(false)}
                onChange={item=> {
                  GLOBAL.FeatureNamee=item.label
                  setselectedfeatureName(item)
                  FilterTaskEntityDropDown(item)

                  //writeDataStorage(GLOBAL.featureId_Last_Info,item.value)
                  // if(RelatedNameLvalue==='Feature') {
                  //   setselectedfeatureName(item);
                  //   setRelatedId(item.value)
                  //   writeDataStorage(GLOBAL.RelatedId_Last_Info, item.value)
                  // }
                  // else {
                  //   getFeatures();
                  //   setTaskfeatureId(item);
                  //   setTasksectionId(item.value)
                  // }
                }}
              />

          </View>
       :  TypeName==='Property Maintenance'?
          <View style={Styles.TaskEntityDropDown}>

            <Dropdown
              style={[Styles.dropdowntaskentitymain,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
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
              placeholder={!isFocusrelated1 ? ' Site' : '...'}
              searchPlaceholder="Search..."
              value={selectedTaskSiteName}
              renderItem={renderItem}
              onFocus={() => setIsFocusrelated1(true)}
              onBlur={() => setIsFocusrelated1(false)}
              onChange={item=> {
                setselectedTaskSiteName(item)
                GLOBAL.SiteId=item.value;
                GLOBAL.SiteName='site'
                FilterTaskEntityDropDown(item)
                getUnit2(item.value);
              }}
            />
            <Dropdown
              style={[Styles.dropdowntaskentitymain,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
              placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
              selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
              iconStyle={Styles.iconStyle}
              itemTextStyle={Styles.itemTextStyle}
              containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocusrelated2 ? ' unit' : '...'}
              searchPlaceholder="Search..."
              value={selectedunitName}
              data={unitList}
              search
              renderItem={renderItem}
              onFocus={() => setIsFocusrelated2(true)}
              onBlur={() => setIsFocusrelated2(false)}
              onChange={item=> {
                setselectedunitName(item)
                GLOBAL.SiteName='unit'
                FilterTaskEntityDropDown(item)
                //writeDataStorage(GLOBAL.unitId_Last_Info,item.value)
                GLOBAL.UnitId=item.value
                const categoryId= RelatedNameList.find((p)=>p.categoryLevel==='4')?.value
                getSection(categoryId,item.value);
              }}
            />

          </View>
          :  TypeName==='Support'?
        <View style={Styles.TaskEntityDropDown}>
        <Dropdown
        style={[Styles.dropdowntaskentitySupport,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
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
        placeholder={!isFocusrelated3 ? ' Section' : '...'}
        searchPlaceholder="Search..."
        value={selectedsectionName}
        containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
        renderItem={renderItem}
        onFocus={() => setIsFocusrelated3(true)}
        onBlur={() => setIsFocusrelated3(false)}
        onChange={item=> {
          setselectedsectionName(item)
          FilterTaskEntityDropDown(item)
        //writeDataStorage(GLOBAL.sectionId_Last_Info,item.value)
        GLOBAL.SectionId=item.value
        const categoryId= RelatedNameList.find((p)=>p.categoryLevel==='5')?.value
        getFeatures(categoryId,item.value);
      }}
        />
        </View>
        :null
      }
    </>
  )
}
export { TaskEntityDropDown };
