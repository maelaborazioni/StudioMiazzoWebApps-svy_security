/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7D0D9176-F279-4377-85B4-9527E1A93D4A"}
 */
var organizationID = null;

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CC2651D9-878B-4CA8-85BE-CA24BBDF5AAC"}
 * @AllowToRunInFind
 */
function onDataChangeOrganizationID(oldValue, newValue, event) {
	filterOrganization();
	
	forms.svy_sec_main_user_key_applied_tbl.loadRecords();
	
	return true
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"906C8AA6-FF03-4055-984D-753CD6D20D2A"}
 */
function onRecordSelection(event) {
	enableDisableForm();
	
	forms.svy_sec_main_user_key_applied_tbl.loadRecords();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"74E205AA-C91A-4B84-A56E-BB016778C612"}
 */
function onShow(firstShow, event) {
	setValueList();
	enableDisableForm();
}

/**
 * @properties={typeid:24,uuid:"4EB8202C-847B-44DF-9869-A9A5D0DF965F"}
 */
function enableDisableForm() 
{
	var _enable = false;
	if (organizationID) {
		_enable = true;
	}
	
	controller.enabled = _enable;
	forms.svy_sec_main_user_group_tbl.controller.enabled = _enable;
	forms.svy_sec_main_user_key_tbl.controller.enabled = _enable;
}

/**
 * @properties={typeid:24,uuid:"C25DAE7B-EA0E-47F0-959B-AAD3B441811B"}
 */
function setValueList() {
	var _vlRealValues = new Array();
	var _vlDisplayValues = new Array();
	var _vlFirstValue = '';
	
	if (databaseManager.hasRecords(forms.svy_sec_main_user.foundset.sec_user_to_sec_user_org)) {
		var _fsUserOrganizations = forms.svy_sec_main_user.foundset.sec_user_to_sec_user_org.duplicateFoundSet();
		_fsUserOrganizations.unrelate();
		_fsUserOrganizations.sort('sec_user_org_to_sec_organization.sec_organization_to_sec_owner.name asc,sec_user_org_to_sec_organization.name asc');
			
		for (var i = 1; i <= _fsUserOrganizations.getSize(); i++) {
			_fsUserOrganizations.setSelectedIndex(i);
			_vlRealValues[i - 1] = _fsUserOrganizations.organization_id;
			// MAVariazione - Also display the owner's name
			_vlDisplayValues[i - 1] = _fsUserOrganizations.sec_user_org_to_sec_organization.sec_organization_to_sec_owner.name + ' - ' + _fsUserOrganizations.sec_user_org_to_sec_organization.name;
			
			if (i == 1) {
				_vlFirstValue = _fsUserOrganizations.organization_id;
			}
		}
	}
	
	application.setValueListItems('svy_sec_user_organizations', _vlDisplayValues, _vlRealValues);
	organizationID = _vlFirstValue;
	
//	filterOrganization();
}

/**
 * @properties={typeid:24,uuid:"3F62C76F-BD0F-45AA-AF97-EF6D39849D3B"}
 * @AllowToRunInFind
 */
function filterOrganization()
{
	foundset.find();
	foundset.organization_id = organizationID;
	foundset.search();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BD9F402A-E904-44CC-91C9-7203B5436399"}
 */
function addGroup(event) {
	forms.svy_sec_main_user_group_tbl.addRecord(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"AC2E2182-BE6E-4F3D-BFB4-ED83E3BBE483"}
 */
function addKey(event) {
	forms.svy_sec_main_user_key_tbl.addRecord(event);
}
