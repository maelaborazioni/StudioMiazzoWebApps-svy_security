/**
 * @properties={typeid:24,uuid:"5B0A5E19-5F5D-421E-8103-9E6241778138"}
 */
function loadRecords() {
	var _ds = databaseManager.createEmptyDataSet(0, ['security_key_id']);
	
	if (forms.svy_sec_main_user_security.foundset.user_org_id) {
		var _query = '	SELECT	security_key_id \
						FROM	sec_security_key \
						WHERE	(security_key_id IN ( \
								SELECT	ssk.security_key_id \
								FROM	sec_security_key ssk, \
										sec_user_right sur, \
										sec_user_in_group sug \
								WHERE	ssk.security_key_id = sur.security_key_id \
								AND		sur.group_id = sug.group_id \
								AND		sug.user_org_id = ?) \
						OR		security_key_id IN ( \
								SELECT	security_key_id \
								FROM	sec_user_right \
								WHERE	(group_id IS NULL OR group_id = 0) \
								AND		(is_denied IS NULL OR is_denied = 0) \
								AND		user_org_id = ?)) \
						AND		NOT EXISTS ( \
								SELECT	* \
								FROM	sec_user_right \
								WHERE	is_denied = 1 \
								AND		sec_user_right.security_key_id = sec_security_key.security_key_id)';
		var _args = new Array();
		_args[0] = forms.svy_sec_main_user_security.foundset.user_org_id;
		_args[1] = forms.svy_sec_main_user_security.foundset.user_org_id;
		
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
 * @properties={typeid:24,uuid:"70F168DF-81BE-48D3-BF76-8D21CADD9F91"}
 */
function onShow(firstShow, event) 
{
	loadRecords();
}
