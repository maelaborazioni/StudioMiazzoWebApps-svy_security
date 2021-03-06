dataSource:"db:/svy_framework/sec_user_org",
extendsID:"-1",
items:[
{
anchors:3,
imageMediaID:"C98C711F-AAB5-482B-B0FF-2C8D1A6908B1",
location:"270,40",
mediaOptions:2,
name:"btn_add_key",
onActionMethodID:"AC2E2182-BE6E-4F3D-BFB4-ED83E3BBE483",
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"30,30",
toolTipText:"i18n:svy.fr.lbl.add",
typeid:7,
uuid:"040199FD-19C4-4F28-B4ED-B8C286080BEE"
},
{
anchors:7,
borderType:"SpecialMatteBorder,0.0,1.0,0.0,0.0,#000000,#336699,#000000,#000000,0.0,",
items:[
{
containsFormID:"6BB28280-0621-479D-8869-B0586949EF86",
location:"0,90",
relationName:"sec_user_org_to_sec_user_in_group",
text:"svy_sec_main_user_group_tbl",
typeid:15,
uuid:"0CD43558-720B-4F45-AB13-8F6E361FA098"
},
{
containsFormID:"6BB28280-0621-479D-8869-B0586949EF86",
location:"0,90",
relationName:"sec_user_org_to_sec_user_in_group",
text:"svy_sec_main_user_group_tbl",
typeid:15,
uuid:"37897312-55FF-4656-B6D4-112B0E4B8EDC"
}
],
location:"0,70",
name:"tab_user_group",
printable:false,
size:"241,230",
tabOrientation:-1,
transparent:true,
typeid:16,
uuid:"3D33FC99-AEC5-45B4-A760-9A2C06936C1F"
},
{
anchors:7,
borderType:"SpecialMatteBorder,0.0,0.0,0.0,1.0,#000000,#000000,#000000,#336699,0.0,",
items:[
{
containsFormID:"5591C37C-B76C-435D-B70F-635F42BB70C5",
location:"518,90",
text:"svy_sec_main_user_key_applied_tbl",
typeid:15,
uuid:"6270D441-42EC-4F45-87BB-D447B63D2B6F"
},
{
containsFormID:"5591C37C-B76C-435D-B70F-635F42BB70C5",
location:"518,90",
text:"svy_sec_main_user_key_applied_tbl",
typeid:15,
uuid:"C5C60EB9-1C45-4E1D-B755-DCEF26F49A63"
}
],
location:"518,70",
name:"tab_applied_user_right",
printable:false,
size:"241,230",
tabOrientation:-1,
transparent:true,
typeid:16,
uuid:"4C5F336F-8B3B-48A8-A837-2D093013F8DA"
},
{
anchors:7,
borderType:"SpecialMatteBorder,0.0,1.0,0.0,1.0,#000000,#336699,#000000,#336699,0.0,",
items:[
{
containsFormID:"D9A8BA27-FE3F-4E2D-9011-FA2C9BC6DA41",
location:"259,90",
relationName:"sec_user_org_to_sec_user_right",
text:"svy_sec_main_user_key_tbl",
typeid:15,
uuid:"4990AECE-E357-480E-B674-D28CEF477727"
},
{
containsFormID:"D9A8BA27-FE3F-4E2D-9011-FA2C9BC6DA41",
location:"259,90",
relationName:"sec_user_org_to_sec_user_right",
text:"svy_sec_main_user_key_tbl",
typeid:15,
uuid:"61703C7A-AD79-43E8-81EA-33AA7CC729C4"
}
],
location:"259,70",
name:"tab_user_right",
printable:false,
size:"242,230",
tabOrientation:-1,
transparent:true,
typeid:16,
uuid:"4D3936D6-8BEF-4A10-BDB3-C328B2FE3F03"
},
{
anchors:3,
imageMediaID:"C98C711F-AAB5-482B-B0FF-2C8D1A6908B1",
location:"10,40",
mediaOptions:2,
name:"btn_add_group",
onActionMethodID:"BD9F402A-E904-44CC-91C9-7203B5436399",
rolloverCursor:12,
showClick:false,
showFocus:false,
size:"30,30",
toolTipText:"i18n:svy.fr.lbl.add",
typeid:7,
uuid:"C757EAB5-FBFB-4E11-B293-45CA938B5FF8"
},
{
location:"10,10",
size:"120,20",
text:"i18n:svy.fr.lbl.organization_filter",
transparent:true,
typeid:7,
uuid:"E03197F6-579F-4B55-8F9A-EEB005EBC323"
},
{
dataProviderID:"organizationID",
displayType:2,
editable:false,
location:"140,10",
name:"organizationID",
onDataChangeMethodID:"CC2651D9-878B-4CA8-85BE-CA24BBDF5AAC",
size:"609,20",
typeid:4,
uuid:"EC213124-B46D-42A4-AD70-2C98FC74CE16",
valuelistID:"FB6A04B8-8967-4263-A416-D1FFA3F93587"
},
{
height:300,
partType:5,
typeid:19,
uuid:"FCC555EB-5DAC-4978-BB8C-198239067E16"
}
],
name:"svy_sec_main_user_security",
navigatorID:"-1",
onRecordSelectionMethodID:"906C8AA6-FF03-4055-984D-753CD6D20D2A",
onShowMethodID:"74E205AA-C91A-4B84-A56E-BB016778C612",
showInMenu:true,
size:"759,300",
styleName:"leaf_style",
typeid:3,
uuid:"ABB69230-90C7-4B23-9645-574DA7158091"