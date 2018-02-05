/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F4F1AD27-8A30-4118-96A4-960125D6AD42"}
 */
function deleteRecord(event) {
	foundset.deleteRecord();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"285C88D3-623D-41C3-BAD1-4562750CCAF4"}
 */
function addRecord(event) {
	globals.svy_mod_showFormInDialog(forms.svy_sec_element_new, null, null, null, null, null, true, false, 'add_element');
}
