/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"931DE53D-3110-4542-8C30-5D142357F8AB"}
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
 * @properties={typeid:24,uuid:"F1114FC8-0ED9-4533-B6CF-64802CF42304"}
 */
function addRecord(event) {
	var _query = 'SELECT owner_id FROM sec_owner WHERE owner_id \
	              NOT IN (SELECT owner_id FROM sec_owner_in_module WHERE module_id = ?) \
	              ORDER BY name ASC';
	var _arguments = [forms.svy_sec_main_module.foundset.module_id];
	var _dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _arguments, -1);
	
	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_owner', _dataSet, ['owner_id'], ['name'], ['Owner'], [200], 600, true) == 'select') {
		var tempFoundset = forms['svy_sec_selection_dialog_sec_owner'].foundset.duplicateFoundSet();
		for (var i = 1; i <= tempFoundset.getSize(); i++) {
			tempFoundset.setSelectedIndex(i);
			
			if (tempFoundset['is_selected'] == 1) {
				foundset.newRecord();
				foundset.owner_id = tempFoundset['owner_id'];
			}
		}
		
		databaseManager.saveData();
		databaseManager.refreshRecordFromDatabase(foundset,-1);
	}
}
