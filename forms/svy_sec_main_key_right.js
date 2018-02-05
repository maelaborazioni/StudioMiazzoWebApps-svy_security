/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0457D6DC-6760-4AE9-80D5-A90E2848D1C2",variableType:12}
 */
var vAddTableFilterLbl = i18n.getI18NMessage('svy.fr.lbl.add') + ' table filter';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2DFCA5A5-AD94-4E3E-8B58-C1C59EB06577",variableType:12}
 */
var vAddElementFilterLbl = i18n.getI18NMessage('svy.fr.lbl.add') + ' element filter';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"51B7415D-DCDA-47A4-A62B-2B64720BA172",variableType:12}
 */
var vAddProgramFilterLbl = i18n.getI18NMessage('svy.fr.lbl.add') + ' program filter';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E46E2C39-1822-4C73-AAAA-BAA5C757E3B9",variableType:12}
 */
var vAddTableLbl = i18n.getI18NMessage('svy.fr.lbl.add') + ' table';
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FFE48530-E5DC-4EFD-BED4-EBF3E106A843"}
 */
function addTable(event) {
	forms.svy_sec_main_key_table_tbl.addRecord(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C4A8E036-92C5-43AA-924B-A30FEDAEB87C"}
 */
function addTableFilter(event) {
	forms.svy_sec_main_key_table_filter_tbl.addRecord(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"3F9CB6AA-42B4-4877-BD38-3A75CEEAFDC3"}
 */
function addElementFilter(event) {
	forms.svy_sec_main_key_element_tbl.addRecord(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E59D3744-FCAF-416F-913A-BC8A4EB63F0C"}
 */
function addProgramFilter(event) {
	forms.svy_sec_main_key_navigation_key_tbl.addRecord(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"559E306F-6C3C-40AC-8346-F83F8C4FEE2B"}
 */
function addRecord(event) {
	switch(elements.tabs_70.tabIndex)
	{
		case 1:
			addElementFilter(event);
			break;
		case 2:
			addProgramFilter(event);
			break;
		case 3:
			addTable(event);
			break;
		case 4:
			addTableFilter(event);
			break;
	}
}
