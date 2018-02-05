/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"74D8127F-EBB0-4D17-8785-1EED76ACB0A5"}
 */
function deleteRecord(event) {
	var _btnOK = i18n.getI18NMessage('svy.fr.lbl.ok');
	if (globals.svy_mod_dialogs_global_showQuestionDialog(null, i18n.getI18NMessage('svy.fr.dlg.delete_module'), _btnOK, i18n.getI18NMessage('svy.fr.lbl.cancel')) == _btnOK) {
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
 * @properties={typeid:24,uuid:"A7318432-F431-4C26-B5B4-E69A9F53A7CF"}
 */
function addRecord(event) {
	foundset.newRecord();
	forms.svy_sec_main_module.controller.focusFirstField();
}
