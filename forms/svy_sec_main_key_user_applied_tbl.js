/**
 * @properties={typeid:24,uuid:"6848FAE9-524C-4688-82C5-0A730DCB8814"}
 */
function loadRecords()
{
	var _ds = databaseManager.createEmptyDataSet(0, ['user_org_id']);
	
	if (forms.svy_sec_main_key_owner_module.foundset.security_key_id) {
		var _query = '	SELECT	user_org_id \
						FROM	sec_user_org \
						WHERE	(user_org_id IN ( \
								SELECT	sug.user_org_id \
								FROM	sec_user_in_group sug, \
										sec_security_key ssk, \
										sec_user_right sur \
								WHERE	ssk.security_key_id = sur.security_key_id \
								AND		sur.group_id = sug.group_id \
								AND		ssk.security_key_id = ?) \
						OR	user_org_id IN ( \
								SELECT	user_org_id \
								FROM	sec_user_right \
								WHERE	(group_id IS NULL OR group_id = 0) \
								AND		(is_denied IS NULL OR is_denied = 0) \
								AND		security_key_id = ?)) \
						AND		NOT EXISTS ( \
								SELECT	* \
								FROM	sec_user_right \
								WHERE	is_denied = 1 \
								AND	sec_user_right.user_org_id = sec_user_org.user_org_id)'
		var _args = new Array();
		_args[0] = forms.svy_sec_main_key_user_group.foundset.security_key_id;
		_args[1] = forms.svy_sec_main_key_user_group.foundset.security_key_id;
		
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
 * @properties={typeid:24,uuid:"9112444E-61BA-4BFC-89F2-BC5BE3679301"}
 */
function onShow(firstShow, event) {
	loadRecords();
}
