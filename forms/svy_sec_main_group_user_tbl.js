/**
 * @properties={typeid:24,uuid:"6B82EBF9-BA82-434D-8D7A-063F057BE28A"}
 * @AllowToRunInFind
 */
function filterOrganization(organizationID) {
	foundset.find();
	if (organizationID) {
		foundset.sec_user_in_group_to_sec_user_org.organization_id = organizationID;
	} else {
		foundset.sec_user_in_group_to_sec_user_org.organization_id = '^=';
	}
	
	foundset.search();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"023C83B3-0350-4FEE-A4DB-470E574E2EF4"}
 */
function deleteRecord(event) {
	foundset.deleteRecord();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"40D35681-3BE2-4CDC-BBC2-BBE96A11331B"}
 * @AllowToRunInFind
 */
function addRecord(event) {
	var _query = 'SELECT sec_user.user_id FROM sec_user, sec_user_org WHERE sec_user.user_id = sec_user_org.user_id AND sec_user_org.organization_id = ? AND sec_user.user_id NOT IN (SELECT sec_user.user_id FROM sec_user, sec_user_org, sec_user_in_group WHERE sec_user.user_id = sec_user_org.user_id AND sec_user_org.user_org_id = sec_user_in_group.user_org_id AND sec_user_in_group.group_id = ?)';
	var _arguments = [new String(forms.svy_sec_main_group.organizationID), forms.svy_sec_main_group.foundset.group_id];
	var _dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _arguments, -1);
	
	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_user', _dataSet, ['user_id'], ['user_name'], ['Username'], [200], 600, true) == 'select') {
		var tempFoundset = forms['svy_sec_selection_dialog_sec_user'].foundset.duplicateFoundSet();
		/** @type {JSFoundset<db:/svy_framework/sec_user_org>} */
		var _fsUserOrg = databaseManager.getFoundSet(globals.nav_db_framework, 'sec_user_org');
		for (var i = 1; i <= tempFoundset.getSize(); i++) {
			tempFoundset.setSelectedIndex(i);
			
			if (tempFoundset['is_selected'] == 1) {
				_fsUserOrg.find();
				_fsUserOrg.organization_id = forms.svy_sec_main_group.organizationID;
				_fsUserOrg.user_id = tempFoundset['user_id'];
				_fsUserOrg.search();
				
				foundset.newRecord();
				foundset.user_org_id = _fsUserOrg.user_org_id;
				databaseManager.saveData();
			}
		}
		
		databaseManager.saveData();
	}
}
