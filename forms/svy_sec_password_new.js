/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"783bb000-4fcd-460d-bbb2-9bd53277c473"}
 */
var new_password = '';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"cc310575-d66c-4f05-96a1-a746527ff1ab",variableType:4}
 */
var password_ok = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"d4010ef9-b621-4536-bfc1-dda6333cf207"}
 */
var retype_newpassword = '';

/**
 * Method to check a password, for lenght, begin, equal, not the same begin, must contain numbers.
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"e31e120a-3a2a-4415-817c-b1a128822824"}
 */
function check_password(_event)
{ 
	globals.svy_sec_owner_id = globals.svy_sec_getOwnerId()
	
	if(globals.svy_sec_trigger_form != 'svy_sec_main_user_password_tbl') // form is not called from user_dtl form
	{
		globals.svy_sec_user_id = _to_sec_user_org.sec_user_org_to_sec_user.user_id
	}
	else
	{
		globals.svy_sec_user_id = forms.svy_sec_main_user_access.user_id
	}

	//check the password
	var _password = globals.svy_sec_setUserPassword(_to_sec_user$svy_sec_user_id.getSelectedRecord(),new_password,retype_newpassword)

	if(_password) //not a good password
	{
		elements.lbl_warning.text = _password 
		return
	}
	
	password_ok = 1
	globals.svy_sec_trigger_form = null
	globals.svy_mod_closeForm(_event)
	//_CloseAndContinue(_event)			
}

///**
// * @AllowToRunInFind
// * 
// * @param {JSEvent} _event
// * @param {String} [_form]
// *
// * @properties={typeid:24,uuid:"F56C5018-6B5D-4191-8325-A956F1F39C58"}
// */
//function _CloseAndContinue(_event, _form) {
//	//controller.search() - to make it work in find mode
//	if(!_form)
//		_form = _event.getFormName();
//	/** @type {Function} */
//	var c = forms[_form].dialogContinuation;
//	var r = forms[_form].returnValue;
//	var dn = forms[_form].dialogName;
//	globals.svy_mod_closeForm(_event);
//	application.updateUI();
//	history.removeForm(dn)
//	if (application.getApplicationType() == 5) c(r);
//}

/**
 *  Lets the user only exit the dialog if he chooses one of the options
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 *
 * @properties={typeid:24,uuid:"70e850ab-3bc2-4a27-bae0-157db919df43"}
 */
function onHide()
{ 
	if(password_ok  == 0)
	{
		return false
		
	}
	else return true
}

/**
 *  Sets the variables to null
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 *
 * @properties={typeid:24,uuid:"3d36a548-ad8f-443d-8a24-5878fcf2e491"}
 */
function onShow()
{
	password_ok = 0
	elements.lbl_warning.text = null
	new_password = null
	retype_newpassword = null
	controller.focusFirstField()
}

/**
 *  Cancel
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"f482f534-c978-4938-bbbd-80e09271a08f"}
 */
function cancel(_event)
{
	password_ok = 1
	globals.svy_mod_closeForm(_event)
}
