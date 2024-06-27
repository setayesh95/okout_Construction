import {Text,View} from "react-native";
import {Styles} from "../Styles";
import React, {useEffect,useState} from "react";
import {Dropdown} from "react-native-element-dropdown";
const GLOBAL = require("../Global");
function TaskFilterDropDown({value,TypeName,setRelatedId,sectionList,
                              selectedsectionName,RelatedNameList,
                              getFeatures,setselectedsectionName,FilterTaskEntityDropDown,getUnit2,
                              getLists,categoryLevellist,
                              TypeName2,setselectedrelatedname
                            }) {
  const [selectedTaskName,setselectedTaskName]=useState('');
  const [value2, setValue] = useState('');
  const [isFocusrelated, setIsFocusrelated] = useState(false);
  const [isFocusrelated3, setIsFocusrelated3] = useState(false);

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
        <>
          {
            TypeName2==='Add'&&
            <View style={Styles.ItemModalFilter}>
              <Text style={Styles.txt_leftModalFilterTAsk}>{value.label}</Text>
            </View>
          }

          <Dropdown
            style={TypeName2==='Add'?Styles.dropdowntaskentitymain2:Styles.dropdowntaskentity}
            placeholderStyle={Styles.placeholderStyle}
            selectedTextStyle={Styles.selectedTextStyle}
            iconStyle={Styles.iconStyle}
            itemTextStyle={Styles.itemTextStyle}
            containerStyle={{backgroundColor:GLOBAL.footer_backgroundColor}}
            data={value.data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusrelated ? value.label : '...'}
            searchPlaceholder="Search..."
            value={value2}
            renderItem={renderItem}
            onFocus={() => setIsFocusrelated(true)}
            onBlur={() => setIsFocusrelated(false)}
            onChange={item=> {
              //setValue(item.label)
              const Index = categoryLevellist.findIndex((p)=>parseInt(p.value)===parseInt(value.value))
              const categoryId2 = categoryLevellist?.[Index]?.value;
              const categoryId = categoryLevellist?.[Index+1]?.value;
             FilterTaskEntityDropDown(item,categoryId2)
              getLists(categoryId,item.value);
              setRelatedId(item.value)
              setselectedrelatedname({label:categoryLevellist?.[Index]?.label,value:"0",_index:0})

            }}
          />
        </>
        :  TypeName==='Property Maintenance'?
          <>
            {
              TypeName2==='Add'&&
              <View style={Styles.ItemModalFilter}>
                <Text style={Styles.txt_leftModalFilterTAsk}>{value.label}</Text>
              </View>
            }
            <Dropdown
              style={[TypeName2==='Add'?Styles.dropdowntaskentitymain2:Styles.dropdowntaskentitymain,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
              placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
              selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
              iconStyle={Styles.iconStyle}
              itemTextStyle={Styles.itemTextStyle}
              containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
              data={value.data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={value2}
              placeholder={!isFocusrelated ?  value.label : '...'}
              renderItem={renderItem}
              onFocus={() => setIsFocusrelated(true)}
              onBlur={() => setIsFocusrelated(false)}
              onChange={item=> {
                console.log(item,'item')
                const Index=categoryLevellist.findIndex((p)=>parseInt(p.value)===parseInt(value.value))
                const categoryId= categoryLevellist?.[Index+1]?.value;
                const categoryId2 = categoryLevellist?.[Index]?.value;
                if(categoryLevellist?.[Index]?.label==='Site'||categoryLevellist?.[Index]?.label==='site') {
                  getUnit2(categoryId, item.value);
                }
                FilterTaskEntityDropDown(item,categoryId2)
                setRelatedId(item.value)
                setselectedrelatedname({label:categoryLevellist?.[Index]?.label,value:"0",_index:0})
              }}
            />
          </>
          :  TypeName==='Support'?
            <View style={Styles.TaskEntityDropDown}>
              <>
                {
                  TypeName2==='Add'&&
                  <View style={Styles.ItemModalFilter}>
                    <Text style={Styles.txt_leftModalFilterTAsk}>{value.label}</Text>
                  </View>
                }
                <Dropdown
                  style={[Styles.dropdowntaskentitySupport,{  borderColor: GLOBAL.footertext_backgroundColor,}]}
                  placeholderStyle={[Styles.placeholderStyle,{color: GLOBAL.footertext_backgroundColor,}]}
                  selectedTextStyle={[Styles.selectedTextStyle,{ color: GLOBAL.footertext_backgroundColor,}]}
                  iconStyle={Styles.iconStyle}
                  itemTextStyle={Styles.itemTextStyle}
                  containerStyle={[Styles.containerStyle,{backgroundColor:GLOBAL.footer_backgroundColor}]}
                  data={value.data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  searchPlaceholder="Search..."
                  value={value2}
                  placeholder={!isFocusrelated ?  value.label : '...'}
                  renderItem={renderItem}
                  onFocus={() => setIsFocusrelated(true)}
                  onBlur={() => setIsFocusrelated(false)}
                  onChange={item=> {
                    console.log(item,'item')
                    const Index=categoryLevellist.findIndex((p)=>parseInt(p.value)===parseInt(value.value))
                    const categoryId= categoryLevellist?.[Index+1]?.value;
                    const categoryId2 = categoryLevellist?.[Index]?.value;
                    // if(categoryLevellist?.[Index]?.label==='Site'||categoryLevellist?.[Index]?.label==='site') {
                    //   getUnit2(categoryId, item.value);
                    // }
                    FilterTaskEntityDropDown(item,categoryId2)
                    setRelatedId(item.value)
                    setselectedrelatedname({label:categoryLevellist?.[Index]?.label,value:"0",_index:0})
                  }}
                />
              </>
            </View>
            :null
      }
    </>
  )
}
export { TaskFilterDropDown };
