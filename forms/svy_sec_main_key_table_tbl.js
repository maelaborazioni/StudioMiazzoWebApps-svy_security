/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B1C77833-E4A7-4BB4-95B4-5E6C4AD15EB6"}
 */
function deleteRecord(event) {
	foundset.deleteRecord();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B05BDB86-4B3F-4E9E-9EE2-B10D2C56E546"}
 */
function addRecord(event) {
	controller.newRecord()
	forms.svy_sec_table_dtl.controller.loadRecords(foundset);
	globals.svy_mod_showFormInDialog(forms.svy_sec_table_dtl, null, null, null, null, null, true, false, 'svy_sec_table_dtl');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"94355C9F-3649-4AEC-8C3A-E8526BD53485"}
 */
function editRecord(event) {
	forms.svy_sec_table_dtl.controller.loadRecords(foundset);
	globals.svy_mod_showFormInDialog(forms.svy_sec_table_dtl, null, null, null, null, null, true, false, 'svy_sec_table_dtl');
}
