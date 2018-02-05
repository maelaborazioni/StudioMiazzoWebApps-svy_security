/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"503EE755-0D96-4068-AF00-150FB80FB701"}
 */
var vPassword = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"522ED4F1-097C-4669-9461-4DC0114FBEA3"}
 */
var vPassword2 = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E4381EA7-16B5-4AE9-843D-B8A39144FD98"}
 */
function btn_cancel(event)
{
	databaseManager.revertEditedRecords()
	databaseManager.setAutoSave(true)
	globals.svy_mod_closeForm(event)
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C2BF0CA5-F279-4793-8DB5-A6BFDA3DEEFF"}
 */
function btn_save(event) {

	var _required_fields = ['user_name', 'sec_user_to_sec_user_org.organization_id', 'vPassword', 'vPassword2']

	var _save = true

		//check the entry
	for (var i = 0; i < _required_fields.length; i++) {
		
		var _element = _required_fields[i].replace(/.*\.(\w+)$/, "$1")
		if (!forms.svy_sec_user_new[_required_fields[i]]) {
			forms.svy_sec_user_new.elements[_element].bgcolor = '#ff0000'
			_save = false
		} else {
			forms.svy_sec_user_new.elements[_element].bgcolor = '#ffffff'
		}
	}

	//check and create the password
	var _password = globals.svy_sec_setUserPassword(forms.svy_sec_user_new.foundset.getSelectedRecord(), vPassword, vPassword2)
	 
	if(_password)
	{
		globals.DIALOGS.showWarningDialog('i18n:svy.fr.lbl.excuse_me', _password)
		return
	}
	
	if (_save) {
		databaseManager.setAutoSave(true)
		globals.svy_mod_closeForm(event)
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"F1A81A39-125D-440D-B834-C650A70141BE"}
 */
function onHide(event) {
	databaseManager.revertEditedRecords()
	databaseManager.setAutoSave(true)
	return true
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1C27E597-99F8-468E-BB5E-889FCF3BC50C"}
 */
function onShow(firstShow, event) {
	vPassword = vPassword2 = null
}
