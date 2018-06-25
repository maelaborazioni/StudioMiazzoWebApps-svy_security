/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"48A4918D-BDE6-4597-A860-9BD22B7E50FD"}
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
 * @properties={typeid:24,uuid:"D33FDF3D-9B72-4096-B555-438A9BA4E97B"}
 */
function addRecord(event) {
	var _query = 'SELECT sg.group_id \
				  FROM sec_group sg, sec_organization so, sec_owner sow \
			      WHERE sg.owner_id = so.owner_id \
				  AND sg.owner_id = sow.owner_id \
				  AND so.organization_id = ? \
				  AND sg.group_id NOT IN (SELECT group_id FROM sec_user_in_group WHERE user_org_id = ?) \
				  ORDER BY sow.name,so.name,sg.name';
	var _arguments = [new String(forms.svy_sec_main_user_security.organizationID), forms.svy_sec_main_user_security.user_org_id];
	var _dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _arguments, -1);
	
	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_group', _dataSet, ['group_id'], ['name'], ['Groups'], [200], 600, true) == 'select') {
		var tempFoundset = forms['svy_sec_selection_dialog_sec_group'].foundset.duplicateFoundSet();
		for (var i = 1; i <= tempFoundset.getSize(); i++) {
			tempFoundset.setSelectedIndex(i);
			
			if (tempFoundset['is_selected'] == 1) {
				foundset.newRecord();
				foundset.group_id = tempFoundset['group_id'];
			}
		}
		
		databaseManager.saveData();
		forms.svy_sec_main_user_key_applied_tbl.loadRecords();
	}
}
