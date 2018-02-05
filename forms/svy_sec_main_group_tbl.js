/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8E4DF73C-4E6A-4AB8-B6CF-27ACAE0B60E4"}
 */
function deleteRecord(event) {
	var _btnOK = i18n.getI18NMessage('svy.fr.lbl.ok');
	if (globals.svy_mod_dialogs_global_showQuestionDialog(null, i18n.getI18NMessage('svy.fr.dlg.delete_group'), _btnOK, i18n.getI18NMessage('svy.fr.lbl.cancel')) == _btnOK) {
		foundset.deleteRecord();
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
// * @private
 *
 * @properties={typeid:24,uuid:"453ED6E8-63B7-4BF9-908B-24E9D1E2F308"}
 */
function addRecord(event) {
	foundset.newRecord();
	// MAVariazione - usa il proprietario attuale se filtrato, altrimenti quello di login
	forms.svy_sec_main_group.foundset.owner_id = forms.svy_sec_main_group.vOwnerID || globals.svy_sec_lgn_owner_id;
	forms.svy_sec_main_group.controller.focusFirstField();
}
