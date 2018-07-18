/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E1C58463-8F15-4803-A0ED-EC1838A0D2AE"}
 */
var owner_id = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3D9C0855-0838-40A9-98E8-F2D2812A8E90"}
 */
function btn_cancel(event) {
	databaseManager.revertEditedRecords()
	databaseManager.setAutoSave(true)
	globals.svy_mod_closeForm(event)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A7E76C2B-5DBC-4AA3-9129-FB0E826E7F12"}
 */
function btn_save(event) {
	var _required_fields = ['user_id', 'organization_id']

	var _save = true

		//check the entry
	for (var i = 0; i < _required_fields.length; i++) {
		
		var _element = _required_fields[i].replace(/.*\.(\w+)$/, "$1")
		if (!forms.svy_sec_user_org_new[_required_fields[i]]) {
			forms.svy_sec_user_org_new.elements[_element].bgcolor = '#ff0000'
			_save = false
		} else {
			forms.svy_sec_user_org_new.elements[_element].bgcolor = '#ffffff'
		}
	}

	if (_save) {
		databaseManager.setAutoSave(true)
		globals.svy_mod_closeForm(event)
		forms.svy_sec_main_user_password_tbl.controller.loadRecords(foundset.sec_user_org_to_sec_user)
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"33A4017C-4524-4086-B12A-DF708B33F4DA"}
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
 * @private
 *
 * @properties={typeid:24,uuid:"428696C3-E48D-4CD5-AE85-B16E68D961B4"}
 */
function onShow(firstShow, event) {
	setValueListItems();
	// owner_id = globals.svy_sec_lgn_owner_id;
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"8A514CBA-D5DA-4429-878B-8EA02A3FE29B"}
 * @AllowToRunInFind
 */
function onDataChangeOwnerID(oldValue, newValue, event) {
	foundset.organization_id = null;
	setValueListItems();
	
	return true;
}

/**
 * @private
 *
 * @properties={typeid:24,uuid:"34E82F7B-B8F5-4B65-855B-9A5F2BF045A4"}
 * @AllowToRunInFind
 */
function setValueListItems() {
	/** @type {JSFoundSet<db:/svy_framework/sec_owner>} */
	var fsOwners = databaseManager.getFoundSet(globals.nav_db_framework, 'sec_owner');
	fsOwners.find();
	fsOwners.owner_id = owner_id;
	fsOwners.search();
	
	/** @type {JSDataSet} */
	var dsOwners = databaseManager.convertToDataSet(fsOwners.sec_owner_to_sec_organization, ['organization_id', 'name']);
	application.setValueListItems('svy_sec_owner_organizations', dsOwners.getColumnAsArray(2), dsOwners.getColumnAsArray(1));
}
