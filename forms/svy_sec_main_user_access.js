/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D7C45840-4987-4318-A223-2C7BCD9E8B88"}
 */
function unlockUser(event) {
	foundset.user_locked = null;
	foundset.user_locked_datetime = null;
	
	elements.btn_unlockUser.enabled = false;
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D25EC2E4-F713-4973-82FF-5144BC0C800E"}
 */
function onRecordSelection(event) {
	if (foundset.user_locked == 1) {
		elements.btn_unlockUser.enabled = true;
	} else {
		elements.btn_unlockUser.enabled = false;
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C930AF98-6308-4C9B-AC51-58F3552AC597"}
 */
function addOrganization(event) {
	forms.svy_sec_main_user_organization_tbl.addRecord(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"22658400-DEFB-45C2-B349-B39584A4ED6E"}
 */
function addPassword(event) {
	forms.svy_sec_main_user_password_tbl.addRecord(event);
}
