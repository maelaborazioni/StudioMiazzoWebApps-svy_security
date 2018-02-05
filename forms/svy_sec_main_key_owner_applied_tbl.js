/**
 * @properties={typeid:24,uuid:"A8E06902-35D5-4C26-90FB-248CAA2C2E6C"}
 */
function loadRecords() {
	var _ds = databaseManager.createEmptyDataSet(0, ['owner_id']);
	
	if (forms.svy_sec_main_key_owner_module.foundset.security_key_id) {
		var _query = '	SELECT	sec_owner_in_module.owner_id \
						FROM	sec_owner_in_module, \
								sec_security_key \
						WHERE	sec_security_key.module_id = sec_owner_in_module.module_id \
						AND		sec_security_key.security_key_id = ?'
		var _args = new Array();
		_args[0] = forms.svy_sec_main_key_owner_module.foundset.security_key_id;
		
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
 * @properties={typeid:24,uuid:"34D1FF29-C7D5-42BE-84EE-C03718E75DFB"}
 */
function onShow(firstShow, event) {
	loadRecords();
}
