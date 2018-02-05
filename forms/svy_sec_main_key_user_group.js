/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"65F1A423-797F-48F4-8361-EF45E64B6696"}
 * @AllowToRunInFind
 */
function onRecordSelection(event) {
	forms.svy_sec_main_key_user_group_group_tbl.foundset.find();
	forms.svy_sec_main_key_user_group_group_tbl.foundset.group_id = '>0';
	forms.svy_sec_main_key_user_group_group_tbl.foundset.search();

	forms.svy_sec_main_key_user_group_user_tbl.foundset.find();
	forms.svy_sec_main_key_user_group_user_tbl.foundset.user_org_id = '>0';
	forms.svy_sec_main_key_user_group_user_tbl.foundset.search();
	
	forms.svy_sec_main_key_user_applied_tbl.loadRecords();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"03A550DB-8591-4756-BAFC-760CEBF8EB48"}
 */
function addGroup(event) {
	forms.svy_sec_main_key_user_group_group_tbl.addRecord(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F71CFA48-B533-454D-AB65-DBA1D9EB7D4D"}
 */
function addUser(event) {
	forms.svy_sec_main_key_user_group_user_tbl.addRecord(event);
}
