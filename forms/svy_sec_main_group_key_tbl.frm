borderType:"EmptyBorder,0,0,0,0",
dataSource:"db:/svy_framework/sec_user_right",
extendsID:"-1",
initialSort:"sec_user_right_to_sec_security_key.name asc",
items:[
{
height:40,
partType:5,
typeid:19,
uuid:"2C4E03CB-3CA3-4F18-A026-92039B1D23D0"
},
{
anchors:11,
horizontalAlignment:2,
labelFor:"name",
location:"0,0",
size:"220,20",
styleClass:"table_header",
text:"i18n:svy.fr.lbl.key",
typeid:7,
uuid:"4A46CBFE-B4F8-48D3-B040-B385933F4B37"
},
{
anchors:7,
horizontalAlignment:0,
imageMediaID:"A7B00B39-D19B-4478-9939-150AC43083FD",
location:"220,20",
mediaOptions:2,
name:"btn_delete",
onActionMethodID:"10475A53-2ADD-44FD-BCC7-18E951AC296A",
showClick:false,
showFocus:false,
size:"20,20",
styleClass:"table",
transparent:true,
typeid:7,
uuid:"8879F1B3-266F-4A10-B91F-ED02DF7913E6"
},
{
labelFor:"btn_delete",
location:"220,0",
size:"20,20",
styleClass:"table_header",
typeid:7,
uuid:"97A86916-2286-4FD2-BCFF-D788ED2BCB42"
},
{
anchors:11,
dataProviderID:"sec_user_right_to_sec_security_key.name",
editable:false,
location:"0,20",
name:"name",
size:"220,20",
styleClass:"table",
transparent:true,
typeid:4,
uuid:"F45F24FD-6EE8-45E6-A01A-17D8DEC786F1"
}
],
name:"svy_sec_main_group_key_tbl",
onShowMethodID:"-1",
scrollbars:32,
showInMenu:true,
size:"240,40",
styleName:"leaf_style",
typeid:3,
uuid:"8D89A64A-3F35-485C-A7F6-767118A3BB6F",
view:3