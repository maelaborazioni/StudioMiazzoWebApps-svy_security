/**
 * @properties={typeid:35,uuid:"410AADDC-6296-4174-AD05-8B0FDF7474C7",variableType:-4}
 */
var recordSaved = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"206293FB-32DA-476E-8E19-0FC59F022867"}
 */
function btnOK(event) {
	databaseManager.saveData();
	recordSaved = true;
	
	var window = application.getWindow(controller.getName());
	window.destroy();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9A5D832D-CEE7-40E4-87BA-2B9E269138A9"}
 */
function btnCancel(event) {
	var window = application.getWindow(controller.getName());
	window.destroy();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"504BE6B1-3C2C-4093-93F8-16FBA645B26C"}
 */
function onShow(firstShow, event) {
	recordSaved = false;
	
	if (foundset.owner_id) {
		elements.owner_id.visible = true;
		elements.owner_id_combobox.visible = false;
	} else {
		elements.owner_id.visible = false;
		elements.owner_id_combobox.visible = true;
	}
	
	controller.focusFirstField();
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"1E6D3DFF-3449-4CAD-97F6-B87ADCEDACF2"}
 */
function onHide(event) {
	if (!recordSaved) {
		foundset.deleteRecord();
	}	
	
	return true;
}
