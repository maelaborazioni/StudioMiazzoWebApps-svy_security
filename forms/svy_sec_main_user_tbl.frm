borderType:"EmptyBorder,0,0,0,0",
dataSource:"db:/svy_framework/sec_user",
extendsID:"-1",
initialSort:"name_compound asc, user_name asc",
items:[
{
anchors:11,
dataProviderID:"name_compound",
editable:false,
location:"0,20",
name:"name_compound",
size:"230,20",
styleClass:"table",
typeid:4,
uuid:"485A3C5A-CC0F-4D0C-9477-BD2D9C56D4F5"
},
{
anchors:9,
horizontalAlignment:0,
imageMediaID:"A7B00B39-D19B-4478-9939-150AC43083FD",
location:"230,20",
mediaOptions:2,
name:"btn_delete",
onActionMethodID:"67CD5545-8DCA-4EF6-8CD7-BB6CACF4A62B",
showClick:false,
size:"20,20",
styleClass:"table",
typeid:7,
uuid:"6CC5A210-771E-4E22-820C-4C68AF7AB8EB"
},
{
horizontalAlignment:2,
labelFor:"name_compound",
location:"0,0",
size:"230,20",
styleClass:"table_header",
text:"i18n:svy.fr.lbl.user",
typeid:7,
uuid:"93A68A11-2197-4197-91BB-414A83DC09B3"
},
{
labelFor:"btn_delete",
location:"230,0",
size:"20,20",
styleClass:"table_header",
typeid:7,
uuid:"AAC0E005-50FD-4AEB-9515-864ED46868DD"
},
{
height:40,
partType:5,
typeid:19,
uuid:"D6A3E526-5556-4F8F-AB57-1FC6B6E3B58C"
}
],
name:"svy_sec_main_user_tbl",
onShowMethodID:"-1",
scrollbars:32,
showInMenu:true,
size:"250,40",
styleName:"leaf_style",
typeid:3,
uuid:"637F2CF3-95C7-4F73-B2DB-75F9D555DB91",
view:3