/**
 * Edit, open dialog
 *
 * @author Sanneke Aleman
 * @since 2008-05-04
 *
 * @properties={typeid:24,uuid:"ADFE41BB-CA44-4FD4-8D2F-A4D046D16B36"}
 */
function editRecord() {
	forms.svy_sec_table_filter_dtl.controller.loadRecords(foundset);
	globals.svy_mod_showFormInDialog(forms.svy_sec_table_filter_dtl, null, null, null, null, null, true, false, 'table_filter');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8F052190-2F53-4E85-B6A8-ED7BA90C2CA1"}
 */
function deleteRecord(event) {
	foundset.deleteRecord();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B9C7C107-542B-4625-A18B-D667C8BDBBDF"}
 */
function addRecord(event) {
	controller.newRecord();
	forms.svy_sec_table_filter_dtl.controller.loadRecords(foundset);
	globals.svy_mod_showFormInDialog(forms.svy_sec_table_filter_dtl, null, null, null, null, null, true, false, 'table_filter');
}
