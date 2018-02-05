/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"492478CE-B60B-487C-9F8C-2A36B6349084"}
 */
function deleteRecord(event) {
	foundset.deleteRecord();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8ABEF5B0-C9D6-4EF2-9A42-C780DF793FBA"}
 */
function addRecord(event) {
	if (!forms.svy_sec_main_user_access.owner_id) {
		globals.svy_mod_dialogs_global_showErrorDialog(i18n.getI18NMessage('svy.fr.dlg.error'), i18n.getI18NMessage('svy.fr.dlg.cannot_add_password_no_owner'), 'OK');
	} else {
		globals.svy_sec_trigger_form = controller.getName();	
		globals.svy_mod_showFormInDialog(forms.svy_sec_password_new, null, null, null, null, null, true, false, 'svy_sec_password_new');
	}
}
