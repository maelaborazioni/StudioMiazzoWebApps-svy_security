borderType:"EmptyBorder,0,0,0,0",
dataSource:"db:/svy_framework/sec_user_right",
extendsID:"-1",
items:[
{
anchors:7,
horizontalAlignment:0,
imageMediaID:"A7B00B39-D19B-4478-9939-150AC43083FD",
location:"160,20",
mediaOptions:2,
name:"btn_delete",
onActionMethodID:"1D19D58C-7903-4D97-A58E-BD3B3F1CE539",
showClick:false,
showFocus:false,
size:"20,20",
styleClass:"table",
transparent:true,
typeid:7,
uuid:"253BF5CE-A90F-4C72-82F0-F93AA43ED70B"
},
{
labelFor:"btn_delete",
location:"160,0",
size:"20,20",
styleClass:"table_header",
typeid:7,
uuid:"36AAA32B-DE67-4C10-A7A4-AC1A354B7144"
},
{
anchors:11,
dataProviderID:"sec_user_right_to_sec_group.name",
editable:false,
location:"0,20",
name:"name",
size:"160,20",
styleClass:"table",
transparent:true,
typeid:4,
uuid:"764AE687-D8A8-4E5D-82C8-414AB35DA004"
},
{
height:40,
partType:5,
typeid:19,
uuid:"79B6A190-EDBF-44AD-A325-FDEBFB56CE92"
},
{
anchors:11,
horizontalAlignment:2,
labelFor:"name",
location:"0,0",
size:"160,20",
styleClass:"table_header",
text:"i18n:svy.fr.lbl.group",
typeid:7,
uuid:"C2D2D4D1-DD50-4E45-A094-7034A3DADBD7"
}
],
name:"svy_sec_main_key_user_group_group_tbl",
namedFoundSet:"separate",
onShowMethodID:"-1",
scrollbars:32,
showInMenu:true,
size:"180,40",
styleName:"leaf_style",
typeid:3,
uuid:"C4887FCA-A740-44EB-A675-875CB1E6A80E",
view:3