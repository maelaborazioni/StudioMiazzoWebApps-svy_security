borderType:"EmptyBorder,0,0,0,0",
dataSource:"db:/svy_framework/sec_user_org",
extendsID:"-1",
initialSort:"sec_user_org_to_sec_organization.name asc",
items:[
{
labelFor:"btn_delete",
location:"340,0",
size:"20,20",
styleClass:"table_header",
typeid:7,
uuid:"3118CA20-31EE-4493-9CD1-52C0CC2AAB81"
},
{
anchors:11,
horizontalAlignment:2,
labelFor:"organization_name",
location:"0,0",
size:"170,20",
styleClass:"table_header",
text:"i18n:svy.fr.lbl.organization",
typeid:7,
uuid:"36E2719F-3177-4B34-AA7C-0BA763F2908D"
},
{
height:40,
partType:5,
typeid:19,
uuid:"776E4C71-1890-4B33-97DA-93BBE25D3FE5"
},
{
anchors:7,
horizontalAlignment:0,
imageMediaID:"A7B00B39-D19B-4478-9939-150AC43083FD",
location:"340,20",
mediaOptions:2,
name:"btn_delete",
onActionMethodID:"B92B1E7E-8482-43B1-AC18-2FE21ED9F522",
showClick:false,
showFocus:false,
size:"20,20",
styleClass:"table",
transparent:true,
typeid:7,
uuid:"87C2E065-7C1A-4B7D-89D6-1ECE9C35C306"
},
{
anchors:11,
dataProviderID:"sec_user_org_to_sec_organization.sec_organization_to_sec_owner.name",
editable:false,
location:"170,20",
name:"owner_name",
size:"170,20",
styleClass:"table",
transparent:true,
typeid:4,
uuid:"C4FD0D14-EF51-4FA4-B36B-2F5EB3A2D16D"
},
{
anchors:11,
dataProviderID:"sec_user_org_to_sec_organization.name",
editable:false,
location:"0,20",
name:"organization_name",
size:"170,20",
styleClass:"table",
transparent:true,
typeid:4,
uuid:"D7D97CC4-ABA3-43DA-A8FB-A48F4CC3FDDE"
},
{
anchors:11,
horizontalAlignment:2,
labelFor:"owner_name",
location:"170,0",
size:"170,20",
styleClass:"table_header",
text:"i18n:svy.fr.lbl.owner",
typeid:7,
uuid:"FFDD91A9-718E-4030-A876-468C7E0E9263"
}
],
name:"svy_sec_main_user_organization_tbl",
onShowMethodID:"-1",
scrollbars:32,
showInMenu:true,
size:"360,40",
styleName:"leaf_style",
typeid:3,
uuid:"28BEA70D-2703-4ED6-BA9D-A6014E1618B6",
view:3