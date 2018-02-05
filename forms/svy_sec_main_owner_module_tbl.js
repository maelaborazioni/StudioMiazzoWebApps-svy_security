/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D849916A-114F-47AB-BA49-93A82800F3C2"}
 */
function deleteRecord(event) {
	foundset.deleteRecord();
	
	forms.svy_sec_main_owner_key_applied_tbl.loadRecords();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
// * @private
 *
 * @properties={typeid:24,uuid:"04A2F1E3-2F7F-4384-B678-3BC96673C3F8"}
 */
function addRecord(event) {
	var _query = 'SELECT module_id FROM sec_module WHERE module_id NOT IN (SELECT module_id FROM sec_owner_in_module WHERE owner_id = ?)';
	var _arguments = [forms.svy_sec_main_owner.foundset.owner_id.toString()];
	var _dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _arguments, -1);
	
	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_module', _dataSet, ['module_id'], ['name'], ['Module'], [200], 600, true) == 'select') {
		var tempFoundset = forms['svy_sec_selection_dialog_sec_module'].foundset.duplicateFoundSet();
		for (var i = 1; i <= tempFoundset.getSize(); i++) {
			tempFoundset.setSelectedIndex(i);
			
			if (tempFoundset['is_selected'] == 1) {
				foundset.newRecord();
				foundset.module_id = tempFoundset['module_id'];
			}
		}
		
		databaseManager.saveData();
		forms.svy_sec_main_owner_key_applied_tbl.loadRecords();
	}
}
