borderType:"EmptyBorder,0,0,0,0",
dataSource:"db:/svy_framework/sec_user_in_group",
extendsID:"-1",
initialSort:"sec_user_in_group_to_sec_user_org.sec_user_org_to_sec_user.name_compound asc",
items:[
{
anchors:7,
horizontalAlignment:0,
labelFor:"btn_delete",
location:"220,0",
mediaOptions:1,
onActionMethodID:"40D35681-3BE2-4CDC-BBC2-BBE96A11331B",
showClick:false,
size:"20,20",
styleClass:"table_header",
typeid:7,
uuid:"095C0A25-1786-47D7-A5A4-487263DA2851"
},
{
height:40,
partType:5,
typeid:19,
uuid:"29F23232-0C72-43EE-97CA-B89A2694CB5A"
},
{
anchors:11,
dataProviderID:"sec_user_in_group_to_sec_user_org.sec_user_org_to_sec_user.name_compound",
editable:false,
location:"0,20",
name:"name_compound",
size:"220,20",
styleClass:"table",
transparent:true,
typeid:4,
uuid:"977ED691-06D4-40E1-A49D-6C1FC076A970"
},
{
anchors:11,
horizontalAlignment:2,
labelFor:"name_compound",
location:"0,0",
size:"220,20",
styleClass:"table_header",
text:"i18n:svy.fr.lbl.user",
typeid:7,
uuid:"A349F02F-0069-4AAD-8036-317852B696D1"
},
{
anchors:7,
horizontalAlignment:0,
imageMediaID:"A7B00B39-D19B-4478-9939-150AC43083FD",
location:"220,20",
mediaOptions:2,
name:"btn_delete",
onActionMethodID:"023C83B3-0350-4FEE-A4DB-470E574E2EF4",
showClick:false,
showFocus:false,
size:"20,20",
styleClass:"table",
transparent:true,
typeid:7,
uuid:"AE322ECB-AFB5-4440-B46F-C5BCE06F29B9"
}
],
name:"svy_sec_main_group_user_tbl",
onShowMethodID:"-1",
scrollbars:32,
showInMenu:true,
size:"240,40",
styleName:"leaf_style",
typeid:3,
uuid:"D0CDDDD8-59A2-42FD-A171-144847BCD3F8",
view:3