/**
 * @properties={typeid:24,uuid:"7B03A38A-595B-4446-B68C-6772AB903240"}
 */
function loadRecords() {
	var _ds = databaseManager.createEmptyDataSet(0, ['security_key_id']);
	
	if (forms.svy_sec_main_owner.owner_id) {
		var _query = '	SELECT	security_key_id \
						FROM	sec_security_key, \
								sec_owner_in_module \
						WHERE	sec_security_key.module_id = sec_owner_in_module.module_id \
						AND		sec_owner_in_module.owner_id = ?'
		var _args = new Array();
		_args[0] = forms.svy_sec_main_owner.owner_id.toString();
		
		_ds = databaseManager.getDataSetByQuery(globals.nav_db_framework, _query, _args, -1);
	}
	
	foundset.loadRecords(_ds);
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"82D28AFC-9CD8-41B1-8BDA-E81AAD53DF37"}
 */
function onShow(firstShow, event) {
	loadRecords();
}
