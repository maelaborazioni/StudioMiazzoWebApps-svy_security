/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CA22E5FE-A85D-4CD6-9533-0B688A7797E6"}
 */
function deleteRecord(event) {
	forms.svy_sec_main_key_owner_module.foundset.module_id = null;
	
	forms.svy_sec_main_key_owner_applied_tbl.loadRecords();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4F0DC038-3829-4A67-B12C-02649EA8D30A"}
 * @AllowToRunInFind
 * @SuppressWarnings(unused)
 */
function addRecord(event) {
	var _dataSet = databaseManager.createEmptyDataSet(0, ['module_id']);
	if (!forms.svy_sec_main_key_owner_module.foundset.module_id) {
		var _query = 'SELECT module_id FROM sec_module';
		var _arguments = [forms.svy_sec_main_owner.foundset.owner_id.toString()];
		_dataSet = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, null, -1);
	}
	
	if (globals.svy_sec_showSelectionDialog('db:/svy_framework/sec_module', _dataSet, ['module_id'], ['name'], ['Module'], [200], 600, false) == 'select') {
		forms.svy_sec_main_key_owner_module.foundset.module_id = forms['svy_sec_selection_dialog_sec_module'].foundset['module_id'];
		
		databaseManager.saveData();
		
		forms.svy_sec_main_key_owner_applied_tbl.loadRecords();
	}
}
