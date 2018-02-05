/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"31309D23-50C7-4001-9DF8-7659E693DE7E"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	doSearch();
}

/**
 * @properties={typeid:24,uuid:"5F68AFDE-F539-49C6-84A4-E8E8FCA5AD15"}
 * @AllowToRunInFind
 */
function doSearch() {
	if (forms.svy_sec_main.searchArgument) {
		foundset.find();
		foundset.name = '#%' + forms.svy_sec_main.searchArgument + '%';
		foundset.search();
	} else {
		foundset.loadAllRecords();
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BD0AD979-4D97-4A9F-AF71-DA51D4129EB0"}
 */
function addModule(event) {
	forms.svy_sec_main_module_tbl.addRecord(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E0DB45A7-C2AE-4823-98D5-6B748E4400AC"}
 */
function addModuleOwner(event) {
	forms.svy_sec_main_module_owner_tbl.addRecord(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B9C6C381-9B36-4DFE-AF75-F9A76AEFAC79"}
 */
function addModuleKey(event) {
	forms.svy_sec_main_module_key_tbl.addRecord(event);
}
