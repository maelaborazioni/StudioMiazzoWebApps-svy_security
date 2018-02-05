/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"871F8041-FAD5-4709-9F98-6B947759F37B"}
 */
function deleteRecord(event) {
	foundset.deleteRecord();
	
	forms.svy_sec_main_key_user_applied_tbl.loadRecords();
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
 * @properties={typeid:24,uuid:"989302DC-0E89-44FD-BB4E-5B37138A0A69"}
 */
function onDataChangeIsDenied(oldValue, newValue, event) {
	databaseManager.saveData();
	
	forms.svy_sec_main_key_user_applied_tbl.loadRecords();
	
	return true;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"24DB38FB-C82F-4A2B-B4EC-D1B7CC045FC3"}
 * @AllowToRunInFind
 */
function addRecord(event) {
	var _query = 'SELECT suo.user_org_id \
	              FROM sec_user_org suo \
	              INNER JOIN sec_user su \
	              ON suo.user_id = su.user_id \
	              WHERE suo.user_org_id NOT IN \
	              (SELECT user_org_id \
	              FROM sec_user_right \
	              WHERE security_key_id = ? AND user_org_id IS NOT NULL)';
	
	/** @type{Array<String>}*/
	var _arguments = [forms.svy_sec_main_key_user_group.security_key_id];
	
	if(!_to_sec_user$user_id.flag_super_administrator)
	{
		_query += ' AND owner_id = ?'
	    _arguments.push(_to_sec_user$user_id.owner_id.toString());
	}
	
	var _dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _arguments, -1);
	
	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_user_org', 
		                                    _dataSet,
											['user_org_id'],
											['sec_user_org_to_sec_user.name_compound',
											 'sec_user_org_to_sec_organization.name',
											 'sec_user_org_to_sec_organization.sec_organization_to_sec_owner.name'], ['Name', 'Organization', 'Owner'], [200, 300, 250], 600, true) == 'select') {
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
