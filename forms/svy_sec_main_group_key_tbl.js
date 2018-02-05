/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"10475A53-2ADD-44FD-BCC7-18E951AC296A"}
 */
function deleteRecord(event) {
	foundset.deleteRecord();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
// * @private
 *
 * @properties={typeid:24,uuid:"41E80A55-457F-4A07-91F5-B9ABF5636F2B"}
 */
function addRecord(event) {
	var _query = 'SELECT security_key_id FROM sec_security_key \
	              WHERE security_key_id NOT IN (SELECT security_key_id FROM sec_user_right WHERE group_id = ?) \
	              AND is_client = 0 \
	              ORDER BY name';
	var _arguments = [forms.svy_sec_main_group.group_id];
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
	}
}
