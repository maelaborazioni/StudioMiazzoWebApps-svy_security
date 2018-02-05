/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"1D19D58C-7903-4D97-A58E-BD3B3F1CE539"}
 */
function deleteRecord(event) {
	foundset.deleteRecord();
	
	forms.svy_sec_main_key_user_applied_tbl.loadRecords();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3F42D021-7244-4B94-8A9F-1FA96F2AA34B"}
 */
function addRecord(event) {
	var _query = 'SELECT sg.group_id \
	              FROM sec_group sg \
				  INNER JOIN sec_owner so \
				  ON sg.owner_id = so.owner_id \
				  WHERE sg.group_id \
				  NOT IN \
				  (SELECT group_id FROM sec_user_right WHERE security_key_id = ? AND group_id IS NOT NULL)';
                  
	var _arguments = [forms.svy_sec_main_key_user_group.foundset.security_key_id];
	
	if(!_to_sec_user$user_id.flag_super_administrator)
	{
		_query += ' AND so.owner_id = ?'
	    _arguments.push(globals.svy_sec_getOwnerId());
	}		
	
	_query += ' ORDER BY so.name,sg.name';
	
	var _dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _arguments, -1);
	
	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_group', _dataSet, ['group_id'], ['name','sec_group_to_sec_owner.name'], ['Group','Owner'], [250,250], 650, true) == 'select') {
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
