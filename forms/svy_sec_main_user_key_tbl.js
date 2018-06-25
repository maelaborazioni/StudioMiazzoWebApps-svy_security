/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2CCAE318-93BE-479D-A834-FED225F9E5DE"}
 */
function deleteRecord(event) {
	foundset.deleteRecord();
	
	forms.svy_sec_main_user_key_applied_tbl.loadRecords();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7D13241E-B797-456C-8902-4824B248E10C"}
 */
function addRecord(event) {
	var _query = 'SELECT security_key_id FROM sec_security_key \
	              WHERE security_key_id NOT IN (SELECT security_key_id FROM sec_user_right WHERE user_org_id = ?) \
	              ORDER BY name';
	var _arguments = [forms.svy_sec_main_user_security.foundset.user_org_id];
	var _dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _arguments, -1);
	
	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_security_key', _dataSet, ['security_key_id'], ['name'], ['Keys'], [200], 600, true) == 'select') {
		var tempFoundset = forms['svy_sec_selection_dialog_sec_security_key'].foundset.duplicateFoundSet();
		for (var i = 1; i <= tempFoundset.getSize(); i++) {
			tempFoundset.setSelectedIndex(i);
			
			if (tempFoundset['is_selected'] == 1) {
				foundset.newRecord();
				foundset.security_key_id = tempFoundset['security_key_id'];
			}
		}
		
		databaseManager.saveData();		
		forms.svy_sec_main_user_key_applied_tbl.loadRecords();
	}
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
 * @private
 *
 * @properties={typeid:24,uuid:"ABF24F17-6060-408B-B620-869CD6486909"}
 */
function onDataChangeIsDenied(oldValue, newValue, event) {
	databaseManager.saveData();
	
	forms.svy_sec_main_user_key_applied_tbl.loadRecords();
	
	return true
}
