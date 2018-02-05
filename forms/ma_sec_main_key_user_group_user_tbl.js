/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"7A183FCD-A3C3-415D-AEA4-2ACB3B1FFBBA"}
 */
function addRecord(event) {
	var _query = 'SELECT user_org_id FROM sec_user_org WHERE user_org_id NOT IN (SELECT user_org_id FROM sec_user_right WHERE security_key_id = ? AND user_org_id IS NOT NULL)';
	var _arguments = [forms.svy_sec_main_key_user_group.security_key_id];
	var _dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _arguments, -1);
	
	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_user_org', _dataSet, ['user_org_id'], ['sec_user_org_to_sec_user.name_compound', 'sec_user_org_to_sec_organization.name'], ['Name', 'Organization'], [200, 200], 600, true) == 'select') {
		var tempFoundset = forms['svy_sec_selection_dialog_sec_user_org'].foundset.duplicateFoundSet();
		for (var i = 1; i <= tempFoundset.getSize(); i++) {
			tempFoundset.setSelectedIndex(i);
			
			if (tempFoundset['is_selected'] == 1) {
				foundset.newRecord();
				foundset.user_org_id = tempFoundset['user_org_id'];
			}
		}
		
		databaseManager.saveData();
		
		forms.svy_sec_main_key_user_applied_tbl.loadRecords();
	}
}