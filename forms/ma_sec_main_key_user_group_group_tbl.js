/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"1FFBC071-3011-402D-97A1-7FD9B823E49B"}
 */
function addRecord(event) {
	var _query = 'SELECT group_id FROM sec_group WHERE group_id NOT IN (SELECT group_id FROM sec_user_right WHERE security_key_id = ? AND group_id IS NOT NULL)';
	var _arguments = [forms.svy_sec_main_key_user_group.foundset.security_key_id];
	var _dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _arguments, -1);
	
	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_group', _dataSet, ['group_id'], ['name'], ['Group'], [200], 600, true) == 'select') {
		var tempFoundset = forms['svy_sec_selection_dialog_sec_group'].foundset.duplicateFoundSet();
		for (var i = 1; i <= tempFoundset.getSize(); i++) {
			tempFoundset.setSelectedIndex(i);
			
			if (tempFoundset['is_selected'] == 1) {
				foundset.newRecord();
				foundset.group_id = tempFoundset['group_id'];
			}
		}
		
		databaseManager.saveData();
		
		forms.svy_sec_main_key_user_applied_tbl.loadRecords();
	}
}